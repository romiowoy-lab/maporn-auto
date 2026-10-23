"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { BranchPhoto } from "@/lib/data/branchPhotos";

// Photo grid for a branch page; tap a photo to open it full-screen (arrow keys / Esc work too).
export default function BranchGallery({ photos, title }: { photos: BranchPhoto[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <section className="border-t border-white/10 py-12 sm:py-16">
      <div className="container-page">
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-1 text-sm text-white/55">{photos.length} ภาพ · แตะเพื่อดูภาพขนาดใหญ่</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((ph, i) => (
            <button
              key={ph.src}
              type="button"
              onClick={() => setOpen(i)}
              className={`group relative overflow-hidden rounded-xl bg-[#1C1E22] ${i === 0 ? "col-span-2 row-span-2 aspect-[4/3] lg:aspect-auto" : "aspect-[4/3]"}`}
              aria-label={`ดูภาพ: ${ph.alt}`}
            >
              <Image
                src={ph.src}
                alt={ph.alt}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-8 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 sm:text-sm">
                {ph.alt}
              </span>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95" role="dialog" aria-modal="true" aria-label={photos[open].alt} onClick={close}>
          <div className="flex items-center justify-between p-4 text-sm text-white/80">
            <span>
              {open + 1} / {photos.length} · {photos[open].alt}
            </span>
            <button type="button" onClick={close} className="rounded-full p-2 hover:bg-white/10" aria-label="ปิด">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[open].src} alt={photos[open].alt} fill sizes="100vw" className="object-contain" />
            <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/80" aria-label="ภาพก่อนหน้า">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/80" aria-label="ภาพถัดไป">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
