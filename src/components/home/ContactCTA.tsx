import Link from "next/link";
import { company } from "@/lib/data/company";
import ScrollFx from "@/components/ui/ScrollFx";

export default function ContactCTA() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-page">
        <ScrollFx effect="blur" className="rounded-3xl bg-brand-navy text-white p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-brand-red/10" />
          <div className="absolute -left-10 -bottom-10 h-56 w-56 rounded-full bg-brand-red/10" />
          <div className="relative z-10">
            <p className="section-eyebrow-light mb-3">Let&apos;s Talk</p>
            <h2 className="text-2xl sm:text-4xl font-bold max-w-2xl mx-auto">
              พร้อมให้คำปรึกษาและดูแลคุณตลอดเส้นทางการเลือกซื้อรถ
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto text-sm sm:text-base">
              ทีมฝ่ายขายของเราพร้อมให้คำแนะนำ ตอบทุกคำถาม และช่วยคุณเลือกรถที่ใช่ที่สุด
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
