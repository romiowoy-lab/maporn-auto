import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { models, getModel } from "@/lib/data/models";
import { getBrand } from "@/lib/data/brands";
import { promotions, getPromotionStatus } from "@/lib/data/promotions";
import { branches } from "@/lib/data/branches";
import VehicleGallery, { type GalleryImage } from "@/components/cars/VehicleGallery";
import VehicleDetailTabs from "@/components/cars/VehicleDetailTabs";
import VariantTiles from "@/components/cars/VariantTiles";
import VariantTable from "@/components/cars/VariantTable";
import ModelStorySection from "@/components/cars/ModelStorySection";
import TrustSection from "@/components/cars/TrustSection";
import { SpecList, SpecRow } from "@/components/cars/SpecBlock";
import CarCardDark from "@/components/cars/CarCardDark";
import PromotionCard from "@/components/promotions/PromotionCard";
import BranchContactList from "@/components/branches/BranchContactList";
import { MODEL_GALLERY, MODEL_STORY_IMAGES } from "@/lib/data/modelGallery";
import { formatTHB } from "@/lib/utils";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) return {};
  const brand = getBrand(model.brandSlug);
  return {
    title: `${brand?.name} ${model.name} ราคา สเปก ทดลองขับ`,
    description: `${brand?.name} ${model.name} ราคาเริ่มต้น ${formatTHB(model.startPrice)} — ${model.description}`.slice(0, 160),
    alternates: { canonical: `/cars/${model.slug}` },
    openGraph: {
      type: "website",
      locale: "th_TH",
      title: `${brand?.name} ${model.name}`,
      description: model.description,
      url: `/cars/${model.slug}`,
      images: model.image ? [{ url: model.image, alt: `${brand?.name} ${model.name}` }] : undefined,
    },
  };
}

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();
  const brand = getBrand(model.brandSlug);
  const related = models.filter((m) => m.brandSlug === model.brandSlug && m.slug !== model.slug).slice(0, 3);
  const relatedPromos = promotions.filter((p) => p.modelSlug === model.slug && getPromotionStatus(p) === "Active");
  const sellingBranches = branches.filter((b) => b.brands.includes(model.brandSlug));

  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${brand?.name} ${model.name}`,
    brand: { "@type": "Brand", name: brand?.name },
    description: model.description,
    url: `https://www.mapornautogroup.com/cars/${model.slug}`,
    ...(model.image ? { image: [`https://www.mapornautogroup.com${model.image}`] } : {}),
    vehicleConfiguration: model.variants.map((v) => v.name).join(", "),
    fuelType: model.fuelType,
    bodyType: model.bodyType,
    vehicleSeatingCapacity: model.variants[0]?.seats,
    offers: {
      "@type": "Offer",
      priceCurrency: "THB",
      price: model.startPrice,
      availability: "https://schema.org/InStock",
    },
  };

  const mainImage: GalleryImage = model.image
    ? { src: model.image, label: `${brand?.name} ${model.name}`, sublabel: "Exterior" }
    : { label: `${brand?.name} ${model.name}`, sublabel: "Exterior", colorHex: brand?.colorHex };
  const extra = MODEL_GALLERY[model.slug];
  const galleryImages: GalleryImage[] = extra
    ? extra
    : [
        mainImage,
        { label: "Interior", colorHex: brand?.colorHex, placeholderDark: false },
        { label: "Side View", colorHex: brand?.colorHex },
        { label: "Rear View", colorHex: brand?.colorHex, placeholderDark: false },
      ];

  const storyImages = MODEL_STORY_IMAGES[model.slug];

  const crumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "รถยนต์", item: "https://www.mapornautogroup.com/cars" },
      { "@type": "ListItem", position: 2, name: brand?.name ?? "", item: `https://www.mapornautogroup.com/brands/${model.brandSlug}` },
      { "@type": "ListItem", position: 3, name: model.name, item: `https://www.mapornautogroup.com/cars/${model.slug}` },
    ],
  };

  return (
    <div className="bg-[#101113] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbSchema) }} />

      {/* Dark showroom hero: gallery + key facts */}
      <section className="relative overflow-hidden bg-[#101113] text-white">
        <div className="pointer-events-none absolute -top-24 right-0 h-80 w-[560px] rounded-full bg-brand-red/[0.10] blur-[130px]" />
        <div className="container-page relative py-8 sm:py-12">
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-white/60">
            <Link href="/cars" className="hover:text-white">รถยนต์</Link>
            <span>/</span>
            <Link href={`/brands/${model.brandSlug}`} className="hover:text-white">{brand?.name}</Link>
            <span>/</span>
            <span className="font-medium text-white">{model.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <VehicleGallery images={galleryImages} />

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A5A]">{brand?.name}</p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">{model.name}</h1>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">{model.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">{model.bodyType}</span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">{model.fuelType}</span>
                {model.isNew && <span className="rounded-full bg-brand-red px-3 py-1.5 text-xs font-semibold text-white">รุ่นใหม่</span>}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                <p className="text-xs text-white/55">ราคาเริ่มต้น</p>
                <p className="mt-1 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                  {formatTHB(model.startPrice)}
                </p>
                <p className="mt-2 text-xs text-white/55">
                  มีให้เลือก {model.variants.length} รุ่นย่อย • สี {model.colors.length} สี
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link href={`/quotation?model=${model.slug}`} className="btn-red">
                  ขอใบเสนอราคา
                </Link>
                <Link href={`/test-drive?model=${model.slug}`} className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3.5 text-sm font-medium text-[#101113] transition-colors hover:bg-[#E2E8F0]">
                  จองทดลองขับ
                </Link>
                <Link href={`/contact?model=${model.slug}`} className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#101113]">
                  ติดต่อฝ่ายขาย
                </Link>
                <Link href={`/compare?add=${model.slug}`} className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#101113]">
                  เปรียบเทียบรถ
                </Link>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-bold text-white">สีตัวถังที่มีให้เลือก</h3>
                <div className="flex flex-wrap gap-2">
                  {model.colors.map((c) => (
                    <span key={c} className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/75">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page pb-12 pt-2">
      {relatedPromos.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-2xl font-extrabold text-white">โปรโมชั่นสำหรับรุ่นนี้</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPromos.map((p) => (
              <PromotionCard key={p.slug} promotion={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <div className="mb-5">
          <p className="mb-2 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A5A]"><span className="h-px w-8 bg-brand-red" /> Choose Your Variant</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">เลือกรุ่นย่อยที่ใช่สำหรับคุณ</h2>
        </div>
        <VariantTiles modelSlug={model.slug} variants={model.variants} />
      </section>

      <section className="mt-20">
        <VehicleDetailTabs
          tabs={[
            {
              id: "technology",
              label: "Technology",
              content: (
                <ModelStorySection
                  index="01"
                  eyebrow="Technology"
                  title="เทคโนโลยีอัจฉริยะที่ตอบโจทย์ทุกการเดินทาง"
                  description={`${brand?.name} ${model.name} มาพร้อมเทคโนโลยีที่ช่วยให้การขับขี่สะดวกและปลอดภัยยิ่งขึ้นในทุกเส้นทาง`}
                  points={model.technology}
                  colorHex={brand?.colorHex}
                  imageLabel="Technology"
                  image={storyImages?.technology}
                />
              ),
            },
            {
              id: "design",
              label: "Design & Comfort",
              content: (
                <ModelStorySection
                  index="02"
                  eyebrow="Comfort & Design"
                  title="ดีไซน์และความสะดวกสบายที่ครบครัน"
                  description={`ห้องโดยสารและอุปกรณ์มาตรฐานของ ${model.name} ออกแบบมาเพื่อความสะดวกสบายในการใช้งานทุกวัน`}
                  points={model.features}
                  colorHex={brand?.colorHex}
                  imageLabel="Interior & Comfort"
                  image={storyImages?.design}
                />
              ),
            },
            {
              id: "specifications",
              label: "Specifications",
              content: (
                <div className="space-y-10">
                  <div>
                    <h3 className="mb-4 text-xl font-bold text-white">เปรียบเทียบรุ่นย่อยแบบละเอียด</h3>
                    <VariantTable variants={model.variants} />
                  </div>
                  <div className="max-w-xl rounded-2xl border border-white/10 bg-[#1C1E22] p-6">
                    <h3 className="mb-3 text-lg font-bold text-white">ขนาดตัวถัง (Dimension)</h3>
                    <SpecRow label="ความยาว" value={`${model.dimensions.length} มม.`} />
                    <SpecRow label="ความกว้าง" value={`${model.dimensions.width} มม.`} />
                    <SpecRow label="ความสูง" value={`${model.dimensions.height} มม.`} />
                    <SpecRow label="ระยะฐานล้อ" value={`${model.dimensions.wheelbase} มม.`} />
                    {model.battery && <SpecRow label="แบตเตอรี่" value={model.battery} />}
                    {model.range && <SpecRow label="ระยะทางวิ่ง" value={model.range} />}
                    <SpecRow label="การรับประกัน" value={model.warranty} />
                  </div>
                </div>
              ),
            },
            {
              id: "safety",
              label: "Safety",
              content: <SpecList title="ความปลอดภัย (Safety)" items={model.safety} />,
            },
          ]}
        />
      </section>

      <section className="mt-4">
        <TrustSection />
      </section>

      {sellingBranches.length > 0 && (
        <section className="mt-20">
          <div className="mb-5">
            <p className="mb-2 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A5A]"><span className="h-px w-8 bg-brand-red" /> Where to Buy</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">สาขาที่จำหน่าย {brand?.name} {model.name}</h2>
          </div>
          <BranchContactList branches={sellingBranches} />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-2xl font-extrabold text-white">รุ่นอื่น ๆ จาก {brand?.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((m) => (
              <CarCardDark key={m.slug} model={m} index={0} />
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  );
}
