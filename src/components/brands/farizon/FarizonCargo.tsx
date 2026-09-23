"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FarizonImage from "@/components/brands/farizon/FarizonImage";
import { CONFIG_LABELS, FARIZON_MODELS, type ConfigKey } from "@/lib/data/farizonData";

export default function FarizonCargo({ selectedId }: { selectedId: string }) {
  const [config, setConfig] = useState<ConfigKey>("swb");
  const model = FARIZON_MODELS.find((m) => m.id === selectedId) ?? FARIZON_MODELS[0];
  const c = model.configurations[config];

  const fmt = (v: number | null, unit: string) => (v === null ? "—" : `${v.toLocaleString("en-US")} ${unit}`);
  const dims = [
    { label: "Cargo Volume", value: fmt(c.volumeM3, "m³") },
    { label: "Cargo Length", value: fmt(c.lengthMm, "mm") },
    { label: "Cargo Width", value: fmt(c.widthMm, "mm") },
    { label: "Cargo Height", value: fmt(c.heightMm, "mm") },
    { label: "Payload", value: fmt(c.payloadKg, "kg") },
  ];

  return (
    <section id="cargo" className="scroll-mt-32 border-t border-white/10 bg-[#1A1F24] py-16 sm:py-24">
      <div className="container-page">
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">Engineered around your business</h2>
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#E2E8F0]/60">{model.name}</p>

        <div className="mt-8 inline-flex flex-wrap gap-1 rounded-lg border border-white/10 bg-black/40 p-1">
          {CONFIG_LABELS.map((cfg) => (
            <button
              key={cfg.key}
              type="button"
              onClick={() => setConfig(cfg.key)}
              className={`rounded-md px-4 py-2 text-xs font-bold tracking-[0.1em] transition-colors ${
                config === cfg.key ? "bg-white text-black" : "text-white/60 hover:text-white"
              }`}
            >
              {cfg.label}
            </button>
          ))}
        </div>

        <div className="relative mt-8">
          <FarizonImage src={model.sideProfileImage} label="Farizon — ภาพด้านข้าง (ขนาดพื้นที่บรรทุก)" className="aspect-[16/9] w-full rounded-xl border border-white/10" fit="contain" />
          {/* Dimension guides */}
          <span className="pointer-events-none absolute right-6 top-8 bottom-10 hidden w-px bg-[#00F0FF]/50 md:block" />
          <span className="pointer-events-none absolute bottom-6 left-10 right-16 hidden h-px bg-[#00F0FF]/50 md:block" />
        </div>

        <AnimatePresence mode="wait">
          <motion.dl
            key={`${model.id}-${config}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5"
          >
            {dims.map((d) => (
              <div key={d.label} className="border-l-2 border-[#00F0FF]/60 pl-3">
                <dt className="text-[10px] uppercase tracking-[0.15em] text-white/50">{d.label}</dt>
                <dd className="mt-1 text-xl font-light text-white">{d.value}</dd>
              </div>
            ))}
          </motion.dl>
        </AnimatePresence>
        <p className="mt-3 text-[11px] text-white/35">ค่าขนาดแต่ละรุ่นย่อย: {c.volumeM3 === null ? "รอข้อมูลจริง" : "ตามข้อมูลที่ระบุ"}</p>
      </div>
    </section>
  );
}
