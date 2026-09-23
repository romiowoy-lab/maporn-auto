"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, Gauge, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { getBrandGroups, getModelsForGroup } from "@/lib/data/brandGroups";
import { getFeaturedModels } from "@/lib/data/models";
import { formatTHB } from "@/lib/utils";
import { CUTOUTS } from "@/lib/data/cutouts";
import VehicleCarousel, {
  type CarouselVehicle,
} from "@/components/home/VehicleCarousel";

const GROUPS = getBrandGroups();
const ALL_MODELS = getFeaturedModels();

// farizon-sv excluded here: its only real photo has a bright white studio background
// that doesn't disappear under mix-blend-mode: multiply against this stage's lighter
// (dusk-sky) region — it reads as a washed-out white box instead of blending in cleanly.
const EXCLUDED_SLUGS = new Set(["nex-vantastic", "gwm-tank-500", "farizon-sv", "wuling-air-ev", "wuling-xingguang-s60"]);

const FEATURE_ICONS = [Sparkles, Gauge, ShieldCheck, Zap];

export default function ExploreRange() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string>("all");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeGroup = GROUPS.find((g) => g.key === activeKey);
  const allModels = activeGroup ? getModelsForGroup(activeGroup) : ALL_MODELS;
  const models = allModels.filter(
    (m) => (CUTOUTS[m.slug] || m.image) && !EXCLUDED_SLUGS.has(m.slug),
  );

  const vehicles: CarouselVehicle[] = useMemo(
    () =>
      models.map((m) => {
        const cutout = CUTOUTS[m.slug];
        return {
          slug: m.slug,
          brand:
            GROUPS.find((g) => g.slugs.includes(m.brandSlug))?.name ??
            m.brandSlug,
          name: m.name,
          image: cutout ?? m.image!,
          isCutout: Boolean(cutout),
        };
      }),
    [models],
  );

  const heroModel = models.find((m) => m.slug === activeSlug) ?? models[0];
  const brandLabel = heroModel
    ? (GROUPS.find((g) => g.slugs.includes(heroModel.brandSlug))?.name ??
      heroModel.brandSlug)
    : "";

  return (
    <section className="relative bg-brand-navy text-white overflow-hidden">
      {/* ================= STAGE — full-width showroom scene behind BOTH the heading/filter
          and the carousel, so the text sits on the same photo as the cars instead of a
          separate flat navy block above it. ================= */}
      <div className="relative w-full min-h-[620px] sm:min-h-[720px] lg:min-h-[820px]">
        <Image
          src="/brand/studio2/explore-range-scene.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 22%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        <div className="relative z-10 max-w-[1900px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14">
          <div className="mb-6">
            <span className="text-[11px] sm:text-xs font-bold text-brand-red uppercase tracking-[0.12em]">
              Explore the Range
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
              สำรวจรถยนต์ทุกรุ่น
            </h2>
          </div>

          {/* Brand filter — navigation-style, white variant over the photo */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <button
              type="button"
              onClick={() => setActiveKey("all")}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap backdrop-blur-md transition-all duration-300 ${
                activeKey === "all"
                  ? "border-brand-red bg-brand-red text-white shadow-lg shadow-brand-red/30"
                  : "border-white/15 bg-white/10 text-white/75 hover:bg-white/20 hover:text-white"
              }`}
            >
              ทั้งหมด
            </button>
            {GROUPS.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setActiveKey(g.key)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap backdrop-blur-md transition-all duration-300 ${
                  activeKey === g.key
                    ? "border-brand-red bg-brand-red text-white shadow-lg shadow-brand-red/30"
                    : "border-white/15 bg-white/10 text-white/75 hover:bg-white/20 hover:text-white"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {!heroModel ? (
          <p className="relative z-10 text-white/60 text-sm py-16 text-center">
            ยังไม่มีรุ่นรถสำหรับแบรนด์นี้
          </p>
        ) : (
          <div
            key={activeKey}
            className="relative z-10 h-[400px] sm:h-[500px] lg:h-[600px]"
          >
            <VehicleCarousel
              vehicles={vehicles}
              onActiveChange={(v) => setActiveSlug(v.slug)}
              onSelectVehicle={(v) => router.push(`/cars/${v.slug}`)}
            />
          </div>
        )}
      </div>

      {heroModel && (
        <div key={`${activeKey}-details`}>
          <div className="max-w-[1900px] mx-auto px-4 sm:px-8 lg:px-12">
            {/* ================= TYPOGRAPHY + DETAILS BELOW — tight spacing, no empty gap ================= */}
            <div className="mt-8 sm:mt-10 mx-auto max-w-4xl rounded-2xl border border-white/15 bg-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl sm:text-4xl font-black text-white leading-snug">
                  {heroModel.isNew ? "ALL-NEW " : ""}
                  {brandLabel.toUpperCase()} {heroModel.name.toUpperCase()}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
                  {heroModel.description}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  เริ่มต้น{" "}
                  <span className="font-bold text-white">
                    {formatTHB(heroModel.startPrice)}
                  </span>
                </p>
              </div>

              {heroModel.features.length > 0 && (
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
                  {heroModel.features.slice(0, 4).map((feature, i) => {
                    const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                    return (
                      <div key={feature} className="text-center">
                        <Icon className="h-6 w-6 mx-auto text-brand-red" />
                        <p className="mt-3 text-xs sm:text-sm text-white/80 font-medium leading-snug">
                          {feature}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href={`/cars/${heroModel.slug}`} className="btn-red">
                  ดูรายละเอียด
                </Link>
                <Link
                  href={`/test-drive?model=${heroModel.slug}`}
                  className="btn-outline border-white! text-white! hover:bg-white! hover:text-brand-navy! inline-flex items-center gap-2"
                >
                  จองทดลองขับ
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="pb-14 sm:pb-16" />
          </div>
        </div>
      )}
    </section>
  );
}
