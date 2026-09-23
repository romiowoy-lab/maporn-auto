"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { getModel } from "@/lib/data/models";
import { getBrand } from "@/lib/data/brands";

// 8 real flagship models, one per brand — each picked because it has a real product
// photo in the project. Only 2 of the 8 (Suzuki, OMODA) have a real full-scene photo
// suitable as an edge-to-edge background (`scene: true`); the other 6 are transparent
// product cutouts with no real background of their own, so they render on a soft
// brand-tinted gradient backdrop instead of a fabricated photo — full-bleed either way,
// but only the `scene` cars are an actual photograph filling the section.
const SPOTLIGHT_SLUGS = [
  // Order: JAECOO first, Suzuki second-to-last, NEX last (client request).
  { slug: "jaecoo-j7", badge: "ADVENTURE SUV", heroImg: "/brand/models/jaecoo-j7-dust-hero.jpg", video: "/brand/video/jaecoo-j7-hero-motion.mp4", scene: true, imagePosition: "62% 40%", noOverlay: true },
  { slug: "farizon-sv", badge: "COMMERCIAL CARGO VAN", heroImg: "/brand/studio/farizon-sv-hero.jpg", video: "/brand/video/farizon-sv-hero-motion.mp4", scene: true },
  { slug: "wuling-xingguang-s60", badge: "7-SEAT HYBRID SUV", heroImg: "/brand/studio/wuling-xingguang-s60-hero.jpg", video: "/brand/video/wuling-xingguang-s60-hero-motion.mp4", scene: true },
  { slug: "gwm-tank-300", badge: "OFF-ROAD SUV", heroImg: "/brand/studio/gwm-tank300-forest-hero.jpg", video: "/brand/video/gwm-tank300-diesel.mp4", scene: true },
  { slug: "omoda-5", badge: "SMART CROSSOVER", heroImg: "/brand/studio/omoda-studio.jpg", video: "/brand/video/omoda-5-hero-motion.mp4", scene: true, imagePosition: "center" },
  { slug: "lepas-l6", badge: "PREMIUM LIFESTYLE EV", heroImg: "/brand/models/lepas-l6-studio-sharp.jpg", video: "/brand/video/lepas-l6-hero-full.mp4", scene: true, noOverlay: true },
  { slug: "suzuki-fronx", badge: "NEW ARRIVAL / 2026", heroImg: "/brand/studio/suzuki-fronx-bridge.jpg", video: "/brand/video/suzuki-fronx-iconic-drive.mp4", scene: true, imagePosition: "64% center" },
  // The NEX slide features the electric tractor head (official NEX clip, contact end-card trimmed off),
  // so its text is overridden instead of using the catalog's pickup model.
  {
    slug: "nex-bev-pickup",
    badge: "EV TRACTOR",
    heroImg: "/brand/hero/nex-ev-tractor-poster.jpg",
    video: "/brand/video/nex-ev-tractor.mp4",
    scene: true,
    override: {
      name: "EV Tractor",
      description: "รถหัวลากไฟฟ้า 100% แบตเตอรี่ 282.62 kWh บรรทุกเต็มพิกัด 50.5 ตัน",
      href: "/brands/nex",
    },
  },
];

const CARS = SPOTLIGHT_SLUGS.flatMap(({ slug, badge, heroImg, video, scene, imagePosition, noOverlay, override }: (typeof SPOTLIGHT_SLUGS)[number] & { override?: { name: string; description: string; href: string } }) => {
  const model = getModel(slug);
  if (!model) return [];
  const brand = getBrand(model.brandSlug);
  return [
    {
      model,
      badge,
      heroImg: heroImg ?? model.image,
      video,
      scene: scene ?? false,
      imagePosition: imagePosition ?? "center",
      noOverlay: noOverlay ?? false,
      override,
      brandColor: brand?.colorHex ?? "#1c1e20",
      brandLogo: brand?.logo,
    },
  ];
});

// Clips that actually contain an audio track (the other hero clips are silent files).
const CLIPS_WITH_AUDIO = new Set(["/brand/video/suzuki-fronx-iconic-drive.mp4", "/brand/video/gwm-tank300-diesel.mp4"]);

