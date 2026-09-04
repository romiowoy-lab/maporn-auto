import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { VehicleModel } from "@/lib/types";
import { getBrand } from "@/lib/data/brands";
import { formatTHB } from "@/lib/utils";

export default function CarCard({ model }: { model: VehicleModel }) {
  const brand = getBrand(model.brandSlug);
  return (
    <Link href={`/cars/${model.slug}`} className="group flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#f7f7f5]">
        {model.image ? (
          <Image
            src={model.image}
            alt={`${brand?.name ?? ""} ${model.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage
            label={`${brand?.name ?? ""} ${model.name}`}
            sublabel={model.bodyType}
            colorHex={brand?.colorHex}
            className="h-full w-full"
          />
        )}
        {model.isNew && (
          <span className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            รุ่นใหม่
          </span>
        )}
      </div>
      <div className="pt-4">
        <p className="text-[11px] font-semibold text-brand-slate uppercase tracking-widest">{brand?.name}</p>
        <h3 className="font-bold text-brand-navy text-xl mt-1 group-hover:text-brand-red transition-colors">
          {model.name}
        </h3>
        <p className="text-xs text-brand-slate mt-1">
          {model.bodyType} · {model.fuelType}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-brand-slate">เริ่มต้น </span>
            <span className="font-bold text-brand-red">{formatTHB(model.startPrice)}</span>
          </div>
          <span className="text-brand-navy transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
