"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { models } from "@/lib/data/models";
import { getBrand } from "@/lib/data/brands";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { formatTHB } from "@/lib/utils";
import { BodyType, FuelType, VehicleModel } from "@/lib/types";

const MAX_COMPARE = 3;

const FUEL_LABELS: Record<FuelType, string> = {
  Petrol: "เบนซิน",
  Diesel: "ดีเซล",
  Hybrid: "ไฮบริด",
  EV: "ไฟฟ้า 100%",
};

const BODY_TYPES: BodyType[] = ["SUV", "Sedan", "Hatchback", "Pickup", "MPV", "Van", "EV"];
const FUEL_TYPES: FuelType[] = ["Petrol", "Diesel", "Hybrid", "EV"];
const BUDGET_RANGES: { label: string; test: (price: number) => boolean }[] = [
  { label: "ต่ำกว่า 600,000 บาท", test: (p) => p < 600000 },
  { label: "600,000 - 900,000 บาท", test: (p) => p >= 600000 && p <= 900000 },
  { label: "900,000 - 1,200,000 บาท", test: (p) => p > 900000 && p <= 1200000 },
  { label: "มากกว่า 1,200,000 บาท", test: (p) => p > 1200000 },
];

function parsePower(power: string): number {
  const n = parseInt(power.replace(/[^0-9]/g, ""), 10);
  return Number.isNaN(n) ? 0 : n;
}

// Curated cross-brand pairs — every fact below is computed live from real
// models.ts data (price/power/fuel), not hardcoded opinion copy.
const RECOMMENDED_PAIRS: { slugA: string; slugB: string; context: string }[] = [
  { slugA: "gwm-tank-300", slugB: "jaecoo-j7", context: "สาย SUV ออฟโรดสไตล์บึกบึน" },
  { slugA: "suzuki-fronx", slugB: "wuling-air-ev", context: "รถในเมืองงบประหยัด" },
  { slugA: "wuling-cortez", slugB: "farizon-sv", context: "รถครอบครัว/ธุรกิจที่ต้องการพื้นที่" },
];

function RecommendationCard({ slugA, slugB, context }: { slugA: string; slugB: string; context: string }) {
  const a = models.find((m) => m.slug === slugA);
  const b = models.find((m) => m.slug === slugB);
  if (!a || !b) return null;
  const brandA = getBrand(a.brandSlug);
  const brandB = getBrand(b.brandSlug);
  const priceDiff = Math.abs(a.startPrice - b.startPrice);
  const cheaper = a.startPrice <= b.startPrice ? a : b;
  const powerA = parsePower(a.variants[0]?.power ?? "0");
  const powerB = parsePower(b.variants[0]?.power ?? "0");
  const strongerPower = powerA >= powerB ? a : b;
  const fuelNote =
    a.fuelType !== b.fuelType
      ? `${a.name} ใช้${FUEL_LABELS[a.fuelType]} ส่วน ${b.name} ใช้${FUEL_LABELS[b.fuelType]}`
      : `ทั้งคู่ใช้${FUEL_LABELS[a.fuelType]}เหมือนกัน`;

  return (
    <div className="card-elevated p-6">
      <p className="text-[11px] font-semibold text-brand-red uppercase tracking-widest mb-3">คำแนะนำจากผู้เชี่ยวชาญ Maporn</p>
      <p className="font-bold text-brand-navy mb-1">
        {brandA?.name} {a.name} <span className="text-brand-slate font-normal">vs</span> {brandB?.name} {b.name}
      </p>
      <p className="text-xs text-brand-slate mb-4">เหมาะสำหรับ: {context}</p>
      <ul className="space-y-2 text-sm text-brand-slate">
        <li>
          • {cheaper.name} ราคาถูกกว่า {formatTHB(priceDiff)}
        </li>
        <li>• {fuelNote}</li>
        {powerA !== powerB && (
          <li>
            • {strongerPower.name} ให้กำลังเครื่องยนต์มากกว่า {Math.abs(powerA - powerB)} แรงม้า
          </li>
        )}
      </ul>
      <Link
        href={`/compare?add=${a.slug}&add2=${b.slug}`}
        className="mt-4 inline-block text-xs font-semibold text-brand-navy hover:text-brand-red"
      >
        เปรียบเทียบคู่นี้แบบเต็ม →
      </Link>
    </div>
  );
}

