"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { brands } from "@/lib/data/brands";

const BODY_TYPES = ["SUV", "Sedan", "Hatchback", "Pickup", "MPV", "Van", "EV"];

export default function QuickSearch() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [fuelType, setFuelType] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (bodyType) params.set("body", bodyType);
    if (fuelType) params.set("fuel", fuelType);
    router.push(`/cars${params.toString() ? `?${params.toString()}` : ""}`);
  }

  const selectClass =
    "w-full rounded-sm border-0 bg-white px-4 py-3 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-white/60";

  return (
    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-sm p-4 sm:p-5">
      <p className="text-xs font-semibold text-white/70 mb-3 uppercase tracking-[0.18em]">ค้นหารถที่ใช่สำหรับคุณ</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className={selectClass}>
          <option value="">ทุกแบรนด์</option>
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
        <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} className={selectClass}>
          <option value="">ทุกประเภทตัวถัง</option>
          {BODY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className={selectClass}>
          <option value="">ทุกประเภทเชื้อเพลิง</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="EV">EV</option>
        </select>
      </div>
      <button
        onClick={handleSearch}
        className="inline-flex w-full sm:w-auto items-center justify-center rounded-sm bg-white px-9 py-[0.95rem] mt-3 text-[0.82rem] font-semibold uppercase tracking-[0.06em] text-brand-navy transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/90"
      >
        ค้นหารถยนต์
      </button>
    </div>
  );
}
