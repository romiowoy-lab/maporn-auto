"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";
import { j6 } from "@/lib/data/jaecoo-j6";
import { formatTHB } from "@/lib/utils";

// JAECOO 6 EV — the third tab of the OMODA | JAECOO switch. All numbers come from
// src/lib/data/jaecoo-j6.ts (official spec sheet + omodajaecoo.co.th prices).

const ACCENT = "#C8B27A";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" };
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease },
};

const [rwd, awd] = j6.variants;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
      {children}
    </p>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-sm text-white/80 sm:text-base">
          <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Photo({ src, alt, className = "", position = "center" }: { src: string; alt: string; className?: string; position?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: position }} />
    </div>
  );
}

function Hero() {
  return (
    <section id="j6-model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#101114]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={j6.video}
        poster={j6.images.side}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#101114]/70 via-transparent to-[#101114]/80" />

      <div className="container-page relative z-10 pt-28 sm:pt-32" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }}>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">100% Electric · One Box Style Off-Road</p>
          <h1 className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">JAECOO 6 EV</h1>
          <p className="mt-4 text-base text-white/90 sm:text-lg">ฉีกกฎงานดีไซน์ทุกการเดินทาง · เริ่มต้น {formatTHB(rwd.price)}</p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-wrap justify-center gap-3 px-4">
        <Link
          href="/quotation?brand=jaecoo"
          className="rounded-lg px-8 py-3 text-sm font-bold text-[#241d0f] shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110"
          style={{ backgroundColor: ACCENT }}
        >
          ขอใบเสนอราคา
        </Link>
        <Link
          href="/test-drive?brand=jaecoo"
          className="rounded-lg border border-white/50 bg-[#101114]/60 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]"
        >
          ทดลองขับ
        </Link>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    { value: awd.hp, unit: "hp", label: "Power", note: `4WD · 2WD ${rwd.hp} แรงม้า` },
    { value: awd.torqueNm, unit: "Nm", label: "Torque", note: `4WD · 2WD ${rwd.torqueNm} Nm` },
    { value: awd.accel, unit: "s", label: "0-100 km/h", note: `4WD · 2WD ${rwd.accel} วินาที` },
    { value: rwd.rangeKm, unit: "km", label: "Range*", note: `* NEDC 2WD · 4WD ${awd.rangeKm} กม.` },
  ];
  return (
    <section className="border-t border-white/[0.06] bg-[#17181c] py-12 sm:py-16">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {items.map((s) => (
          <Stat key={s.label} value={s.value} unit={s.unit} label={s.label} note={s.note} size="md" />
        ))}
      </div>
    </section>
  );
}

function Design() {
  return (
    <section id="j6-design" className="scroll-mt-40 border-t border-white/[0.06] bg-[#e9ecef] py-14 text-[#101114] sm:py-20">
      <div className="container-page">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>One Box Style · Off-Road Trendy</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl">ฉีกกฎงานดีไซน์ทุกการเดินทาง</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease }}
          className="relative mt-8 aspect-[1320/540] w-full"
        >
          <Image src={j6.images.side} alt="JAECOO 6 EV ด้านข้าง" fill sizes="100vw" className="object-contain" />
        </motion.div>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <ul className="space-y-3">
            {j6.design.map((t) => (
              <li key={t} className="flex gap-3 text-sm text-[#101114]/80 sm:text-base">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9a8550]" />
                {t}
              </li>
            ))}
          </ul>
          <Photo src={j6.images.structure} alt="โครงสร้างตัวถังอะลูมิเนียม JAECOO 6 EV" className="aspect-[648/520] w-full max-w-md rounded-2xl lg:justify-self-end" />
        </div>
      </div>
    </section>
  );
}

