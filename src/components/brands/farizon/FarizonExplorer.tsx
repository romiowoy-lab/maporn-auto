"use client";

import { AnimatePresence, motion } from "framer-motion";
import FarizonImage from "@/components/brands/farizon/FarizonImage";
import Stat from "@/components/brands/wuling/Stat";
import { FARIZON_MODELS, PENDING } from "@/lib/data/farizonData";

// 03 Model explorer + 04 Specification experience — both driven by the selected model.
export default function FarizonExplorer({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  const model = FARIZON_MODELS.find((m) => m.id === selectedId) ?? FARIZON_MODELS[0];
  const s = model.specs;

  return (
    <>
      <section id="models" className="scroll-mt-32 border-t border-white/10 bg-[#000000] py-16 sm:py-24">
        <div className="container-page">
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">Explore the range</h2>

          <div role="tablist" className="mt-8 flex flex-wrap gap-2">
            {FARIZON_MODELS.map((m) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={m.id === model.id}
                type="button"
                onClick={() => onSelect(m.id)}
                className={`rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
                  m.id === model.id ? "border-[#00F0FF] bg-[#00F0FF]/10 text-white" : "border-white/15 text-white/55 hover:border-white/40 hover:text-white"
                }`}
              >
                {m.tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#00F0FF]">{model.bodyType}</p>
                <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">{model.name}</h3>
                <p className="mt-3 max-w-sm text-sm text-[#E2E8F0]/70">{model.tagline ?? PENDING}</p>
                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.15em] text-white/45">Range</dt>
                    <dd className="mt-1 text-lg font-light text-white">{s.rangeKm !== null ? `${s.rangeKm} km` : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.15em] text-white/45">Power</dt>
                    <dd className="mt-1 text-lg font-light text-white">{s.maxPowerKw !== null ? `${s.maxPowerKw} kW` : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.15em] text-white/45">Battery</dt>
                    <dd className="mt-1 text-lg font-light text-white">{s.batteryKwh !== null ? `${s.batteryKwh} kWh` : "—"}</dd>
                  </div>
                </dl>
              </div>
              <FarizonImage src={model.image} label={model.name} className="aspect-[3/2] w-full rounded-xl border border-white/10" />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="specifications" className="scroll-mt-32 border-t border-white/10 bg-[#0B0F12] py-16 sm:py-24">
        <div className="container-page">
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Specifications <span className="text-white/35">· {model.tab}</span>
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            <Stat value={s.rangeKm} unit="km" label={`Range${s.rangeStandard ? ` — ${s.rangeStandard}` : ""}`} />
            <Stat value={s.seats} label="Seats" />
            <Stat value={s.maxPowerKw} unit="kW" label="Max power" />
            <Stat value={s.maxTorqueNm} unit="Nm" label="Max torque" />
            <Stat value={s.batteryKwh} unit="kWh" label="Battery" />
            <Stat value={s.dcChargingKw} unit="kW" label="DC charging" />
            <Stat value={s.chargeMinutes} unit="min" label="20–80% charge" />
          </div>
          <p className="mt-10 text-xs text-white/40">*Specifications depend on selected variant and testing standards.</p>
        </div>
      </section>
    </>
  );
}
