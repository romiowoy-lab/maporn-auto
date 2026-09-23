"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ScrollFx from "@/components/ui/ScrollFx";

// Real design details of the L6, positioned over the real side-profile studio photo.
// Honest generic labels — not the marketing copy from the reference mockup, which we
// can't verify as official.
const HOTSPOTS = [
  { key: "headlight", x: 14, y: 50, label: "Signature LED Headlights", copy: "ไฟหน้า LED ดีไซน์เฉียบคม ให้แสงสว่างชัดเจนทุกเส้นทาง" },
  { key: "roofline", x: 47, y: 22, label: "Aerodynamic Silhouette", copy: "เส้นสายตัวถังลื่นไหล ออกแบบเพื่อความสวยงามและประสิทธิภาพการขับขี่" },
  { key: "taillight", x: 87, y: 44, label: "Full-Width LED Taillight", copy: "ไฟท้าย LED แบบเต็มความกว้าง เอกลักษณ์เฉพาะตัวที่มองเห็นได้ชัดเจน" },
  { key: "wheels", x: 73, y: 80, label: "Sport Alloy Wheels", copy: "ล้ออัลลอยดีไซน์สปอร์ต พร้อมแนวคิดด้านอากาศพลศาสตร์" },
];

export default function LepasDesignHighlights() {
  const [active, setActive] = useState<string | null>(null);
  const activeSpot = HOTSPOTS.find((h) => h.key === active);

  return (
    <section id="design" className="scroll-mt-32 relative bg-[#0a0a0b] py-16 sm:py-24 border-t border-white/[0.06]">
      <div className="container-page mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A15A]">Design</p>
        <ScrollFx effect="fade-up">
          <h2 className="mt-2 text-3xl sm:text-5xl font-extralight tracking-tight text-white">Elegant by Design</h2>
        </ScrollFx>
        <p className="mt-2 text-sm text-white/60">รายละเอียดทุกจุดที่สะท้อนความประณีตในงานออกแบบ — แตะจุดบนภาพเพื่อดูรายละเอียด</p>
      </div>

      <ScrollFx effect="scale" className="container-page">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-black">
          <Image
            src="/brand/studio2/lepas-l6-side-dark.jpg"
            alt="Lepas L6 side profile"
            fill
            sizes="100vw"
            className="object-contain"
          />

          {HOTSPOTS.map((h) => (
            <button
              key={h.key}
              type="button"
              onMouseEnter={() => setActive(h.key)}
              onFocus={() => setActive(h.key)}
              onMouseLeave={() => setActive((cur) => (cur === h.key ? null : cur))}
              onClick={() => setActive((cur) => (cur === h.key ? null : h.key))}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              aria-label={h.label}
            >
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-[#E8C77E] opacity-60 ${
                    active === h.key ? "animate-ping" : ""
                  }`}
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E8C77E] ring-2 ring-[#0a0a0b] shadow-[0_0_12px_rgba(232,199,126,0.8)]" />
              </span>
            </button>
          ))}

          <AnimatePresence>
            {activeSpot && (
              <motion.div
                key={activeSpot.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs rounded-xl border border-white/10 bg-[#0a0a0b]/90 backdrop-blur-md p-4"
              >
                <h3 className="text-sm font-bold text-[#E8C77E]">{activeSpot.label}</h3>
                <p className="mt-1 text-xs text-white/70">{activeSpot.copy}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollFx>
    </section>
  );
}
