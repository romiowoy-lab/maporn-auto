import Link from "next/link";
import { promotions, getPromotionStatus } from "@/lib/data/promotions";
import PromotionCard from "@/components/promotions/PromotionCard";
import PromotionFeatured from "@/components/promotions/PromotionFeatured";
import ScrollFx from "@/components/ui/ScrollFx";

export default function PromotionsSection() {
  const active = promotions.filter((p) => getPromotionStatus(p) === "Active");
  const [featured, ...rest] = active;
  return (
    <section className="py-20 sm:py-32 bg-brand-navy text-white">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div className="max-w-2xl">
            <p className="section-eyebrow-light mb-4">Promotions</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08] text-balance">
              โปรโมชั่นล่าสุด
            </h2>
            <p className="mt-4 text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">
              โปรโมชั่นพิเศษที่กำลังดำเนินการอยู่ ณ ขณะนี้ อย่าพลาดข้อเสนอสุดคุ้ม
            </p>
          </div>
          <Link href="/promotions" className="btn-red text-xs shrink-0">
            ดูโปรโมชั่นทั้งหมด
          </Link>
        </div>

        {featured && (
          <ScrollFx effect="scale" className="mt-12 sm:mt-16">
            <PromotionFeatured promotion={featured} dark />
          </ScrollFx>
        )}

        {rest.length > 0 && (
          <ScrollFx effect="fade-up" stagger={0.1} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.slice(0, 3).map((p) => (
              <PromotionCard key={p.slug} promotion={p} />
            ))}
          </ScrollFx>
        )}
      </div>
    </section>
  );
}
