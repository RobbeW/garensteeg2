import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { rmSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";

function removeSourceJpgsFromBuild() {
  return {
    name: "remove-source-jpgs-from-build",
    closeBundle() {
      const imageRoot = join(process.cwd(), "dist", "images");

      function walk(directory: string) {
        let entries: string[];
        try {
          entries = readdirSync(directory);
        } catch {
          return;
        }

        for (const entry of entries) {
          const path = join(directory, entry);
          const stats = statSync(path);

          if (stats.isDirectory()) {
            walk(path);
          } else if (/\.(jpe?g)$/i.test(entry)) {
            rmSync(path);
          }
        }
      }

      walk(imageRoot);
    },
  };
}

function normalizeBasePath(basePath = "/") {
  return basePath.endsWith("/") ? basePath : `${basePath}/`;
}

export default defineConfig(() => ({
  base: normalizeBasePath(process.env.VITE_BASE_PATH),
  plugins: [react(), removeSourceJpgsFromBuild()],
}));
