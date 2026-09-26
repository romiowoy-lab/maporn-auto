import type React from "react";
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
import SuzukiShowcase from "@/components/brands/SuzukiShowcase";
import GwmShowroomSwitch from "@/components/brands/gwm/GwmShowroomSwitch";
import GwmModelGrid from "@/components/brands/gwm/GwmModelGrid";
import OmodaJaecooShowroom from "@/components/brands/omoda-jaecoo/OmodaJaecooShowroom";
import LepasShowroom from "@/components/brands/lepas/LepasShowroom";
import WulingShowroom from "@/components/brands/wuling/WulingShowroom";
import NexShowroom from "@/components/brands/nex/NexShowroom";
import FarizonShowroom from "@/components/brands/farizon/FarizonShowroom";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

// Hand-written SEO copy for the redesigned showroom pages (facts only; from the catalog data).
const BRAND_SEO: Record<string, { title: string; description: string; image: string }> = {
  gwm: {
    title: "GWM Tank 300 และ Tank 500 ตัวแทนจำหน่าย ทดลองขับ ขอใบเสนอราคา",
    description: "GWM Tank 300 Hybrid และ Tank 500 3.0T Diesel SUV ออฟโรด 4WD ดูสเปก รูปภาพ อุปกรณ์ความปลอดภัย ทดลองขับ และขอใบเสนอราคาที่ Maporn Autogroup",
    image: "/brand/studio/gwm-tank300-forest-hero.jpg",
  },
  jaecoo: {
    title: "JAECOO J7 SHS และ OMODA C5 EV ตัวแทนจำหน่าย ทดลองขับ ขอใบเสนอราคา",
    description: "JAECOO J7 SHS ไฮบริด วิ่งไกลสูงสุด 1,300 กม. (NEDC) และ OMODA C5 EV ไฟฟ้า 100% วิ่งไกลสูงสุด 505 กม. ดูสเปก อุปกรณ์ สี และจองทดลองขับกับ Maporn Autogroup",
    image: "/brand/studio3/jaecoo-j7-shs-exterior.jpg",
  },
  omoda: {
    title: "OMODA C5 EV และ JAECOO J7 SHS ตัวแทนจำหน่าย ทดลองขับ ขอใบเสนอราคา",
    description: "OMODA C5 EV ครอสโอเวอร์ไฟฟ้า 100% 211 แรงม้า วิ่งไกลสูงสุด 505 กม. (NEDC) และ JAECOO J7 SHS ไฮบริด ดูสเปก สี และจองทดลองขับกับ Maporn Autogroup",
    image: "/brand/omoda-c5/hero.jpg",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  const seo = BRAND_SEO[slug];
  const title = seo?.title ?? `${brand.name} ตัวแทนจำหน่ายอย่างเป็นทางการ ทดลองขับ ขอใบเสนอราคา`;
  const description = seo?.description ?? `${brand.tagline} — ${brand.description}`.slice(0, 155);
  const image = seo?.image ?? brand.heroImage;
  // OMODA and JAECOO share one page — the JAECOO URL is the canonical one.
  const canonicalSlug = slug === "omoda" ? "jaecoo" : slug;
  return {
    title,
    description,
    alternates: { canonical: `/brands/${canonicalSlug}` },
    openGraph: {
      type: "website",
      locale: "th_TH",
      title,
      description,
      url: `/brands/${canonicalSlug}`,
      images: image ? [{ url: image, alt: brand.name }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const brandModels = getModelsByBrand(brand.slug);
  const featured = brandModels.filter((m) => m.isFeatured).slice(0, 3);
  const brandPromos = promotions.filter((p) => p.brandSlug === brand.slug && getPromotionStatus(p) === "Active");

  const brandLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "หน้าแรก", item: "https://www.mapornautogroup.com/" },
          { "@type": "ListItem", position: 2, name: "แบรนด์รถยนต์", item: "https://www.mapornautogroup.com/brands" },
          { "@type": "ListItem", position: 3, name: brand.name, item: `https://www.mapornautogroup.com/brands/${brand.slug}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `รถยนต์ ${brand.name} ที่ Maporn Autogroup`,
        itemListElement: brandModels.map((m, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://www.mapornautogroup.com/cars/${m.slug}`,
          name: `${brand.name} ${m.name}`,
        })),
      },
    ],
  };
  const withLd = (node: React.ReactNode) => (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandLd) }} />
      {node}
    </>
  );

  // Suzuki gets the redesigned catalog-page layout (real bridge hero photo + card grid
  // with dual CTAs/spec icons); other brands keep the existing story-driven layout below.
  if (brand.slug === "suzuki") {
    return withLd(<SuzukiShowcase />);
  }

  if (brand.slug === "gwm") {
    return withLd(<GwmModelGrid />);
  }

  // OMODA and JAECOO are one paired dealership: both URLs open the same switchable page (JAECOO first).
  if (brand.slug === "omoda" || brand.slug === "jaecoo") {
    return withLd(<OmodaJaecooShowroom />);
  }

  if (brand.slug === "lepas") {
    return withLd(<LepasShowroom />);
  }

  if (brand.slug === "wuling") {
    return withLd(<WulingShowroom />);
  }

  if (brand.slug === "nex") {
    return withLd(<NexShowroom />);
  }

  if (brand.slug === "farizon") {
    return withLd(<FarizonShowroom />);
  }

  return (
    <div>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        {/* Photo is the dominant element of the hero (~90% of the header), shown at its full
            original color — no dark overlay/gradient on top. Our own caption content sits
            in a plain solid-color bar below the photo instead, so it never dims or
            overlaps the image itself. */}
        <div className={brand.heroVideo ? "relative w-full aspect-[128/52]" : "relative w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.4/1]"}>
          {brand.heroVideo ? (
            // Container matches the clip's exact frame (cropped to remove the promo's
            // price/date footer, same treatment as the still-image crop) so the full
            // video shows with no crop and no letterbox bars.
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={brand.heroImage}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={brand.heroVideo} type="video/mp4" />
            </video>
          ) : brand.heroImage ? (
            <Image src={brand.heroImage} alt={brand.name} fill priority className="object-cover" />
          ) : (
            <PlaceholderImage label="" colorHex={brand.colorHex} className="h-full w-full opacity-40" />
          )}
        </div>
        <div className="container-page relative z-10 py-10 sm:py-14">
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
          {brand.slug === "lepas" && (
            <span className="mt-3 inline-block rounded-full bg-brand-red px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              Maporn Autogroup พร้อมจำหน่าย
            </span>
          )}
          <p className="mt-4 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">{brand.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/cars?brand=${brand.slug}`} className="btn-red">
              ดูรถทั้งหมดของ {brand.name}
            </Link>
            <Link
              href={`/contact?brand=${brand.slug}`}
              className="btn-outline border-white! text-white! hover:bg-white! hover:text-brand-navy!"
            >
              ติดต่อฝ่ายขาย
            </Link>
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
