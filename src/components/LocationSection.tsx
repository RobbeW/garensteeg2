import {
  Bus,
  GraduationCap,
  HeartPulse,
  Landmark,
  MapPin,
  Route,
  ShoppingBasket,
  Train,
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconName } from "../data/location";
import { location } from "../data/location";
import { AmenitiesMap } from "./AmenitiesMap";
import { SectionHeader } from "./SectionHeader";
import { SourceNote } from "./SourceNote";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Reveal } from "./ui/reveal";

const iconMap = {
  Train,
  Bus,
  MapPin,
  GraduationCap,
  ShoppingBasket,
  Route,
  Utensils,
  Cross: HeartPulse,
  Landmark,
} satisfies Record<IconName, LucideIcon>;

export function LocationSection() {
  return (
    <section id="locatie" className="section-band bg-background">
      <div className="section-shell">
        <SectionHeader title="Locatie en mobiliteit" description={location.intro} />

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="left">
            <Card className="interactive-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
                  Adres
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-text">{location.address.display}</p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal direction="right" delay={80}>
            <Card className="interactive-card h-full border-accent bg-accent-soft">
              <CardHeader>
                <CardTitle className="text-accent">{location.mobility.scoreLabel}</CardTitle>
                <CardDescription>{location.mobility.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <SourceNote>{location.mobility.sourceNote}</SourceNote>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {location.mobility.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.label} delay={index * 45}>
                <div className="interactive-card h-full rounded-lg border border-border bg-surface/95 p-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-text">{item.label}</p>
                      <p className="mt-1 text-sm text-text-muted">{item.value}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8">
          <SectionHeader
            title={`Voorzieningen binnen ${location.amenities.radius}`}
            description="Verken de buurt op de kaart en zet de categorieën aan of uit."
            className="mb-5"
          />
          <Reveal>
            <AmenitiesMap />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
