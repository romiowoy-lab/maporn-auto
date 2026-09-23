"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ScrollFx from "@/components/ui/ScrollFx";

// Real Lepas L6 photography only (manufacturer product photos, no price/promo posters).
const LOOKS = [
  { key: "orange", label: "Orange", swatch: "#D9581F", image: "/brand/studio3/lepas-l6-orange.jpg" },
  { key: "purple", label: "Purple", swatch: "#7B5A9E", image: "/brand/studio3/lepas-l6-purple.jpg" },
  { key: "white", label: "White", swatch: "#F1F1EE", image: "/brand/studio3/lepas-l6-white.jpg" },
  { key: "gray", label: "Gray", swatch: "#5C6066", image: "/brand/studio3/lepas-l6-gray.jpg" },
] as const;

type Tile = { src: string; alt: string; caption: string; className: string; position?: string };

const TILES: Tile[] = [
  {
    src: "/brand/studio3/lepas-l6-studio-orange-dark.jpg",
    alt: "Lepas L6 สีส้มในสตูดิโอ",
    caption: "Studio",
    className: "col-span-2 lg:col-span-4 lg:row-span-2",
  },
  {
    src: "/brand/studio3/lepas-l6-detail-drive.jpg",
    alt: "ภายในห้องโดยสาร Lepas L6 ขณะขับขี่",
    caption: "Drive",
    className: "row-span-2 lg:col-span-2 lg:row-span-3",
  },
  {
    src: "/brand/studio3/lepas-l6-cabin.jpg",
    alt: "ภายใน Lepas L6",
    caption: "Cabin",
    className: "lg:col-span-2",
  },
  {
    src: "/brand/studio3/lepas-l6-cargo.jpg",
    alt: "พื้นที่เก็บของท้าย Lepas L6",
    caption: "Cargo",
    className: "lg:col-span-2",
  },
  {
    src: "/brand/studio3/lepas-l6-detail-badge.jpg",
    alt: "โลโก้ Lepas บนตัวรถสีม่วง",
    caption: "Emblem",
    className: "col-span-2 lg:col-span-3",
  },
  {
    src: "/brand/studio3/lepas-l6-detail-taillight.jpg",
    alt: "ไฟท้าย Lepas L6",
    caption: "Light signature",
    className: "col-span-2 lg:col-span-3",
  },
];

export default function LepasShowcase() {
  const [active, setActive] = useState(0);
  const look = LOOKS[active];

  return (
    <section id="showcase" className="scroll-mt-32 relative bg-[#0a0a0b] border-t border-white/[0.06]">
      {/* Full-bleed colour stage — heading and swatches sit on the photo's empty upper area */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] max-h-[92vh] overflow-hidden bg-[#111113]">
        <AnimatePresence mode="wait">
          <motion.div
            key={look.key}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={look.image}
              alt={`Lepas L6 สี ${look.label}`}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "50% 75%" }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 top-0 z-10 pt-8 sm:pt-12">
          <div className="container-page flex flex-wrap items-start justify-between gap-4">
            <div style={{ textShadow: "0 2px 14px rgba(0,0,0,0.65)" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8C77E]">Showcase</p>
              <h2 className="mt-2 text-3xl sm:text-5xl font-extralight tracking-tight text-white">
                Lepas L6
                <br /> in Every Light
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="เลือกสีรถ">
              {LOOKS.map((l, i) => (
                <button
                  key={l.key}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 rounded-full border bg-black/45 px-3 py-1.5 text-xs tracking-wide text-white backdrop-blur-sm transition-colors duration-300 ${
                    i === active ? "border-[#E8C77E]" : "border-white/30 hover:border-white/70"
                  }`}
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-white/40" style={{ backgroundColor: l.swatch }} />
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail mosaic */}
      <div className="mt-0.5">
        <ScrollFx effect="fade-up" stagger={0.1} className="grid grid-cols-2 auto-rows-[170px] sm:auto-rows-[220px] lg:grid-cols-6 lg:auto-rows-[240px] gap-0.5">
          {TILES.map((t) => (
            <figure key={t.src} className={`group relative overflow-hidden rounded-sm bg-[#111113] ${t.className}`}>
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                style={{ objectPosition: t.position ?? "center" }}
              />
              <figcaption
                className="absolute left-4 bottom-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
              >
                {t.caption}
              </figcaption>
            </figure>
          ))}
        </ScrollFx>
      </div>
    </section>
  );
}
