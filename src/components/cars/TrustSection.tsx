const POINTS = [
  { title: "รู้จริงทุกฟังก์ชัน", desc: "อธิบายระบบและฟังก์ชันสำคัญของรถอย่างเข้าใจง่าย ก่อนตัดสินใจ" },
  { title: "ทดลองขับอย่างมั่นใจ", desc: "ดูแลความปลอดภัยและให้คำแนะนำการใช้งานตลอดเส้นทางทดลองขับ" },
  { title: "มาตรฐานเดียวกันทุกสาขา", desc: "ใส่ใจทุกขั้นตอนในทุกแบรนด์และทุกสาขาทั่วประเทศ" },
];

export default function TrustSection() {
  return (
    <section className="rounded-3xl bg-slate-50 p-8 sm:p-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="section-eyebrow mb-2">Certified Professional</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">มั่นใจทุกการทดลองขับกับทีมมืออาชีพ</h2>
        <p className="mt-3 text-brand-slate text-sm leading-relaxed">
          ทีมที่ปรึกษาการขายของ Maporn Autogroup ผ่านการอบรมหลักสูตร Test Drive &amp; Product Training
          พร้อมดูแลและให้ข้อมูลรถแต่ละรุ่นอย่างเข้าใจง่าย
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        {POINTS.map((p) => (
          <div key={p.title} className="card-elevated p-6 text-center">
            <h3 className="font-bold text-brand-navy mb-2">{p.title}</h3>
            <p className="text-sm text-brand-slate leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
