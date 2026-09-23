"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function GwmHero() {
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: px * 14, y: py * 10 });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#080808]">
      {/* Cinematic background — real GWM Tank 500 photo, full-bleed, no crop of the car itself. */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0) scale(${mounted ? 1.08 : 1.14})`,
          transitionProperty: "transform",
          transitionDuration: mounted ? "12s" : "700ms",
          transitionTimingFunction: mounted ? "ease-out" : "ease-out",
        }}
      >
        <Image
          src="/brand/models/gwm-tank500-canyon-hero.jpg"
          alt="GWM Tank 500"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_55%]"
        />
      </div>

      {/* No dark overlay/gradient here — the photo is shown at its full original color.
          Text legibility comes from text-shadow on the copy itself instead. */}

      {/* Subtle diagonal light sweep across the car, once on load */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1800ms] ease-out ${
          mounted ? "translate-x-[420%]" : "translate-x-0"
        }`}
      />

      <div className="relative z-10 flex h-full items-center">
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20">
          <div
            className={`max-w-xl transition-all duration-1000 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.85), 0 12px 32px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.9)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Image src="/brand/logos/gwm.png" alt="GWM" width={44} height={44} className="h-9 w-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]" />
              <span className="h-6 w-px bg-white/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">Maporn Autogroup</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-white leading-[1.02]">
              GWM
            </h1>
            <p className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">By Maporn Autogroup</p>
            <p className="mt-3 text-sm sm:text-base font-extrabold uppercase tracking-[0.25em] text-[#ff4545]">
              The Power of Intelligence
            </p>
            <p className="mt-5 text-base sm:text-lg text-white/95 leading-relaxed max-w-md">
              สัมผัสรถยนต์ GWM รุ่นล่าสุด พร้อมคำแนะนำและบริการจาก Maporn Autogroup
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/cars?brand=gwm"
                className="group rounded-lg bg-brand-red px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(223,0,0,0.6)] transition-all hover:brightness-110 hover:-translate-y-0.5"
              >
                ดูรถทั้งหมด
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/contact?brand=gwm"
                className="rounded-lg border border-white/25 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/45"
              >
                ติดต่อฝ่ายขาย
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dealer strip — slim glass bar along the bottom edge (no gradient wash), so the
          "authorized dealer" message reads without sitting on the car. */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-black/45 backdrop-blur-md">
        <div className="flex flex-col gap-2 px-6 py-3 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 xl:px-20">
          <div className="flex items-baseline gap-3">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-white">MAPORN AUTOGROUP</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/70">Authorized Dealer</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-medium text-white/90">
            {["โชว์รูม", "ทดลองขับ", "สินเชื่อ", "บริการหลังการขาย"].map((label, i, arr) => (
              <span key={label} className="flex items-center gap-4">
                {label}
                {i < arr.length - 1 && <span className="text-white/30">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
