import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white shadow-soft hover:bg-ink focus-visible:ring-accent",
  secondary: "bg-accent-soft text-accent hover:bg-[#c7e1d5] focus-visible:ring-accent",
  outline: "border border-border bg-white/80 text-text hover:border-accent hover:bg-white hover:text-accent focus-visible:ring-accent",
  ghost: "text-accent hover:bg-accent-soft focus-visible:ring-accent",
  glass: "border border-white/35 bg-white/10 text-white hover:border-white hover:bg-white hover:text-ink focus-visible:ring-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-3 text-sm",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 disabled:hover:translate-y-0",
    variants[variant],
    sizes[size],
    className,
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={buttonClasses({ variant, size, className })} {...props} />
  ),
);

Button.displayName = "Button";

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => (
    <a ref={ref} className={buttonClasses({ variant, size, className })} {...props} />
  ),
);

ButtonLink.displayName = "ButtonLink";
