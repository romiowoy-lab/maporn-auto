"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Car as CarIcon, Gauge } from "lucide-react";
import { VehicleModel, FuelType } from "@/lib/types";
import { getBrand } from "@/lib/data/brands";
import { CUTOUTS } from "@/lib/data/cutouts";
import { formatTHB } from "@/lib/utils";

const FUEL_LABELS: Record<FuelType, string> = {
  Petrol: "เบนซิน",
  Diesel: "ดีเซล",
  Hybrid: "ไฮบริด",
  EV: "รถยนต์ไฟฟ้า",
};

// Only real fields are shown as badges (fuel type, and range where the catalog has it).
// Acceleration is not in the catalog, so it is not displayed.
function rangeBadge(range?: string) {
  if (!range) return null;
  return range.replace("ระยะทางวิ่งสูงสุด", "").trim();
}

export default function CarCardDark({ model, index }: { model: VehicleModel; index: number }) {
  const brand = getBrand(model.brandSlug);
  const cutout = CUTOUTS[model.slug];
  const range = rangeBadge(model.range);
  const label = `${brand?.name ?? ""} ${model.name}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#17181B] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-red/50 hover:shadow-[0_20px_50px_rgba(223,0,0,0.15)]"
    >
      {/* Studio stage: dark backdrop + soft radial glow behind the car */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(ellipse_at_50%_65%,#3b3e45_0%,#1d1e22_60%,#141518_100%)]">
        <Link href={`/cars/${model.slug}`} aria-label={`ดูรายละเอียด ${label}`} className="absolute inset-0 z-0">
          {cutout ? (
            <Image
              src={cutout}
              alt={label}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-contain p-6 drop-shadow-[0_18px_18px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:scale-105"
            />
          ) : model.image ? (
            <Image
              src={model.image}
              alt={label}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <span className="flex h-full w-full flex-col items-center justify-center gap-3">
              {brand?.logo ? (
                <span className="flex h-14 items-center rounded-xl bg-white/95 px-6 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={brand.logo} alt={brand.name} className="h-7 w-auto max-w-[120px] object-contain" />
                </span>
              ) : (
                <CarIcon className="h-16 w-16 text-white/15" strokeWidth={1.2} />
              )}
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">Photo coming soon</span>
            </span>
          )}
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          {model.isNew && <span className="rounded-full bg-brand-red px-2.5 py-1 text-[10px] font-bold text-white">รุ่นใหม่</span>}
          <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
            {FUEL_LABELS[model.fuelType]}
          </span>
          {range && (
            <span className="flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
              <Gauge className="h-3 w-3 text-[#FF5A5A]" />
              {range}
            </span>
          )}
        </div>

        {/* Quick actions — slide up on hover (desktop); always visible on touch screens */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex gap-2 p-3 transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <Link
            href={`/test-drive?model=${model.slug}`}
            className="flex-1 rounded-lg bg-brand-red py-2 text-center text-xs font-bold text-white transition-colors hover:bg-[#c00000]"
          >
            ทดลองขับ
          </Link>
          <Link
            href={`/cars/${model.slug}`}
            className="flex-1 rounded-lg border border-white/30 bg-black/50 py-2 text-center text-xs font-bold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#101113]"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FF5A5A]">{brand?.name}</p>
        <h3 className="mt-1 text-2xl font-bold text-white">{model.name}</h3>
        <p className="mt-1 text-xs text-white/55">{model.bodyType}</p>
        <div className="mt-4 border-t border-white/10 pt-4">
          <span className="block text-[11px] text-white/50">เริ่มต้น</span>
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
            {formatTHB(model.startPrice)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
