# Huis te huur in Gent

Een statische, mobile-first landingspagina voor de huurwoning aan Garensteeg 2, 9000 Gent. De pagina focust op duidelijke maandkosten, eerlijke praktische informatie, foto's, ligging, FAQ en een eenvoudige eerste contactstap.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui-geinspireerde lokale componenten
- lucide-react iconen
- GitHub Pages-ready static build

## Lokale ontwikkeling

```bash
npm install
npm run dev
npm run build
npm run preview
```

In deze Codex-omgeving is `pnpm` via de gebundelde runtime gebruikt, omdat de systeem-PATH geen moderne `npm` bevat.

Je kunt ook de lokale static demo starten met:

```bash
python launch_demo.py
```

## GitHub Pages

De GitHub Pages-workflow geeft de juiste basisroute automatisch door aan Vite. Voor een handmatige build op een custom domain of root deployment zet je:

```bash
VITE_BASE_PATH=/ npm run build
```

Voor een andere repo-naam gebruik je:

```bash
VITE_BASE_PATH=/jouw-repo-naam/ npm run build
```

De meegeleverde GitHub Actions workflow bouwt de site en publiceert `dist/` naar GitHub Pages.

## Content aanpassen

- Foto's: de site gebruikt geoptimaliseerde WebP-bestanden in `public/images/...`; update [src/data/photos.ts](./src/data/photos.ts) wanneer je bestandsnamen wijzigt. Grote originele JPG-bestanden zijn lokaal nuttig, maar worden via `.gitignore` uit de repo gehouden.
- Huur en maandkosten: update [src/data/costs.ts](./src/data/costs.ts).
- EPC en conformiteitsattest: plaats documenten in `public/documents/` en update [src/data/property.ts](./src/data/property.ts).
- Locatie, mobiliteit en buurtdata: update [src/data/location.ts](./src/data/location.ts).
- Kamers en oppervlaktes: update [src/data/rooms.ts](./src/data/rooms.ts).
- FAQ: update [src/data/faq.ts](./src/data/faq.ts).

## Contactformulier

GitHub Pages verwerkt zelf geen formulierinzendingen. De huidige eerste draft gebruikt een mailto-flow in [src/components/ContactSection.tsx](./src/components/ContactSection.tsx): Robbe ontvangt de e-mail rechtstreeks, Vandenbulcke E. staat in cc. Koppel later een externe formulierdienst zoals Formspree, Basin, Getform, Airtable of Google Forms als je inzendingen zonder mailprogramma wil verwerken.
