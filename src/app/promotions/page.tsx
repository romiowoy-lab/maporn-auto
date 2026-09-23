import type { Metadata } from "next";
import { promotions, getPromotionStatus } from "@/lib/data/promotions";
import PromotionCard from "@/components/promotions/PromotionCard";
import PromotionFeatured from "@/components/promotions/PromotionFeatured";

export const metadata: Metadata = {
  title: "โปรโมชั่นรถยนต์ใหม่และรถ EV ล่าสุด",
  description: "รวมโปรโมชั่นรถใหม่ รถ EV ไฟแนนซ์ แคมเปญพิเศษ และส่วนลดจากทุกแบรนด์ในเครือ Maporn Autogroup",
};

const CATEGORIES = ["New Car", "EV", "Financing", "Campaign", "Discount", "Gift", "Interest Rate"] as const;

export default function PromotionsPage() {
  const active = promotions.filter((p) => getPromotionStatus(p) === "Active");
  const upcoming = promotions.filter((p) => getPromotionStatus(p) === "Upcoming");
  const expired = promotions.filter((p) => getPromotionStatus(p) === "Expired");
  const [featured, ...activeRest] = active;

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mb-10">
        <p className="section-eyebrow mb-2">Promotions</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">โปรโมชั่นทั้งหมด</h1>
        <p className="mt-2 text-brand-slate text-sm max-w-2xl">
          โปรโมชั่นรถใหม่ EV ไฟแนนซ์ แคมเปญพิเศษ ส่วนลด และของแถม จากทั้ง 7 แบรนด์ในเครือ
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {CATEGORIES.map((c) => (
            <span key={c} className="text-xs font-semibold border border-brand-line rounded-full px-3 py-1.5 text-brand-slate">
              {c}
            </span>
          ))}
        </div>
      </div>

      {active.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-bold text-brand-navy mb-5">กำลังดำเนินการ ({active.length})</h2>
          {featured && (
            <div className="mb-8">
              <PromotionFeatured promotion={featured} />
            </div>
          )}
          {activeRest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeRest.map((p) => (
                <PromotionCard key={p.slug} promotion={p} />
              ))}
            </div>
          )}
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-bold text-brand-navy mb-5">เร็ว ๆ นี้ ({upcoming.length})</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcoming.map((p) => (
              <PromotionCard key={p.slug} promotion={p} />
            ))}
          </div>
        </section>
      )}

      {expired.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-brand-navy mb-5">หมดอายุแล้ว ({expired.length})</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 opacity-60">
            {expired.map((p) => (
              <PromotionCard key={p.slug} promotion={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
