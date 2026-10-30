"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Lepas L6 EV launch prices and the dealer's indicative installment table (Maporn Rayong poster, Oct 2026).
const GOLD = "#E8C77E";
const ORANGE = "#F26A1B";
const MONTHS = [48, 60, 72, 84];

type Row = { down: number; amount: number; financed: number; monthly: number[] };
const TRIMS: { name: string; price: number; rows: Row[] }[] = [
  {
    name: "Comfort FWD",
    price: 769000,
    rows: [
      { down: 30, amount: 230700, financed: 538300, monthly: [12103, 10044, 8773, 7974] },
      { down: 25, amount: 192250, financed: 576750, monthly: [12967, 10857, 9447, 8592] },
      { down: 20, amount: 153800, financed: 615200, monthly: [14196, 11735, 10129, 9267] },
      { down: 15, amount: 115350, financed: 653650, monthly: [15301, 12741, 11034, 10118] },
      { down: 10, amount: 76900, financed: 692100, monthly: [16547, 13836, 12087, 10887] },
    ],
  },
  {
    name: "Premium FWD",
    price: 799900,
    rows: [
      { down: 30, amount: 239970, financed: 559930, monthly: [12589, 10447, 9125, 8294] },
      { down: 25, amount: 199975, financed: 599925, monthly: [13488, 11294, 9827, 8937] },
      { down: 20, amount: 159980, financed: 639920, monthly: [14766, 12206, 10536, 9639] },
      { down: 15, amount: 119985, financed: 679915, monthly: [15916, 13253, 11477, 10525] },
      { down: 10, amount: 79990, financed: 719910, monthly: [17212, 14392, 12572, 11324] },
    ],
  },
];

const n = (v: number) => v.toLocaleString("en-US");

export default function LepasPricing() {
  const [active, setActive] = useState(0);
  const trim = TRIMS[active];

  return (
    <section id="price" className="scroll-mt-32 relative overflow-hidden border-t border-white/[0.06] bg-[#0a0a0b] py-16 sm:py-24">
      <div className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full blur-[150px]" style={{ backgroundColor: `${ORANGE}22` }} />

      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Price</p>
            <h2 className="mt-3 text-4xl font-light tracking-tight text-white sm:text-6xl">
              Lepas L6 <span className="font-bold" style={{ color: ORANGE }}>EV</span>
            </h2>
            <p className="mt-3 text-sm text-white/60 sm:text-base">เปิดตัวอย่างเป็นทางการในประเทศไทย</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {TRIMS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`rounded-2xl border p-5 text-left transition-all duration-300 ${i === active ? "bg-white/[0.06]" : "border-white/10 hover:border-white/30"}`}
                  style={i === active ? { borderColor: ORANGE, boxShadow: `0 0 40px ${ORANGE}26` } : undefined}
                >
                  <p className="text-sm font-semibold text-white">L6 EV <span style={{ color: ORANGE }}>{t.name}</span></p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-white/45">ราคาเริ่มต้น</p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {n(t.price)} <span className="text-sm font-normal text-white/60">บาท</span>
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/brand/studio3/lepas-l6-studio-orange-dark.jpg" alt="Lepas L6 EV" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-4 left-5 text-lg italic text-white/90" style={{ fontFamily: "cursive" }}>Drive Your Elegance</p>
          </div>
        </div>

        {/* Installment table for the selected trim */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#121214]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4" style={{ background: `linear-gradient(90deg, ${ORANGE}, #c4470f)` }}>
            <h3 className="text-lg font-bold text-white">ตารางผ่อน L6 EV {trim.name}</h3>
            <p className="text-sm font-semibold text-white/90">ราคา {n(trim.price)} บาท</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/55">
                  <th rowSpan={2} className="px-4 py-3 text-left font-semibold">ดาวน์</th>
                  <th rowSpan={2} className="px-4 py-3 text-right font-semibold">จำนวนเงิน</th>
                  <th rowSpan={2} className="px-4 py-3 text-right font-semibold">ยอดจัด</th>
                  <th colSpan={MONTHS.length} className="px-4 pt-3 text-center font-semibold">ผ่อนต่อเดือน (บาท) · ระยะเวลา (เดือน)</th>
                </tr>
                <tr className="border-b border-white/10">
                  {MONTHS.map((m) => (
                    <th key={m} className="px-4 pb-3 pt-1 text-right font-bold" style={{ color: GOLD }}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {trim.rows.map((r) => (
                  <tr key={r.down} className="tabular-nums text-white/80 transition-colors hover:bg-white/[0.03]">
                    <td className="px-4 py-3 font-bold text-white">{r.down}%</td>
                    <td className="px-4 py-3 text-right">{n(r.amount)}</td>
                    <td className="px-4 py-3 text-right">{n(r.financed)}</td>
                    {r.monthly.map((v, i) => (
                      <td key={MONTHS[i]} className="px-4 py-3 text-right font-semibold text-white">{n(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] text-white/45">ตารางผ่อนโดยประมาณ อัตราและเงื่อนไขเป็นไปตามที่สถาบันการเงินกำหนด สอบถามโปรโมชั่นล่าสุดได้ที่โชว์รูม</p>
          <Link href="/quotation?brand=lepas" className="rounded-full px-6 py-2.5 text-sm font-bold text-[#1a1408] transition-all hover:brightness-110" style={{ backgroundColor: GOLD }}>
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </section>
  );
}
