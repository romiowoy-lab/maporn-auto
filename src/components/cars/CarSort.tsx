"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { label: "ค่าเริ่มต้น", value: "" },
  { label: "ราคา: ต่ำ - สูง", value: "price-asc" },
  { label: "ราคา: สูง - ต่ำ", value: "price-desc" },
];

export default function CarSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("sort", value);
    else params.delete("sort");
    params.delete("page");
    router.push(`/cars?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-3 shrink-0">
      <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">เรียงตาม</span>
      <select
        className="rounded-lg border border-white/15 bg-[#1C1E22] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
        value={searchParams.get("sort") ?? ""}
        onChange={(e) => setSort(e.target.value)}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
