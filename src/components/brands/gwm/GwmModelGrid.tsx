"use client";

import Link from "next/link";
import Image from "next/image";
import { formatTHB } from "@/lib/utils";

const MODEL_SHOWROOM_KEY: Record<string, string> = {
  "gwm-tank-300": "tank300",
  "gwm-tank-500": "tank500",
  "gwm-poer-sahar-diesel": "poer",
  "gwm-ora-5": "ora5",
  "gwm-haval-h6": "havalh6",
};

const GWM_MODELS = [
  {
    slug: "gwm-tank-300",
    name: "Tank 300",
    sub: "Hybrid",
    body: "SUV",
    fuelLabel: "Hybrid",
    fuelColor: "#FF7A1A",
    price: 1649000,
    img: "/brand/gwm-cards/tank-300.png",
  },
  {
    slug: "gwm-tank-500",
    name: "Tank 500",
    sub: "3.0T Diesel",
    body: "SUV",
    fuelLabel: "Diesel",
    fuelColor: "#5a5f65",
    price: 2299000,
    img: "/brand/gwm-cards/tank-500.png",
  },
  {
    slug: "gwm-poer-sahar-diesel",
    name: "POER SAHAR",
    sub: "Diesel",
    body: "Pickup",
    fuelLabel: "Diesel",
    fuelColor: "#B07B3E",
    price: 799000,
    img: "/brand/gwm-cards/poer-sahar.webp",
  },
  {
    slug: "gwm-ora-5",
    name: "ORA 5",
    sub: "HEV",
    body: "SUV",
    fuelLabel: "Hybrid",
    fuelColor: "#1A6B42",
    price: 709000,
    img: "/brand/gwm-cards/ora-5.png",
  },
  {
    slug: "gwm-haval-h6",
    name: "Haval H6",
    sub: "HEV · PHEV",
    body: "SUV",
    fuelLabel: "PHEV",
    fuelColor: "#0080C0",
    price: 899000,
    img: "/brand/gwm-cards/h6-hev.webp",
  },
];

export default function GwmModelGrid() {
  function goToShowroom(slug: string) {
    const key = MODEL_SHOWROOM_KEY[slug];
    if (key) {
      sessionStorage.setItem("gwm-init-view", key);
    }
    document.getElementById("showroom")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="bg-[#0d0e10] px-4 pb-6 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-12">
          <span className="flex h-10 items-center rounded-xl bg-white px-4 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logos/gwm.png" alt="GWM" className="h-5 w-auto object-contain" />
          </span>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            รุ่นรถยนต์ GWM
          </h2>
          <p className="max-w-md text-sm text-white/55 sm:text-base">
            เลือกรุ่นที่คุณสนใจเพื่อดูสเปก ราคา และเข้าชมโชว์รูมแบบ Immersive
          </p>
        </div>

        {/* Model Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {GWM_MODELS.map((m) => (
            <div
              key={m.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#17181b] transition-all duration-300 hover:border-white/25 hover:shadow-[0_0_32px_rgba(255,255,255,0.06)]"
            >
              {/* Clickable image + info → catalog page */}
              <Link href={`/cars/${m.slug}`} className="flex flex-col">
                {/* Image area — white bg so cutout cars look clean */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f5f5f3]">
                  <Image
                    src={m.img}
                    alt={`GWM ${m.name}`}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="px-3.5 pb-3 pt-3">
                  {/* Fuel badge */}
                  <span
                    className="mb-1.5 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${m.fuelColor}25`, color: m.fuelColor }}
                  >
                    {m.fuelLabel}
                  </span>

                  <p className="text-sm font-extrabold uppercase leading-tight tracking-tight text-white sm:text-base">
                    {m.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/45">{m.body} · {m.sub}</p>

                  <p className="mt-2 text-sm font-bold text-white/90">
                    {formatTHB(m.price)}
                  </p>
                  <p className="text-[10px] text-white/35">ราคาเริ่มต้น</p>
                </div>
              </Link>

              {/* Action buttons row — outside Link to avoid nested <a> */}
              <div className="mt-auto grid grid-cols-2 gap-1.5 px-2.5 pb-3">
                <Link
                  href={`/cars/${m.slug}`}
                  className="flex items-center justify-center rounded-lg border border-white/10 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/55 transition-colors hover:border-white/25 hover:text-white/90 sm:text-[11px]"
                >
                  รายละเอียด
                </Link>
                <button
                  type="button"
                  onClick={() => goToShowroom(m.slug)}
                  className="flex items-center justify-center rounded-lg px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:text-[11px]"
                  style={{ backgroundColor: m.fuelColor }}
                >
                  ดูโชว์รูม
                </button>
              </div>

              {/* Accent line on hover */}
              <div
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: m.fuelColor }}
              />
            </div>
          ))}
        </div>

        {/* Divider / CTA to showroom */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-10 sm:mt-16 sm:pt-12">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/35">หรือสำรวจโชว์รูมแบบ Immersive</p>
          <a
            href="#showroom"
            className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white/60 transition-colors hover:border-white/35 hover:text-white"
          >
            เข้าสู่โชว์รูม
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
