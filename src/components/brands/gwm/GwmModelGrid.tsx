"use client";

import { useState } from "react";
import ScrollFx from "@/components/ui/ScrollFx";
import GwmVehicleCard from "@/components/brands/gwm/GwmVehicleCard";
import { getGwmVehicles, getGwmCategories } from "@/lib/data/gwm-vehicles";

const VEHICLES = getGwmVehicles();
const CATEGORIES = getGwmCategories();

export default function GwmModelGrid() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? VEHICLES : VEHICLES.filter((v) => v.tags.includes(active));

  return (
    <section className="bg-[#080808] py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red">Explore GWM</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">เลือกรถที่ใช่สำหรับคุณ</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setActive(c.key)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-all ${
                  active === c.key
                    ? "border-white bg-white text-[#0b0c0d]"
                    : "border-white/15 text-white/60 hover:border-white/35 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-white/50">ยังไม่มีรุ่นรถในหมวดนี้</p>
        ) : (
          <ScrollFx
            key={active}
            effect="fade-up"
            stagger={0.08}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {filtered.map((v) => (
              <GwmVehicleCard key={v.model.slug} vehicle={v} />
            ))}
          </ScrollFx>
        )}
      </div>
    </section>
  );
}
