export type CostItem = {
  id: string;
  label: string;
  provider: string | null;
  amount: number;
  display: string;
  cadence: "monthly" | "monthly_equivalent";
  type: "contractual" | "indicative_current_cost";
  badge: "vast" | "indicatief";
  note: string;
  originalDisplay?: string;
};

export const costs = {
  currency: "EUR",
  locale: "nl-BE",
  rent: {
    id: "rent",
    label: "Huurprijs",
    provider: null,
    amount: 995.78,
    display: "€995,78 / maand",
    cadence: "monthly",
    type: "contractual",
    badge: "vast",
    note: "Vaste maandelijkse huurprijs.",
  } satisfies CostItem,
  recurringCosts: [
    {
      id: "internet",
      label: "Fiberinternet",
      provider: "Mobile Vikings",
      amount: 37.0,
      display: "€37,00 / maand",
      cadence: "monthly",
      type: "indicative_current_cost",
      badge: "indicatief",
      note: "Huidige maandkost voor fiberinternet.",
    },
    {
      id: "insurance",
      label: "Woningverzekering",
      provider: "AXA",
      amount: 33.38,
      display: "€33,38 / maand",
      cadence: "monthly",
      type: "indicative_current_cost",
      badge: "indicatief",
      note: "Huidige maandkost voor woningverzekering. Formule en dekking kunnen verschillen per huurder.",
    },
    {
      id: "water",
      label: "Water",
      provider: "FARYS",
      amount: 40.67,
      display: "ongeveer €40,67 / maand",
      cadence: "monthly_equivalent",
      type: "indicative_current_cost",
      badge: "indicatief",
      originalDisplay: "€122,00 per 3 maanden",
      note: "Omgerekend naar een gemiddelde maandkost.",
    },
    {
      id: "gas_electricity",
      label: "Gas en elektriciteit",
      provider: "ENECO",
      amount: 117.42,
      display: "€117,42 / maand",
      cadence: "monthly",
      type: "indicative_current_cost",
      badge: "indicatief",
      note: "Huidige maandkost voor gas en elektriciteit.",
    },
  ] satisfies CostItem[],
  totals: {
    recurringCostsExcludingRent: {
      amount: 228.47,
      display: "€228,47 / maand",
      calculation: "37.00 + 33.38 + 40.67 + 117.42",
    },
    totalIncludingRent: {
      amount: 1224.25,
      display: "€1.224,25 / maand",
      calculation: "995.78 + 228.47",
    },
  },
  copy: {
    intro:
      "Hier zie je de vaste huurprijs en de huidige gekende maandkosten naast elkaar.",
    disclaimer:
      "Internet, verzekering, water, gas en elektriciteit vertrekken van de huidige situatie en het huidige verbruik. Je eigen kosten kunnen verschillen door verbruik, leverancier, contractformule en prijswijzigingen.",
    totalNote:
      "Samen komt dit vandaag neer op ongeveer €1.224,25 per maand, inclusief huur en de hierboven vermelde kosten.",
  },
} as const;
