import Link from "next/link";
import Image from "next/image";
import { formatTHB } from "@/lib/utils";

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
  return (
    <section className="bg-[#0d0e10] px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
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
            เลือกรุ่นที่คุณสนใจเพื่อดูสเปก ราคา อุปกรณ์ และภาพรถ
          </p>
        </div>

        {/* Model Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {GWM_MODELS.map((m) => (
            <Link
              key={m.slug}
              href={`/cars/${m.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#17181b] transition-all duration-300 hover:border-white/25 hover:shadow-[0_0_32px_rgba(255,255,255,0.06)]"
            >
              {/* Image area — white bg for clean cutout display */}
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
              <div className="flex flex-1 flex-col px-3.5 pb-4 pt-3">
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

                {/* CTA */}
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-white/30 transition-colors duration-200 group-hover:text-white/70">
                  ดูรายละเอียด
                  <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>

              {/* Accent line on hover */}
              <div
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: m.fuelColor }}
              />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
