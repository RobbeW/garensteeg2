import { Home } from "lucide-react";
import { propertyDescription } from "../data/practical";
import { SectionHeader } from "./SectionHeader";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Reveal } from "./ui/reveal";

export function PropertyDescription() {
  return (
    <section id="woning" className="section-band bg-background">
      <div className="section-shell">
        <SectionHeader title="De woning" />
        <Reveal>
          <Card className="interactive-card">
            <CardContent className="pt-5">
              <Badge variant="success" className="mb-4">
                <Home className="h-3.5 w-3.5" aria-hidden="true" />
                Stadswoning
              </Badge>
              <p className="max-w-4xl text-lg leading-8 text-text">{propertyDescription}</p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
