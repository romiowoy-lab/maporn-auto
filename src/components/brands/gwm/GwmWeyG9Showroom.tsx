"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ShieldCheck, Zap, Volume2, Thermometer, ChevronDown } from "lucide-react";
import { getModel } from "@/lib/data/models";
import { formatTHB } from "@/lib/utils";

const ACCENT = "#B89A6E";
const DARK = "#0D0B07";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.7)" };
const P = "/brand/gwm-wey-g9/";

const SECTIONS = [
  { id: "hero", label: "Overview" },
  { id: "design", label: "Design" },
  { id: "sanctuary", label: "Interior" },
  { id: "performance", label: "Hi4" },
  { id: "prestige", label: "Prestige" },
  { id: "safety", label: "Safety" },
  { id: "price", label: "Price" },
];

const COLORS = [
  { name: "Superior Gold", hex: "#C8B88A" },
  { name: "Nebula Black", hex: "#1C1C20" },
  { name: "Wisdom Gray", hex: "#8A8F95" },
  { name: "Aurora White", hex: "#F4F3EF" },
];

const PERFORMANCE_STATS = [
  { value: "442", unit: "PS", label: "กำลังสูงสุด" },
  { value: "642", unit: "Nm", label: "แรงบิดสูงสุด" },
  { value: "5.7", unit: "วิ", label: "0–100 กม./ชม." },
  { value: "170", unit: "กม.", label: "ระยะ EV (NEDC)" },
  { value: "6.2", unit: "ล./100กม.", label: "สิ้นเปลืองน้ำมัน" },
  { value: "AWD", unit: "", label: "Hi4 ขับเคลื่อน 4 ล้อ" },
];

const TECH_SPECS = [
  { label: "ระบบปฏิบัติการ", value: "Coffee OS" },
  { label: "จอกลาง", value: "14.6 นิ้ว" },
  { label: "จอตอนหลัง", value: "17.3 นิ้ว" },
  { label: "ลำโพง", value: "21 ตำแหน่ง" },
  { label: "กำลังเสียง", value: "2,440 W" },
  { label: "เสียง 3D", value: "Surround" },
];

const INTERIOR_HIGHLIGHTS = [
  {
    icon: Thermometer,
    title: "ตู้เย็น Dual-Opening",
    desc: "ความจุ 12.5 ลิตร เปิดได้ 2 ด้าน อุณหภูมิ 0°C ถึง 50°C ทั้งอุ่นและเย็น",
  },
  {
    icon: Volume2,
    title: "Amor Acoustic",
    desc: "21 ลำโพงรอบทิศทาง 2,440 วัตต์ ระบบเสียง 3D คุณภาพระดับมืออาชีพ",
  },
  {
    icon: Zap,
    title: "V2L 3.3 kW",
    desc: "ระบบจ่ายไฟภายนอก 3.3 กิโลวัตต์ รองรับอุปกรณ์ไฟฟ้าทุกชนิด",
  },
];

const SAFETY_ITEMS = [
  { code: "83.01%", text: "เหล็กแรงดึงสูงครอบคลุมโครงสร้างทั้งคัน" },
  { code: "2000 MPa", text: "เสา A และ B เสริมด้วยเหล็กแรงดึง 2000 MPa สูงสุด" },
  { code: "4+6 ชั้น", text: "ปกป้องแบตเตอรี่ด้านข้าง 4 ชั้น ด้านล่าง 6 ชั้น" },
  { code: "89 Test", text: "แบตเตอรี่ผ่านการทดสอบอย่างเข้มงวดกว่า 89 รายการ" },
  { code: "Cage Body", text: "High-strength Cage Body โครงสร้างนิรภัยรอบทิศทาง" },
  { code: "4×7 Grid", text: "พื้นตัวถัง 4 แนวตั้ง × 7 แนวนอน กระจายแรง 3 ทิศทาง" },
];

