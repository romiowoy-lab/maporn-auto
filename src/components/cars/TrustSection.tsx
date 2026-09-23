import { ShieldCheck, Route, Building2 } from "lucide-react";

const POINTS = [
  { icon: ShieldCheck, title: "รู้จริงทุกฟังก์ชัน", desc: "อธิบายระบบและฟังก์ชันสำคัญของรถอย่างเข้าใจง่าย ก่อนตัดสินใจ" },
  { icon: Route, title: "ทดลองขับอย่างมั่นใจ", desc: "ดูแลความปลอดภัยและให้คำแนะนำการใช้งานตลอดเส้นทางทดลองขับ" },
  { icon: Building2, title: "มาตรฐานเดียวกันทุกสาขา", desc: "ใส่ใจทุกขั้นตอนในทุกแบรนด์และทุกสาขาทั่วประเทศ" },
];

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#15161A] p-8 sm:p-12">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[480px] -translate-x-1/2 rounded-full bg-brand-red/[0.10] blur-[110px]" />
      <div className="relative mx-auto mb-10 max-w-2xl text-center">
        <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A5A]">
          <span className="h-px w-8 bg-brand-red" /> Certified Professional <span className="h-px w-8 bg-brand-red" />
        </p>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">มั่นใจทุกการทดลองขับกับทีมมืออาชีพ</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          ทีมที่ปรึกษาการขายของ Maporn Autogroup ผ่านการอบรมหลักสูตร Test Drive &amp; Product Training
          พร้อมดูแลและให้ข้อมูลรถแต่ละรุ่นอย่างเข้าใจง่าย
        </p>
      </div>
      <div className="relative grid gap-5 sm:grid-cols-3">
        {POINTS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-[#1C1E22] p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/15 text-[#FF5A5A]">
                <Icon className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
