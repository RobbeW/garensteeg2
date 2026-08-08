#!/usr/bin/env python3
"""Build and serve the rental landing page locally."""

from __future__ import annotations

import argparse
import functools
import os
import shutil
import socket
import subprocess
import sys
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
CODEX_RUNTIME = Path.home() / ".cache" / "codex-runtimes" / "codex-primary-runtime" / "dependencies"


class DemoRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, format: str, *args: object) -> None:
        print(f"{self.address_string()} - {format % args}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build and launch a local static demo of the webpage.")
    parser.add_argument("--host", default="127.0.0.1", help="Host to bind. Default: 127.0.0.1")
    parser.add_argument("--port", type=int, default=5173, help="Preferred port. Default: 5173")
    parser.add_argument("--no-build", action="store_true", help="Skip the production build and serve the existing dist folder.")
    parser.add_argument("--no-browser", action="store_true", help="Do not open a browser automatically.")
    return parser.parse_args()


def find_free_port(host: str, preferred_port: int) -> int:
    for port in range(preferred_port, preferred_port + 100):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                sock.bind((host, port))
            except OSError:
                continue
            return port

    raise RuntimeError(f"No free port found from {preferred_port} to {preferred_port + 99}.")


def build_environment() -> dict[str, str]:
    env = os.environ.copy()
    env["VITE_BASE_PATH"] = "/"

    bundled_node = CODEX_RUNTIME / "node" / "bin"
    if bundled_node.exists():
        env["PATH"] = f"{bundled_node}{os.pathsep}{env.get('PATH', '')}"

    return env


def node_executable() -> str | None:
    bundled_node = CODEX_RUNTIME / "node" / "bin" / "node.exe"
    if bundled_node.exists():
        return str(bundled_node)

    return shutil.which("node") or shutil.which("node.exe")


def build_commands() -> list[list[str]]:
    node = node_executable()
    bundled_pnpm = CODEX_RUNTIME / "node" / "node_modules" / "pnpm" / "bin" / "pnpm.cjs"
    if node and bundled_pnpm.exists():
        return [[node, str(bundled_pnpm), "build"]]

    command_candidates = [
        ("pnpm.cmd", ["build"]),
        ("pnpm", ["build"]),
        ("npm.cmd", ["run", "build"]),
        ("npm", ["run", "build"]),
    ]

    for executable, args in command_candidates:
        command_path = shutil.which(executable)
        if command_path:
            return [[command_path, *args]]

    local_tsc = ROOT / "node_modules" / "typescript" / "bin" / "tsc"
    local_vite = ROOT / "node_modules" / "vite" / "bin" / "vite.js"
    if node and local_tsc.exists() and local_vite.exists():
        return [[node, str(local_tsc), "-b"], [node, str(local_vite), "build"]]

    raise RuntimeError(
        "Could not find pnpm, npm, or local node_modules build tools. "
        "Install dependencies first, or run with --no-build if dist/ already exists."
    )


def build_site() -> None:
    commands = build_commands()
    env = build_environment()

    for command in commands:
        print(f"Building local demo with: {' '.join(command)}")
        completed = subprocess.run(command, cwd=ROOT, env=env, check=False)
        if completed.returncode != 0:
            raise RuntimeError(f"Build failed with exit code {completed.returncode}.")


def ensure_dist_exists() -> None:
    index_file = DIST / "index.html"
    if not index_file.exists():
        raise RuntimeError("dist/index.html does not exist. Run without --no-build, or build the site first.")


def serve(host: str, port: int) -> None:
    handler = functools.partial(DemoRequestHandler, directory=str(DIST))
    server = ThreadingHTTPServer((host, port), handler)
    url = f"http://{host}:{port}/"

    print(f"Serving local demo at {url}")
    print("Press Ctrl+C to stop.")
    webbrowser.open(url)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping local demo.")
    finally:
        server.server_close()


def main() -> int:
    args = parse_args()

    try:
        if not args.no_build:
            build_site()
        ensure_dist_exists()
        port = find_free_port(args.host, args.port)

        if args.no_browser:
            print(f"Browser auto-open disabled. Open http://{args.host}:{port}/")
            handler = functools.partial(DemoRequestHandler, directory=str(DIST))
            server = ThreadingHTTPServer((args.host, port), handler)
            try:
                server.serve_forever()
            except KeyboardInterrupt:
                print("\nStopping local demo.")
            finally:
                server.server_close()
        else:
            serve(args.host, port)
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
