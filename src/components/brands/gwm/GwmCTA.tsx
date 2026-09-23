"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ScrollFx from "@/components/ui/ScrollFx";

// Real photos from Maporn's own GWM showroom/service center team. The slideshow sits on
// its own with nothing on top of it (so no one's face or body is covered); the text and
// buttons live in a solid panel directly beneath it.
const SLIDES = [
  "/brand/branches/gwm-team/gwm-team-logo-wall.jpg",
  "/brand/branches/gwm-team/gwm-showroom-exterior-team.jpg",
  "/brand/branches/gwm-team/gwm-delivery-ora5.jpg",
  "/brand/branches/gwm-team/gwm-tank-lineup-team.jpg",
  "/brand/branches/gwm-team/gwm-poer-sahar-team.jpg",
  "/brand/branches/gwm-team/gwm-lamlukka-welcome.jpg",
  "/brand/branches/gwm-team/gwm-service-desks.jpg",
  "/brand/branches/gwm-team/gwm-service-bay-team.jpg",
  "/brand/branches/gwm-team/gwm-technician-engine.jpg",
  "/brand/branches/gwm-team/gwm-workshop-team.jpg",
];

export default function GwmCTA() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-[#080808]">
      <div className="relative w-full aspect-[3/2] max-h-[80vh] min-h-[320px] overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={SLIDES[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[index]}
              alt="โชว์รูมและศูนย์บริการ GWM by Maporn Autogroup"
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <ScrollFx effect="fade-up" className="container-page py-14 sm:py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-4">Maporn Autogroup · GWM Showroom</p>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          โชว์รูม GWM by Maporn Autogroup
        </h2>
        <p className="mt-4 text-white/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          สัมผัสรถยนต์ GWM ทุกรุ่นแบบใกล้ชิดที่โชว์รูมมาตรฐานสากล พร้อมทีมงานผู้เชี่ยวชาญ
          คอยให้คำแนะนำตลอดการเลือกซื้อและดูแลหลังการขาย
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/test-drive?brand=gwm" className="rounded-lg bg-brand-red px-7 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 hover:-translate-y-0.5">
            นัดทดลองขับ →
          </Link>
          <Link href="/contact?brand=gwm" className="rounded-lg border border-white/25 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
            ติดต่อฝ่ายขาย
          </Link>
          <Link href="/quotation?brand=gwm" className="rounded-lg border border-white/25 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
            ขอใบเสนอราคา
          </Link>
        </div>
      </ScrollFx>
    </section>
  );
}
