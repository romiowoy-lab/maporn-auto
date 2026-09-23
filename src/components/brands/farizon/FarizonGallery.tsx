"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FarizonImage from "@/components/brands/farizon/FarizonImage";
import { FARIZON_MODELS, PENDING } from "@/lib/data/farizonData";

export default function FarizonGallery({ onSelect }: { onSelect: (id: string) => void }) {
  const explore = (id: string) => {
    onSelect(id);
    document.getElementById("specifications")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="border-t border-white/10 bg-[#000000] py-16 sm:py-24">
      <div className="container-page">
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">Explore Farizon</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FARIZON_MODELS.map((m) => (
            <motion.article
              key={m.id}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="group overflow-hidden rounded-xl border border-white/10 bg-[#1A1F24] transition-all duration-300 hover:-translate-y-1 hover:border-[#00F0FF]/50"
            >
              <FarizonImage src={m.image} label={m.name} className="aspect-[3/2] w-full" />
              <div className="p-5">
                <h3 className="text-base font-extrabold uppercase tracking-wide text-white">{m.name}</h3>
                <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-[#00F0FF]/80">{m.bodyType}</p>
                <p className="mt-3 text-sm text-[#E2E8F0]/60">{m.tagline ?? PENDING}</p>
                <button
                  type="button"
                  onClick={() => explore(m.id)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors group-hover:text-[#00F0FF]"
                >
                  Explore specs <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
