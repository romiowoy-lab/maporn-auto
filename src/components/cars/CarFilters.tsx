"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

type Section = "brand" | "body" | "fuel" | "transmission" | "seats" | "price";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openSection, setOpenSection] = useState<Section | null>("body");

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/cars?${params.toString()}`);
  }

  const selectClass =
    "w-full rounded-lg border border-white/15 bg-[#1C1E22] px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-red";

  function Section({
    id,
    title,
    children,
  }: {
    id: Section;
    title: string;
    children: React.ReactNode;
  }) {
    const open = openSection === id;
    return (
      <div className="border-b border-white/10 pb-4 last:border-none last:pb-0">
        <button
          type="button"
          onClick={() => setOpenSection(open ? null : id)}
          aria-expanded={open}
          className="flex w-full items-center justify-between py-1 text-sm font-semibold text-white"
        >
          {title}
          <ChevronIcon open={open} />
        </button>
        {open && <div className="mt-3">{children}</div>}
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl">
      <Section id="body" title="ประเภทตัวถัง (Body Type)">
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
      </Section>

      <Section id="fuel" title="ประเภทเชื้อเพลิง">
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
      </Section>

      <Section id="transmission" title="เกียร์">
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
      </Section>

      <Section id="seats" title="จำนวนที่นั่ง">
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
      </Section>

      <Section id="price" title="ช่วงราคา">
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
      </Section>

      <button onClick={() => router.push("/cars")} className="w-full rounded-lg border border-white/25 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#101113]">
        ล้างตัวกรองทั้งหมด
      </button>
    </div>
  );
}
