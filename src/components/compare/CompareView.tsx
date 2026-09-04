"use client";

import { useState } from "react";
import Link from "next/link";
import { models } from "@/lib/data/models";
import { getBrand } from "@/lib/data/brands";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { formatTHB } from "@/lib/utils";

const MAX_COMPARE = 3;

export default function CompareView({ initialSlug = "" }: { initialSlug?: string }) {
  const [selected, setSelected] = useState<string[]>(initialSlug ? [initialSlug] : []);

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }

  const selectedModels = selected.map((s) => models.find((m) => m.slug === s)).filter(Boolean) as typeof models;

  const rows: { label: string; render: (m: (typeof models)[number]) => React.ReactNode }[] = [
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

  return (
    <div>
      <div className="card-elevated p-5 mb-8">
        <p className="text-sm font-semibold text-brand-navy mb-3">
          เลือกรุ่นรถที่ต้องการเปรียบเทียบ (สูงสุด {MAX_COMPARE} รุ่น) — เลือกแล้ว {selected.length}/{MAX_COMPARE}
        </p>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {models.map((m) => {
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
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-brand-navy w-40">รายการ</th>
                {selectedModels.map((m) => (
                  <th key={m.slug} className="px-4 py-3 text-left align-top">
                    <div className="w-40">
                      <PlaceholderImage
                        label={m.name}
                        colorHex={getBrand(m.brandSlug)?.colorHex}
                        className="aspect-[4/3] rounded-lg mb-2"
                      />
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
    </div>
  );
}
