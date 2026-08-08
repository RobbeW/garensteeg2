import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "default" | "muted" | "success" | "warning" | "outline";

const variants: Record<BadgeVariant, string> = {
  default: "bg-accent text-white",
  muted: "bg-surface-muted text-text",
  success: "bg-accent-soft text-accent",
  warning: "bg-warning-soft text-[#6b4b00]",
  outline: "border border-border bg-surface text-text",
};

export function Badge({ className, variant = "default", ...props }: HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-black/5", variants[variant], className)}
      {...props}
    />
  );
}
