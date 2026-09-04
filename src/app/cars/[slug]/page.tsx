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
import CarCard from "@/components/cars/CarCard";
import PromotionCard from "@/components/promotions/PromotionCard";
import BranchContactList from "@/components/branches/BranchContactList";
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
    title: `${brand?.name} ${model.name}`,
    description: `${brand?.name} ${model.name} ราคาเริ่มต้น ${formatTHB(model.startPrice)} — ${model.description}`,
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
    vehicleConfiguration: model.variants.map((v) => v.name).join(", "),
    offers: {
      "@type": "Offer",
      priceCurrency: "THB",
      price: model.startPrice,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }} />

      <nav className="text-xs text-brand-slate mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/cars" className="hover:text-brand-navy">
          รถยนต์
        </Link>
        <span>/</span>
        <Link href={`/brands/${model.brandSlug}`} className="hover:text-brand-navy">
          {brand?.name}
        </Link>
        <span>/</span>
        <span className="text-brand-navy font-medium">{model.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <VehicleGallery
          images={
            [
              model.image
                ? { src: model.image, label: `${brand?.name} ${model.name}`, sublabel: "Exterior" }
                : { label: `${brand?.name} ${model.name}`, sublabel: "Exterior", colorHex: brand?.colorHex },
              { label: "Interior", colorHex: brand?.colorHex, placeholderDark: false },
              { label: "Side View", colorHex: brand?.colorHex },
              { label: "Rear View", colorHex: brand?.colorHex, placeholderDark: false },
            ] satisfies GalleryImage[]
          }
        />

        <div>
          <p className="text-xs font-semibold text-brand-red uppercase tracking-wide">{brand?.name}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mt-1">{model.name}</h1>
          <p className="mt-3 text-brand-slate text-sm leading-relaxed">{model.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="text-xs font-semibold bg-slate-100 text-brand-navy px-3 py-1.5 rounded-full">{model.bodyType}</span>
            <span className="text-xs font-semibold bg-slate-100 text-brand-navy px-3 py-1.5 rounded-full">{model.fuelType}</span>
            {model.isNew && (
              <span className="text-xs font-semibold bg-brand-red text-white px-3 py-1.5 rounded-full">รุ่นใหม่</span>
            )}
          </div>

          <div className="mt-6 p-5 rounded-2xl bg-slate-50">
            <p className="text-xs text-brand-slate">ราคาเริ่มต้น</p>
            <p className="text-3xl font-black text-brand-navy">{formatTHB(model.startPrice)}</p>
            <p className="text-xs text-brand-slate mt-1">
              มีให้เลือก {model.variants.length} รุ่นย่อย • สี {model.colors.length} สี
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link href={`/quotation?model=${model.slug}`} className="btn-red">
              ขอใบเสนอราคา
            </Link>
            <Link href={`/test-drive?model=${model.slug}`} className="btn-primary">
              จองทดลองขับ
            </Link>
            <Link href={`/contact?model=${model.slug}`} className="btn-outline">
              ติดต่อฝ่ายขาย
            </Link>
            <Link href={`/compare?add=${model.slug}`} className="btn-outline">
              เปรียบเทียบรถ
            </Link>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-brand-navy mb-2 text-sm">สีตัวถังที่มีให้เลือก</h3>
            <div className="flex flex-wrap gap-2">
              {model.colors.map((c) => (
                <span key={c} className="text-xs border border-brand-line rounded-full px-3 py-1.5 text-brand-slate">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {relatedPromos.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold text-brand-navy mb-4">โปรโมชั่นสำหรับรุ่นนี้</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPromos.map((p) => (
              <PromotionCard key={p.slug} promotion={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <div className="mb-5">
          <p className="section-eyebrow mb-1">Choose Your Variant</p>
          <h2 className="text-xl font-bold text-brand-navy">เลือกรุ่นย่อยที่ใช่สำหรับคุณ</h2>
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
                />
              ),
            },
            {
              id: "specifications",
              label: "Specifications",
              content: (
                <div className="space-y-10">
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy mb-4">เปรียบเทียบรุ่นย่อยแบบละเอียด</h3>
                    <VariantTable variants={model.variants} />
                  </div>
                  <div className="card-elevated p-5 max-w-xl">
                    <h3 className="font-bold text-brand-navy mb-3">ขนาดตัวถัง (Dimension)</h3>
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
            <p className="section-eyebrow mb-1">Where to Buy</p>
            <h2 className="text-xl font-bold text-brand-navy">สาขาที่จำหน่าย {brand?.name} {model.name}</h2>
          </div>
          <BranchContactList branches={sellingBranches} />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-brand-navy mb-4">รุ่นอื่น ๆ จาก {brand?.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((m) => (
              <CarCard key={m.slug} model={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
