import Link from "next/link";
import Image from "next/image";
import { getModel } from "@/lib/data/models";
import { getBrand } from "@/lib/data/brands";
import { formatTHB } from "@/lib/utils";
import ScrollFx from "@/components/ui/ScrollFx";

export default function FeaturedVehicle() {
  const model = getModel("gwm-tank-500");
  if (!model || !model.image) return null;
  const brand = getBrand(model.brandSlug);

  return (
    <section className="relative min-h-[560px] sm:min-h-[640px] md:min-h-[720px] flex items-end overflow-hidden bg-brand-navy text-white">
      <Image
        src={model.image}
        alt={`${brand?.name ?? ""} ${model.name}`}
        fill
        sizes="100vw"
        className="object-contain landscape:object-cover object-center bg-brand-navy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" aria-hidden="true" />

      <ScrollFx effect="fade-up" className="container-page relative z-10 pb-14 sm:pb-20">
        <p className="section-eyebrow-light mb-4">Featured Vehicle</p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight max-w-2xl">
          {brand?.name} {model.name}
        </h2>
        <p className="mt-4 text-white/75 font-light max-w-md text-sm sm:text-base leading-relaxed">{model.description}</p>
        <p className="mt-5 text-2xl font-black">
          <span className="text-xs font-medium text-white/60 mr-2 uppercase tracking-wide">เริ่มต้น</span>
          {formatTHB(model.startPrice)}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={`/cars/${model.slug}`} className="btn-red">
            ดูรายละเอียด
          </Link>
          <Link
            href={`/test-drive?model=${model.slug}`}
            className="btn-outline border-white! text-white! hover:bg-white! hover:text-brand-navy!"
          >
            จองทดลองขับ
          </Link>
        </div>
      </ScrollFx>
    </section>
  );
}