export default function MapornHero() {
  const [selected, setSelected] = useState(0);
  // Browsers only allow sound after a user click, so videos start muted and this toggles it.
  const [sound, setSound] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const car = CARS[selected];
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = !sound;
  }, [sound, selected]);
  const goTo = (i: number) => setSelected((i + CARS.length) % CARS.length);
  const next = () => setSelected((v) => (v + 1) % CARS.length);

  // Photo slides auto-advance on a steady 5s timer. Video slides instead play their
  // real full length and advance from the video's own "ended" event (wired on the
  // <video> element below) — so a 10s clip and a 2:24 brand film each get watched in
  // full instead of being cut off by a fixed timer.
  useEffect(() => {
    if (car?.video) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [selected, car?.video]);

  if (!car) return null;

  return (
    <section className="relative w-full min-h-[720px] lg:min-h-[760px] xl:min-h-[800px] overflow-hidden bg-[#111214]">
      {/* Warm the browser cache with the NEXT slide's clip so it starts instantly (no poster flash) */}
      {(() => {
        const nextCar = CARS[(selected + 1) % CARS.length];
        return nextCar?.video ? <video key={`pre-${nextCar.video}`} src={nextCar.video} preload="auto" muted playsInline aria-hidden="true" tabIndex={-1} className="pointer-events-none absolute h-px w-px opacity-0" /> : null;
      })()}
      {/* ================= FULL-BLEED BACKGROUND ================= */}
      <div key={`bg-${car.model.slug}`} className="absolute inset-0 hero-fade">
        {car.scene && car.video ? (
          <video preload="auto"
            key={car.video}
            ref={videoRef}
            autoPlay
            muted={!sound}
            playsInline
            poster={car.heroImg}
            onEnded={next}
            style={{ objectPosition: car.imagePosition }}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={car.video} type="video/mp4" />
          </video>
        ) : car.scene ? (
          <Image
            src={car.heroImg}
            alt={car.override?.name ?? car.model.name}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: car.imagePosition }}
            className="object-cover"
          />
        ) : (
          <>
            {/* No real environment photo exists for this car — a soft brand-tinted
                studio backdrop instead of a fabricated scene, product still full-bleed. */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(120% 100% at 78% 45%, ${car.brandColor}33 0%, #14161a 55%, #0c0d0f 100%)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-end pr-[4%] sm:pr-[8%]">
              <div className="relative h-[62%] w-[58%] sm:w-[52%]">
                <Image
                  src={car.heroImg}
                  alt={car.override?.name ?? car.model.name}
                  fill
                  priority
                  sizes="60vw"
                  className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          </>
        )}

        {/* Readability gradient: near-opaque over the text side, fading to natural photo on the right.
            Skipped entirely for cars flagged noOverlay — the supplied photo is shown 100% as-is,
            with no color/light adjustment, even where the text then sits directly on the car. */}
        {!car.noOverlay && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,11,13,0.92) 0%, rgba(10,11,13,0.72) 30%, rgba(10,11,13,0.28) 55%, rgba(10,11,13,0) 78%)",
            }}
          />
        )}
      </div>

      {/* ================= TEXT CONTENT, on top of the background ================= */}
      <div className="relative z-10 flex min-h-[640px] lg:min-h-[680px] items-center px-6 sm:px-10 lg:px-16 pb-28 pt-24">
        <motion.div
          key={`text-${car.model.slug}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
          style={
            car.noOverlay
              ? { textShadow: "0 2px 6px rgba(0,0,0,0.85), 0 8px 24px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.9)" }
              : undefined
          }
        >
          <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] ${car.noOverlay ? "text-white" : "text-white/70"}`}>
            <span className="h-px w-7 bg-brand-red" />
            {car.badge}
          </p>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] text-white">
            {car.model.isNew && !car.override ? "ALL-NEW " : ""}
            {getBrandLabel(car.model.brandSlug).toUpperCase()}
            <br />
            <span className="text-brand-red">{(car.override?.name ?? car.model.name).toUpperCase()}</span>
          </h1>

          <p className={`mt-5 max-w-md text-sm sm:text-base leading-relaxed font-medium ${car.noOverlay ? "text-white/95" : "text-white/70"}`}>
            {car.override?.description ?? car.model.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={car.override?.href ?? `/cars/${car.model.slug}`}
              className="rounded-lg bg-brand-red px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(223,0,0,0.5)] transition-all hover:brightness-110 hover:-translate-y-0.5"
            >
              ดูรายละเอียด
            </Link>
            <Link
              href={`/test-drive?model=${car.model.slug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
            >
              ทดลองขับ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/service#suzy-fix"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3.5 text-sm font-semibold tracking-wide text-white/80 transition-all hover:text-white hover:border-white/40"
            >
              <Wrench className="h-4 w-4" />
              ซ่อมสีและตัวถัง
            </Link>
          </div>
        </motion.div>
      </div>

      {car.video && CLIPS_WITH_AUDIO.has(car.video) && (
        <button
          type="button"
          onClick={() => setSound((v) => !v)}
          aria-label={sound ? "ปิดเสียงวิดีโอ" : "เปิดเสียงวิดีโอ"}
          className="absolute bottom-24 left-6 z-20 flex h-11 items-center gap-2 rounded-full border border-white/40 bg-black/45 px-4 text-xs font-bold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#111214] sm:left-10 lg:left-16"
        >
          {sound ? "🔊 ปิดเสียง" : "🔇 เปิดเสียง"}
        </button>
      )}

      {/* Bottom-right corner caption of the selected car, like a product photo credit */}
      <div className="absolute bottom-24 right-6 sm:right-10 lg:right-16 z-10 text-right leading-none">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
          {getBrandLabel(car.model.brandSlug)}
        </p>
        <p className="mt-1 text-lg font-extrabold uppercase tracking-tight text-white/90">{car.override?.name ?? car.model.name}</p>
      </div>

      {/* ================= MODEL SELECTOR — translucent bar overlaying the bottom of the Hero ================= */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/30 backdrop-blur-md">
        <div className="flex items-center gap-1 px-6 sm:px-10 lg:px-16 py-4">
          {/* Dot pagination — one per brand, active dot elongates + turns red */}
          <div className="flex flex-1 items-center justify-center gap-2">
            {CARS.map((c, i) => (
              <button
                key={c.model.slug}
                type="button"
                aria-label={getBrandLabel(c.model.brandSlug)}
                onClick={() => setSelected(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selected ? "w-7 bg-brand-red" : "w-2 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Prev/next arrow navigation, pinned to the right end of the selector bar */}
          <div className="flex shrink-0 items-center gap-2 pl-3">
            <button
              type="button"
              aria-label="รุ่นก่อนหน้า"
              onClick={() => goTo(selected - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="รุ่นถัดไป"
              onClick={() => goTo(selected + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .hero-fade { animation: heroFadeIn 0.5s ease; }
      `}</style>
    </section>
  );
}

function getBrandLabel(brandSlug: string) {
  const labels: Record<string, string> = {
    suzuki: "Suzuki",
    farizon: "Farizon",
    wuling: "Wuling",
    nex: "Nex",
    gwm: "GWM",
    omoda: "OMODA",
    jaecoo: "JAECOO",
    lepas: "Lepas",
  };
  return labels[brandSlug] ?? brandSlug;
}
