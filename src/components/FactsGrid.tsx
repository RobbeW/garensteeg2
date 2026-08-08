import { BedDouble, Bus, CalendarDays, Euro, Home, MapPin, Route, Ruler, ShieldCheck, ShoppingBasket, Train } from "lucide-react";
import { costs } from "../data/costs";
import { property } from "../data/property";
import { MonthlyCostInfo } from "./MonthlyCostInfo";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./ui/reveal";

const facts = [
  { label: "Type", value: property.propertyType, icon: Home },
  { label: "Adres", value: property.address.display, icon: MapPin },
  { label: "Oppervlakte", value: property.surfaceM2, icon: Ruler },
  { label: "Huurprijs", value: costs.rent.display, icon: Euro },
  { label: "Maandkost totaal", value: costs.totals.totalIncludingRent.display, icon: Euro },
  { label: "Ligging", value: "Vlakbij Vrijdagsmarkt", icon: Route },
  { label: "Station", value: "Te voet bereikbaar", icon: Train },
  { label: "Bushalte", value: "Te voet bereikbaar", icon: Bus },
  { label: "Vrijdagsmarkt", value: "Vlakbij", icon: MapPin },
  { label: "Winkels", value: "Te voet bereikbaar", icon: ShoppingBasket },
  { label: "Snelwegafrit", value: "Op ongeveer 3,1 km", icon: Route },
  { label: "EPC", value: property.epc.label, icon: ShieldCheck },
  { label: "Beschikbaar vanaf", value: property.availability, icon: CalendarDays },
  { label: "Aantal slaapkamers", value: property.bedrooms, icon: BedDouble },
  { label: "Buitenruimte", value: property.outdoorSpace, icon: Home },
];

export function FactsGrid() {
  return (
    <section id="overzicht" className="section-band section-band-muted pt-4 sm:pt-20 lg:pt-24">
      <div className="section-shell">
        <SectionHeader title="In het kort" />
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <Reveal key={fact.label} delay={index * 45}>
                <div className="interactive-card h-full rounded-lg border border-border/90 bg-surface/95 p-4">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-text-muted">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span>{fact.label}</span>
                    {fact.label === "Maandkost totaal" ? <MonthlyCostInfo /> : null}
                  </dt>
                  <dd className="mt-2 min-h-12 text-base font-semibold leading-6 text-text">{fact.value}</dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
