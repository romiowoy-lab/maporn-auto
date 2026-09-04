"use client";

import { useState, type ReactNode } from "react";

export interface DetailTab {
  id: string;
  label: string;
  content: ReactNode;
}

export default function VehicleDetailTabs({ tabs }: { tabs: DetailTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div className="sticky top-14 md:top-16 z-30 bg-white/95 backdrop-blur border-y border-brand-line overflow-x-auto no-scrollbar">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={`shrink-0 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                active === t.id ? "border-brand-red text-brand-navy" : "border-transparent text-brand-slate hover:text-brand-navy"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="py-10">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
