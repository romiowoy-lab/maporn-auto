"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FarizonImage from "@/components/brands/farizon/FarizonImage";
import { INTERIOR_MODES } from "@/lib/data/farizonData";

const HIGHLIGHTS = ["Large opening angles", "Low floor loading height", "Modular seating"];

export default function FarizonInterior() {
  const [key, setKey] = useState(INTERIOR_MODES[0].key);
  const mode = INTERIOR_MODES.find((m) => m.key === key) ?? INTERIOR_MODES[0];

  return (
    <section className="border-t border-white/10 bg-[#1A1F24] py-16 sm:py-24">
      <div className="container-page">
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">Flexible interior &amp; cargo layout</h2>

        <div className="mt-8 inline-flex flex-wrap gap-1 rounded-lg border border-white/10 bg-black/40 p-1">
          {INTERIOR_MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setKey(m.key)}
              className={`rounded-md px-4 py-2 text-xs font-bold tracking-[0.1em] transition-colors ${key === m.key ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div key={mode.key} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <FarizonImage src={mode.image} label={`Farizon — ${mode.label}`} className="aspect-[16/9] w-full rounded-xl border border-white/10" />
            </motion.div>
          </AnimatePresence>
          <ul className="space-y-4">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-3 border-b border-white/10 pb-4 text-base font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
