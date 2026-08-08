export type Room = {
  id: string;
  name: string;
  floor: string;
  description: string;
  approximateSize: string;
  suitableFor: string;
  imageGroup: string;
  imageId?: string;
  notes: string[];
};

export const rooms: Room[] = [
  {
    id: "living",
    name: "Woonkamer",
    floor: "Nog in te vullen",
    description: "Leefruimte van de stadswoning.",
    approximateSize: "Nog in te vullen",
    suitableFor: "Nog in te vullen",
    imageGroup: "living",
    notes: [],
  },
  {
    id: "kitchen",
    name: "Keuken",
    floor: "Nog in te vullen",
    description: "Keukenruimte van de stadswoning.",
    approximateSize: "Nog in te vullen",
    suitableFor: "Nog in te vullen",
    imageGroup: "kitchen",
    notes: [],
  },
  {
    id: "bedroom_1",
    name: "Grote slaapkamer",
    floor: "Nog in te vullen",
    description: "Grote slaapkamer. Verdere afmetingen en verdieping worden nog aangevuld.",
    approximateSize: "Nog in te vullen",
    suitableFor: "Slaapkamer",
    imageGroup: "bedrooms",
    imageId: "bedrooms-02",
    notes: [],
  },
  {
    id: "bedroom_2",
    name: "Kleinere slaapkamer / werkruimte 1",
    floor: "Nog in te vullen",
    description: "Kleinere kamer die als slaapkamer of werkruimte kan worden gebruikt.",
    approximateSize: "Nog in te vullen",
    suitableFor: "Slaapkamer of werkruimte",
    imageGroup: "bedrooms",
    imageId: "bedrooms-06",
    notes: [],
  },
  {
    id: "bedroom_3",
    name: "Kleinere slaapkamer / werkruimte 2",
    floor: "Nog in te vullen",
    description: "Tweede kleinere kamer die als slaapkamer of werkruimte kan worden gebruikt.",
    approximateSize: "Nog in te vullen",
    suitableFor: "Slaapkamer of werkruimte",
    imageGroup: "bedrooms",
    imageId: "bedrooms-09",
    notes: [],
  },
  {
    id: "bathroom",
    name: "Badkamer",
    floor: "Nog in te vullen",
    description: "Badkamer van de stadswoning.",
    approximateSize: "Nog in te vullen",
    suitableFor: "Nog in te vullen",
    imageGroup: "bathroom",
    notes: [],
  },
  {
    id: "outside",
    name: "Koertje",
    floor: "Nog in te vullen",
    description: "Kleine buitenruimte in de vorm van een koertje.",
    approximateSize: "Nog in te vullen",
    suitableFor: "Buiten zitten of praktische buitenruimte",
    imageGroup: "outside",
    notes: [],
  },
];
