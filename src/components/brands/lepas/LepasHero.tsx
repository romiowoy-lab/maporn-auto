"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import BrandHeroCTA from "@/components/brands/BrandHeroCTA";

export default function LepasHero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0a0a0b]">
      {/* Real Lepas test-drive footage, shown at its original color — no gradient wash.
          Text legibility comes from a text-shadow instead. */}
      <video preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        poster="/brand/hero/lepas-l6-test-drive-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/brand/video/lepas-l6-test-drive.mp4" type="video/mp4" />
      </video>

      <motion.div
        style={{
          opacity: contentOpacity,
          textShadow: "0 2px 8px rgba(0,0,0,0.85), 0 10px 30px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.95)",
        }}
        className={`relative z-10 flex h-full items-end pb-24 sm:pb-28 transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#E8C77E] mb-3">Maporn Autogroup · Lepas</p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            ทดสอบรถยนต์ Lepas L6
          </h1>
          <p className="mt-3 text-sm sm:text-base font-semibold uppercase tracking-[0.3em] text-[#E8C77E]">
            Drive Your Elegance
          </p>
          <p className="mt-3 max-w-md text-sm sm:text-base text-white/90">
            ยนตรกรรมไฟฟ้าที่ถ่ายทอดความสง่างามในทุกการขับขี่
          </p>

          <div className="mt-7 flex flex-wrap gap-3" style={{ textShadow: "none" }}>
            <BrandHeroCTA detailsHref="#story" testDriveHref="/test-drive?brand=lepas" />
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/70"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
