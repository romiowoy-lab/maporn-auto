"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FarizonImage from "@/components/brands/farizon/FarizonImage";
import { SCENARIOS, PENDING } from "@/lib/data/farizonData";

export default function FarizonScenarios() {
  const [key, setKey] = useState(SCENARIOS[0].key);
  const active = SCENARIOS.find((s) => s.key === key) ?? SCENARIOS[0];

  return (
    <section id="applications" className="scroll-mt-32 border-t border-white/10 bg-[#0B0F12] py-16 sm:py-24">
      <div className="container-page">
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">One platform. Many possibilities.</h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setKey(s.key)}
              className={`rounded-lg border px-4 py-4 text-left text-xs font-extrabold tracking-[0.12em] transition-all ${
                s.key === active.key
                  ? "border-[#00F0FF] bg-[#00F0FF]/10 text-white shadow-[0_0_24px_-8px_#00F0FF]"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]"
          >
            <FarizonImage src={active.image} label={`Farizon — ${active.label}`} className="aspect-[16/9] w-full rounded-xl border border-white/10" />
            <div>
              <h3 className="text-2xl font-extrabold tracking-wide text-white">{active.label}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#E2E8F0]/75">
                {active.benefits.length > 0 ? active.benefits.map((b) => <li key={b}>• {b}</li>) : <li className="text-white/40">ประโยชน์ทางธุรกิจ{PENDING}</li>}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
