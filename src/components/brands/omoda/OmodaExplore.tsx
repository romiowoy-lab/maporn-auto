"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, animate, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ShowcaseModel } from "@/components/brands/omoda/types";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function OmodaExplore({ models }: { models: ShowcaseModel[] }) {
  const [index, setIndex] = useState(0);
  const goTo = (i: number) => setIndex(((i % models.length) + models.length) % models.length);

  // Measure the real rendered card width + gap so the track shifts by exactly one card at
  // any breakpoint, instead of a fragile CSS calc() string.
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [step, setStep] = useState(0);

  const measure = useCallback(() => {
    const item = itemRef.current?.offsetWidth ?? 0;
    const gapStr = trackRef.current ? getComputedStyle(trackRef.current).columnGap : "0";
    const gap = parseFloat(gapStr) || 0;
    setStep(item + gap);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const controls = animate(x, -index * step, { duration: 0.7, ease: EASE });
    return () => controls.stop();
  }, [index, step, x]);

  return (
    <section id="explore" className="scroll-mt-16 bg-[#0a0a0b] py-16 sm:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Explore OMODA</p>
            <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-white">เลือกสัมผัส OMODA</h2>
            <p className="mt-1 text-sm text-white/60">ยนตรกรรมที่สะท้อนตัวตนของคุณ ในทุกเส้นทาง</p>
          </div>

          {models.length > 1 && (
            <div className="flex items-center gap-3 text-white/70 text-xs font-semibold">
              <button
                type="button"
                aria-label="รุ่นก่อนหน้า"
                onClick={() => goTo(index - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all hover:border-white/50 hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span>
                {String(index + 1).padStart(2, "0")} / {String(models.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label="รุ่นถัดไป"
                onClick={() => goTo(index + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all hover:border-white/50 hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Two-up "peek" track — active card large & fully visible, the next one peeks in
          from the right edge, matching the reference layout. */}
      <div className="container-page overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-6">
          {models.map((m, i) => (
            <div
              key={m.slug}
              ref={i === 0 ? itemRef : undefined}
              className="relative shrink-0 w-[88%] sm:w-[70%] lg:w-[62%] aspect-[16/10] rounded-2xl overflow-hidden bg-[#111214]"
            >
              <Image
                src={m.image}
                alt={`${m.brandLabel} ${m.name}`}
                fill
                sizes="(max-width: 1024px) 88vw, 62vw"
                style={{ objectPosition: m.imagePosition ?? "center" }}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">{m.brandLabel}</p>
                <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
                  {m.brandLabel} {m.name}
                </h3>
                <p className="mt-1 text-xs text-white/50 uppercase tracking-wide">{m.tagline}</p>
                <Link
                  href={`/cars/${m.slug}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-white hover:text-[#0a0a0b]"
                  onClick={(e) => {
                    if (i !== index) {
                      e.preventDefault();
                      goTo(i);
                    }
                  }}
                >
                  Explore Model
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
