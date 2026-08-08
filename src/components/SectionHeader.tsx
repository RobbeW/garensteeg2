import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Reveal } from "./ui/reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-8 max-w-3xl", className)}>
      {eyebrow ? <p className="mb-2 text-sm font-semibold text-accent">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold text-text sm:text-4xl">{title}</h2>
      {description ? <div className="mt-3 text-base leading-7 text-text-muted">{description}</div> : null}
    </Reveal>
  );
}
