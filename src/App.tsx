import { ContactSection } from "./components/ContactSection";
import { CostsSection } from "./components/CostsSection";
import { FactsGrid } from "./components/FactsGrid";
import { FaqSection } from "./components/FaqSection";
import { HeroSection } from "./components/HeroSection";
import { LocationSection } from "./components/LocationSection";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { PhotoGallery } from "./components/PhotoGallery";
import { PreReleaseGate } from "./components/PreReleaseGate";
import { PracticalInfo } from "./components/PracticalInfo";
import { PropertyDescription } from "./components/PropertyDescription";
import { RoomCards } from "./components/RoomCards";
import { StickyNavigation } from "./components/StickyNavigation";
import { property } from "./data/property";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: property.title,
  description: property.subtitle,
  address: {
    "@type": "PostalAddress",
    streetAddress: property.address.street,
    postalCode: property.address.postalCode,
    addressLocality: property.address.city,
    addressCountry: "BE",
  },
};

function PropertyPage() {
  return (
    <>
      <StickyNavigation />
      <main>
        <HeroSection />
        <FactsGrid />
        <PropertyDescription />
        <PhotoGallery />
        <CostsSection />
        <RoomCards />
        <LocationSection />
        <PracticalInfo />
        <FaqSection />
        <ContactSection />
      </main>
      <MobileBottomBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}

export default function App() {
  return (
    <PreReleaseGate>
      <PropertyPage />
    </PreReleaseGate>
  );
}
