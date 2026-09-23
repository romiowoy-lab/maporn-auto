"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Sparkles, SlidersHorizontal, ArrowRight, Zap, Leaf, Fuel } from "lucide-react";
import { models } from "@/lib/data/models";
import { getBrand } from "@/lib/data/brands";
import { company } from "@/lib/data/company";
import { VehicleModel } from "@/lib/types";

type TypeOption = {
  id: string;
  label: string;
  icon: typeof Zap;
  match: (m: VehicleModel) => boolean;
};

const TYPE_OPTIONS: TypeOption[] = [
  { id: "ev", label: "EV", icon: Zap, match: (m) => m.fuelType === "EV" },
  { id: "hybrid", label: "Hybrid", icon: Leaf, match: (m) => m.fuelType === "Hybrid" },
  { id: "ice", label: "น้ำมัน (ICE)", icon: Fuel, match: (m) => m.fuelType === "Petrol" || m.fuelType === "Diesel" },
];

const BUDGET_OPTIONS = [
  { id: "500k", label: "< 600,000", priceParam: "0-600000", test: (p: number) => p < 600000 },
  { id: "1m", label: "600k - 1.2M", priceParam: "600000-1200000", test: (p: number) => p >= 600000 && p <= 1200000 },
  { id: "1.5m", label: "> 1.2M บาท", priceParam: "1200000-999999999", test: (p: number) => p > 1200000 },
];

export default function HeroSection() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("ev");
  const [selectedBudget, setSelectedBudget] = useState("1m");
  const FUEL_PARAM: Record<string, string> = { ev: "EV", hybrid: "Hybrid", ice: "Petrol,Diesel" };

  const yearsTrusted = new Date().getFullYear() - Number(company.foundedYear);
  const typeOption = TYPE_OPTIONS.find((t) => t.id === selectedType) ?? TYPE_OPTIONS[0];
  const budgetOption = BUDGET_OPTIONS.find((b) => b.id === selectedBudget) ?? BUDGET_OPTIONS[0];

  const matched = useMemo(
    () => models.filter((m) => typeOption.match(m) && budgetOption.test(m.startPrice)),
    [typeOption, budgetOption]
  );

  const matchedBrandNames = useMemo(() => {
    const names = Array.from(new Set(matched.map((m) => getBrand(m.brandSlug)?.name).filter(Boolean))) as string[];
    return names.length > 3 ? `${names.slice(0, 3).join(", ")}...` : names.join(", ") || "-";
  }, [matched]);

  function handleShowResults() {
    const params = new URLSearchParams();
    params.set("fuel", FUEL_PARAM[selectedType] ?? "");
    params.set("price", budgetOption.priceParam);
    router.push(`/cars?${params.toString()}`);
  }

  return (
    <section className="relative min-h-[90vh] bg-slate-950 text-white overflow-hidden flex items-center pt-24 pb-20">
      {/* Background Glows & Ambient Mesh */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ================= LEFT COLUMN: Brand Story & Value (7 Cols) ================= */}
          <div className="lg:col-span-7 space-y-10">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md text-xs sm:text-sm font-medium text-sky-400 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>
                {yearsTrusted}+ ปีแห่งความไว้วางใจ • {company.branchCount} สาขาทั่วประเทศ
              </span>
              <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.35] py-1">
              {yearsTrusted} ปี มาพรพาณิชย์ <br />
              <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-white bg-clip-text text-transparent">
                มากกว่าดีลเลอร์ คือเพื่อนคู่คิดทุกการเดินทาง
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
              Your Multi-Brand Mobility Companion — ที่ปรึกษาด้านยานยนต์ 7 แบรนด์ชั้นนำ ตั้งแต่ EV, Hybrid ไปจนถึงรถยนต์น้ำมัน
              พร้อมดูแลคุณด้วยประสบการณ์กว่า {yearsTrusted} ปี โดยทีมงานมืออาชีพ
            </p>

            {/* Key Value Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">{yearsTrusted}+</p>
                <p className="text-xs text-slate-400">ปีแห่งความไว้วางใจ</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">7</p>
                <p className="text-xs text-slate-400">แบรนด์ชั้นนำในเครือ</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">{company.serviceCenterCount}</p>
                <p className="text-xs text-slate-400">ศูนย์บริการทั่วประเทศ</p>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/cars"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-slate-950 font-bold transition-all shadow-[0_0_25px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] flex items-center gap-2 group"
              >
                <span>ค้นหารถที่ใช่สำหรับคุณ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/test-drive"
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 backdrop-blur-xl hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold transition-all hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]"
              >
                นัดหมายทดลองขับ
              </Link>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Interactive Matcher (5 Cols) ================= */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
              {/* Glass Card Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Car Matcher</h3>
                    <p className="text-xs text-slate-400">กรองรถที่เหมาะกับคุณใน 1 คลิก</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Quick Match
                </span>
              </div>

              {/* Step 1: Vehicle Type */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">1. เลือกประเภทเชื้อเพลิง</label>
                <div className="grid grid-cols-3 gap-2">
                  {TYPE_OPTIONS.map((item) => {
                    const Icon = item.icon;
                    const active = selectedType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedType(item.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                          active
                            ? "bg-sky-500/15 border-sky-500 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                            : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1.5" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Budget */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">2. ช่วงงบประมาณ</label>
                <div className="grid grid-cols-3 gap-2">
                  {BUDGET_OPTIONS.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBudget(b.id)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                        selectedBudget === b.id
                          ? "bg-sky-500/15 border-sky-500 text-sky-400"
                          : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Result Action */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-slate-400">พบรุ่นที่ตรงโจทย์</p>
                  <p className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> {matched.length} รุ่นจากแบรนด์ในเครือ
                  </p>
                </div>
                <span className="text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md text-right shrink-0 max-w-[45%]">
                  {matchedBrandNames}
                </span>
              </div>

              {/* Bottom CTA — dark glassmorphism bar (no flat solid fill) */}
              <button
                type="button"
                onClick={handleShowResults}
                className="w-full py-3.5 rounded-xl backdrop-blur-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 text-white font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] flex items-center justify-center gap-2"
              >
                <span>แสดงผลการแมตช์รถยนต์</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
