"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ImageSlot from "@/components/brands/wuling/ImageSlot";
import BrandHeroCTA from "@/components/brands/BrandHeroCTA";

// Wuling Eksion EV — studio renders and photos supplied by the client (Oct 2026). Prices from the official
// Wuling Thailand launch poster; specs aren't confirmed yet, so those go to the showroom.
const ACCENT = "#7FA7E8";
const ease = [0.16, 1, 0.3, 1] as const;

const COLORS = [
  { name: "White", swatch: "#E9EBF0", image: "/brand/wuling-eksion/eksion-white.webp" },
  { name: "Blue", swatch: "#1F4FB8", image: "/brand/wuling-eksion/eksion-blue.webp" },
  { name: "Beige", swatch: "#D9C3AE", image: "/brand/wuling-eksion/eksion-beige.webp" },
  { name: "Black", swatch: "#111214", image: "/brand/wuling-eksion/eksion-black.webp" },
];

const PRICES = [
  { name: "Comfort", price: 799000 },
  { name: "Premium", price: 859000 },
];

const P = "/brand/wuling-eksion";
const GALLERY = [
  { src: `${P}/photo-field.webp`, alt: "Wuling Eksion EV สีเงินท่ามกลางทุ่งนา", className: "col-span-2 row-span-2 lg:col-span-7" },
  { src: `${P}/photo-charging.webp`, alt: "Wuling Eksion EV ขณะชาร์จไฟ", className: "lg:col-span-5" },
  { src: `${P}/photo-event.webp`, alt: "Wuling Eksion EV งานเปิดตัว", className: "lg:col-span-5" },
];

export default function WulingEksionShowroom() {
  const [color, setColor] = useState(0);
  const c = COLORS[color];

  return (
    <div className="bg-[#101114]">
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#101114]">
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease }}
          className="absolute inset-0 lg:left-[22%]"
        >
          <ImageSlot src="/brand/wuling-eksion/hero.webp" label="Wuling Eksion EV" className="h-full w-full" priority position="70% center" />
        </motion.div>
        <div className="relative z-10 container-page flex min-h-[calc(100vh-4.5rem)] items-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="max-w-xl rounded-2xl bg-[#101114]/80 p-6 backdrop-blur-md sm:p-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
          >
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-white/85 sm:text-base">Wuling Eksion EV</p>
            <p className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Electric
              <br />
              SUV
            </p>
            <p className="mt-5 text-base text-white/80 sm:text-lg">SUV ไฟฟ้า 100% ดีไซน์แกร่ง พร้อมทุกการเดินทางของครอบครัว</p>
            <p className="mt-3 text-lg font-bold text-white">เริ่มต้น <span style={{ color: ACCENT }}>799,000</span> บาท</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BrandHeroCTA detailsHref="#eksion-colors" testDriveHref="/test-drive?brand=wuling" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* COLOURS */}
      <section id="eksion-colors" className="scroll-mt-32 border-t border-white/[0.06] bg-gradient-to-b from-[#1b1c20] to-[#101114] py-14 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Choose your colour</h2>
              <p className="mt-2 text-sm text-white/60 sm:text-base">เลือกสีที่ใช่สำหรับคุณ · {COLORS.length} สี</p>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="เลือกสีรถ">
              {COLORS.map((col, i) => (
                <button
                  key={col.name}
                  type="button"
                  role="tab"
                  aria-selected={i === color}
                  onClick={() => setColor(i)}
                  className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs text-white transition-colors ${i === color ? "" : "border-white/20 hover:border-white/60"}`}
                  style={i === color ? { borderColor: ACCENT } : undefined}
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-white/40" style={{ backgroundColor: col.swatch }} />
                  {col.name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-10 aspect-[2/1] w-full max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0"
              >
                <ImageSlot src={c.image} label={`Wuling Eksion EV สี ${c.name}`} className="h-full w-full" fit="contain" />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-x-[12%] bottom-[4%] h-8 rounded-[100%] bg-black/60 blur-2xl" />
          </div>
        </div>
      </section>

      {/* PHOTO STORY */}
      <section className="border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative aspect-[16/9] sm:aspect-[21/9]">
              <Image src={`${P}/photo-mountain.webp`} alt="Wuling Eksion EV สีน้ำเงินบนเส้นทางภูเขา" fill sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-center p-6 sm:p-12">
              <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">Built for<br />every road</h2>
              <p className="mt-3 text-sm text-white/80 sm:text-base">ดีไซน์ SUV ที่แข็งแกร่ง พร้อมพาทุกคนในครอบครัวไปได้ทุกที่</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 auto-rows-[150px] gap-3 sm:auto-rows-[220px] lg:grid-cols-12">
            {GALLERY.map((g) => (
              <figure key={g.src} className={`group relative overflow-hidden rounded-2xl bg-[#1C1E22] ${g.className}`}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-gradient-to-b from-[#121a2b] to-[#101114] py-14 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Eksion EV</h2>
            <p className="mt-2 text-sm text-white/60 sm:text-base">เปิดตัวอย่างเป็นทางการ · ราคาจำหน่าย</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {PRICES.map((p) => (
                <div key={p.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">Eksion EV</p>
                  <h3 className="mt-1 text-2xl font-bold uppercase text-white">{p.name}</h3>
                  <p className="mt-3 text-3xl font-extrabold tracking-tight" style={{ color: ACCENT }}>
                    {p.price.toLocaleString("en-US")} <span className="text-sm font-normal text-white/60">บาท</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-white/45">ราคาตามประกาศของ Wuling ประเทศไทย สอบถามโปรโมชั่นและข้อมูลสเปคได้ที่โชว์รูม</p>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            <Image src={`${P}/poster-price.webp`} alt="Wuling Eksion EV ราคา Comfort 799,000 บาท Premium 859,000 บาท" fill sizes="384px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* DETAILS PENDING → showroom */}
      <section className="border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
        <div className="container-page flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">นัดดูรถและทดลองขับ Eksion EV</h2>
          <p className="mt-3 max-w-xl text-sm text-white/60 sm:text-base">ทีมงาน Wuling มาพร ระยอง พร้อมให้ข้อมูลรุ่น ราคา และโปรโมชั่นล่าสุด</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/quotation?brand=wuling" className="rounded-lg px-7 py-3 text-sm font-bold text-[#0b1424] transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ขอใบเสนอราคา
            </Link>
            <a href="tel:0647494989" className="rounded-lg border border-white/40 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
              โทร 064-749-4989
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
