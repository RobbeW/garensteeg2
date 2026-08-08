import { faq } from "../data/faq";
import { SectionHeader } from "./SectionHeader";
import { AccordionItem } from "./ui/accordion";
import { Reveal } from "./ui/reveal";

export function FaqSection() {
  return (
    <section id="faq" className="section-band bg-background">
      <div className="section-shell">
        <SectionHeader title="Veelgestelde vragen" description="Antwoorden op de vragen die meestal eerst opkomen bij een bezoekaanvraag." />
        <div className="space-y-3">
          {faq.map((item, index) => (
            <Reveal key={item.question} delay={index * 45}>
              <AccordionItem className="interactive-card" title={item.question} defaultOpen={index === 0}>
                {item.answer}
              </AccordionItem>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
