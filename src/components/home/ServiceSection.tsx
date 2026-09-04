import Link from "next/link";
import { serviceOfferings } from "@/lib/data/branches";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";

export default function ServiceSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <ScrollFx effect="slide-right">
            <SectionHeading
              eyebrow="Service Center"
              title="ศูนย์บริการมาตรฐาน ดูแลรถคุณครบวงจร"
              description="ทีมช่างผู้เชี่ยวชาญและอะไหล่แท้ครบทุกแบรนด์ พร้อมบริการบำรุงรักษา ซ่อมบำรุง และช่วยเหลือฉุกเฉินตลอด 24 ชั่วโมง"
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/service/appointment" className="btn-primary">
                นัดหมายเข้าศูนย์บริการ
              </Link>
              <Link href="/service" className="btn-outline">
                ดูรายละเอียดศูนย์บริการ
              </Link>
            </div>
          </ScrollFx>
          <ScrollFx effect="fade-up" stagger={0.1} className="grid grid-cols-2 gap-4">
            {serviceOfferings.slice(0, 4).map((s) => (
              <div key={s.title} className="card-elevated p-5">
                <h3 className="font-bold text-brand-navy text-sm mb-1.5">{s.title}</h3>
                <p className="text-xs text-brand-slate leading-relaxed">{s.description}</p>
              </div>
            ))}
          </ScrollFx>
        </div>
      </div>
    </section>
  );
}
