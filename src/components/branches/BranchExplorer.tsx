"use client";

import { useMemo, useState } from "react";
import { Branch } from "@/lib/types";
import { brands } from "@/lib/data/brands";
import BranchCard from "@/components/branches/BranchCard";

export default function BranchExplorer({ branches }: { branches: Branch[] }) {
  const [province, setProvince] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");

  const provinces = useMemo(() => Array.from(new Set(branches.map((b) => b.province))), [branches]);

  const filtered = branches.filter((b) => {
    if (province && b.province !== province) return false;
    if (brand && !b.brands.includes(brand)) return false;
    if (type === "showroom" && !b.isShowroom) return false;
    if (type === "service" && !b.isServiceCenter) return false;
    return true;
  });

  const selectClass =
    "rounded-lg border border-brand-line px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-red bg-white";

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        <select value={province} onChange={(e) => setProvince(e.target.value)} className={selectClass}>
          <option value="">ทุกจังหวัด</option>
          {provinces.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className={selectClass}>
          <option value="">ทุกแบรนด์</option>
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
          <option value="">ทุกประเภท</option>
          <option value="showroom">Showroom</option>
          <option value="service">Service Center</option>
        </select>
        <span className="flex items-center text-xs text-brand-slate">พบ {filtered.length} สาขา</span>
      </div>

      {filtered.length === 0 ? (
        <div className="card-elevated p-12 text-center text-brand-slate text-sm">ไม่พบสาขาที่ตรงกับเงื่อนไข</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((b) => (
            <BranchCard key={b.slug} branch={b} />
          ))}
        </div>
      )}
    </div>
  );
}
