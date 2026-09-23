"use client";

import { useState } from "react";
import Link from "next/link";
import { models } from "@/lib/data/models";
import { getModelCategories } from "@/lib/data/models";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";
import CarCard from "@/components/cars/CarCard";

const MAX_SHOWN = 8;

export default function MultiBrandMatrix() {
  const categories = getModelCategories();
  const tabs = [{ key: "all", label: "ทั้งหมด", href: "/cars", models }, ...categories];
  const [active, setActive] = useState(tabs[0].key);
  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];
  const shown = activeTab.models.slice(0, MAX_SHOWN);

  return (
    <section className="bg-white py-20 sm:py-28 border-t border-black/5">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading eyebrow="Multi-Brand Matrix" title="ค้นรถข้ามแบรนด์ในที่เดียว" />
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={`text-xs font-semibold rounded-full px-4 py-2 border transition-colors ${
                  active === t.key
                    ? "bg-brand-navy text-white border-brand-navy"
                    : "border-brand-line text-brand-slate hover:border-brand-navy hover:text-brand-navy"
                }`}
              >
                {t.label}
                <span className="ml-1.5 opacity-60">{t.models.length}</span>
              </button>
            ))}
          </div>
        </div>

        {shown.length > 0 ? (
          <ScrollFx
            key={active}
            effect="fade-up"
            stagger={0.06}
            className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
          >
            {shown.map((m) => (
              <CarCard key={m.slug} model={m} />
            ))}
          </ScrollFx>
        ) : (
          <p className="mt-10 text-sm text-brand-slate">ยังไม่มีรุ่นในหมวดนี้</p>
        )}

        <div className="mt-10 text-center">
          <Link href={activeTab.href} className="btn-outline">
            ดูรถยนต์ทั้งหมดในหมวดนี้ →
          </Link>
        </div>
      </div>
    </section>
  );
}
