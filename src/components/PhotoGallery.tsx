import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { photoGroups } from "../data/photos";
import { assetPath } from "../lib/utils";
import { SectionHeader } from "./SectionHeader";
import { Button } from "./ui/button";
import { Reveal } from "./ui/reveal";

export function PhotoGallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const allPhotos = useMemo(() => photoGroups.flatMap((group) => group.photos), []);
  const coverPhoto = allPhotos[0];
  const activePhoto = activePhotoIndex === null ? null : allPhotos[activePhotoIndex];

  useEffect(() => {
    if (activePhotoIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePhotoIndex(null);
      }
      if (event.key === "ArrowLeft") {
        setActivePhotoIndex((current) => (current === null ? current : (current - 1 + allPhotos.length) % allPhotos.length));
      }
      if (event.key === "ArrowRight") {
        setActivePhotoIndex((current) => (current === null ? current : (current + 1) % allPhotos.length));
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePhotoIndex, allPhotos.length]);

  function openPhoto(photoId: string) {
    const index = allPhotos.findIndex((photo) => photo.id === photoId);
    setActivePhotoIndex(index >= 0 ? index : null);
  }

  function previousPhoto() {
    setActivePhotoIndex((current) => (current === null ? current : (current - 1 + allPhotos.length) % allPhotos.length));
  }

  function nextPhoto() {
    setActivePhotoIndex((current) => (current === null ? current : (current + 1) % allPhotos.length));
  }

  return (
    <section id="fotos" className="section-band bg-background">
      <div className="section-shell">
        <SectionHeader title="Foto's" />

        {coverPhoto ? (
          <Reveal className="sm:hidden">
            <button
              type="button"
              className="group block w-full overflow-hidden rounded-lg border border-border bg-surface text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setActivePhotoIndex(0)}
              aria-label="Open alle foto's"
            >
              <span className="relative block overflow-hidden">
                <img src={assetPath(coverPhoto.src)} alt={coverPhoto.alt} className="image-lift aspect-[4/3] w-full object-cover" loading="lazy" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <span className="text-sm font-semibold">{allPhotos.length} foto's</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/95 text-accent shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Maximize2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                </span>
              </span>
            </button>
          </Reveal>
        ) : null}

        <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {allPhotos.map((photo, index) => (
            <Reveal key={photo.id} as="article" delay={index * 55} className="interactive-card overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
              <button
                type="button"
                className="group block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => openPhoto(photo.id)}
              >
                <span className="relative block overflow-hidden">
                  <img
                    src={assetPath(photo.src)}
                    alt={photo.alt}
                    className="image-lift aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-surface/95 text-accent shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Maximize2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activePhoto ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={activePhoto.caption}>
          <div className="relative w-full max-w-5xl rounded-lg bg-surface p-3 shadow-soft animate-[photoModal_260ms_cubic-bezier(0.22,1,0.36,1)]">
            <div className="mb-3 flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => setActivePhotoIndex(null)} aria-label="Sluit foto">
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <div className="relative">
              <img src={assetPath(activePhoto.src)} alt={activePhoto.alt} className="max-h-[72vh] w-full rounded-md object-contain" />
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-3 top-1/2 -translate-y-1/2"
                onClick={previousPhoto}
                aria-label="Vorige foto"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={nextPhoto}
                aria-label="Volgende foto"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
