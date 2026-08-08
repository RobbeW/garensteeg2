import { ArrowRight, CalendarDays, Euro, MapPin } from "lucide-react";
import { costs } from "../data/costs";
import { heroPhoto } from "../data/photos";
import { property } from "../data/property";
import { assetPath } from "../lib/utils";
import { ButtonLink } from "./ui/button";
import { MonthlyCostInfo } from "./MonthlyCostInfo";
import { Reveal } from "./ui/reveal";

const heroFacts = [
  { label: "Huurprijs", value: costs.rent.display, icon: Euro },
  { label: "Maandkost totaal", value: costs.totals.totalIncludingRent.display, icon: Euro },
  { label: "Adres", value: property.address.display, icon: MapPin },
  { label: "Beschikbaar vanaf", value: property.availability, icon: CalendarDays },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-ink text-white">
      <img
        src={assetPath(heroPhoto.src)}
        alt={heroPhoto.alt}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        width={1400}
        height={980}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(23,38,34,0.92),rgba(23,38,34,0.58)_52%,rgba(23,38,34,0.14))]" />
      <div className="section-shell flex min-h-[78svh] flex-col justify-end pb-24 pt-14 sm:py-16 lg:py-20">
        <Reveal className="max-w-3xl" direction="left">
          <h1 className="text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">{property.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
            Stadswoning aan {property.address.display}, vlakbij de Vrijdagsmarkt in het hart van Gent.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" size="lg">
              Vraag een bezoek aan
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#kosten" variant="glass" size="lg">
              Bekijk de maandkosten
            </ButtonLink>
          </div>
        </Reveal>

        <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {heroFacts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <Reveal key={fact.label} delay={120 + index * 70}>
                <div className="h-full rounded-lg border border-white/20 bg-white/10 p-3 text-white shadow-soft backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 sm:p-4">
                  <dt className="flex items-center gap-2 text-xs font-semibold text-white/75 sm:text-sm">
                    <Icon className="h-4 w-4 text-accent-soft" aria-hidden="true" />
                    <span>{fact.label}</span>
                    {fact.label === "Maandkost totaal" ? <MonthlyCostInfo variant="inverse" /> : null}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-6 text-white sm:text-base">{fact.value}</dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
