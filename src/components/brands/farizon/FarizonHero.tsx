"use client";

import { motion } from "framer-motion";
import FarizonImage from "@/components/brands/farizon/FarizonImage";
import { FARIZON_MODELS } from "@/lib/data/farizonData";

const ease = [0.16, 1, 0.3, 1] as const;

function DimLabel({ children, className }: { children: string; className: string }) {
  return (
    <span className={`absolute z-10 hidden md:flex items-center gap-1.5 rounded bg-black/60 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
      {children}
    </span>
  );
}

export default function FarizonHero() {
  const sv = FARIZON_MODELS[0];
  return (
    <section
      id="overview"
      className="relative min-h-[calc(100vh-7.5rem)] overflow-hidden bg-[#0B0F12]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    >
      <div className="container-page grid min-h-[calc(100vh-7.5rem)] items-center gap-10 py-14 lg:grid-cols-[0.9fr_1.3fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#00F0FF]">Farizon</p>
          <h1 className="mt-4 text-4xl sm:text-5xl xl:text-6xl font-extrabold uppercase leading-[1.02] tracking-tight text-white">
            Super van
            <br />
            built for business
          </h1>
          <p className="mt-5 max-w-md text-base text-[#E2E8F0]/80">Electric mobility engineered for the next generation of business.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#models" className="rounded-md bg-white px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-black transition-colors hover:bg-[#E2E8F0]">
              Explore the vehicle
            </a>
            <a href="#models" className="rounded-md border border-white/30 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:border-[#00F0FF] hover:text-[#00F0FF]">
              View models
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
          className="relative"
        >
          <FarizonImage src={sv.image} label="Farizon SuperVan" className="aspect-[3/2] w-full rounded-xl border border-white/10" priority />
          {/* Dimension indicators: thin lines with technical dots along the vehicle */}
          <span className="pointer-events-none absolute right-3 top-6 bottom-6 hidden w-px bg-[#00F0FF]/50 md:block" />
          <span className="pointer-events-none absolute bottom-3 left-8 right-16 hidden h-px bg-[#00F0FF]/50 md:block" />
          <DimLabel className="right-5 top-1/2 -translate-y-1/2">Cargo Height</DimLabel>
          <DimLabel className="bottom-6 left-1/3">Cargo Length</DimLabel>
          <DimLabel className="left-4 bottom-1/4">Cargo Width</DimLabel>
        </motion.div>
      </div>
    </section>
  );
}
