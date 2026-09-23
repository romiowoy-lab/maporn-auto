"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { brands } from "@/lib/data/brands";

const BODY_TYPES = ["SUV", "Sedan", "Hatchback", "Pickup", "MPV", "Van", "EV"];
const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "EV"];

const SEGMENTS = [
  { label: "รถยนต์ไฟฟ้า", href: "/cars?fuel=EV" },
  { label: "SUV", href: "/cars?body=SUV" },
  { label: "ซิตี้คาร์", href: "/cars?body=Hatchback" },
  { label: "เพื่อการพาณิชย์", href: "/cars?body=Van,Pickup" },
];

export default function HeroSearch() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [body, setBody] = useState("");
  const [fuel, setFuel] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (body) params.set("body", body);
    if (fuel) params.set("fuel", fuel);
    const qs = params.toString();
    router.push(`/cars${qs ? `?${qs}` : ""}`);
  }

  const selectClass =
    "w-full sm:flex-1 rounded-full border border-brand-line px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-red bg-white";

  return (
    <div className="relative z-20 -mt-8 md:-mt-10">
      <div className="container-page">
        <div className="mx-auto max-w-4xl rounded-2xl border border-brand-line bg-white shadow-[0_20px_50px_-20px_rgba(17,17,17,0.25)] px-5 py-4 md:px-6 md:py-5">
          <p className="text-xs font-semibold text-brand-slate mb-3">คุณกำลังมองหารถแบบไหน?</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {SEGMENTS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-xs font-semibold rounded-full px-3.5 py-1.5 border border-brand-line text-brand-slate hover:border-brand-red hover:text-brand-red transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
          <div className="hairline mb-4" />
          <p className="text-xs font-semibold text-brand-slate mb-3">หรือค้นหาแบบละเอียด</p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <select className={selectClass} value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">ทุกแบรนด์</option>
              {brands.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
            <select className={selectClass} value={body} onChange={(e) => setBody(e.target.value)}>
              <option value="">ประเภทรถ</option>
              {BODY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select className={selectClass} value={fuel} onChange={(e) => setFuel(e.target.value)}>
              <option value="">เชื้อเพลิง</option>
              {FUEL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <button onClick={handleSearch} className="btn-red rounded-full px-6 py-2.5 text-sm shrink-0">
              ค้นหารถยนต์
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
