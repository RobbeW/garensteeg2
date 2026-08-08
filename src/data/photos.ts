export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

export type PhotoGroup = {
  id: "hero" | "living" | "kitchen" | "bedrooms" | "bathroom" | "outside" | "details";
  label: string;
  folder: string;
  photos: Photo[];
};

export const photoGroups: PhotoGroup[] = [
  {
    id: "hero",
    label: "Hoofdfoto",
    folder: "images/hero/",
    photos: [
      {
        id: "hero-01",
        src: "images/hero/DSC07321.webp",
        alt: "Hoofdfoto van de woning aan Garensteeg 2 in Gent",
        caption: "Voorzijde van de woning",
      },
    ],
  },
  {
    id: "living",
    label: "Woonkamer",
    folder: "images/living/",
    photos: [
      { id: "living-01", src: "images/living/DSC07308.webp", alt: "Foto van de woonkamer", caption: "Woonkamer" },
      { id: "living-02", src: "images/living/DSC07309.webp", alt: "Tweede foto van de woonkamer", caption: "Woonkamer" },
      { id: "living-03", src: "images/living/DSC07310.webp", alt: "Derde foto van de woonkamer", caption: "Woonkamer" },
      { id: "living-04", src: "images/living/DSC07311.webp", alt: "Vierde foto van de woonkamer", caption: "Woonkamer" },
      { id: "living-05", src: "images/living/DSC07320.webp", alt: "Extra foto van de leefruimte", caption: "Leefruimte" },
    ],
  },
  {
    id: "kitchen",
    label: "Keuken",
    folder: "images/kitchen/",
    photos: [
      { id: "kitchen-01", src: "images/kitchen/DSC07312.webp", alt: "Foto van de keuken", caption: "Keuken" },
      { id: "kitchen-02", src: "images/kitchen/DSC07313.webp", alt: "Tweede foto van de keuken", caption: "Keuken" },
      { id: "kitchen-03", src: "images/kitchen/DSC07314.webp", alt: "Derde foto van de keuken", caption: "Keuken" },
      { id: "kitchen-04", src: "images/kitchen/DSC07315.webp", alt: "Vierde foto van de keuken", caption: "Keuken" },
    ],
  },
  {
    id: "bedrooms",
    label: "Slaapkamers",
    folder: "images/bedrooms/",
    photos: [
      { id: "bedrooms-01", src: "images/bedrooms/DSC07292.webp", alt: "Foto van een slaapkamer", caption: "Slaapkamer" },
      { id: "bedrooms-02", src: "images/bedrooms/DSC07293.webp", alt: "Tweede foto van een slaapkamer", caption: "Slaapkamer" },
      { id: "bedrooms-03", src: "images/bedrooms/DSC07294.webp", alt: "Derde foto van een slaapkamer", caption: "Slaapkamer" },
      { id: "bedrooms-04", src: "images/bedrooms/DSC07295.webp", alt: "Vierde foto van een slaapkamer", caption: "Slaapkamer" },
      { id: "bedrooms-05", src: "images/bedrooms/DSC07296.webp", alt: "Vijfde foto van een slaapkamer", caption: "Slaapkamer" },
      { id: "bedrooms-06", src: "images/bedrooms/DSC07297.webp", alt: "Zesde foto van een slaapkamer", caption: "Slaapkamer" },
      { id: "bedrooms-07", src: "images/bedrooms/DSC07298.webp", alt: "Zevende foto van een slaapkamer", caption: "Slaapkamer" },
      { id: "bedrooms-08", src: "images/bedrooms/DSC07299.webp", alt: "Achtste foto van een slaapkamer", caption: "Slaapkamer" },
      { id: "bedrooms-09", src: "images/bedrooms/DSC07301.webp", alt: "Negende foto van een slaapkamer", caption: "Slaapkamer" },
      { id: "bedrooms-10", src: "images/bedrooms/DSC07303.webp", alt: "Tiende foto van een slaapkamer", caption: "Slaapkamer" },
    ],
  },
  {
    id: "bathroom",
    label: "Badkamer",
    folder: "images/bathroom/",
    photos: [
      { id: "bathroom-01", src: "images/bathroom/DSC07323.webp", alt: "Foto van de badkamer", caption: "Badkamer" },
      { id: "bathroom-02", src: "images/bathroom/DSC07324.webp", alt: "Tweede foto van de badkamer", caption: "Badkamer" },
      { id: "bathroom-03", src: "images/bathroom/DSC07325.webp", alt: "Derde foto van de badkamer", caption: "Badkamer" },
      { id: "bathroom-04", src: "images/bathroom/DSC07326.webp", alt: "Vierde foto van de badkamer", caption: "Badkamer" },
    ],
  },
  {
    id: "outside",
    label: "Buitenruimte",
    folder: "images/outside/",
    photos: [
      { id: "outside-01", src: "images/outside/DSC07316.webp", alt: "Foto van de buitenruimte", caption: "Buitenruimte" },
      { id: "outside-02", src: "images/outside/DSC07317.webp", alt: "Tweede foto van de buitenruimte", caption: "Buitenruimte" },
      { id: "outside-03", src: "images/outside/DSC07318.webp", alt: "Derde foto van de buitenruimte", caption: "Buitenruimte" },
      { id: "outside-04", src: "images/outside/DSC07319.webp", alt: "Vierde foto van de buitenruimte", caption: "Buitenruimte" },
      { id: "outside-05", src: "images/outside/DSC07321.webp", alt: "Foto van de voorzijde of buitenkant van de woning", caption: "Buitenkant" },
      { id: "outside-06", src: "images/outside/DSC07322.webp", alt: "Extra foto van de buitenruimte", caption: "Buitenruimte" },
    ],
  },
  {
    id: "details",
    label: "Details",
    folder: "images/details/",
    photos: [
      { id: "details-01", src: "images/details/DSC07304.webp", alt: "Detailfoto van de woning", caption: "Detail" },
      { id: "details-02", src: "images/details/DSC07305.webp", alt: "Tweede detailfoto van de woning", caption: "Detail" },
      { id: "details-03", src: "images/details/DSC07306.webp", alt: "Derde detailfoto van de woning", caption: "Detail" },
      { id: "details-04", src: "images/details/DSC07307.webp", alt: "Vierde detailfoto van de woning", caption: "Detail" },
    ],
  },
];

export const heroPhoto = photoGroups[0].photos[0];
