import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
}: {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <details className={cn("group rounded-lg border border-border bg-surface/95", className)} open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 font-semibold text-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <span>{title}</span>
        <ChevronDown className="h-5 w-5 flex-none text-accent transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="border-t border-border px-4 py-4 text-sm leading-6 text-text-muted">{children}</div>
    </details>
  );
}
