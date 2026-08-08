import { CalendarDays, ClipboardList, FileText, Home, PawPrint, Ruler, ShieldCheck, Sofa, UserCheck } from "lucide-react";
import { practicalItems } from "../data/practical";
import { SectionHeader } from "./SectionHeader";
import { Card, CardContent } from "./ui/card";
import { Reveal } from "./ui/reveal";

const icons = [CalendarDays, ShieldCheck, FileText, Ruler, PawPrint, UserCheck, Sofa, CalendarDays, ClipboardList, Home];
const visibleItems = practicalItems
  .map((item, index) => ({ item, Icon: icons[index] }))
  .filter(({ item }) => item.value !== "Nog in te vullen");

export function PracticalInfo() {
  return (
    <section id="praktisch" className="section-band section-band-muted">
      <div className="section-shell">
        <SectionHeader title="Praktisch" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map(({ item, Icon }, index) => {
            return (
              <Reveal key={item.label} delay={index * 45}>
                <Card className="interactive-card h-full">
                  <CardContent className="flex gap-3 pt-5">
                    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-text">{item.label}</p>
                      <p className="mt-1 text-sm leading-6 text-text-muted">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
