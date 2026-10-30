import Image from "next/image";

// Suzy Fix branch page — the body & paint story: an editorial mosaic of the paint booth, then the
// four steps every job goes through.
const ORANGE = "#F26A1B";
const P = "/brand/branches/suzy-fix";

const SHOTS = [
  { src: `${P}/booth-5.webp`, alt: "ช่างพ่นสีรถยนต์ในห้องพ่นสีระบบปิด", className: "col-span-2 row-span-2 lg:col-span-7" },
  { src: `${P}/booth-1.webp`, alt: "พ่นสีกันชนในห้องพ่นสี", className: "lg:col-span-5" },
  { src: `${P}/booth-2.webp`, alt: "ห้องพ่นสีพื้นตะแกรงระบบดูดฝุ่น", className: "lg:col-span-5" },
  { src: `${P}/booth-6.webp`, alt: "คลุมพื้นที่รอบชิ้นงานก่อนพ่นสี", className: "lg:col-span-4" },
  { src: `${P}/booth-3.webp`, alt: "ช่างผู้ชำนาญงานพ่นสี", className: "lg:col-span-4" },
  { src: `${P}/booth-4.webp`, alt: "พ่นสีกันชนสีขาว", className: "col-span-2 lg:col-span-4" },
];

const STEPS = [
  { title: "ประเมินความเสียหาย", desc: "ตรวจรอยและแจ้งรายการซ่อมพร้อมราคาให้ทราบก่อนเริ่มงาน" },
  { title: "ซ่อมตัวถัง", desc: "เคาะ ดึง และเตรียมพื้นผิวให้เข้ารูปตามโครงสร้างเดิมของรถ" },
  { title: "พ่นสีในห้องพ่นสีระบบปิด", desc: "คลุมชิ้นงานอย่างประณีต พ่นสีในห้องที่ควบคุมฝุ่นเพื่อผิวสีเรียบเนียน" },
  { title: "ตรวจคุณภาพก่อนส่งมอบ", desc: "เช็คเฉดสี ความเรียบ และรายละเอียดทุกจุดก่อนส่งรถคืน" },
];

export default function SuzyFixCraft() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#0b0b0c] py-14 sm:py-20">
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full blur-[140px]" style={{ backgroundColor: `${ORANGE}26` }} />

      <div className="container-page relative">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            งานซ่อมสีและตัวถัง
            <br />
            <span style={{ color: ORANGE }}>ระดับมืออาชีพ</span>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            ทีมช่างผู้ชำนาญของ Suzy Fix ดูแลตั้งแต่ซ่อมตัวถังจนถึงพ่นสีในห้องพ่นสีระบบปิด ใส่ใจทุกขั้นตอนเพื่อให้รถกลับมาสวยเหมือนเดิม
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 auto-rows-[150px] gap-2 sm:auto-rows-[220px] sm:gap-3 lg:grid-cols-12 lg:auto-rows-[230px]">
          {SHOTS.map((s) => (
            <figure key={s.src} className={`group relative overflow-hidden rounded-xl bg-[#1C1E22] ${s.className}`}>
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </figure>
          ))}
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((st, i) => (
            <li key={st.title} className="bg-[#141416] p-6">
              <span className="text-3xl font-black tabular-nums" style={{ color: ORANGE }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-bold text-white">{st.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55">{st.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
