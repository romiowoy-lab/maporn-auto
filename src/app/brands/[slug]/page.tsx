import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/lib/data/brands";
import { getModelsByBrand } from "@/lib/data/models";
import { promotions, getPromotionStatus } from "@/lib/data/promotions";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import CarCard from "@/components/cars/CarCard";
import PromotionCard from "@/components/promotions/PromotionCard";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  return {
    title: brand.name,
    description: brand.description,
  };
}

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const brandModels = getModelsByBrand(brand.slug);
  const featured = brandModels.filter((m) => m.isFeatured).slice(0, 3);
  const brandPromos = promotions.filter((p) => p.brandSlug === brand.slug && getPromotionStatus(p) === "Active");

  return (
    <div>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          {brand.heroImage ? (
            <Image src={brand.heroImage} alt={brand.name} fill priority className="object-cover opacity-35" />
          ) : (
            <PlaceholderImage label="" colorHex={brand.colorHex} className="h-full w-full opacity-40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/40" />
        </div>
        <div className="container-page relative z-10 py-16 sm:py-24">
          <nav className="text-xs text-white/60 mb-6 flex items-center gap-1.5">
            <Link href="/brands" className="hover:text-white">
              แบรนด์รถยนต์
            </Link>
            <span>/</span>
            <span className="text-white">{brand.name}</span>
          </nav>
          <span
            className="inline-flex h-16 w-16 items-center justify-center rounded-full text-white font-black text-xl mb-5"
            style={{ backgroundColor: brand.colorHex }}
          >
            {brand.name.slice(0, 2).toUpperCase()}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">{brand.name}</h1>
          <p className="text-brand-red-soft font-semibold mt-1">{brand.tagline}</p>
          <p className="mt-4 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">{brand.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/cars?brand=${brand.slug}`} className="btn-red">
              ดูรถทั้งหมดของ {brand.name}
            </Link>
            <Link
              href={`/contact?brand=${brand.slug}`}
              className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy"
            >
              ติดต่อฝ่ายขาย
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-brand-navy mb-4">เรื่องราวของแบรนด์</h2>
            <p className="text-brand-slate leading-relaxed">{brand.story}</p>
          </div>
          <div className="card-elevated p-6 h-fit">
            <h3 className="font-bold text-brand-navy mb-4">ข้อมูลแบรนด์</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-brand-slate">ประเทศต้นกำเนิด</dt>
                <dd className="font-semibold text-brand-navy">{brand.origin}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-brand-slate">ก่อตั้งเมื่อ</dt>
                <dd className="font-semibold text-brand-navy">{brand.founded}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-brand-slate">รุ่นที่จำหน่าย</dt>
                <dd className="font-semibold text-brand-navy">{brandModels.length} รุ่น</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {brandPromos.length > 0 && (
        <section className="container-page pb-14">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">โปรโมชั่นของ {brand.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {brandPromos.map((p) => (
              <PromotionCard key={p.slug} promotion={p} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-brand-navy">รถยนต์แนะนำจาก {brand.name}</h2>
            <Link href={`/cars?brand=${brand.slug}`} className="btn-outline text-xs">
              ดูทั้งหมด
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(featured.length > 0 ? featured : brandModels.slice(0, 3)).map((m) => (
              <CarCard key={m.slug} model={m} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <h2 className="text-2xl font-bold text-brand-navy mb-6">รุ่นรถทั้งหมดของ {brand.name}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brandModels.map((m) => (
            <CarCard key={m.slug} model={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
