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
    "w-full rounded-lg border-0 bg-white px-4 py-3 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-red";

  return (
    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 sm:p-5">
      <p className="text-xs font-semibold text-brand-red mb-3 uppercase tracking-wide">ค้นหารถที่ใช่สำหรับคุณ</p>
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
      <button onClick={handleSearch} className="btn-red w-full sm:w-auto mt-3">
        ค้นหารถยนต์
      </button>
    </div>
  );
}