export default function CompareView({ initialSlug = "", initialSlug2 = "" }: { initialSlug?: string; initialSlug2?: string }) {
  const initial = [initialSlug, initialSlug2].filter(Boolean);
  const [selected, setSelected] = useState<string[]>(initial);
  const [filterBody, setFilterBody] = useState("");
  const [filterFuel, setFilterFuel] = useState("");
  const [filterBudget, setFilterBudget] = useState("");

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }

  const filteredModels = useMemo(() => {
    const budgetTest = BUDGET_RANGES.find((r) => r.label === filterBudget)?.test;
    return models.filter((m) => {
      if (filterBody && m.bodyType !== filterBody) return false;
      if (filterFuel && m.fuelType !== filterFuel) return false;
      if (budgetTest && !budgetTest(m.startPrice)) return false;
      return true;
    });
  }, [filterBody, filterFuel, filterBudget]);

  const selectedModels = selected.map((s) => models.find((m) => m.slug === s)).filter(Boolean) as VehicleModel[];

  const rows: { label: string; render: (m: VehicleModel) => React.ReactNode }[] = [
    { label: "แบรนด์", render: (m) => getBrand(m.brandSlug)?.name },
    { label: "ประเภทตัวถัง", render: (m) => m.bodyType },
    { label: "เชื้อเพลิง", render: (m) => m.fuelType },
    { label: "ราคาเริ่มต้น", render: (m) => formatTHB(m.startPrice) },
    { label: "เครื่องยนต์ / มอเตอร์", render: (m) => m.variants[0]?.engine },
    { label: "กำลังสูงสุด", render: (m) => m.variants[0]?.power },
    { label: "แรงบิดสูงสุด", render: (m) => m.variants[0]?.torque },
    { label: "แบตเตอรี่", render: (m) => m.battery ?? "-" },
    { label: "ระยะทางวิ่ง", render: (m) => m.range ?? "-" },
    {
      label: "ขนาดตัวถัง (ยxกxส)",
      render: (m) => `${m.dimensions.length} x ${m.dimensions.width} x ${m.dimensions.height} มม.`,
    },
    { label: "ระยะฐานล้อ", render: (m) => `${m.dimensions.wheelbase} มม.` },
    { label: "จำนวนที่นั่ง", render: (m) => m.variants[0]?.seats },
    { label: "การรับประกัน", render: (m) => m.warranty },
    { label: "ความปลอดภัย", render: (m) => m.safety.join(", ") },
  ];

  const testDriveHref =
    selectedModels.length >= 2
      ? `/test-drive?model=${selectedModels[0].slug}&compareModel=${selectedModels[1].slug}`
      : "/test-drive";

  return (
    <div className={selectedModels.length >= 2 ? "pb-24 md:pb-16" : ""}>
      <div className="card-elevated p-5 mb-6">
        <p className="text-xs font-semibold text-brand-navy mb-3">กรองรุ่นรถที่ต้องการเลือกดู</p>
        <div className="flex flex-wrap gap-2.5">
          <select
            value={filterBody}
            onChange={(e) => setFilterBody(e.target.value)}
            className="rounded-full border border-brand-line px-3.5 py-1.5 text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-red bg-white"
          >
            <option value="">ทุกประเภทตัวถัง</option>
            {BODY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={filterFuel}
            onChange={(e) => setFilterFuel(e.target.value)}
            className="rounded-full border border-brand-line px-3.5 py-1.5 text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-red bg-white"
          >
            <option value="">ทุกเชื้อเพลิง</option>
            {FUEL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={filterBudget}
            onChange={(e) => setFilterBudget(e.target.value)}
            className="rounded-full border border-brand-line px-3.5 py-1.5 text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-red bg-white"
          >
            <option value="">ทุกช่วงราคา</option>
            {BUDGET_RANGES.map((r) => (
              <option key={r.label} value={r.label}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card-elevated p-5 mb-8">
        <p className="text-sm font-semibold text-brand-navy mb-3">
          เลือกรุ่นรถที่ต้องการเปรียบเทียบ (สูงสุด {MAX_COMPARE} รุ่น) — เลือกแล้ว {selected.length}/{MAX_COMPARE}
        </p>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {filteredModels.length === 0 && <p className="text-xs text-brand-slate">ไม่พบรุ่นที่ตรงกับตัวกรอง</p>}
          {filteredModels.map((m) => {
            const active = selected.includes(m.slug);
            const disabled = !active && selected.length >= MAX_COMPARE;
            return (
              <button
                key={m.slug}
                onClick={() => toggle(m.slug)}
                disabled={disabled}
                className={`text-xs font-semibold rounded-full px-3.5 py-1.5 border transition-colors ${
                  active
                    ? "bg-brand-navy text-white border-brand-navy"
                    : disabled
                    ? "border-brand-line text-brand-slate/40 cursor-not-allowed"
                    : "border-brand-line text-brand-slate hover:border-brand-navy hover:text-brand-navy"
                }`}
              >
                {getBrand(m.brandSlug)?.name} {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {selectedModels.length < 2 ? (
        <div className="card-elevated p-12 text-center text-brand-slate text-sm">
          เลือกรถอย่างน้อย 2 รุ่นเพื่อเริ่มเปรียบเทียบ
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-brand-line">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="sticky top-16 z-10 bg-slate-50 border-b border-brand-line">
                <th className="px-4 py-3 text-left font-semibold text-brand-navy w-40">รายการ</th>
                {selectedModels.map((m) => (
                  <th key={m.slug} className="px-4 py-3 text-left align-top">
                    <div className="w-40">
                      {m.image ? (
                        <div className="relative aspect-[4/3] rounded-lg mb-2 overflow-hidden bg-[#f7f7f5]">
                          <Image src={m.image} alt={m.name} fill sizes="160px" className="object-cover" />
                        </div>
                      ) : (
                        <PlaceholderImage
                          label={m.name}
                          colorHex={getBrand(m.brandSlug)?.colorHex}
                          hideLabel
                          className="aspect-[4/3] rounded-lg mb-2"
                        />
                      )}
                      <Link href={`/cars/${m.slug}`} className="font-bold text-brand-navy hover:text-brand-red">
                        {m.name}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-3 font-semibold text-brand-navy whitespace-nowrap">{row.label}</td>
                  {selectedModels.map((m) => (
                    <td key={m.slug} className="px-4 py-3 text-brand-slate">
                      {row.render(m)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-14">
        <p className="section-eyebrow mb-2">Expert Picks</p>
        <h2 className="text-2xl font-bold text-brand-navy mb-6">คำแนะนำเปรียบเทียบข้ามแบรนด์ยอดนิยม</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RECOMMENDED_PAIRS.map((pair) => (
            <RecommendationCard key={`${pair.slugA}-${pair.slugB}`} {...pair} />
          ))}
        </div>
      </div>

      {selectedModels.length >= 2 && (
        <div className="fixed inset-x-0 bottom-16 md:bottom-6 z-[45] flex justify-center px-4">
          <div className="flex items-center gap-4 rounded-full bg-brand-navy text-white shadow-2xl px-5 py-3 md:px-6 md:py-3.5 max-w-full">
            <p className="text-xs md:text-sm font-semibold truncate">
              นัดทดลองขับ {selectedModels.map((m) => m.name).join(" + ")} ในวันเดียว
            </p>
            <Link href={testDriveHref} className="btn-red text-xs px-4 py-2 shrink-0 whitespace-nowrap">
              จองทดลองขับ
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
