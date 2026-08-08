import { useId } from "react";
import { cn } from "../lib/utils";

type MonthlyCostInfoProps = {
  variant?: "default" | "inverse";
};

export function MonthlyCostInfo({ variant = "default" }: MonthlyCostInfoProps) {
  const tooltipId = useId();

  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-describedby={tooltipId}
        aria-label="Wat is inbegrepen in de totale maandkost?"
        className={cn(
          "focus-ring inline-flex h-4 w-4 items-center justify-center rounded-full border text-[11px] font-bold leading-none transition-colors",
          variant === "inverse"
            ? "border-white/55 text-white hover:border-white hover:bg-white/15"
            : "border-accent/55 text-accent hover:border-accent hover:bg-accent-soft",
        )}
      >
        ?
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-20 max-h-[calc(100svh-2rem)] overflow-y-auto rounded-md bg-ink px-3 py-2 text-left text-xs font-normal leading-5 text-white opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 sm:absolute sm:inset-x-auto sm:bottom-full sm:left-1/2 sm:mb-2 sm:w-72 sm:-translate-x-1/2"
      >
        Dit is een schatting op basis van de huidige kosten, contracten en leveranciers. Inclusief huurprijs, internet, verzekering, water, gas en elektriciteit. Bedragen kunnen wijzigen.
      </span>
    </span>
  );
}
