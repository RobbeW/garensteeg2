export const property = {
  title: "Huis te huur in Gent",
  subtitle: "Stadswoning vlakbij de Vrijdagsmarkt, met vaste huurprijs en duidelijke maandkosten.",
  address: {
    street: "Garensteeg 2",
    postalCode: "9000",
    city: "Gent",
    country: "België",
    display: "Garensteeg 2, 9000 Gent",
    publicDisplayPolicy: "Adres zichtbaar op vraag van de eigenaar.",
  },
  propertyType: "Woning",
  rentDisplay: "€995,78 / maand",
  indicativeTotalDisplay: "€1.224,25 / maand",
  availability: "Vanaf november 2026",
  bedrooms: "1 grote slaapkamer, 2 kleinere slaapkamers of werkruimtes",
  bathrooms: "Nog in te vullen",
  surfaceM2: "± 120 m²",
  outdoorSpace: "Koertje",
  furnished: "Nog in te vullen",
  pets: "Nog in te vullen",
  smoking: "Nog in te vullen",
  epc: {
    label: "EPC C",
    score: "Nog in te vullen",
    documentPath: "documents/epc.pdf",
  },
  conformityCertificate: {
    status: "Nog in te vullen",
    documentPath: "documents/conformiteitsattest.pdf",
  },
} as const;

export type Property = typeof property;
