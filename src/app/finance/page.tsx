import Link from "next/link";
import type { Metadata } from "next";
import LoanCalculator from "@/components/finance/LoanCalculator";
import { promotions, getPromotionStatus } from "@/lib/data/promotions";
import PromotionCard from "@/components/promotions/PromotionCard";

export const metadata: Metadata = {
  title: "สินเชื่อรถยนต์ / Car Loan",
  description: "คำนวณค่างวดรถยนต์เบื้องต้นด้วย Loan Calculator พร้อมโปรโมชั่นไฟแนนซ์ล่าสุดจาก Maporn Autogroup",
};

export default function FinancePage() {
  const financePromos = promotions.filter(
    (p) => (p.category === "Financing" || p.category === "Interest Rate") && getPromotionStatus(p) === "Active"
  );

  return (
    <div>
      <section className="bg-brand-navy text-white py-16 sm:py-20">
        <div className="container-page">
          <p className="section-eyebrow-light mb-2">Finance / Car Loan</p>
          <h1 className="text-3xl sm:text-5xl font-black max-w-2xl">สินเชื่อรถยนต์ ผ่อนสบาย เข้าใจง่าย</h1>
          <p className="mt-4 max-w-xl text-white/70 text-sm sm:text-base">
            เรามีพันธมิตรสถาบันการเงินชั้นนำ พร้อมโปรโมชั่นดอกเบี้ยพิเศษให้เลือกหลากหลาย ลองคำนวณค่างวดเบื้องต้นได้ด้านล่าง
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <h2 className="text-2xl font-bold text-brand-navy mb-2">คำนวณค่างวดเบื้องต้น</h2>
        <p className="text-brand-slate text-sm mb-8">ปรับตัวเลขเพื่อประมาณการค่างวดรายเดือนของคุณ</p>
        <LoanCalculator />
      </section>

      {financePromos.length > 0 && (
        <section className="bg-slate-50 py-14 sm:py-20">
          <div className="container-page">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">โปรโมชั่นไฟแนนซ์ล่าสุด</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {financePromos.map((p) => (
                <PromotionCard key={p.slug} promotion={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-14 sm:py-20 text-center">
        <h2 className="text-2xl font-bold text-brand-navy mb-3">พร้อมเริ่มต้นการเป็นเจ้าของรถคันใหม่แล้วหรือยัง?</h2>
        <p className="text-brand-slate text-sm mb-6 max-w-xl mx-auto">
          ติดต่อฝ่ายขายของเราเพื่อขอรายละเอียดสินเชื่อที่เหมาะกับคุณที่สุด
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/quotation" className="btn-red">
            ขอใบเสนอราคาพร้อมไฟแนนซ์
          </Link>
          <Link href="/contact" className="btn-outline">
            ติดต่อฝ่ายขาย
          </Link>
        </div>
      </section>
    </div>
  );
}
