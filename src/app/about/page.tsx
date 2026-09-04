import type { Metadata } from "next";
import Link from "next/link";
import { company, companyTimeline, companyValues } from "@/lib/data/company";
import { brands } from "@/lib/data/brands";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "ประวัติ วิสัยทัศน์ พันธกิจ และความน่าเชื่อถือของ Maporn Autogroup ตัวแทนจำหน่ายรถยนต์ 7 แบรนด์",
};

const TEAM = [
  { name: "คุณมาพร ศรีสุวรรณ", role: "ประธานกรรมการบริหาร" },
  { name: "คุณธนกร วัฒนกุล", role: "ผู้อำนวยการฝ่ายขาย" },
  { name: "คุณสุภาพร เจริญพงศ์", role: "ผู้อำนวยการฝ่ายบริการหลังการขาย" },
  { name: "คุณวีรชัย ทองประเสริฐ", role: "ผู้อำนวยการฝ่ายการตลาด" },
];

const CERTIFICATIONS = [
  "ตัวแทนจำหน่ายอย่างเป็นทางการครบทั้ง 7 แบรนด์",
  "มาตรฐานศูนย์บริการ ISO 9001",
  "รางวัลดีลเลอร์ยอดเยี่ยมประจำปี",
  "สมาชิกสมาคมผู้จำหน่ายรถยนต์ไทย",
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-brand-navy text-white py-16 sm:py-24">
        <div className="container-page">
          <p className="section-eyebrow-light mb-2">About Us</p>
          <h1 className="text-3xl sm:text-5xl font-black max-w-2xl">เกี่ยวกับ {company.name}</h1>
          <p className="mt-4 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ 7 แบรนด์ ที่มุ่งมั่นสร้างประสบการณ์การเป็นเจ้าของรถยนต์ที่ดีที่สุดให้กับลูกค้าทุกคน
            ด้วยความน่าเชื่อถือและบริการครบวงจรมากว่า {new Date().getFullYear() - Number(company.foundedYear)} ปี
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20 grid lg:grid-cols-2 gap-10">
        <div className="card-elevated p-7">
          <h2 className="text-xl font-bold text-brand-navy mb-3">วิสัยทัศน์</h2>
          <p className="text-brand-slate leading-relaxed text-sm">
            เป็นผู้นำธุรกิจดีลเลอร์รถยนต์หลายแบรนด์ที่ลูกค้าไว้วางใจมากที่สุดในประเทศไทย
            ด้วยการนำเสนอทางเลือกยานยนต์ที่หลากหลายและบริการที่เหนือความคาดหมาย
          </p>
        </div>
        <div className="card-elevated p-7">
          <h2 className="text-xl font-bold text-brand-navy mb-3">พันธกิจ</h2>
          <p className="text-brand-slate leading-relaxed text-sm">
            มอบประสบการณ์การเลือกซื้อรถยนต์ที่โปร่งใส เป็นธรรม และสะดวกสบาย พร้อมดูแลลูกค้าตลอดอายุการใช้งานของรถ
            ตั้งแต่วันแรกที่ซื้อไปจนถึงบริการหลังการขาย
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-brand-navy mb-8 text-center">จุดเด่นของบริษัท</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {companyValues.map((v) => (
              <div key={v.title} className="card-elevated p-6">
                <h3 className="font-bold text-brand-navy mb-2">{v.title}</h3>
                <p className="text-sm text-brand-slate leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <h2 className="text-2xl font-bold text-brand-navy mb-10 text-center">เส้นทางการเติบโตของเรา</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {companyTimeline.map((t) => (
            <div key={t.year} className="flex gap-5">
              <div className="w-16 shrink-0 text-right">
                <span className="font-black text-brand-red text-lg">{t.year}</span>
              </div>
              <div className="relative pl-6 border-l-2 border-brand-line pb-6 last:pb-0">
                <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-brand-red" />
                <h3 className="font-bold text-brand-navy">{t.title}</h3>
                <p className="text-sm text-brand-slate mt-1">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-brand-navy mb-8 text-center">ทีมผู้บริหาร</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((m) => (
              <div key={m.name} className="card-elevated p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-brand-navy text-white font-black text-xl mx-auto mb-3 flex items-center justify-center">
                  {m.name.slice(6, 8)}
                </div>
                <p className="font-bold text-brand-navy text-sm">{m.name}</p>
                <p className="text-xs text-brand-slate mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy mb-5">รางวัลและมาตรฐาน</h2>
            <ul className="space-y-3">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-brand-slate">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 mt-0.5 text-brand-red shrink-0">
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-navy mb-5">บริษัทในเครือ / แบรนด์ที่จำหน่าย</h2>
            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  className="text-xs font-semibold px-3.5 py-2 rounded-full text-white"
                  style={{ backgroundColor: b.colorHex }}
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
