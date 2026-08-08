import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import { navigationItems } from "../data/navigation";
import { cn } from "../lib/utils";

export function StickyNavigation() {
  const [activeSection, setActiveSection] = useState("overzicht");

  useEffect(() => {
    const sectionIds = navigationItems.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 hidden border-b border-border/70 bg-background/80 shadow-[0_10px_30px_rgba(23,38,34,0.06)] backdrop-blur-xl md:block">
      <div className="section-shell flex h-16 items-center justify-between gap-6">
        <a className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-semibold text-text" href="#hero">
          <Home className="h-5 w-5 text-accent" aria-hidden="true" />
          Garensteeg 2
        </a>
        <nav aria-label="Hoofdnavigatie" className="flex items-center gap-1 overflow-x-auto">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                className={cn(
                  "focus-ring rounded-md px-3 py-2 text-sm font-semibold transition-all duration-300 ease-out",
                  isActive ? "bg-accent text-white shadow-soft" : "text-text-muted hover:-translate-y-0.5 hover:bg-white/80 hover:text-text",
                )}
                href={item.href}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
