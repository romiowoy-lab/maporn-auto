"use client";

import { motion } from "framer-motion";
import ImageSlot from "@/components/brands/wuling/ImageSlot";
import { darion, PENDING, type DarionCallout } from "@/lib/data/wuling-darion";

function Callout({ item, align }: { item: DarionCallout; align: "left" | "right" }) {
  return (
    <div className={`flex items-center gap-3 ${align === "left" ? "lg:flex-row-reverse lg:text-right" : ""}`}>
      <div className="max-w-[15rem]">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-white">{item.title}</p>
        <p className="mt-0.5 text-xs text-white/50">{item.text ?? PENDING}</p>
      </div>
      {/* Connector: line + node dot, desktop only */}
      <span className="hidden lg:flex items-center flex-1 min-w-10">
        <span className="h-px flex-1 bg-white/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#D8BFA0]" />
      </span>
    </div>
  );
}

export default function WulingDesign() {
  const { callouts, images } = darion;
  return (
    <>
      {/* THE ART OF DESIGN — wide close-up band */}
      <section id="design" className="scroll-mt-24 relative h-[280px] sm:h-[340px] overflow-hidden bg-[#1a1b1f] border-t border-white/[0.06]">
        <ImageSlot src={images.design} label="Darion EV — ภาพโคลสอัพดีไซน์" className="absolute inset-0 h-full w-full" />
        <div className="relative z-10 container-page flex h-full items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">The art of design</h2>
            <p className="mt-2 text-sm sm:text-base text-white/85">ความลงตัวของความหรูหราและนวัตกรรม</p>
          </motion.div>
        </div>
      </section>

      {/* Feature callouts — car in the middle, lines/dots to each feature */}
      <section id="technology" className="scroll-mt-24 bg-[#26272b] py-14 sm:py-20">
        <div className="container-page grid lg:grid-cols-[1fr_1.4fr_1fr] gap-8 lg:gap-4 items-center">
          <div className="order-2 lg:order-1 space-y-8 lg:space-y-16">
            {callouts.left.map((c) => (
              <Callout key={c.title} item={c} align="left" />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <ImageSlot src={images.callouts} label="Darion EV — ภาพ 3/4 สำหรับชี้จุดเด่น" className="aspect-[4/3] w-full rounded-2xl" fit="contain" />
          </motion.div>

          <div className="order-3 space-y-8 lg:space-y-16">
            {callouts.right.map((c) => (
              <Callout key={c.title} item={c} align="right" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
