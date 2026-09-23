"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroCarousel from "@/components/home/HeroCarousel";

const easeOut = [0.16, 1, 0.3, 1] as const;

const eyebrowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const imageVariants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.2, ease: easeOut, delay: 0.15 } },
};

const belowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.6 } },
};

export default function Hero() {
  return (
    <section className="relative bg-neutral-950 -mt-24 md:-mt-32 pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
      <div className="container-page">
        <div className="hidden md:block">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={eyebrowVariants}
            className="text-center mb-6 md:mb-10"
          >
            <p className="text-white/45 text-[11px] md:text-xs font-semibold uppercase tracking-[0.35em]">
              Maporn Autogroup
            </p>
            <p className="mt-2 text-white text-base md:text-lg font-light">7 แบรนด์ในที่เดียว</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={imageVariants}
            className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-xl"
            style={{ aspectRatio: "1536 / 1024" }}
          >
            <Image
              src="/brand/hero-7-brands.jpg"
              alt="7 แบรนด์ในเครือ Maporn Autogroup: Suzuki, Farizon, Wuling, Nex, GWM, JAECOO, Lepas"
              fill
              priority
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={belowVariants}
            className="mt-8 md:mt-12 text-center"
          >
            <p className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-[-0.02em]">
              Drive The Future
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/cars"
                className="btn-outline border-white! text-white! hover:bg-white! hover:text-brand-navy!"
              >
                ดูรถยนต์
              </Link>
              <Link href="/test-drive" className="btn-red">
                ทดลองขับ
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="md:hidden pt-2">
          <p className="text-white/45 text-[11px] font-semibold uppercase tracking-[0.35em] text-center mb-4">
            Maporn Autogroup
          </p>
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
