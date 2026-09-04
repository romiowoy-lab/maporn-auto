import Link from "next/link";
import { company } from "@/lib/data/company";
import ScrollFx from "@/components/ui/ScrollFx";

export default function ContactCTA() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="container-page">
        <ScrollFx effect="blur" className="rounded-sm bg-brand-navy text-white p-10 sm:p-20 text-center relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 hairline-light" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-center">
            <p className="section-eyebrow-light mb-5">Let&apos;s Talk</p>
            <h2 className="text-3xl sm:text-5xl font-black max-w-3xl mx-auto leading-[1.04] tracking-[-0.03em] text-balance">
              พร้อมให้คำปรึกษาและดูแลคุณตลอดเส้นทางการเลือกซื้อรถ
            </h2>
            <p className="mt-5 text-white/70 max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
              ทีมฝ่ายขายของเราพร้อมให้คำแนะนำ ตอบทุกคำถาม และช่วยคุณเลือกรถที่ใช่ที่สุด
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={`tel:${company.salesPhone}`} className="btn-red">
                โทร {company.salesPhone}
              </a>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy">
                ติดต่อฝ่ายขาย
              </Link>
            </div>
          </div>
        </ScrollFx>
      </div>
    </section>
  );
}
