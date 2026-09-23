"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getBrandGroups } from "@/lib/data/brandGroups";
import { company } from "@/lib/data/company";

type Slide = {
  key: string;
  image?: string;
  video?: string;
  alt: string;
  eyebrow: string;
  title: string;
  wide?: boolean;
  position?: string;
  detailHref: string;
  testDriveHref: string;
};

// Real brand videos, reused from the desktop Hero (MapornHero.tsx) — same source files,
// just shown at mobile size here. GWM and Nex have no real brand video yet, so those two
// stay on their real photo.
const GROUP_VIDEOS: Record<string, string> = {
  suzuki: "/brand/video/suzuki-fronx-hero-motion.mp4",
  farizon: "/brand/video/farizon-sv-hero-motion.mp4",
  wuling: "/brand/video/wuling-xingguang-s60-hero-motion.mp4",
  "omoda-jaecoo": "/brand/video/omoda-5-hero-motion.mp4",
  lepas: "/brand/video/lepas-l6-hero-full.mp4",
  nex: "/brand/video/nex-ev-tractor.mp4",
};

export default function HeroCarousel() {
  const groups = getBrandGroups();
  const telHref = `tel:${company.salesPhone}`;
  const lineHref = `https://line.me/ti/p/${company.line}`;

  const unordered: Slide[] = [
    {
      key: "overview",
      image: "/brand/hero-7-brands.jpg",
      wide: true,
      alt: "7 แบรนด์ในเครือ Maporn Autogroup",
      eyebrow: "Maporn Autogroup",
      title: "7 แบรนด์ในที่เดียว",
      detailHref: "/brands",
      testDriveHref: "/test-drive",
    },
    ...groups.map((g) => ({
      key: g.key,
      image: g.key === "nex" ? "/brand/hero/nex-ev-tractor-poster.jpg" : `/brand/showcase/${g.key}.jpg`,
      video: GROUP_VIDEOS[g.key],
      alt: g.name,
      eyebrow: g.name,
      title: g.tagline,
      detailHref: g.href,
      testDriveHref: `/test-drive?brand=${g.slugs[0]}`,
    })),
    {
      key: "suzy-fix",
      image: "/brand/suzyfix/suzyfix-mechanic.jpg",
      position: "50% 35%",
      eyebrow: "Suzuki Official Service",
      alt: "Suzy Fix",
      title: "Suzy Fix — ตัวจริงด้านซ่อมสี",
      detailHref: "/service#suzy-fix",
      testDriveHref: "/service#suzy-fix",
    },
  ];

  // Same order as the desktop hero: JAECOO | OMODA first, Suzuki second-to-last, NEX last.
  // (Overview stays first; Suzy Fix sits just before Suzuki.)
  const ORDER = ["overview", "omoda-jaecoo", "farizon", "wuling", "gwm", "lepas", "suzy-fix", "suzuki", "nex"];
  const slides = [...unordered].sort((x, y) => ORDER.indexOf(x.key) - ORDER.indexOf(y.key));

  return (
    <div className="md:hidden -mx-5">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1.15}
        centeredSlides
        spaceBetween={12}
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="hero-carousel px-5 pb-9"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.key}>
            {/* Card = media on top (fills its box, no letterboxing) + solid info panel below */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101113]">
              <div className={`relative w-full overflow-hidden bg-neutral-950 ${slide.wide ? "aspect-[3/2]" : "aspect-[4/3]"}`}>
                {slide.video ? (
                  <video preload="metadata" autoPlay muted loop playsInline poster={slide.image} className="absolute inset-0 h-full w-full object-cover">
                    <source src={slide.video} type="video/mp4" />
                  </video>
                ) : slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="85vw"
                    className="object-cover"
                    style={{ objectPosition: slide.position ?? "center" }}
                  />
                ) : null}

                <div className="absolute top-3 right-3 z-10 flex gap-2">
                  <a href={telHref} aria-label="โทร" className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4c0 1-1 2-2 2C9.5 21 3 14.5 3 7c0-1 1-2 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a href={lineHref} target="_blank" rel="noreferrer" aria-label="Add Line OA" className="flex h-9 w-9 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                      <path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3 0 .7 0 1l-.1 1c0 .3-.2 1.1 1 .6s6.4-3.8 8.8-6.5C22.5 13.7 22 12.4 22 11c0-4.4-4.5-8-10-8Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="p-4">
                <p className="text-[#FF5A5A] text-[10px] font-semibold uppercase tracking-[0.2em]">{slide.eyebrow}</p>
                <h3 className="mt-1 text-white text-lg font-semibold leading-snug">{slide.title}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Link href="/contact" className="btn-red text-[11px] px-3 py-2">สอบถาม</Link>
                  <Link href={slide.testDriveHref} className="btn-outline border-white! text-white! hover:bg-white! hover:text-brand-navy! text-[11px] px-3 py-2">
                    นัดหมายชมรถ
                  </Link>
                  <Link href={slide.detailHref} className="text-white text-[11px] font-semibold underline underline-offset-4">
                    ดูรายละเอียดเพิ่มเติม
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
