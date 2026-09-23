"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ImageSlot from "@/components/brands/wuling/ImageSlot";
import { darion } from "@/lib/data/wuling-darion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function WulingHero() {
  // A finished poster banner already carries its own headline, so it fills the entire
  // hero (cover, no empty space) with no text of ours on top — only the CTAs at the bottom.
  if (darion.images.heroBanner) {
    return (
      <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#101114]">
        <h1 className="sr-only">Wuling ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
          className="absolute inset-0"
        >
          <Image
            src={darion.images.heroBanner}
            alt="Wuling Porta EV — Maporn Rayong"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 12%" }}
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-6 z-10 flex flex-wrap justify-center gap-3 px-4">
          <Link
            href="#design"
            className="rounded-lg bg-[#D8BFA0] px-8 py-3 text-sm font-bold text-[#231b10] shadow-lg transition-all hover:brightness-110 hover:-translate-y-0.5"
          >
            ดูรถ
          </Link>
          <Link
            href="/test-drive?brand=wuling"
            className="rounded-lg border border-white/50 bg-[#101114]/60 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]"
          >
            ทดลองขับ
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#101114]">
      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-0 lg:left-[22%]"
      >
        <ImageSlot src={darion.images.hero} label="Starlight Darion EV — ภาพหลัก" className="h-full w-full" priority position="100% center" />
      </motion.div>

      <div className="relative z-10 container-page flex min-h-[calc(100vh-4.5rem)] items-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="max-w-xl rounded-2xl bg-[#101114]/80 p-6 sm:p-8 backdrop-blur-md lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
        >
          <p className="text-sm sm:text-base font-medium uppercase tracking-[0.15em] text-white/85">Starlight Darion EV</p>
          <p className="mt-3 text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[1.02] tracking-tight text-white">
            Drive your
            <br />
            next journey
          </p>
          <p className="mt-5 text-base sm:text-lg text-white/80">เริ่มการเดินทางครั้งใหม่ของคุณ</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#design"
              className="rounded-lg bg-[#D8BFA0] px-8 py-3 text-sm font-bold text-[#231b10] transition-all hover:brightness-110 hover:-translate-y-0.5"
            >
              ดูรถ
            </Link>
            <Link
              href="/test-drive?brand=wuling"
              className="rounded-lg border border-white/40 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-[#101114]"
            >
              ทดลองขับ
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
