"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "models", label: "Models" },
  { id: "specifications", label: "Specifications" },
  { id: "cargo", label: "Cargo" },
  { id: "technology", label: "Technology" },
  { id: "applications", label: "Applications" },
];

// Sticky glass nav, sitting under the site header.
export default function FarizonNav() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-16 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container-page flex h-14 items-center justify-between gap-2 sm:gap-4">
        <p className="min-w-0 truncate text-[11px] sm:text-sm font-semibold tracking-wide text-white">
          MAPORN <span className="font-light text-white/70">AUTOGROUP</span>
          <span className="mx-2.5 text-white/25">|</span>
          <span className="font-bold tracking-[0.15em]">FARIZON</span>
        </p>

        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`border-b pb-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                active === l.id ? "border-[#00F0FF] text-white" : "border-transparent text-white/55 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#models"
          className="shrink-0 rounded-md bg-white px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.1em] text-black transition-colors hover:bg-[#E2E8F0]"
        >
          Explore Models
        </a>
      </div>
    </div>
  );
}
