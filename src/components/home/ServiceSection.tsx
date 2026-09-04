import Link from "next/link";
import { serviceOfferings } from "@/lib/data/branches";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";

export default function ServiceSection() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollFx effect="slide-right">
            <SectionHeading
              eyebrow="Service Center"
              title="ศูนย์บริการมาตรฐาน ดูแลรถคุณครบวงจร"
              description="ทีมช่างผู้เชี่ยวชาญและอะไหล่แท้ครบทุกแบรนด์ พร้อมบริการบำรุงรักษา ซ่อมบำรุง และช่วยเหลือฉุกเฉินตลอด 24 ชั่วโมง"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/service/appointment" className="btn-primary">
                นัดหมายเข้าศูนย์บริการ
              </Link>
              <Link href="/service" className="btn-outline">
                ดูรายละเอียดศูนย์บริการ
              </Link>
            </div>
          </ScrollFx>
          <ScrollFx effect="fade-up" stagger={0.1} className="grid grid-cols-2 gap-5">
            {serviceOfferings.slice(0, 4).map((s) => (
              <div key={s.title} className="card-elevated p-6">
                <h3 className="font-bold text-brand-navy text-sm mb-2">{s.title}</h3>
                <p className="text-xs text-brand-slate font-light leading-relaxed">{s.description}</p>
              </div>
            ))}
          </ScrollFx>
        </div>
      </div>
    </section>
  );
}
