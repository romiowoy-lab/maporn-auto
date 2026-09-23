import Link from "next/link";
import Image from "next/image";
import { getModel } from "@/lib/data/models";
import { getBrand } from "@/lib/data/brands";
import { getBrandGroups, getFeaturedModelForGroup } from "@/lib/data/brandGroups";
import { formatTHB } from "@/lib/utils";
import { VehicleModel } from "@/lib/types";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";

export default function VehicleShowcase() {
  const groups = getBrandGroups();
  const featuredOf = (key: string) => groups.find((g) => g.key === key) && getFeaturedModelForGroup(groups.find((g) => g.key === key)!)?.slug;

  const showcaseSlugs = [
    "suzuki-fronx",
    "suzuki-xl7",
    "gwm-tank-300",
    featuredOf("farizon"),
    featuredOf("wuling"),
    "nex-bev-pickup",
    "omoda-5",
    "jaecoo-j7",
    "lepas-l6",
  ].filter((slug): slug is string => Boolean(slug));

  const models = showcaseSlugs.map((slug) => getModel(slug)).filter((m): m is VehicleModel => Boolean(m));

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Vehicle Showcase" title="เลือกรถที่ใช่สำหรับคุณ" />

        <ScrollFx effect="fade-up" stagger={0.1} className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {models.map((model) => {
            const brand = getBrand(model.brandSlug);
            return (
              <div key={model.slug} className="group flex flex-col">
                <Link href={`/cars/${model.slug}`} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#f7f7f5] block">
                  {model.image ? (
                    <Image
                      src={model.image}
                      alt={`${brand?.name ?? ""} ${model.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  ) : (
                    <PlaceholderImage
                      label={`${brand?.name ?? ""} ${model.name}`}
                      sublabel={model.bodyType}
                      colorHex={brand?.colorHex}
                      className="h-full w-full"
                    />
                  )}
                </Link>

                <p className="mt-6 text-[11px] font-semibold text-brand-slate uppercase tracking-widest">{brand?.name}</p>
                <h3 className="mt-1 text-2xl font-bold text-brand-navy">{model.name}</h3>
                <p className="mt-2 text-sm text-brand-slate leading-relaxed line-clamp-2">{model.description}</p>

                <p className="mt-4 text-lg font-black text-brand-navy">
                  <span className="text-xs font-medium text-brand-slate mr-1">เริ่มต้น</span>
                  {formatTHB(model.startPrice)}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={`/cars/${model.slug}`} className="text-xs font-semibold text-brand-navy border-b border-brand-red pb-0.5">
                    ดูรายละเอียด
                  </Link>
                  <Link
                    href={`/test-drive?model=${model.slug}`}
                    className="text-xs font-semibold text-brand-navy border-b border-brand-line pb-0.5 hover:border-brand-red transition-colors"
                  >
                    ทดลองขับ
                  </Link>
                </div>
              </div>
            );
          })}
        </ScrollFx>
      </div>
    </section>
  );
}
