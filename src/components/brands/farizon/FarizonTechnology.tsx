"use client";

import { motion } from "framer-motion";
import { TECH_FEATURES, PENDING } from "@/lib/data/farizonData";

export default function FarizonTechnology() {
  return (
    <section id="technology" className="scroll-mt-32 relative overflow-hidden border-t border-white/10 bg-[#000000] py-16 sm:py-24">
      {/* Blueprint silhouette */}
      <svg aria-hidden className="pointer-events-none absolute right-[-4%] top-1/2 hidden w-[55%] -translate-y-1/2 text-[#00F0FF]/15 lg:block" viewBox="0 0 600 220" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M20 170h560M40 170V95c0-8 6-14 14-14h300c14 0 26 6 34 16l50 45c8 8 12 18 12 28v0M120 170a34 34 0 1 0 68 0M420 170a34 34 0 1 0 68 0M354 81V44c0-6 4-10 10-10h170" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M60 120h240M60 140h240" strokeDasharray="4 6" />
      </svg>
      <div className="container-page relative">
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">Intelligent technology</h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:w-3/5"
        >
          {TECH_FEATURES.map((f) => (
            <motion.div
              key={f.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-[#00F0FF]/50"
            >
              <p className="text-sm font-extrabold tracking-[0.12em] text-white">{f.name}</p>
              <p className="mt-1.5 text-xs text-white/45">{f.description ?? PENDING}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
