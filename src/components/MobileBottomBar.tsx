import { CalendarDays, Camera, Euro } from "lucide-react";
import { mobileActions } from "../data/navigation";

const icons = [Euro, Camera, CalendarDays];

export function MobileBottomBar() {
  return (
    <nav
      aria-label="Snelle acties"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-surface/90 px-3 py-2 shadow-soft backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        {mobileActions.map((item, index) => {
          const Icon = icons[index];
          return (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent-soft px-3 text-sm font-semibold text-accent transition-all duration-300 active:scale-[0.98]"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
