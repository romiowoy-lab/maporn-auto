"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

// Darion EV — driver-assistance band (Wuling Thailand artwork, supplied by the client).
const ADAS = [
  { code: "ACC", name: "ระบบควบคุมความเร็วอัตโนมัติแบบแปรผัน" },
  { code: "AEB", name: "ระบบเบรกฉุกเฉินอัตโนมัติ" },
  { code: "LDW", name: "ระบบเตือนออกนอกเลน" },
  { code: "BSD", name: "ระบบตรวจจับจุดอับสายตา" },
  { code: "DOW", name: "ระบบเตือนก่อนเปิดประตู" },
  { code: "RCTA", name: "ระบบเตือนรถตัดผ่านขณะถอย" },
];

export default function WulingSafety() {
  return (
    <section className="border-t border-white/[0.06] bg-[#17181c] py-14 sm:py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[800/449] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <Image src="/brand/wuling-darion/v2/safety.webp" alt="Darion EV ระบบช่วยเหลือการขับขี่ ADAS Level 2" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
        </motion.div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D8BFA0]">Safety that cares</p>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">ADAS Level 2</h2>
          <p className="mt-2 text-sm text-white/60 sm:text-base">ระบบช่วยเหลือการขับขี่ 11 ระบบ ดูแลทุกคนในครอบครัวตลอดการเดินทาง</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {ADAS.map((a) => (
              <li key={a.code} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D8BFA0]" />
                <span>
                  <span className="block text-sm font-bold text-white">{a.code}</span>
                  <span className="block text-xs text-white/55">{a.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
