"use client";

import { motion } from "framer-motion";
import { Zap, Cpu, Layers, Briefcase } from "lucide-react";

const CARDS = [
  { icon: Zap, title: "ELECTRIC", text: "High-efficiency EV platform" },
  { icon: Cpu, title: "INTELLIGENT", text: "Connected fleet & drive-by-wire" },
  { icon: Layers, title: "FLEXIBLE", text: "Modular body & cargo configurations" },
  { icon: Briefcase, title: "BUSINESS-READY", text: "Designed for maximum uptime and ROI" },
];

export default function FarizonBrand() {
  return (
    <section className="border-t border-white/10 bg-[#0B0F12] py-16 sm:py-24">
      <div className="container-page">
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">More than a van</h2>
        <p className="mt-2 text-sm sm:text-base uppercase tracking-[0.2em] text-[#E2E8F0]/60">A flexible electric platform for business</p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CARDS.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#00F0FF]/50 hover:bg-white/[0.06]"
            >
              <Icon className="h-6 w-6 text-[#00F0FF]" />
              <h3 className="mt-5 text-lg font-extrabold tracking-wide text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-[#E2E8F0]/60">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
