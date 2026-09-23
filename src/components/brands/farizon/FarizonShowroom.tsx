"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Route, BatteryCharging, Users, Gauge, Check, Phone, Mail, ShieldCheck, Monitor } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";

// FARIZON showroom (high-end dark layout). Specs are from the official
// "FARIZON EV Passenger SUPER VAN P5M (5.5 m)" technical sheet supplied by Maporn.
// The sheet's cover photo and the exhibition photos carry a third party's (KING GEN)
// branding, so they are NOT used — only clean photos.

const ACCENT = "#3DE0F0";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 26px rgba(0,0,0,0.6)" };
const P = "/brand/farizon-p5m/";
const PRODUCT_URL = "https://www.mapornautotech.com/th/page/product-list";

const SECTIONS = [
  { id: "model", label: "Model" },
  { id: "design", label: "Design" },
  { id: "performance", label: "Performance" },
  { id: "specs", label: "Specs" },
  { id: "business", label: "Business" },
];

const SPEC_GROUPS: { title: string; rows: [string, string][] }[] = [
  {
    title: "มิติตัวถัง",
    rows: [
      ["ขนาดตัวถัง (ยาว × กว้าง × สูง)", "5,490 × 1,980 × 2,180 มม."],
      ["ขนาดห้องโดยสาร (ยาว × กว้าง × สูง)", "3,190 × 1,795 × 1,650 มม."],
      ["ความจุภายในห้องโดยสาร", "9.39 ลบ.ม."],
      ["ระยะฐานล้อ", "3,600 มม."],
      ["น้ำหนักรถเปล่า", "2,285 กก."],
      ["น้ำหนักบรรทุก", "1,215 กก."],
      ["น้ำหนักรวมน้ำหนักบรรทุก (G.V.W.)", "3,500 กก."],
      ["จำนวนที่นั่ง", "11 ที่นั่ง"],
      ["รัศมีวงเลี้ยว", "7 ม."],
      ["ประตูท้าย", "เปิดได้ 180°"],
    ],
  },
  {
    title: "ระบบส่งกำลังและสมรรถนะ",
    rows: [
      ["ชนิดมอเตอร์", "ซิงโครนัสชนิดแม่เหล็กถาวร"],
      ["กำลังสูงสุด", "65 / 170 kW"],
      ["แรงบิดสูงสุด", "135 / 336 N·m"],
      ["ความเร็วสูงสุด", "135 กม./ชม."],
      ["ระยะทางที่วิ่งได้ (NEDC)", "372 กม."],
      ["ระบบขับเคลื่อน", "2 ล้อ แบบขับเคลื่อนล้อหน้า (FWD)"],
    ],
  },
  {
    title: "แบตเตอรี่และการชาร์จ",
    rows: [
      ["ชนิดแบตเตอรี่", "ลิเธียมไอออนฟอสเฟต (LFP)"],
      ["ความจุแบตเตอรี่", "82.88 kWh"],
      ["การชาร์จสูงสุด", "DC 140 kW / AC 11 kW"],
      ["พอร์ตชาร์จ", "CCS2"],
      ["แรงดันไฟฟ้า", "400 V"],
      ["แบตเตอรี่แรงดันต่ำ", "12 V"],
    ],
  },
  {
    title: "เบรก ช่วงล่าง และล้อ",
    rows: [
      ["ระบบเบรก", "ไฮดรอลิก ดิสก์เบรกหน้า/หลัง"],
      ["ระบบคืนพลังงานขณะเบรก", "มี"],
      ["ช่วงล่างหน้า", "ปีกนกคู่อิสระ (Double wishbone)"],
      ["ช่วงล่างหลัง", "แหนบ (2 ชิ้น)"],
      ["พวงมาลัย", "พาวเวอร์ไฟฟ้า (EPS)"],
      ["ล้อและยาง", "215/75 R16C"],
    ],
  },
  {
    title: "ความบันเทิง ภายใน และความปลอดภัย",
    rows: [
      ["ระบบความบันเทิง", "รองรับ Android / Apple CarPlay / Bluetooth"],
      ["ช่อง USB / USB-C", "1 / 1 ช่อง"],
      ["จอแสดงข้อมูลการขับขี่", "แบบ LCD"],
      ["ถุงลมนิรภัย", "ผู้ขับขี่ และผู้โดยสารตอนหน้า"],
      ["ระบบช่วยเบรกฉุกเฉิน", "EBA / BAS / BA"],
      ["ระบบเบรกป้องกันล้อล็อก", "ABS"],
      ["ระบบควบคุมความเร็วลงทางลาดชัน", "HHC"],
      ["กล้องรอบทิศทาง 360°", "AVM360"],
      ["กุญแจอัจฉริยะ (Smart Keyless)", "2 ดอก"],
    ],
  },
];

