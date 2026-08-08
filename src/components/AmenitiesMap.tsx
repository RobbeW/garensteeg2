import { useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import { HeartPulse, Landmark, ShoppingBasket, Utensils } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { location } from "../data/location";
import { cn } from "../lib/utils";

import "leaflet/dist/leaflet.css";

type AmenityGroup = (typeof location.amenities.groups)[number];
type AmenityGroupId = AmenityGroup["id"];

type OverpassElement = {
  center?: { lat: number; lon: number };
  lat?: number;
  lon?: number;
  tags?: Record<string, string>;
};

const amenityStyles: Record<AmenityGroupId, { color: string; icon: LucideIcon }> = {
  groceries: { color: "#16856f", icon: ShoppingBasket },
  food_drinks: { color: "#c46635", icon: Utensils },
  medical: { color: "#ba3e62", icon: HeartPulse },
  financial: { color: "#496fb4", icon: Landmark },
};

const groupIds = location.amenities.groups.map((group) => group.id) as AmenityGroupId[];

function amenityGroupFor(tags: Record<string, string>): AmenityGroupId | undefined {
  if (["supermarket", "convenience", "bakery", "butcher"].includes(tags.shop ?? "")) {
    return "groceries";
  }

  if (["restaurant", "cafe"].includes(tags.amenity ?? "")) {
    return "food_drinks";
  }

  if (tags.amenity === "pharmacy") {
    return "medical";
  }

  if (["bank", "atm"].includes(tags.amenity ?? "")) {
    return "financial";
  }

  return undefined;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const replacements: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return replacements[character];
  });
}

export function AmenitiesMap() {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layerGroups = useRef<Partial<Record<AmenityGroupId, L.LayerGroup>>>({});
  const [activeGroups, setActiveGroups] = useState<AmenityGroupId[]>(groupIds);
  const [mapState, setMapState] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    if (mapElement.current === null || mapInstance.current !== null) {
      return;
    }

    const map = L.map(mapElement.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    }).setView(location.amenities.map.center, location.amenities.map.zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bijdragers',
      maxZoom: 19,
    }).addTo(map);

    L.circle(location.amenities.map.center, {
      color: "#16856f",
      fillColor: "#67bda2",
      fillOpacity: 0.1,
      radius: location.amenities.map.radiusMeters,
      weight: 1.5,
    }).addTo(map);

    L.marker(location.amenities.map.center, {
      icon: L.divIcon({
        className: "home-map-marker",
        html: '<span aria-hidden="true"></span>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    })
      .bindPopup("Garensteeg 2")
      .addTo(map);

    const groups = Object.fromEntries(
      groupIds.map((id) => [id, L.layerGroup().addTo(map)]),
    ) as Record<AmenityGroupId, L.LayerGroup>;

    layerGroups.current = groups;
    mapInstance.current = map;

    const controller = new AbortController();
    const [latitude, longitude] = location.amenities.map.center;
    const query = `[out:json][timeout:20];(
      nwr["shop"~"^(supermarket|convenience|bakery|butcher)$"](around:1000,${latitude},${longitude});
      nwr["amenity"~"^(restaurant|cafe|pharmacy|bank|atm)$"](around:1000,${latitude},${longitude});
    );out center tags;`;

    void fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("De kaartgegevens konden niet worden geladen.");
        }
        return response.json() as Promise<{ elements?: OverpassElement[] }>;
      })
      .then((data) => {
        data.elements?.forEach((element) => {
          if (element.tags === undefined) {
            return;
          }

          const groupId = amenityGroupFor(element.tags);
          const coordinates = element.center ?? (element.lat !== undefined && element.lon !== undefined ? { lat: element.lat, lon: element.lon } : undefined);

          if (groupId === undefined || coordinates === undefined) {
            return;
          }

          const layer = groups[groupId];
          const group = location.amenities.groups.find((item) => item.id === groupId);
          const marker = L.marker([coordinates.lat, coordinates.lon], {
            icon: L.divIcon({
              className: "amenity-map-marker",
              html: `<span style="--marker-color: ${amenityStyles[groupId].color}" aria-hidden="true"></span>`,
              iconSize: [18, 18],
              iconAnchor: [9, 9],
              popupAnchor: [0, -10],
            }),
          });
          const name = element.tags.name ?? group?.label ?? "Voorziening";

          marker.bindPopup(`<strong>${escapeHtml(name)}</strong><br>${escapeHtml(group?.label ?? "Voorziening")}`);
          marker.addTo(layer);
        });

        setMapState("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setMapState("unavailable");
      });

    return () => {
      controller.abort();
      map.remove();
      mapInstance.current = null;
      layerGroups.current = {};
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (map === null) {
      return;
    }

    groupIds.forEach((groupId) => {
      const layer = layerGroups.current[groupId];
      if (layer === undefined) {
        return;
      }

      if (activeGroups.includes(groupId)) {
        layer.addTo(map);
      } else {
        layer.removeFrom(map);
      }
    });
  }, [activeGroups]);

  function toggleGroup(groupId: AmenityGroupId) {
    setActiveGroups((currentGroups) =>
      currentGroups.includes(groupId)
        ? currentGroups.filter((currentGroup) => currentGroup !== groupId)
        : [...currentGroups, groupId],
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-soft">
      <div className="border-b border-border bg-white/85 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-text">Toon op de kaart</p>
            <p className="mt-1 text-sm text-text-muted">Klik op een categorie om de laag aan of uit te zetten.</p>
          </div>
          <p className="text-sm text-text-muted" aria-live="polite">
            {activeGroups.length === 0 ? "Geen categorieën zichtbaar" : `${activeGroups.length} van 4 categorieën zichtbaar`}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {location.amenities.groups.map((group) => {
            const Icon = amenityStyles[group.id].icon;
            const isActive = activeGroups.includes(group.id);

            return (
              <button
                key={group.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => toggleGroup(group.id)}
                className={cn(
                  "focus-ring flex min-h-11 items-center gap-2 rounded-md border px-3 py-2 text-left text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "border-transparent bg-accent text-white shadow-soft"
                    : "border-border bg-background text-text-muted hover:border-accent hover:bg-accent-soft hover:text-accent",
                )}
              >
                <Icon className="h-4 w-4 flex-none" aria-hidden="true" />
                <span className="min-w-0 leading-5">{group.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div ref={mapElement} className="amenities-map h-[380px] w-full sm:h-[460px]" aria-label="Kaart met voorzieningen rond Garensteeg 2" />

      <div className="border-t border-border bg-white/85 px-4 py-3 text-sm text-text-muted sm:px-5">
        {mapState === "loading" ? "Voorzieningen op de kaart laden..." : null}
        {mapState === "ready" ? "Sleep de kaart of gebruik de zoomknoppen om de buurt te verkennen." : null}
        {mapState === "unavailable" ? "De kaart is zichtbaar, maar de voorzieningen konden nu niet worden opgehaald." : null}
      </div>
    </div>
  );
}
