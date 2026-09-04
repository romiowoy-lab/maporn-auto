"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export interface GalleryImage {
  src?: string;
  label: string;
  sublabel?: string;
  colorHex?: string;
  placeholderDark?: boolean;
}

function GalleryFrame({ image, className, priority }: { image: GalleryImage; className: string; priority?: boolean }) {
  if (image.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={image.src}
          alt={image.label}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <PlaceholderImage
      label={image.label}
      sublabel={image.sublabel}
      colorHex={image.colorHex}
      dark={image.placeholderDark}
      className={className}
    />
  );
}

export default function VehicleGallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const showPrev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="block w-full text-left"
          aria-label={`ดูรูปขยาย ${images[0].label}`}
        >
          <GalleryFrame image={images[0]} className="aspect-[4/3] rounded-2xl" priority />
        </button>
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-3">
            {images.slice(1).map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpenIndex(i + 1)}
                className="block text-left"
                aria-label={`ดูรูปขยาย ${img.label}`}
              >
                <GalleryFrame image={img} className="aspect-square rounded-xl" />
              </button>
            ))}
          </div>
        )}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          role="dialog"
          aria-modal="true"
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX;
            if (delta > 50) showPrev();
            else if (delta < -50) showNext();
            setTouchStartX(null);
          }}
        >
          <div className="flex items-center justify-between p-4 text-white text-sm">
            <span>
              {openIndex + 1} / {images.length}
            </span>
            <button type="button" onClick={close} aria-label="ปิด" className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center px-4 pb-4">
            <div className="relative w-full h-full max-w-4xl">
              <GalleryFrame image={images[openIndex]} className="h-full w-full rounded-xl" priority />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="รูปก่อนหน้า"
                  className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5">
                    <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="รูปถัดไป"
                  className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5">
                    <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
