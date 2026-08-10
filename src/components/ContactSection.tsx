import type { FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { property } from "../data/property";
import { SectionHeader } from "./SectionHeader";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Reveal } from "./ui/reveal";
import { Textarea } from "./ui/textarea";

const TENANT_EMAIL = "robbe.wulgaert@gmail.com";
const LANDLORD_EMAIL = "els.vandenbulcke@telenet.be";
const recipients = [
  { label: "Huidige huurders", name: "Hanne & Robbe" },
  { label: "Huiseigenaar", name: "Els Vandenbulcke" },
];

function fieldValue(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export function ContactSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const lines = [
      `Naam: ${fieldValue(formData, "name")}`,
      `E-mail: ${fieldValue(formData, "email")}`,
      `Telefoon: ${fieldValue(formData, "phone") || "Niet ingevuld"}`,
      "",
      "Voorkeurmomenten voor bezoek:",
      fieldValue(formData, "preferred_visit_moments") || "Niet ingevuld",
      "",
      "Bericht:",
      fieldValue(formData, "message") || "Niet ingevuld",
    ];

    const subject = encodeURIComponent(`Vraag of bezoekaanvraag: ${property.address.display}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${TENANT_EMAIL}?cc=${encodeURIComponent(LANDLORD_EMAIL)}&subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="section-band section-band-muted pb-28 md:pb-20">
      <div className="section-shell">
        <SectionHeader
          title="Contact"
          description="Stel een vraag of vraag een bezoek aan. Je bericht opent als e-mail naar de huidige huurders, met huiseigenaar Els Vandenbulcke in cc."
        />
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="left">
            <Card className="interactive-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
                  Stel een vraag of vraag een bezoek aan
                </CardTitle>
                <CardDescription>Vermeld gerust je vraag of wanneer je kan langskomen.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-text-muted">
                  Je gegevens worden enkel gebruikt om je vraag over deze woning te beantwoorden. Het bericht wordt niet op de website opgeslagen.
                </p>
                <p className="mt-4 text-sm font-semibold text-text">Adres: {property.address.display}</p>
                <div className="mt-4 space-y-2">
                  {recipients.map((recipient) => (
                    <p key={recipient.label} className="text-sm leading-6 text-text-muted">
                      <span className="font-semibold text-text">{recipient.label}:</span> {recipient.name}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal direction="right" delay={80}>
            <Card>
              <CardHeader>
                <CardTitle>Je gegevens</CardTitle>
                <CardDescription>Het formulier opent je mailprogramma met je ingevulde gegevens.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Naam *</Label>
                    <Input id="name" name="name" type="text" autoComplete="name" required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mailadres *</Label>
                      <Input id="email" name="email" type="email" autoComplete="email" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefoonnummer</Label>
                      <Input id="phone" name="phone" type="tel" autoComplete="tel" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="preferred_visit_moments">Voorkeurmomenten voor bezoek</Label>
                    <Textarea id="preferred_visit_moments" name="preferred_visit_moments" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Bericht</Label>
                    <Textarea id="message" name="message" />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-fit">
                    <Send className="h-5 w-5" aria-hidden="true" />
                    Verstuur via e-mail
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
