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
      <div className="no-scrollbar sticky top-14 z-30 overflow-x-auto border-y border-white/10 bg-[#101113]/95 backdrop-blur md:top-16">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={`shrink-0 border-b-2 px-4 py-3.5 text-sm font-semibold transition-colors ${
                active === t.id ? "border-brand-red text-white" : "border-transparent text-white/55 hover:text-white"
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
