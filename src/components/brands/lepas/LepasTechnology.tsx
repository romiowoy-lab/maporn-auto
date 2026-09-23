"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";

// Figures from the official "Lepas L6 Premium" spec sheet (21.7.26):
// 160 kW / 218 hp, 275 Nm, 13.2" touchscreen, 540 km NEDC.
const STATS = [
  { value: 218, suffix: "", label: "แรงม้า (HP)" },
  { value: 275, suffix: "", label: "แรงบิด (Nm)" },
  { value: 13.2, suffix: "\"", label: "จอสัมผัสกลาง" },
  { value: 540, suffix: " กม.", label: "ระยะทางขับเคลื่อนด้วยไฟฟ้า (NEDC)" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Number.isInteger(value) ? Math.round(v).toString() : v.toFixed(1)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function LepasTechnology() {
  return (
    <section id="technology" className="scroll-mt-32 relative bg-[#0a0a0b] py-16 sm:py-24 border-t border-white/[0.06] overflow-hidden">
      <div className="container-page grid lg:grid-cols-[1fr_320px] gap-12 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A15A]">Powered By</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 text-3xl sm:text-5xl font-extralight tracking-tight text-white"
          >
            Intelligent Technology
          </motion.h2>
          <p className="mt-2 text-sm text-white/60">เทคโนโลยีที่ขับเคลื่อนทุกเส้นทาง</p>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-5xl sm:text-6xl font-extralight tracking-tight text-white">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs sm:text-sm text-white/50 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[3/4] w-full max-w-xs mx-auto lg:mx-0 hidden sm:block">
          <Image
            src="/brand/studio2/lepas-l6-headlight-detail.jpg"
            alt="Lepas L6 headlight detail"
            fill
            sizes="320px"
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
