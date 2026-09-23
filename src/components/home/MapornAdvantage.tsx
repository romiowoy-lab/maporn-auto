import { Scale, ShieldCheck, MapPinned, Infinity as InfinityIcon } from "lucide-react";
import { company } from "@/lib/data/company";

const PILLARS = [
  {
    icon: Scale,
    title: "ที่ปรึกษา Multi-Brand ที่เป็นกลาง",
    description: "รวม 7 แบรนด์ชั้นนำไว้ในที่เดียว ไม่ผูกติดแบรนด์ใดแบรนด์หนึ่ง แนะนำรถที่เหมาะกับคุณจริง ๆ",
  },
  {
    icon: ShieldCheck,
    title: "มรดก 38 ปี และความน่าเชื่อถือทางการเงิน",
    description: "ดำเนินธุรกิจตัวแทนจำหน่ายรถยนต์มาตั้งแต่ปี 2531 กว่า 38 ปี พร้อมสถานะทางการเงินที่มั่นคง",
  },
  {
    icon: MapPinned,
    title: "โครงข่ายศูนย์บริการเชิงยุทธศาสตร์",
    description: `${company.branchCount} สาขาครอบคลุมกรุงเทพฯ ปริมณฑล และพื้นที่ EEC (ชลบุรี ระยอง) ให้บริการรวดเร็วใกล้คุณ`,
  },
  {
    icon: InfinityIcon,
    title: "ระบบนิเวศครบวงจร 360°",
    description: "ตั้งแต่การขาย ไฟแนนซ์ บริการหลังการขาย ไปจนถึงศูนย์ซ่อมสีและตัวถัง Suzy Fix ในเครือเดียว",
  },
];

export default function MapornAdvantage() {
  return (
    <section className="bg-[#0B1120] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-3">The Maporn Advantage</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">ทำไมลูกค้าถึงเลือกมาพรพาณิชย์</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="glass-panel p-6 sm:p-7 flex flex-col">
                <span className="text-[11px] font-mono font-semibold text-slate-500 mb-4">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="font-bold text-white text-base leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
