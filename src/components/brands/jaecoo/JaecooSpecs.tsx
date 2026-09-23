"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Cpu, Route, BatteryCharging, Fuel } from "lucide-react";

// Extra JAECOO 7 SHS content taken from the official leaflet "J7_Leaflet_A4 for website.pdf"
// (JAECOO 7 SHS Max). Figures are verbatim from that leaflet; the leaflet notes that the maker
// may change models/specs at any time and that pictures/colours may differ from the real car.

const ACCENT = "#C8B27A";
const ease = [0.16, 1, 0.3, 1] as const;
const P = "/brand/jaecoo-j7/";

/* ---------------- Super Hybrid System ---------------- */
const SHS_STATS = [
  { icon: Cpu, big: "1.5", unit: "Turbo", title: "Super Strong Performance", text: "เครื่องยนต์ 1.5 เทอร์โบ" },
  { icon: Route, big: "1,300", unit: "กม.", title: "Super Long Combined Range", text: "ระยะทางการขับขี่รวม (NEDC)" },
  { icon: BatteryCharging, big: "106", unit: "กม.", title: "Super Long Electric Range", text: "ระยะการขับขี่ด้วยไฟฟ้าล้วน (NEDC)" },
  { icon: Fuel, big: "30.35", unit: "กม./ลิตร*", title: "Super Efficient Fuel Consumption", text: "อัตราการประหยัดน้ำมัน" },
];

export function JaecooSHS() {
  return (
    <section id="shs" className="scroll-mt-40 border-t border-white/[0.06] bg-[#15161A]">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[320px] lg:min-h-full">
          <Image src={P + "road.jpg"} alt="JAECOO 7 SHS บนถนน" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
        <div className="px-6 py-14 sm:px-12 lg:py-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Super Hybrid System</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Smart. Strong. Efficient.</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            เทคโนโลยีอัจฉริยะที่ทั้งแรงและคุ้มค่า เปลี่ยนระบบ HEV และ EV ได้อย่างไร้รอยต่อเพื่อความประหยัด
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SHS_STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.07 }}
                  className="rounded-2xl border border-white/10 bg-[#1C1E22] p-5"
                >
                  <Icon className="h-5 w-5" style={{ color: ACCENT }} strokeWidth={1.6} />
                  <p className="mt-3 text-4xl font-extralight tracking-tight text-white">
                    {s.big} <span className="text-base text-white/60">{s.unit}</span>
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">{s.title}</p>
                  <p className="mt-0.5 text-xs text-white/45">{s.text}</p>
                </motion.div>
              );
            })}
          </div>
          <p className="mt-6 max-w-xl text-[11px] leading-relaxed text-white/45">
            *จากการทดสอบการขับขี่บนเส้นทางจริง ด้วยน้ำมันเต็มถังและพลังงานแบตเตอรี่ที่ 25% ด้วยความเร็วตามที่กฎหมายกำหนด ระยะเวลาเดินทางรวม 2 ชั่วโมง 30 นาที
            บนระยะทาง 200 กิโลเมตร ระยะทางที่ขับได้จริงขึ้นอยู่กับพฤติกรรมการขับขี่ ลักษณะเส้นทาง อุณหภูมิแวดล้อม จำนวนผู้โดยสาร และปัจจัยอื่นๆ
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Highlights mosaic ---------------- */
const TILES = [
  { src: P + "projector.jpg", label: "Projector screen — แผ่นปิดสัมภาระพร้อมจอรับภาพโปรเจคเตอร์แบบม้วนเก็บ", span: "md:col-span-2" },
  { src: P + "dash.jpg", label: "จอสัมผัสคอนโซลกลาง 14.8 นิ้ว", span: "md:col-span-2" },
  { src: P + "seats.jpg", label: "เบาะหลังพับ 60/40", span: "" },
  { src: P + "console.jpg", label: "เท้าแขนพร้อมช่องเก็บของและฟังก์ชันรักษาความเย็น", span: "md:col-span-2" },
];

