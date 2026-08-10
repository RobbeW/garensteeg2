export type IconName =
  | "Train"
  | "TramFront"
  | "MapPin"
  | "GraduationCap"
  | "ShoppingBasket"
  | "Route"
  | "Utensils"
  | "Cross"
  | "Landmark";

export const location = {
  address: {
    street: "Garensteeg 2",
    postalCode: "9000",
    city: "Gent",
    country: "België",
    display: "Garensteeg 2, 9000 Gent",
  },
  intro:
    "Het pand ligt vlakbij de Vrijdagmarkt in het hart van Gent. Dagelijkse verplaatsingen kunnen makkelijk te voet, met de fiets of met het openbaar vervoer.",
  mobility: {
    scoreLabel: "Vlot bereikbaar",
    source: "Realo",
    sourceNote: "Buurtdata: Realo, geraadpleegd juli 2026.",
    description:
      "Station, bus- en tramhalte, winkels en het stadscentrum zijn makkelijk te voet bereikbaar vanaf de woning.",
    items: [
      { label: "Station", value: "Bereikbaar te voet", icon: "Train" },
      { label: "Bus- en tramhalte", value: "Bereikbaar te voet", icon: "TramFront" },
      { label: "Vrijdagmarkt", value: "Vlakbij", icon: "MapPin" },
      { label: "Scholen", value: "Bereikbaar te voet", icon: "GraduationCap" },
      { label: "Winkels", value: "Bereikbaar te voet", icon: "ShoppingBasket" },
      { label: "Snelwegaf- en oprit", value: "Op ongeveer 3,1 km", icon: "Route" },
    ] satisfies Array<{ label: string; value: string; icon: IconName }>,
  },
  amenities: {
    radius: "1 km",
    map: {
      center: [51.05788621725058, 3.7261153154529865] as [number, number],
      zoom: 15,
      radiusMeters: 1000,
    },
    source: "Realo-buurtdata",
    sourceNote: "Buurtdata: Realo, geraadpleegd juli 2026.",
    copy:
      "Op wandelafstand vind je veel dagelijkse voorzieningen, van winkels en bakkers tot restaurants, cafés, apotheken en banken.",
    groups: [
      {
        id: "groceries",
        label: "Boodschappen",
        totalCount: 53,
        icon: "ShoppingBasket",
        subcategories: [
          {
            label: "Supermarkten",
            count: 38,
            examples: [
              "Kasteelmarket",
              "Ludogorie",
              "Elena",
              "Okay",
              "Aliskan Market",
              "Nachtwinkel",
              "Night shop",
              "The Waffle Factory",
              "Proxy Delhaize",
            ],
          },
          {
            label: "Bakkers",
            count: 10,
            examples: [
              "Panda",
              "Hawin",
              "Kultur Bakery",
              "Paul",
              "Merkez",
              "Van Hecke",
              "Aernoudt",
              "Himschoot",
              "Martens",
              "Jacques en Patrich Dutilleul",
            ],
          },
          {
            label: "Slagers",
            count: 5,
            examples: ["Zwaenepoel", "Akkoyun", "Aile Kasabi", "Al Baraka", "Slagerij Aula"],
          },
        ],
      },
      {
        id: "food_drinks",
        label: "Restaurants en cafés",
        totalCount: 421,
        icon: "Utensils",
        subcategories: [
          {
            label: "Restaurants",
            count: 263,
            examples: [
              "Little Asia",
              "Diamond Pitta",
              "O'yo",
              "Taste of India",
              "Aroma Steakhouse",
              "Gigi",
              "Cassis",
              "Brasserie Passion",
              "Pittoresk",
            ],
          },
          {
            label: "Cafés",
            count: 158,
            examples: [
              "Publika",
              "Collin",
              "dragòn",
              "Montraparnasse",
              "Gitane",
              "Yara café",
              "Tante Paula",
              "K27",
              "'t Vrijdagsgevoel",
              "Zénon",
            ],
          },
        ],
      },
      {
        id: "medical",
        label: "Medisch",
        totalCount: 17,
        icon: "Cross",
        subcategories: [
          {
            label: "Apotheken",
            count: 17,
            examples: [
              "Van Gansbeke",
              "Apotheek Reep",
              "Apotheek Cattebeke",
              "Apotheek Roos",
              "Erika Lox",
              "Kruidvat",
              "Sebastien De Maertelaere",
              "Sluizeken",
              "Tolhuis",
              "Apotheek Nys",
            ],
          },
        ],
      },
      {
        id: "financial",
        label: "Financieel",
        totalCount: 7,
        icon: "Landmark",
        subcategories: [
          {
            label: "Banken",
            count: 7,
            examples: ["vdk bank", "Europabank", "vdk", "KBC", "Crelan", "Vahodi", "Western Union"],
          },
        ],
      },
    ] satisfies Array<{
      id: string;
      label: string;
      totalCount: number;
      icon: IconName;
      subcategories: Array<{ label: string; count: number; examples: string[] }>;
    }>,
  },
} as const;
