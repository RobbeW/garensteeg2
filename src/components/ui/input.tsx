import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "min-h-11 w-full rounded-md border border-border bg-white/90 px-3 py-2 text-base text-text outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent-soft",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
