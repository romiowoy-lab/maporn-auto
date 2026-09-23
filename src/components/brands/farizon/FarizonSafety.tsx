"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SAFETY_FEATURES, PENDING } from "@/lib/data/farizonData";

export default function FarizonSafety() {
  return (
    <section className="border-t border-white/10 bg-[#0B0F12] py-16 sm:py-24">
      <div className="container-page">
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">Safety &amp; engineering</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SAFETY_FEATURES.map((f) => (
            <motion.div
              key={f.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-5"
            >
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#00F0FF]" />
              <div>
                <p className="text-sm font-bold text-white">{f.name}</p>
                <p className="mt-1 text-xs text-white/45">{f.description ?? PENDING}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
