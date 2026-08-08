import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function TabButton({
  active,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(
        "min-h-10 rounded-md px-3 text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        active ? "bg-accent text-white shadow-soft" : "bg-white/90 text-text hover:-translate-y-0.5 hover:bg-accent-soft hover:text-accent",
        className,
      )}
      {...props}
    />
  );
}
