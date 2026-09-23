import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { formatTHB } from "@/lib/utils";
import type { GwmVehicle } from "@/lib/data/gwm-vehicles";

export default function GwmVehicleCard({ vehicle }: { vehicle: GwmVehicle }) {
  const { model, subBrand, powertrainLabel } = vehicle;

  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
      <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
        <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
          {subBrand}
        </span>
        {model.isNew && (
          <span className="rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
            New
          </span>
        )}
      </div>

      {/* Image area — the car fills ~70-80% of the card, object-contain so it's never
          cropped (no clipped wheels/roof), on a plain dark plinth. */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] bg-gradient-to-b from-white/[0.03] to-transparent">
        {model.image ? (
          <Image
            src={model.image}
            alt={model.name}
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-contain p-6 sm:p-8 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 p-6 sm:p-8">
            <PlaceholderImage label={model.name} hideLabel className="h-full w-full rounded-xl" />
          </div>
        )}
      </div>

      <div className="px-6 sm:px-8 pb-7 sm:pb-8 pt-2">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          GWM {model.name.toUpperCase()}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-white/50">{powertrainLabel}</p>
        <p className="mt-1 text-sm text-white/70">
          เริ่มต้น <span className="font-semibold text-white">{formatTHB(model.startPrice)}</span>
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link
            href={`/cars/${model.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#0b0c0d] transition-all hover:bg-brand-red hover:text-white"
          >
            View Model
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href={`/quotation?model=${model.slug}`}
            className="inline-flex items-center rounded-lg border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white/80 transition-all hover:text-white hover:border-white/40"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