function Nav() {
  const [active, setActive] = useState("model");
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (e) => {
        const v = e.filter((x) => x.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <div className="sticky top-[4.5rem] z-40 -mb-16 px-3 pt-2 sm:px-6">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.08] px-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.2em] text-white">Maporn<br />Autogroup</span>
          <span className="h-7 w-px bg-white/25" />
          <span className="text-sm font-extrabold tracking-[0.2em] text-white">FARIZON</span>
        </div>
        <nav className="hidden items-center gap-7 md:flex">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={`border-b pb-0.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${active === s.id ? "text-white" : "border-transparent text-white/60 hover:text-white"}`} style={active === s.id ? { borderColor: ACCENT } : undefined}>
              {s.label}
            </a>
          ))}
        </nav>
        <a href={PRODUCT_URL} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg px-4 py-2 text-[11px] font-bold text-[#04262a] transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
          ดูรุ่นทั้งหมด
        </a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#0B0F12]">
      <h1 className="sr-only">FARIZON SUPERVAN P5M รถตู้ไฟฟ้า 100% ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>
      <video autoPlay muted loop playsInline poster="/brand/studio/farizon-sv-hero.jpg" className="absolute inset-0 h-full w-full object-cover">
        <source src="/brand/video/farizon-sv-hero-motion.mp4" type="video/mp4" />
      </video>
      <div className="container-page relative z-10 flex min-h-[calc(100vh-4.5rem)] items-center pb-24 pt-28" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }} className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/90">FARIZON · SUPERVAN P5M · EV Passenger</p>
          <p className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">Electric mobility for business</p>
          <p className="mt-4 text-base text-white/90 sm:text-lg">รถตู้ไฟฟ้า 100% 11 ที่นั่ง วิ่งได้ 372 กม. ต่อการชาร์จ (NEDC)</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={PRODUCT_URL} target="_blank" rel="noreferrer" className="rounded-lg px-8 py-3 text-sm font-bold text-[#04262a] transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>ดูรุ่นทั้งหมดที่ Maporn Autotech</a>
            <a href="tel:0992299894" className="inline-flex items-center gap-2 rounded-lg border border-white/50 bg-black/30 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#0B0F12]">
              <Phone className="h-4 w-4" /> 099-229-9894
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Design() {
  const tiles = [
    { src: P + "headlight.jpg", label: "ไฟหน้าดีไซน์ล้ำสมัย", cls: "md:col-span-2 md:row-span-2" },
    { src: P + "taillight.jpg", label: "ไฟท้าย LED", cls: "" },
    { src: P + "screen.jpg", label: "จอแสดงข้อมูล LCD", cls: "" },
    { src: P + "wheel.jpg", label: "พวงมาลัยพาวเวอร์ไฟฟ้า", cls: "" },
    { src: P + "buttons.jpg", label: "ปุ่มควบคุมบนพวงมาลัย", cls: "" },
    { src: P + "roof.jpg", label: "คอนโซลเพดาน", cls: "" },
  ];
  return (
    <section id="design" className="scroll-mt-32 border-t border-white/[0.06] bg-[#0F1418] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Design</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">The art of the detail</h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">ตัวถังยาว 5,490 มม. ประตูท้ายเปิดกว้าง 180° ห้องโดยสารจุได้ 11 ที่นั่ง</p>
        </div>
        <div className="grid auto-rows-[190px] gap-3 sm:auto-rows-[220px] md:grid-cols-4">
          {tiles.map((t, i) => (
            <motion.figure key={t.src} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.7, ease, delay: (i % 3) * 0.08 }} className={`group relative overflow-hidden rounded-2xl ${t.cls}`}>
              <Image src={t.src} alt={t.label} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <figcaption className="absolute bottom-3 left-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>{t.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Performance() {
  const items = [
    { icon: Route, value: 372, unit: "กม.", label: "Range", note: "NEDC ต่อการชาร์จ 1 ครั้ง" },
    { icon: Zap, value: 170, unit: "kW", label: "Max power", note: "แรงบิดสูงสุด 336 N·m" },
    { icon: BatteryCharging, value: 82.88, unit: "kWh", label: "Battery", note: "ลิเธียมไอออนฟอสเฟต (LFP)" },
    { icon: Gauge, value: 140, unit: "kW", label: "DC fast charge", note: "CCS2 · AC 11 kW" },
    { icon: Users, value: 11, unit: "", label: "Seats", note: "ที่นั่งผู้โดยสาร" },
    { icon: Gauge, value: 135, unit: "กม./ชม.", label: "Top speed", note: "ความเร็วสูงสุด" },
  ];
  return (
    <section id="performance" className="scroll-mt-32 relative overflow-hidden border-t border-white/[0.06] bg-[#0B0F12] py-16 sm:py-24">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full blur-[140px]" style={{ backgroundColor: ACCENT, opacity: 0.12 }} />
      <div className="container-page relative">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Performance</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Built to go the distance</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
          {items.map(({ icon: Icon, ...s }) => (
            <div key={s.label} className="border-l border-white/15 pl-5">
              <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
              <Stat value={s.value} unit={s.unit || undefined} label={s.label} note={s.note} />
            </div>
          ))}
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Safety", x: "ถุงลมนิรภัยผู้ขับขี่และผู้โดยสารตอนหน้า ABS EBA/BAS กล้อง 360°" },
            { icon: Monitor, t: "Connected", x: "รองรับ Android / Apple CarPlay / Bluetooth จอแสดงข้อมูล LCD" },
            { icon: Zap, t: "Regenerative", x: "ระบบคืนพลังงานขณะเบรก ช่วยยืดระยะทางวิ่ง" },
          ].map(({ icon: Icon, t, x }) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <Icon className="h-6 w-6" style={{ color: ACCENT }} strokeWidth={1.6} />
              <h3 className="mt-3 font-bold text-white">{t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/65">{x}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specs() {
  return (
    <section id="specs" className="scroll-mt-32 border-t border-white/[0.06] bg-[#0F1418] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Specifications</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">EV Passenger SUPER VAN P5M</h2>
          <p className="mt-2 text-sm text-white/60">รายละเอียดด้านเทคนิคและคุณลักษณะเฉพาะ 5.5 เมตร</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {SPEC_GROUPS.map((g) => (
            <div key={g.title} className="overflow-hidden rounded-2xl border border-white/10 bg-[#141A20]">
              <p className="border-b border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>{g.title}</p>
              <dl>
                {g.rows.map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-5 py-3 text-sm last:border-none">
                    <dt className="text-white/55">{k}</dt>
                    <dd className="max-w-[55%] text-right font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-white/40">
          บริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลงรายละเอียดต่างๆ ทั้งข้อความและภาพที่ปรากฏในเอกสารฉบับนี้ ข้อมูลอ้างอิงตามเอกสารทางเทคนิคของผู้ผลิต
        </p>
      </div>
    </section>
  );
}

function Business() {
  return (
    <section id="business" className="scroll-mt-32 relative overflow-hidden border-t border-white/[0.06] bg-[#0B0F12]">
      <div className="relative min-h-[520px]">
        <Image src={P + "worker.jpg"} alt="รถตู้ไฟฟ้า FARIZON สำหรับงานธุรกิจ" fill sizes="100vw" className="object-cover" style={{ objectPosition: "35% 60%" }} />
        <div className="container-page relative z-10 flex min-h-[520px] flex-col items-center justify-between gap-10 py-14 text-center" style={SHADOW}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/90">Fleet &amp; Business</p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">พร้อมเลือกรถคันใหม่แล้วหรือยัง?<span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">ทีมงาน Maporn Autogroup พร้อมให้คำปรึกษาและนัดหมายทดลองขับ</span></h2>
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="tel:0992299894" className="inline-flex items-center gap-2 rounded-lg px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#04262a] transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
                <Phone className="h-4 w-4" /> 099-229-9894
              </a>
              <a href="mailto:farizon_supervan@maporn.co.th" className="inline-flex items-center gap-2 rounded-lg border border-white/50 bg-black/30 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#0B0F12]">
                <Mail className="h-4 w-4" /> Email
              </a>
              <a href={PRODUCT_URL} target="_blank" rel="noreferrer" className="rounded-lg border border-white/50 bg-black/30 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#0B0F12]">All models</a>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/80"><Check className="h-3.5 w-3.5" /> ภาพประกอบเพื่อการนำเสนอเท่านั้น รายละเอียดอาจแตกต่างจากรถจริง</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FarizonShowroom() {
  return (
    <div className="bg-[#0B0F12]">
      <Nav />
      <Hero />
      <Design />
      <Performance />
      <Specs />
      <Business />
    </div>
  );
}
