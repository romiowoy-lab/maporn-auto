"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { brands } from "@/lib/data/brands";

const BODY_TYPES = ["SUV", "Sedan", "Hatchback", "Pickup", "MPV", "Van", "EV"];
const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "EV"];
const TRANSMISSIONS = ["Automatic", "Manual", "CVT", "Single-speed"];
const SEAT_OPTIONS = ["3", "4", "5", "7", "8"];
const PRICE_OPTIONS = [
  { label: "ทุกช่วงราคา", value: "" },
  { label: "ต่ำกว่า 600,000 บาท", value: "0-600000" },
  { label: "600,000 - 900,000 บาท", value: "600000-900000" },
  { label: "900,000 - 1,200,000 บาท", value: "900000-1200000" },
  { label: "มากกว่า 1,200,000 บาท", value: "1200000-999999999" },
];

export default function CarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/cars?${params.toString()}`);
  }

  const selectClass =
    "w-full rounded-lg border border-brand-line px-3 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-red bg-white";

  return (
    <div className="card-elevated p-5 space-y-5">
      <div>
        <p className="text-xs font-semibold text-brand-navy mb-2">แบรนด์</p>
        <select
          className={selectClass}
          value={searchParams.get("brand") ?? ""}
          onChange={(e) => setParam("brand", e.target.value)}
        >
          <option value="">ทุกแบรนด์</option>
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-xs font-semibold text-brand-navy mb-2">ประเภทตัวถัง (Body Type)</p>
        <select
          className={selectClass}
          value={searchParams.get("body") ?? ""}
          onChange={(e) => setParam("body", e.target.value)}
        >
          <option value="">ทุกประเภท</option>
          {BODY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-xs font-semibold text-brand-navy mb-2">ประเภทเชื้อเพลิง</p>
        <select
          className={selectClass}
          value={searchParams.get("fuel") ?? ""}
          onChange={(e) => setParam("fuel", e.target.value)}
        >
          <option value="">ทุกประเภท</option>
          {FUEL_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-xs font-semibold text-brand-navy mb-2">เกียร์</p>
        <select
          className={selectClass}
          value={searchParams.get("transmission") ?? ""}
          onChange={(e) => setParam("transmission", e.target.value)}
        >
          <option value="">ทุกประเภท</option>
          {TRANSMISSIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-xs font-semibold text-brand-navy mb-2">จำนวนที่นั่ง</p>
        <select
          className={selectClass}
          value={searchParams.get("seats") ?? ""}
          onChange={(e) => setParam("seats", e.target.value)}
        >
          <option value="">ทุกจำนวน</option>
          {SEAT_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s} ที่นั่ง
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-xs font-semibold text-brand-navy mb-2">ช่วงราคา</p>
        <select
          className={selectClass}
          value={searchParams.get("price") ?? ""}
          onChange={(e) => setParam("price", e.target.value)}
        >
          {PRICE_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => router.push("/cars")} className="btn-outline w-full text-xs">
        ล้างตัวกรองทั้งหมด
      </button>
    </div>
  );
}
