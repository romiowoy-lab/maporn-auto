import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { promotions, getPromotion, getPromotionStatus } from "@/lib/data/promotions";
import { getBrand } from "@/lib/data/brands";
import { getModel } from "@/lib/data/models";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { formatDateTH } from "@/lib/utils";

export function generateStaticParams() {
  return promotions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const promo = getPromotion(slug);
  if (!promo) return {};
  return { title: promo.title, description: promo.description };
}

const STATUS_LABEL: Record<string, string> = {
  Active: "กำลังดำเนินการ",
  Expired: "หมดอายุแล้ว",
  Upcoming: "เร็ว ๆ นี้",
};

export default async function PromotionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const promo = getPromotion(slug);
  if (!promo) notFound();

  const status = getPromotionStatus(promo);
  const brand = promo.brandSlug ? getBrand(promo.brandSlug) : undefined;
  const model = promo.modelSlug ? getModel(promo.modelSlug) : undefined;

  return (
    <div className="container-page py-10 sm:py-14">
      <nav className="text-xs text-brand-slate mb-6 flex items-center gap-1.5">
        <Link href="/promotions" className="hover:text-brand-navy">
          โปรโมชั่น
        </Link>
        <span>/</span>
        <span className="text-brand-navy font-medium">{promo.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <PlaceholderImage
          label={promo.category}
          sublabel={brand?.name}
          colorHex={brand?.colorHex ?? "#0b1220"}
          className="aspect-[4/3] rounded-2xl"
        />
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold bg-slate-100 text-brand-navy px-3 py-1.5 rounded-full">
              {promo.category}
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full text-white ${
                status === "Active" ? "bg-emerald-500" : status === "Upcoming" ? "bg-blue-500" : "bg-slate-400"
              }`}
            >
              {STATUS_LABEL[status]}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy">{promo.title}</h1>
          <p className="mt-3 text-brand-slate leading-relaxed">{promo.detail}</p>

          <div className="mt-6 card-elevated p-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-slate">ระยะเวลาโปรโมชั่น</span>
              <span className="font-semibold text-brand-navy">
                {formatDateTH(promo.startDate)} — {formatDateTH(promo.endDate)}
              </span>
            </div>
            {brand && (
              <div className="flex justify-between">
                <span className="text-brand-slate">แบรนด์</span>
                <Link href={`/brands/${brand.slug}`} className="font-semibold text-brand-navy hover:text-brand-red">
                  {brand.name}
                </Link>
              </div>
            )}
            {model && (
              <div className="flex justify-between">
                <span className="text-brand-slate">รุ่นรถ</span>
                <Link href={`/cars/${model.slug}`} className="font-semibold text-brand-navy hover:text-brand-red">
                  {model.name}
                </Link>
              </div>
            )}
          </div>

          {status !== "Active" ? (
            <p className="mt-6 text-sm text-brand-slate italic">
              {status === "Expired" ? "โปรโมชั่นนี้หมดอายุแล้ว กรุณาติดตามโปรโมชั่นล่าสุดของเรา" : "โปรโมชั่นนี้ยังไม่เริ่มต้น โปรดกลับมาตรวจสอบอีกครั้ง"}
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/quotation${model ? `?model=${model.slug}` : ""}`} className="btn-red">
                ขอใบเสนอราคา
              </Link>
              <Link href={`/test-drive${model ? `?model=${model.slug}` : ""}`} className="btn-outline">
                จองทดลองขับ
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