export function JaecooHighlights() {
  return (
    <section className="border-t border-white/[0.06] bg-[#101114] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            <span className="h-px w-8" style={{ backgroundColor: ACCENT }} /> Highlights <span className="h-px w-8" style={{ backgroundColor: ACCENT }} />
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Made for every journey</h2>
        </div>
        <div className="grid auto-rows-[220px] gap-3 sm:auto-rows-[260px] md:grid-cols-4">
          {TILES.map((t, i) => (
            <motion.figure
              key={t.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, ease, delay: (i % 3) * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl ${t.span}`}
            >
              <Image src={t.src} alt={t.label} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <figcaption className="absolute bottom-3 left-4 right-4 text-xs font-semibold tracking-[0.05em] text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>
                {t.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Technical data + equipment ---------------- */
const SPECS: [string, string][] = [
  ["ระบบขับเคลื่อน", "Super Hybrid System (SHS) ขับเคลื่อนล้อหน้า"],
  ["เครื่องยนต์", "1.5 TGDI พร้อมเทอร์โบ"],
  ["กำลังสูงสุดเครื่องยนต์", "105 kW (143 แรงม้า)"],
  ["แรงบิดสูงสุดเครื่องยนต์", "215 Nm"],
  ["กำลังสูงสุดมอเตอร์ไฟฟ้า", "150 kW (204 แรงม้า)"],
  ["แรงบิดสูงสุดมอเตอร์ไฟฟ้า", "310 Nm"],
  ["ระยะทางขับเคลื่อนรวมทั้งระบบ (NEDC)", "1,300 กม."],
  ["ความจุแบตเตอรี่ไฟฟ้าแรงสูง", "18.3 kWh"],
  ["รองรับการชาร์จ AC สูงสุด", "6.6 kW"],
  ["รองรับการชาร์จ DC สูงสุด", "40 kW"],
  ["อัตราเร่ง 0–100 กม./ชม.", "8.5 วินาที"],
  ["ความเร็วสูงสุดโดยประมาณ", "180 กม./ชม."],
  ["พื้นที่บรรทุกสัมภาระ", "500 ลิตร"],
  ["มิติตัวถัง (กว้าง × ยาว × สูง)", "1,865 × 4,500 × 1,670 มม."],
  ["ระยะฐานล้อ", "2,672 มม."],
  ["ระยะต่ำสุดจากพื้น", "174 มม."],
  ["ขนาดล้อและยาง (หน้า/หลัง)", "235/50 R19"],
  ["สีภายนอก", "Olive Grey (Black Roof) · Carbon Black · Khaki White · Moonlight Silver (Black Roof)"],
  ["เบาะภายใน", "หนังสีดำ (Black Leather) / หนังสีน้ำตาล (Brown Leather)"],
];

const EQUIPMENT: { id: string; label: string; items: string[] }[] = [
  {
    id: "exterior",
    label: "ภายนอก",
    items: [
      "จานเบรกหน้าเจาะรูระบายความร้อน / จานเบรกหลัง",
      "ไฟหน้า LED ปรับระดับด้วยระบบไฟฟ้า ทำงานอัตโนมัติ",
      "ไฟส่องสว่างสำหรับขับขี่กลางวัน LED",
      "ไฟท้าย LED และไฟเบรกดวงที่สาม LED",
      "ฟังก์ชันไฟส่องนำทางหลังดับเครื่อง",
      "ไฟตัดหมอกหน้า-หลัง",
      "สัญญาณไฟเลี้ยวบริเวณกระจกมองข้าง",
      "กระจกมองข้างพับเก็บด้วยไฟฟ้า แบบไล่ฝ้า",
      "ไฟส่องสว่างที่พื้นติดตั้งบริเวณกระจกมองข้าง",
      "สปอยเลอร์หลังคาแบบสปอร์ต",
      "หลังคาพาโนรามิคซันรูฟ",
      "ราวหลังคา",
      "ระบบปิดบานประตูท้ายด้วยระบบไฟฟ้า",
    ],
  },
  {
    id: "interior",
    label: "ภายใน",
    items: [
      "ก้านคันเกียร์บริเวณคอพวงมาลัย",
      "ไฟเรืองแสงล้อมรอบห้องโดยสาร 64 เฉดสี",
      "พวงมาลัยหุ้มหนัง มัลติฟังก์ชัน",
      "ฟังก์ชันแสดงข้อมูลการขับขี่บนกระจกบังลมหน้า",
      "รองรับผู้โดยสาร 5 ที่นั่ง",
      "เบาะผู้ขับปรับไฟฟ้า 6 ทิศทาง พร้อมหน่วยความจำ",
      "เบาะผู้ขับระบายอากาศ อุ่นเบาะ ดันหลัง และ Welcome Seat",
      "เบาะผู้โดยสารหน้าปรับไฟฟ้า 4 ทิศทาง ระบายอากาศและอุ่นเบาะ",
      "เบาะหลังพับ 60/40 พร้อมหมอนรองศีรษะ 3 ตำแหน่ง",
      "ที่เท้าแขนพร้อมช่องเก็บของและฟังก์ชันรักษาความเย็น",
      "แผ่นปิดสัมภาระพร้อมจอรับภาพโปรเจคเตอร์แบบม้วนเก็บ",
      "ระบบปรับอากาศแยกอิสระ 2 โซน",
      "ระบบกุญแจ Keyless",
      "กระจกหน้าต่างแบบ One-touch คู่หน้าลดเสียงรบกวน",
      "กระจกมองหลังปรับลดแสงสะท้อนอัตโนมัติ",
      "จอแสดงผลมาตรวัด 10.25 นิ้ว",
      "จอสัมผัสคอนโซลกลาง 14.8 นิ้ว บลูทูธ เชื่อมต่อโทรศัพท์มือถือ",
      "เครื่องเสียง SONY 8 ลำโพง",
      "ช่อง USB หน้าและหลัง",
      "ชาร์จโทรศัพท์มือถือไร้สาย 50 วัตต์",
      "ช่องจ่ายไฟ 12 โวลต์และไฟส่องสว่างบริเวณที่เก็บสัมภาระ",
    ],
  },
  {
    id: "safety",
    label: "ความปลอดภัยและเทคโนโลยี",
    items: [
      "ระบบกรองอากาศ N95 และระบบป้องกันการโจรกรรม",
      "เซ็นเซอร์ช่วยจอดรถด้านหน้าและด้านหลัง",
      "ABS · EBD · BAS · BOS · EBA · ESP · TCS · VDC",
      "HAC ป้องกันรถไหลเมื่อขึ้นทางลาดชัน · HDC ควบคุมความเร็วขณะลงทางลาดชัน",
      "TPMS ระบบตรวจสอบแรงดันลมยาง",
      "AEB · FCW · ACC · TJA · ICA · IHC",
      "BSD · DOW · LCA · RCTA · RCTB · RCW",
      "LDW · LDP · ELK · IES · CSA · DAI · DMS",
      "ช่วงล่างหน้าแมคเฟอร์สันสตรัท / หลังมัลติลิงค์",
      "โหมดการขับขี่ Eco · Normal · Sport",
      "ถุงลมนิรภัยหน้า ข้าง หัวเข่าผู้ขับ interseat และม่านลม",
      "เข็มขัดนิรภัยแบบรั้งกลับ และจุดยึด ISOFIX",
      "กล้องแสดงภาพรอบทิศทาง 540 องศา (เฉพาะรุ่น Max)",
      "กล้องบันทึกภาพ built-in และชุดซ่อมยางฉุกเฉิน",
    ],
  },
];

export function JaecooSpecs() {
  const [tab, setTab] = useState(EQUIPMENT[0].id);
  const active = EQUIPMENT.find((e) => e.id === tab) ?? EQUIPMENT[0];

  return (
    <section id="specs" className="scroll-mt-40 border-t border-white/[0.06] bg-[#15161A] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            <span className="h-px w-8" style={{ backgroundColor: ACCENT }} /> Specifications <span className="h-px w-8" style={{ backgroundColor: ACCENT }} />
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">JAECOO 7 SHS Max</h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">ข้อมูลทางเทคนิคและอุปกรณ์มาตรฐาน</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* technical data */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22]">
            <p className="border-b border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white">ข้อมูลทางเทคนิค</p>
            <dl>
              {SPECS.map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4 border-b border-white/[0.07] px-5 py-3 text-sm last:border-none">
                  <dt className="text-white/55">{k}</dt>
                  <dd className="max-w-[55%] text-right font-semibold text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* equipment */}
          <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-5 sm:p-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white">อุปกรณ์มาตรฐาน</p>
            <div className="mb-5 flex flex-wrap gap-2" role="tablist">
              {EQUIPMENT.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === e.id}
                  onClick={() => setTab(e.id)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${
                    tab === e.id ? "border-transparent text-[#241d0f]" : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
                  }`}
                  style={tab === e.id ? { backgroundColor: ACCENT } : undefined}
                >
                  {e.label}
                </button>
              ))}
            </div>
            <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-1">
              {active.items.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-white/40">
          บริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลงรุ่น ข้อมูลทางเทคนิค ระบบ และอุปกรณ์ทั้งภายในและภายนอกตัวรถได้ตลอดเวลาโดยไม่ต้องแจ้งให้ทราบล่วงหน้า ภาพและสีที่ปรากฏอาจแตกต่างจากที่จำหน่ายจริง
        </p>
      </div>
    </section>
  );
}