function Battery() {
  return (
    <section id="j6-battery" className="scroll-mt-40 border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <Photo src={j6.images.battery} alt="แบตเตอรี่ LFP 68 kWh" className="aspect-[648/520] w-full rounded-2xl" />
        <div>
          <motion.div {...reveal}>
            <Eyebrow>Battery &amp; Charging</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">ไฟฟ้า 100% วิ่งไกล ชาร์จไว</h2>
          </motion.div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
            <Stat value={68} unit="kWh" label="Battery" note="LFP" size="md" />
            <Stat value={80} unit="kW" label="DC charge" note="สูงสุดโดยประมาณ" size="md" />
            <Stat value={6.6} unit="kW" label="AC charge" note="สูงสุด" size="md" />
            <Stat value={3.3} unit="kW" label="V2L" note="จ่ายไฟภายนอก" size="md" />
          </div>
          <div className="mt-10">
            <CheckList items={j6.battery} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Interior() {
  return (
    <section id="j6-interior" className="scroll-mt-40 border-t border-white/[0.06] bg-[#26272b] py-14 sm:py-20">
      <div className="container-page">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>Interior</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">เติมเต็มสุนทรียภาพแห่งการขับขี่</h2>
        </motion.div>
        <Photo src={j6.images.dash} alt="ห้องโดยสาร JAECOO 6 EV จอกลาง 15.6 นิ้ว" className="mt-8 aspect-[3/2] w-full rounded-2xl sm:aspect-[16/7]" position="50% 55%" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Photo src={j6.images.seats} alt="เบาะคู่หน้าพร้อมฟังก์ชันนวด" className="aspect-[3/2] w-full rounded-2xl" />
          <Photo src={j6.images.dashGreen} alt="ห้องโดยสารโทนสีเขียว" className="aspect-[3/2] w-full rounded-2xl" />
        </div>
        <div className="mt-10 max-w-3xl">
          <CheckList items={j6.interior} />
        </div>
      </div>
    </section>
  );
}

function DriveModes() {
  return (
    <section className="border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
      <div className="container-page text-center">
        <motion.div {...reveal}>
          <Eyebrow>Drive Modes</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">สนุกและปลอดภัยด้วย 9 โหมดการขับขี่</h2>
          <p className="mt-2 text-sm text-white/60">LONG RANGE 4WD 9 โหมด · 2WD MAX 4 โหมด (Eco, Normal, Sport, Custom)</p>
        </motion.div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {j6.driveModes.map((m, i) => (
            <span
              key={m}
              className="rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.1em]"
              style={i < 4 ? { borderColor: ACCENT, color: ACCENT } : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section id="j6-safety" className="scroll-mt-40 border-t border-white/[0.06] bg-[#17181c] py-14 sm:py-20">
      <div className="container-page">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>ADAS · 14 ระบบ</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">มั่นใจทุกการขับขี่ ด้วยเทคโนโลยีความปลอดภัยเหนือระดับ</h2>
          <p className="mt-2 text-sm text-white/60">LONG RANGE 4WD ครบ 14 ระบบ · 2WD MAX 8 ระบบ · ถุงลมนิรภัย 6 ใบ ทั้ง 2 รุ่น</p>
        </motion.div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {j6.adas.map((a) => (
            <div key={a.code} className="overflow-hidden rounded-2xl border border-white/10 bg-[#101114]">
              <div className="relative aspect-[3/2]">
                <Image src={a.img} alt={`${a.code} — ${a.name}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                {a.fourWdOnly && (
                  <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                    เฉพาะ 4WD
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: ACCENT }}>{a.code}</p>
                <p className="mt-0.5 text-xs text-white/70 sm:text-sm">{a.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Colors() {
  const [active, setActive] = useState(0);
  const c = j6.colors[active];
  return (
    <section id="j6-colors" className="scroll-mt-40 border-t border-white/[0.06] bg-[#f3f4f5] py-14 text-[#101114] sm:py-20">
      <div className="container-page text-center">
        <motion.div {...reveal}>
          <Eyebrow>Colors</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl">ความโดดเด่นที่เหมาะกับไลฟ์สไตล์ของคุณ</h2>
        </motion.div>
        <div className="relative mx-auto mt-6 aspect-[8/5] w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={c.name} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease }} className="absolute inset-0">
              <Image src={c.img} alt={`JAECOO 6 EV สี ${c.name}`} fill sizes="(max-width: 768px) 100vw, 768px" className="object-contain" />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-2 text-lg font-semibold">{c.name}</p>
        <div className="mt-4 flex justify-center gap-3" role="radiogroup" aria-label="เลือกสี JAECOO 6 EV">
          {j6.colors.map((col, i) => (
            <button
              key={col.name}
              type="button"
              role="radio"
              aria-checked={i === active}
              aria-label={col.name}
              onClick={() => setActive(i)}
              className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${i === active ? "scale-110 border-[#101114]" : "border-black/15"}`}
              style={{ backgroundColor: col.swatch }}
            />
          ))}
        </div>
        <p className="mt-4 text-xs text-[#101114]/55">รุ่น LONG RANGE 4WD มีสี Forest Green เพิ่มเติม</p>
      </div>
    </section>
  );
}

function Specs() {
  const rows: { label: string; a: string; b: string }[] = [
    { label: "ราคาแนะนำ", a: formatTHB(rwd.price), b: formatTHB(awd.price) },
    { label: "ระบบขับเคลื่อน", a: rwd.drive, b: awd.drive },
    { label: "กำลังสูงสุด", a: `${rwd.powerKw} kW (${rwd.hp} แรงม้า)`, b: `${awd.powerKw} kW (${awd.hp} แรงม้า)` },
    { label: "แรงบิดสูงสุด", a: `${rwd.torqueNm} Nm`, b: `${awd.torqueNm} Nm` },
    { label: "0-100 กม./ชม.", a: `${rwd.accel} วินาที`, b: `${awd.accel} วินาที` },
    { label: "ระยะทาง (NEDC)", a: `${rwd.rangeKm} กม.`, b: `${awd.rangeKm} กม.` },
    { label: "มิติตัวถัง กว้าง×ยาว×สูง (มม.)", a: rwd.dimensions, b: awd.dimensions },
    { label: "ล้อและยาง", a: rwd.wheel, b: awd.wheel },
    { label: "กล้องรอบทิศทาง", a: rwd.camera, b: awd.camera },
    { label: "เครื่องเสียง", a: rwd.audio, b: awd.audio },
    { label: "โหมดการขับขี่", a: rwd.driveModes, b: awd.driveModes },
    ...j6.common.map((c) => ({ label: c.label, a: c.value, b: c.value })),
  ];
  return (
    <section id="j6-specs" className="scroll-mt-40 border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
      <div className="container-page">
        <motion.div {...reveal}>
          <Eyebrow>Specifications</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">เปรียบเทียบรุ่น</h2>
        </motion.div>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-white/[0.04]">
              <tr>
                <th className="p-4 font-medium text-white/50">รายการ</th>
                <th className="p-4 font-bold text-white">{rwd.name}</th>
                <th className="p-4 font-bold text-white">{awd.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.label} className={i % 2 ? "bg-white/[0.02]" : ""}>
                  <td className="p-4 text-white/60">{r.label}</td>
                  <td className={`p-4 ${i === 0 ? "font-bold" : ""} text-white`} style={i === 0 ? { color: ACCENT } : undefined}>{r.a}</td>
                  <td className={`p-4 ${i === 0 ? "font-bold" : ""} text-white`} style={i === 0 ? { color: ACCENT } : undefined}>{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-white/40">ที่มา: ตารางสเปก JAECOO 6 EV อย่างเป็นทางการ (มี.ค. 2026) · ระยะทางจริงขึ้นอยู่กับพฤติกรรมการขับขี่และสภาพแวดล้อม</p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#101114]">
      <div className="absolute inset-0">
        <Photo src={j6.images.dash} alt="" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-[#101114]/70" />
      <div className="container-page relative z-10 flex min-h-[440px] flex-col items-center justify-center gap-8 py-14 text-center">
        <motion.h2 {...reveal} className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl" style={SHADOW}>
          พร้อมออกเดินทางกับ JAECOO 6 EV?
          <span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">ทีมงาน Maporn Autogroup พร้อมให้คำปรึกษาและนัดหมายทดลองขับ</span>
        </motion.h2>
        <div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/quotation?brand=jaecoo" className="rounded-lg px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#241d0f] transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ขอใบเสนอราคา
            </Link>
            <a href="tel:023223663" className="rounded-lg border border-white/40 bg-[#101114]/50 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]">
              โทร 02-322-3663-5
            </a>
          </div>
          <p className="mt-4 text-[11px] text-white/70" style={SHADOW}>*ภาพประกอบเพื่อการนำเสนอเท่านั้น รายละเอียดอาจแตกต่างจากรถจริง</p>
        </div>
      </div>
    </section>
  );
}

export default function JaecooJ6Showroom() {
  return (
    <div className="bg-[#101114]">
      <Hero />
      <Highlights />
      <Design />
      <Battery />
      <Interior />
      <DriveModes />
      <Safety />
      <Colors />
      <Specs />
      <CTA />
    </div>
  );
}
