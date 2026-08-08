import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded-md border border-border bg-white/90 px-3 py-2 text-sm text-text outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent-soft",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
