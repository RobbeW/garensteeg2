import { Euro } from "lucide-react";
import { costs } from "../data/costs";
import { MonthlyCostInfo } from "./MonthlyCostInfo";
import { SectionHeader } from "./SectionHeader";
import { Alert } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Reveal } from "./ui/reveal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

function CostBadge({ value }: { value: "vast" | "indicatief" }) {
  return <Badge variant={value === "vast" ? "success" : "warning"}>{value}</Badge>;
}

export function CostsSection() {
  return (
    <section id="kosten" className="section-band section-band-muted">
      <div className="section-shell">
        <SectionHeader title="Kosten" description={costs.copy.intro} />
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="left">
            <Card className="interactive-card h-full bg-accent text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Euro className="h-5 w-5" aria-hidden="true" />
                  {costs.rent.label}
                </CardTitle>
                <CardDescription className="text-white/80">{costs.rent.note}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-semibold">{costs.rent.display}</p>
                <div className="mt-4">
                  <CostBadge value={costs.rent.badge} />
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal direction="right" delay={80}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Huidige maandkosten</CardTitle>
                <CardDescription>Kosten naast de huurprijs, gebaseerd op de huidige gekende situatie.</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="divide-y divide-border overflow-hidden rounded-lg border border-border md:hidden">
                  {costs.recurringCosts.map((item) => (
                    <div key={item.id} className="px-4 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <dt>
                          <p className="font-semibold text-text">{item.label}</p>
                          <p className="mt-1 text-sm text-text-muted">{item.provider ? `via ${item.provider}` : "Niet van toepassing"}</p>
                        </dt>
                        <dd className="flex-none text-right font-semibold leading-6 text-text">{item.display}</dd>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-text-muted">
                        {item.originalDisplay ? `${item.originalDisplay}. ` : ""}
                        {item.note}
                      </p>
                    </div>
                  ))}
                </dl>

                <div className="hidden overflow-x-auto rounded-lg border border-border md:block">
                  <Table className="min-w-[560px]">
                    <TableHeader>
                      <TableRow className="bg-surface-muted">
                        <TableHead>Kost</TableHead>
                        <TableHead>Leverancier</TableHead>
                        <TableHead>Bedrag</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {costs.recurringCosts.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <p className="font-semibold text-text">{item.label}</p>
                            <p className="mt-1 text-sm leading-6 text-text-muted">
                              {item.originalDisplay ? `${item.originalDisplay}. ` : ""}
                              {item.note}
                            </p>
                          </TableCell>
                          <TableCell>{item.provider ? `via ${item.provider}` : "Niet van toepassing"}</TableCell>
                          <TableCell className="font-semibold text-text">{item.display}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Reveal delay={80}>
            <Card className="interactive-card h-full">
              <CardHeader>
                <CardTitle>Kosten zonder huur</CardTitle>
                <CardDescription>Internet, verzekering, water, gas en elektriciteit samen.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-text">{costs.totals.recurringCostsExcludingRent.display}</p>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={150}>
            <Card className="interactive-card h-full border-accent bg-accent-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Euro className="h-5 w-5" aria-hidden="true" />
                  <span>Maandkost totaal</span>
                  <MonthlyCostInfo />
                </CardTitle>
                <CardDescription>{costs.copy.totalNote}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-text">{costs.totals.totalIncludingRent.display}</p>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <Alert className="mt-5">
            <p>{costs.copy.disclaimer}</p>
          </Alert>
        </Reveal>
      </div>
    </section>
  );
}