// --- Parallax Hero ---
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="hero" ref={ref} className="relative h-screen min-h-[700px] w-full overflow-hidden" style={{ backgroundColor: DARK }}>
      <h1 className="sr-only">WEY G9 Luxury MPV Hi4 AWD 442PS ตัวแทนจำหน่าย GWM — Maporn Autogroup</h1>

      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.15]">
        <Image src={P + "hero.jpg"} alt="WEY G9" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "55% 50%" }} />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B07]/85 via-[#0D0B07]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B07]/80 via-transparent to-[#0D0B07]/20" />

      {/* Accent vertical bar */}
      <div className="absolute left-0 inset-y-0 w-[3px]" style={{ background: `linear-gradient(to bottom, transparent 10%, ${ACCENT} 40%, ${ACCENT} 70%, transparent 90%)` }} />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-12 sm:pb-20 lg:px-16 lg:pb-24" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.2 }} className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: ACCENT }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>GWM · WEY Collection · Hi4 AWD</span>
          </p>
          <p className="text-[clamp(3rem,8vw,6rem)] font-light uppercase leading-[0.9] tracking-[-0.02em] text-white">
            THE CRAFTED
          </p>
          <p className="text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-white">
            MASTERPIECE
          </p>
          <p className="mt-5 text-base text-white/80 sm:text-lg lg:text-xl">
            Luxury MPV 7 ที่นั่ง · Hi4 AWD · 442 PS · {formatTHB(2349000)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact?brand=gwm" className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              สอบถามราคา
            </Link>
            <Link href="/test-drive?brand=gwm&model=wey-g9" className="rounded-lg border border-white/40 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-[#0D0B07]">
              นัดทดลองขับ
            </Link>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 right-8 flex flex-col items-center gap-1 sm:right-12"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ChevronDown className="h-4 w-4 text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Sticky top nav ---
function Nav() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sticky top-[7.5rem] z-40 -mb-16 px-3 pt-2 sm:px-6">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:px-6" style={{ borderColor: `${ACCENT}22` }}>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.2em] text-white/80">
            Maporn<br />Autogroup
          </span>
          <span className="h-7 w-px bg-white/20" />
          <span className="flex h-8 items-center rounded-md bg-white px-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logos/gwm.png" alt="GWM" className="h-5 w-auto object-contain" />
          </span>
        </div>

        {/* Center model name chip */}
        <div className="hidden items-center lg:flex">
          <span className="rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-[0.15em] text-white" style={{ borderColor: ACCENT, color: ACCENT }}>WEY G9</span>
        </div>

        <nav className="hidden items-center gap-5 xl:flex">
          {SECTIONS.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="border-b pb-0.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors"
              style={active === s.id ? { color: "white", borderColor: ACCENT } : { color: "rgba(255,255,255,0.5)", borderColor: "transparent" }}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link href="/contact?brand=gwm" className="rounded-lg border border-white/30 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#0D0B07]">
            สอบถาม
          </Link>
          <Link href="/quotation?brand=gwm" className="hidden rounded-lg px-4 py-2 text-[11px] font-bold text-white sm:inline-flex" style={{ backgroundColor: ACCENT }}>
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- Design ---
function Design() {
  return (
    <section id="design" className="scroll-mt-32 border-t bg-[#0F0D09]" style={{ borderColor: `${ACCENT}18` }}>
      {/* Full-bleed aerial shot */}
      <div className="relative h-[50vw] max-h-[580px] min-h-[320px] overflow-hidden">
        <Image src={P + "aerial.jpg"} alt="WEY G9 ดีไซน์ภายนอก" fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 30%" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D09] via-[#0F0D09]/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="absolute bottom-0 left-0 p-8 sm:p-14"
          style={SHADOW}
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Exterior Design</p>
          <h2 className="mt-2 text-4xl font-light uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            ดีไซน์ที่<br />
            <span className="font-bold">ไม่มีประนีประนอม</span>
          </h2>
        </motion.div>
      </div>

      {/* Grille detail + copy */}
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0D0B07] lg:aspect-auto lg:min-h-[460px]">
          <Image src={P + "grille.jpg"} alt="Dark Chrome Waterfall Grille" fill className="object-cover transition-transform duration-700 hover:scale-105" style={{ objectPosition: "50% 40%" }} />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:py-20" style={{ backgroundColor: "#13100A" }}>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>Signature Detail</p>
            <h3 className="text-3xl font-light uppercase leading-tight text-white sm:text-4xl">
              Dark Chrome<br /><span className="font-bold">Waterfall Grille</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              กระจังหน้าลายริ้วน้ำไหลสีโครเมียมดำ เส้นสายที่ไหลลื่นเหมือนน้ำตกห่มด้วยความหรูหรา เอกลักษณ์ที่จดจำได้ทันทีตั้งแต่ครั้งแรกที่พบเห็น
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "ไฟหน้า LED อัจฉริยะ Adaptive",
                "ไฟท้าย LED ดีไซน์เอกลักษณ์เฉพาะตัว",
                "ซันรูฟพาโนรามิคขนาดใหญ่",
                "ยาว 5,050 มม. × กว้าง 1,985 มม. × สูง 1,900 มม.",
                "ฐานล้อ 3,468 มม. พื้นที่โดยสาร 2,867 มม.",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Color palette */}
      <div className="border-t px-6 py-10 sm:px-12" style={{ borderColor: `${ACCENT}15`, backgroundColor: "#0D0B07" }}>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-white/50">สีภายนอก · 4 Colors</p>
        <div className="flex flex-wrap gap-6">
          {COLORS.map((c) => (
            <div key={c.name} className="group flex items-center gap-3">
              <div className="h-9 w-9 rounded-full border-2 border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: c.hex }} />
              <span className="text-xs text-white/55 group-hover:text-white/80 transition-colors">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Sanctuary (Interior) ---
function Sanctuary() {
  return (
    <section id="sanctuary" className="scroll-mt-32 border-t" style={{ borderColor: `${ACCENT}18`, backgroundColor: "#13100A" }}>
      {/* Captain seats hero */}
      <div className="relative h-[60vw] max-h-[640px] min-h-[360px] overflow-hidden">
        <Image src={P + "captain.jpg"} alt="ห้องโดยสาร WEY G9" fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 35%" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13100A]/95 via-[#13100A]/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="absolute inset-x-0 bottom-0 px-8 pb-10 sm:px-14 sm:pb-14"
          style={SHADOW}
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Premium Sanctuary</p>
          <h2 className="mt-2 text-4xl font-light uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            ห้องโดยสาร<br /><span className="font-bold">ระดับ First Class</span>
          </h2>
        </motion.div>
      </div>

      {/* 3 dimension stats */}
      <div className="grid grid-cols-3 gap-px border-t bg-white/[0.03]" style={{ borderColor: `${ACCENT}15` }}>
        {[
          { val: "5,050", unit: "มม.", label: "ความยาวรถ" },
          { val: "3,468", unit: "มม.", label: "พื้นที่ตามแนวยาว" },
          { val: "2,867", unit: "มม.", label: "พื้นที่ห้องโดยสาร" },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D0B07] p-6 text-center sm:p-8">
            <p className="text-2xl font-bold text-white sm:text-3xl" style={{ color: ACCENT }}>{s.val}</p>
            <p className="text-xs text-white/50">{s.unit}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cockpit + lounge */}
      <div className="grid lg:grid-cols-2">
        {/* Cockpit */}
        <div className="relative aspect-video overflow-hidden bg-[#0D0B07] lg:aspect-auto lg:min-h-[400px]">
          <Image src={P + "cockpit.jpg"} alt="Coffee OS ห้องโดยสาร" fill className="object-cover transition-transform duration-700 hover:scale-105" style={{ objectPosition: "50% 30%" }} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0B07]/90 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Technology</p>
            <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">Coffee OS + Multi-Screen</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {TECH_SPECS.map((t) => (
                <div key={t.label} className="border-t border-white/10 pt-2">
                  <p className="text-base font-bold text-white">{t.value}</p>
                  <p className="text-[10px] text-white/50">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lounge */}
        <div className="relative aspect-video overflow-hidden bg-[#0D0B07] lg:aspect-auto lg:min-h-[400px]">
          <Image src={P + "lounge.webp"} alt="ห้องโดยสารหรูหรา โต๊ะพับ" fill className="object-cover transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0B07]/90 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>VIP Lounge</p>
            <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">เบาะ Captain + โต๊ะพับ 10 กก.</h3>
            <p className="mt-2 text-sm text-white/65">เบาะหนังแท้ลาย Diamond-Stitch ตกแต่งด้วย Wood Trim ไม้จริง บรรยากาศเหนือระดับในทุกการเดินทาง</p>
          </div>
        </div>
      </div>

      {/* 3 Interior highlights */}
      <div className="grid gap-px border-t bg-white/[0.03] sm:grid-cols-3" style={{ borderColor: `${ACCENT}15` }}>
        {INTERIOR_HIGHLIGHTS.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            className="bg-[#0D0B07] p-8 sm:p-10"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border" style={{ borderColor: `${ACCENT}40` }}>
              <Icon className="h-5 w-5" style={{ color: ACCENT }} />
            </div>
            <h4 className="text-base font-bold text-white sm:text-lg">{title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- Hi4 Performance ---
function Performance() {
  return (
    <section id="performance" className="scroll-mt-32 border-t" style={{ borderColor: `${ACCENT}18`, backgroundColor: "#0F0D09" }}>
      <div className="container-page py-16 sm:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
            <Zap className="h-4 w-4" /> Hi4 · Hybrid Intelligent 4WD
          </p>
          <h2 className="text-3xl font-light uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
            ขับเคลื่อนสี่ล้อ<br /><span className="font-bold">ไฮบริดอัจฉริยะ</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-white/60 sm:text-base">
            1.5T Turbo + DHT-3 + มอเตอร์ P4 ระบบ Hi4 AWD ควบคุมการขับเคลื่อน RWD/AWD อัตโนมัติ ให้พลังขับเคลื่อนที่มั่นใจแม้บรรทุกเต็มคัน
          </p>
        </motion.div>
      </div>

      {/* Platform cutaway */}
      <div className="overflow-hidden">
        <Image src={P + "platform.jpg"} alt="Hi4 AWD Platform" width={2428} height={1190} className="w-full object-cover" style={{ maxHeight: 420 }} />
      </div>

      {/* Stats grid */}
      <div className="border-t" style={{ borderColor: `${ACCENT}15` }}>
        <div className="grid grid-cols-2 gap-px bg-white/[0.04] md:grid-cols-3 lg:grid-cols-6">
          {PERFORMANCE_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.06 }}
              className="bg-[#0D0B07] p-6 text-center sm:p-8"
            >
              <p className="text-3xl font-bold leading-none text-white sm:text-4xl" style={{ color: ACCENT }}>{s.value}</p>
              {s.unit && <p className="mt-0.5 text-xs text-white/50">{s.unit}</p>}
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lifestyle charging at pool */}
      <div className="relative h-[55vw] max-h-[560px] min-h-[300px] overflow-hidden">
        <Image src={P + "lifestyle.jpg"} alt="WEY G9 lifestyle charging" fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0F0D09]/70" />
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 sm:px-14" style={SHADOW}>
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Plug-in & Relax</p>
            <h3 className="mt-2 text-2xl font-bold uppercase text-white sm:text-4xl">ชาร์จง่าย<br />ทุกที่ทุกเวลา</h3>
            <p className="mt-3 max-w-xs text-sm text-white/75">ระยะขับเคลื่อนด้วยไฟฟ้า 170 กม. (NEDC) รองรับการชาร์จ AC/DC อัตราสิ้นเปลืองน้ำมันเพียง 6.2 ล./100 กม.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Prestige Life (Audio + Profile) ---
function Prestige() {
  return (
    <section id="prestige" className="scroll-mt-32 border-t" style={{ borderColor: `${ACCENT}18`, backgroundColor: "#13100A" }}>
      {/* Audio */}
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0806] lg:aspect-auto lg:min-h-[480px]">
          <Image src={P + "audio.jpg"} alt="Amor Acoustic 21 ลำโพง" fill className="object-cover" style={{ objectPosition: "50% 50%" }} />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:py-20" style={{ backgroundColor: "#0F0D09" }}>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>Premium Sound</p>
            <h2 className="text-4xl font-light uppercase leading-tight text-white sm:text-5xl">
              Amor<br /><span className="font-bold">Acoustic</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              ระบบเสียงระดับมืออาชีพ 21 ลำโพงรอบทิศทาง กำลังขับสูงสุด 2,440 วัตต์ พร้อมเทคโนโลยีเสียง 3D Surround ที่ห้อมล้อมคุณด้วยเสียงดนตรีในทุกมิติ เหมือนอยู่ในห้องแสดงสดส่วนตัว
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[{ v: "21", l: "ลำโพง" }, { v: "2,440", l: "วัตต์" }, { v: "3D", l: "เสียงรอบทิศทาง" }].map((s) => (
                <div key={s.l} className="rounded-xl border border-white/10 p-4 text-center" style={{ backgroundColor: "#13100A" }}>
                  <p className="text-2xl font-bold text-white" style={{ color: ACCENT }}>{s.v}</p>
                  <p className="mt-0.5 text-[10px] text-white/50">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Profile shot with performance callouts */}
      <div className="relative h-[50vw] max-h-[520px] min-h-[300px] overflow-hidden border-t" style={{ borderColor: `${ACCENT}15` }}>
        <Image src={P + "profile.jpg"} alt="WEY G9 side profile" fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 55%" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B07]/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 gap-px">
          {[
            { v: "442 PS", l: "กำลังสูงสุด" },
            { v: "642 Nm", l: "แรงบิดสูงสุด" },
            { v: "5.7 วิ", l: "0–100 กม./ชม." },
            { v: "170 กม.", l: "EV Range (NEDC)" },
          ].map((s) => (
            <div key={s.l} className="bg-black/50 p-4 text-center backdrop-blur-sm sm:p-6" style={SHADOW}>
              <p className="text-lg font-bold text-white sm:text-2xl">{s.v}</p>
              <p className="text-[10px] text-white/55">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Safety ---
function Safety() {
  return (
    <section id="safety" className="scroll-mt-32 border-t py-16 sm:py-24" style={{ borderColor: `${ACCENT}18`, backgroundColor: "#0D0B07" }}>
      <div className="container-page">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="mb-12 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
            <ShieldCheck className="h-4 w-4" /> Safe Heaven
          </p>
          <h2 className="text-3xl font-light uppercase text-white sm:text-5xl">
            โครงสร้างนิรภัย<br /><span className="font-bold">รอบทิศทาง</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/55 sm:text-base">
            High-strength Cage Body ปกป้องผู้โดยสารทุกคนในทุกสถานการณ์
          </p>
        </motion.div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_ITEMS.map((s, i) => (
            <motion.div
              key={s.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl border p-6 transition-colors"
              style={{ borderColor: `${ACCENT}20`, backgroundColor: "#13100A" }}
            >
              <p className="text-2xl font-extrabold" style={{ color: ACCENT }}>{s.code}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature list */}
        <div className="rounded-2xl border p-8 sm:p-10" style={{ borderColor: `${ACCENT}15`, backgroundColor: "#13100A" }}>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/50">อุปกรณ์ความปลอดภัยมาตรฐาน</p>
          <div className="grid gap-x-12 gap-y-2 sm:grid-cols-2">
            {[
              "ถุงลมนิรภัยหน้า-ข้าง-ม่านด้านข้าง",
              "ABS + EBD + BA ระบบเบรกอัจฉริยะ",
              "ESP ควบคุมเสถียรภาพ",
              "กล้องมองหลัง + เซนเซอร์รอบคัน",
              "ระบบเตือนการเปลี่ยนเลน LDW",
              "ระบบติดตาม BSD จุดอับสายตา",
              "FCW เตือนการชนด้านหน้า",
              "ACC Cruise Control อัจฉริยะ",
            ].map((f) => (
              <div key={f} className="flex items-start gap-2 py-2 text-sm text-white/65">
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Price ---
function Price() {
  const m = getModel("gwm-wey-g9");
  return (
    <section id="price" className="scroll-mt-32 border-t py-16 sm:py-24" style={{ borderColor: `${ACCENT}18`, backgroundColor: "#13100A" }}>
      <div className="container-page">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="mb-12 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Pricing</p>
          <h2 className="text-3xl font-light uppercase text-white sm:text-5xl">WEY G9<br /><span className="font-bold">Hi4 AWD</span></h2>
        </motion.div>

        {/* Price card */}
        <div className="mx-auto max-w-lg">
          <div className="rounded-3xl border p-10 text-center shadow-[0_32px_80px_rgba(0,0,0,0.5)]" style={{ borderColor: `${ACCENT}30`, backgroundColor: "#0D0B07" }}>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ borderColor: ACCENT, color: ACCENT }}>
              Luxury MPV · Hi4 AWD · 7 ที่นั่ง
            </div>
            <p className="mt-6 text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none text-white">{formatTHB(2349000)}</p>
            <p className="mt-2 text-sm text-white/45">ราคาแนะนำ รวม VAT</p>

            {m?.variants && (
              <div className="mt-8 rounded-xl border border-white/10 p-5 text-left">
                {m.variants.map((v) => (
                  <div key={v.name}>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">{v.name}</p>
                    <p className="mt-1 text-sm text-white/80">{v.engine}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
                      <div><span className="text-white/40">กำลัง </span><span className="font-bold text-white">{v.power}</span></div>
                      <div><span className="text-white/40">แรงบิด </span><span className="font-bold text-white">{v.torque}</span></div>
                      <div><span className="text-white/40">เกียร์ </span><span className="font-bold text-white">{v.transmission}</span></div>
                      <div><span className="text-white/40">ที่นั่ง </span><span className="font-bold text-white">{v.seats} ที่นั่ง</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/quotation?brand=gwm" className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
                ขอใบเสนอราคา
              </Link>
              <Link href="/test-drive?brand=gwm&model=wey-g9" className="w-full rounded-xl border border-white/20 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#0D0B07]">
                นัดหมายทดลองขับ
              </Link>
              <a href="tel:023223663" className="w-full rounded-xl border border-white/20 py-3.5 text-sm font-bold text-white/70 transition-colors hover:text-white">
                โทร 02-322-3663-5
              </a>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-white/30">
            *ราคาและข้อมูลจำเพาะอาจเปลี่ยนแปลงโดยไม่แจ้งล่วงหน้า กรุณาติดต่อโชว์รูมเพื่อยืนยันราคาปัจจุบัน
          </p>
        </div>
      </div>
    </section>
  );
}

export default function GwmWeyG9Showroom() {
  return (
    <div style={{ backgroundColor: DARK }}>
      <Nav />
      <Hero />
      <Design />
      <Sanctuary />
      <Performance />
      <Prestige />
      <Safety />
      <Price />
    </div>
  );
}
