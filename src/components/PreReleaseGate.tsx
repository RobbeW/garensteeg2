import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { LockKeyhole } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ACCESS_KEY = "garensteeg-preview-access";
const PREVIEW_PASSWORD = "SLe26";

type PreReleaseGateProps = {
  children: ReactNode;
};

function hasSessionAccess() {
  return typeof window !== "undefined" && window.sessionStorage.getItem(ACCESS_KEY) === "granted";
}

export function PreReleaseGate({ children }: PreReleaseGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(hasSessionAccess);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== PREVIEW_PASSWORD) {
      setError("Het wachtwoord is niet juist.");
      return;
    }

    window.sessionStorage.setItem(ACCESS_KEY, "granted");
    setIsUnlocked(true);
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <main className="flex min-h-svh items-center bg-background px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-md border-l-4 border-accent pl-5 sm:pl-6">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-accent-soft text-accent">
          <LockKeyhole className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="mt-6 text-sm font-semibold text-accent">Voorvertoning</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-text">Deze pagina is nog niet publiek toegankelijk.</h1>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="preview-password">Wachtwoord</Label>
            <Input
              id="preview-password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              autoComplete="current-password"
              required
              aria-describedby={error ? "preview-password-error" : undefined}
            />
          </div>
          {error ? (
            <p id="preview-password-error" className="text-sm font-medium text-[#9b2c2c]" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full">
            Open voorvertoning
          </Button>
        </form>
      </div>
    </main>
  );
}
