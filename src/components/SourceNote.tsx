import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "../lib/utils";

export function SourceNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-start gap-2 text-sm leading-6 text-text-muted", className)}>
      <Info className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
