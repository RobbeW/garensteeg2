import { createElement, useEffect, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type RevealElement = "div" | "article" | "section" | "figure" | "li";
type RevealDirection = "up" | "left" | "right" | "none";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealElement;
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  once?: boolean;
};

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return createElement(
    as,
    {
      ref,
      className: cn("reveal", `reveal-${direction}`, isVisible && "reveal-visible", className),
      style: { ...style, "--reveal-delay": `${delay}ms` } as CSSProperties,
      ...props,
    },
    children,
  );
}
