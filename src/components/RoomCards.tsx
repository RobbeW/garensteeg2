import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Photo } from "../data/photos";
import { photoGroups } from "../data/photos";
import { rooms } from "../data/rooms";
import { assetPath } from "../lib/utils";
import { SectionHeader } from "./SectionHeader";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Reveal } from "./ui/reveal";

type RoomGallery = {
  photos: Photo[];
  activeIndex: number;
  title: string;
};

function roomPhotos(room: (typeof rooms)[number]) {
  return photoGroups.find((photoGroup) => photoGroup.id === room.imageGroup)?.photos ?? [];
}

function roomPreviewPhoto(room: (typeof rooms)[number]) {
  const photos = roomPhotos(room);
  return photos.find((photo) => photo.id === room.imageId) ?? photos[0];
}

export function RoomCards() {
  const [gallery, setGallery] = useState<RoomGallery | null>(null);
  const activePhoto = gallery?.photos[gallery.activeIndex];

  useEffect(() => {
    if (!gallery) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setGallery(null);
      }
      if (event.key === "ArrowLeft") {
        previousPhoto();
      }
      if (event.key === "ArrowRight") {
        nextPhoto();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [gallery]);

  function openGallery(room: (typeof rooms)[number]) {
    const photos = roomPhotos(room);
    const activeIndex = Math.max(
      0,
      photos.findIndex((photo) => photo.id === room.imageId),
    );

    if (photos.length) {
      setGallery({ photos, activeIndex, title: room.name });
    }
  }

  function previousPhoto() {
    setGallery((current) =>
      current ? { ...current, activeIndex: (current.activeIndex - 1 + current.photos.length) % current.photos.length } : current,
    );
  }

  function nextPhoto() {
    setGallery((current) => (current ? { ...current, activeIndex: (current.activeIndex + 1) % current.photos.length } : current));
  }

  return (
    <section id="kamers" className="section-band section-band-muted">
      <div className="section-shell">
        <SectionHeader
          title="Kamers"
          description="Een grote slaapkamer, twee kleinere kamers of werkruimtes, de leefruimtes en het koertje."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => {
            const image = roomPreviewPhoto(room);
            return (
              <Reveal key={room.id} delay={index * 55}>
                <Card className="group interactive-card h-full overflow-hidden">
                  {image ? (
                    <button
                      type="button"
                      className="group/image block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      onClick={() => openGallery(room)}
                      aria-label={`Open foto's van ${room.name}`}
                    >
                      <span className="relative block overflow-hidden">
                        <img src={assetPath(image.src)} alt={image.alt} className="image-lift aspect-[4/3] w-full object-cover" loading="lazy" />
                        <span className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-surface/95 text-accent shadow-sm transition-transform duration-300 group-hover/image:scale-105">
                          <Maximize2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </span>
                    </button>
                  ) : null}
                  <CardHeader>
                    <CardTitle>{room.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>

      {gallery && activePhoto ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={gallery.title}>
          <div className="relative w-full max-w-5xl rounded-lg bg-surface p-3 shadow-soft animate-[photoModal_260ms_cubic-bezier(0.22,1,0.36,1)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-text-muted">
                {gallery.activeIndex + 1} / {gallery.photos.length}
              </p>
              <Button variant="ghost" size="icon" onClick={() => setGallery(null)} aria-label="Sluit foto's">
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <div className="relative">
              <img src={assetPath(activePhoto.src)} alt={activePhoto.alt} className="max-h-[72vh] w-full rounded-md object-contain" />
              {gallery.photos.length > 1 ? (
                <>
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
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
