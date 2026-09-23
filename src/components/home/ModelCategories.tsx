import Link from "next/link";
import Image from "next/image";
import { getModelCategories } from "@/lib/data/models";
import { getBrand } from "@/lib/data/brands";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function ModelCategories() {
  const categories = getModelCategories();

  return (
    <section className="bg-[#f7f7f5] py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Model Category" title="ค้นหาตามประเภทรถ" />

        <ScrollFx effect="fade-up" stagger={0.1} className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const cover = cat.models.find((m) => m.image)?.image;
            const coverModel = cat.models.find((m) => m.image);
            const brand = coverModel ? getBrand(coverModel.brandSlug) : undefined;
            return (
              <Link
                key={cat.key}
                href={cat.href}
                className="group relative overflow-hidden rounded-sm aspect-[16/10] flex items-end"
              >
                {cover ? (
                  <Image
                    src={cover}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                ) : (
                  <PlaceholderImage label={cat.label} colorHex={brand?.colorHex} className="h-full w-full" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" aria-hidden="true" />
                <div className="relative z-10 p-6 sm:p-8 text-white">
                  <h3 className="text-3xl font-black uppercase tracking-tight">{cat.label}</h3>
                  <p className="mt-1 text-sm text-white/70">{cat.models.length} รุ่นให้เลือก</p>
                </div>
              </Link>
            );
          })}
        </ScrollFx>
      </div>
    </section>
  );
}
