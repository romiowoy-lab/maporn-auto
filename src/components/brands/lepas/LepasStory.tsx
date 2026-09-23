import Image from "next/image";
import { Route, Zap, Gauge, BatteryCharging, Camera, ParkingCircle, Sun, Monitor, Download } from "lucide-react";
import ScrollFx from "@/components/ui/ScrollFx";

// Figures are from the official "Lepas L6 Premium" spec sheet (21.7.26). The photo is the
// cover photo of that sheet.
const STATS = [
  { icon: Route, value: "540", unit: "กม.", label: "ระยะทางขับเคลื่อนด้วยไฟฟ้า (NEDC)" },
  { icon: Zap, value: "218", unit: "แรงม้า", label: "กำลังสูงสุด 160 กิโลวัตต์" },
  { icon: Gauge, value: "275", unit: "Nm", label: "แรงบิดสูงสุด" },
  { icon: BatteryCharging, value: "65.05", unit: "kWh", label: "ความจุแบตเตอรี่ขับเคลื่อน" },
];

const HIGHLIGHTS = [
  { icon: Camera, text: "กล้องพาโนรามิค 540° (HD)" },
  { icon: ParkingCircle, text: "APA ระบบช่วยจอดอัตโนมัติเต็มรูปแบบ" },
  { icon: Sun, text: "พาโนรามิคซันรูฟ" },
  { icon: Monitor, text: "จอกลางแนวทัชสกรีน 13.2 นิ้ว" },
];

export default function LepasStory() {
  return (
    <section id="story" className="scroll-mt-32 relative bg-[#0a0a0b] py-16 sm:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_1fr] lg:gap-14">
        <ScrollFx effect="scale">
          <div className="relative mx-auto w-full max-w-[780px] lg:mx-0">
            {/* soft gold glow + offset frame behind the photo */}
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#C9A15A]/[0.10] blur-3xl" />
            <div className="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-[#C9A15A]/50" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
              <Image
                src="/brand/lepas-l6/street.jpg"
                alt="Lepas L6 สีส้ม บนถนนในเมืองยามเย็น"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                style={{ objectPosition: "50% 42%" }}
              />
            </div>
          </div>
        </ScrollFx>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A15A]">LEPAS</p>
          <ScrollFx effect="fade-up">
            <h2 className="mt-2 text-4xl sm:text-6xl font-extralight tracking-tight text-white">The Art of Elegance</h2>
          </ScrollFx>
          <p className="mt-2 max-w-xl text-sm sm:text-base text-white/60">
            ความสง่างามที่มากกว่าการเดินทาง คือไลฟ์สไตล์ที่เป็นคุณ
          </p>

          <ScrollFx effect="fade-up" stagger={0.08} className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="border-l border-[#C9A15A]/40 pl-4">
                  <Icon className="h-4 w-4 text-[#E8C77E]" strokeWidth={1.5} />
                  <p className="mt-2 text-4xl sm:text-5xl font-extralight tracking-tight text-white">
                    {s.value} <span className="text-base text-white/60">{s.unit}</span>
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">{s.label}</p>
                </div>
              );
            })}
          </ScrollFx>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <li key={h.text} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                  <Icon className="h-5 w-5 shrink-0 text-[#E8C77E]" strokeWidth={1.5} />
                  {h.text}
                </li>
              );
            })}
          </ul>
          <a
            href="/downloads/lepas-l6-premium-spec-sheet.pdf"
            download="Lepas-L6-Premium-Spec-Sheet.pdf"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-[#C9A15A]/60 bg-[#C9A15A]/10 px-6 py-3 text-sm font-semibold text-[#E8C77E] transition-colors hover:bg-[#C9A15A] hover:text-[#1a1408]"
          >
            <Download className="h-4 w-4" />
            ดาวน์โหลดสเปก Lepas L6 Premium (PDF)
          </a>
          <p className="mt-5 text-[11px] text-white/35">
            *ระยะทางที่ขับได้จริงขึ้นอยู่กับพฤติกรรมการขับขี่ ลักษณะเส้นทาง อุณหภูมิแวดล้อม จำนวนผู้โดยสาร และปัจจัยอื่นๆ ตัวเลขที่แสดงเป็นข้อมูลเบื้องต้น อาจเปลี่ยนแปลงได้
          </p>
        </div>
      </div>
    </section>
  );
}
