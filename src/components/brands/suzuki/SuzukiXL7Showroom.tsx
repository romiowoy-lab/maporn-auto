"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Zap, ShieldCheck, Cpu, Users, Gauge } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";
import { getModel } from "@/lib/data/models";
import { formatTHB } from "@/lib/utils";

const ACCENT = "#C47B2B";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.85), 0 8px 24px rgba(0,0,0,0.65)" };
const P = "/brand/suzuki-xl7-hybrid/";

const SECTIONS = [
  { id: "model", label: "Model" },
  { id: "design", label: "Design" },
  { id: "interior", label: "Interior" },
  { id: "hybrid", label: "Hybrid" },
  { id: "safety", label: "Safety" },
  { id: "trims", label: "Price" },
];

const COLORS = [
  { name: "Savanna Ivory / Cool Black", hex: "#C9B99A", hex2: "#1a1a1a" },
  { name: "Rising Orange Pearl / Cool Black", hex: "#D4642A", hex2: "#1a1a1a" },
  { name: "Pearl Snow White / Cool Black", hex: "#F5F5F0", hex2: "#1a1a1a" },
  { name: "Metallic Magma Gray", hex: "#7A7B7D" },
  { name: "Pearl Snow White", hex: "#F5F5F0" },
  { name: "Cool Black Metallic", hex: "#1C1C1E" },
];

const DESIGN_FEATURES = [
  "กระจังหน้าโครเมียม เสริมความสง่างาม",
  "ไฟหน้า LED Reflector พร้อม DRL",
  "ไฟท้าย LED Light Guides เอกลักษณ์เฉพาะตัว",
  "ล้ออะลูมิเนียมอัลลอยขัดเงาขนาด 16 นิ้ว",
  "ดีไซน์ Two-Tone สปอร์ตโฉบเฉี่ยว",
  "ระยะห่างจากพื้น 200 มม. ลุยทุกเส้นทาง",
];

const INTERIOR_FEATURES = [
  "จอสัมผัส LCD 10 นิ้ว รายละเอียดคมชัด",
  "พวงมาลัยทรง D-Shape ปุ่มควบคุมครบ",
  "ชาร์จไร้สาย Wireless Charging",
  "Bluetooth / USB / HDMI ทุกการเชื่อมต่อ",
  "Cruise Control ควบคุมความเร็วอัตโนมัติ",
  "มาตรวัดแบบอนาล็อก + จอกลางดิจิทัล Hybrid",
  "เบาะแถว 2 พับ 60:40 / แถว 3 พับ 50:50",
  "แอร์แถว 3 ช่องแยกอิสระ ครอบครัวสบาย",
];

const HYBRID_FACTS = [
  { title: "ISG Mild Hybrid", text: "มอเตอร์ Integrated Starter Generator สร้างและกักเก็บพลังงาน ช่วยสตาร์ทเครื่องใหม่อย่างราบเรียบ" },
  { title: "Idling STOP", text: "ระบบดับเครื่องยนต์อัตโนมัติขณะจอดรอ ลดการสิ้นเปลืองน้ำมันในเมือง" },
  { title: "19.2 กม./ลิตร", text: "อัตราสิ้นเปลืองเฉลี่ยดีกว่ารุ่นก่อน ประหยัดได้จริงในการใช้งานทุกวัน" },
  { title: "Li-ion 10Ah 12V", text: "แบตเตอรี่ Lithium-ion คุณภาพสูง อายุการใช้งานยาวนาน ไม่ต้องกังวลเรื่องการดูแลรักษา" },
];

const SAFETY_ITEMS = [
  { code: "ABS+EBD", text: "ระบบป้องกันล้อล็อกพร้อมกระจายแรงเบรกอัตโนมัติ สำหรับทุกสภาพถนน" },
  { code: "ESP", text: "ระบบควบคุมเสถียรภาพการทรงตัว ป้องกันรถหมุนหรือไถลในทางโค้ง" },
  { code: "HHC", text: "Hill Hold Control ช่วยออกตัวบนทางลาดชัน ไม่ไหลถอยหลัง" },
  { code: "BA", text: "ระบบเสริมแรงเบรกอัตโนมัติ ออกแรงเบรกเพิ่มในสถานการณ์ฉุกเฉิน" },
  { code: "กล้อง", text: "กล้องถอยจอดพร้อมเซนเซอร์วัดระยะ ช่วยจอดในพื้นที่แคบได้อย่างมั่นใจ" },
  { code: "IMM", text: "กุญแจ Immobilizer ระบบสัญญาณกันขโมย ปกป้องทรัพย์สินของคุณ" },
];

const INSTALLMENTS = [
  { down: "5%", downAmt: "41,250", m48: "19,000", m60: "16,061", m72: "14,014", m84: "12,753" },
  { down: "10%", downAmt: "82,500", m48: "17,938", m60: "15,030", m72: "13,153", m84: "11,804" },
  { down: "15%", downAmt: "123,750", m48: "16,649", m60: "13,844", m72: "12,189", m84: "10,973" },
  { down: "20%", downAmt: "165,000", m48: "15,450", m60: "12,810", m72: "11,197", m84: "10,217" },
  { down: "25%", downAmt: "206,250", m48: "14,330", m60: "11,958", m72: "10,445", m84: "9,424" },
];

function Nav() {
  const [active, setActive] = useState("model");
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-[7.5rem] z-40 -mb-16 px-3 pt-2 sm:px-6">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.08] px-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.2em] text-white">
            Maporn
            <br />
            Autogroup
          </span>
          <span className="h-7 w-px bg-white/25" />
          <span className="flex h-8 items-center rounded-md bg-white px-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logos/suzuki.svg" alt="Suzuki" className="h-5 w-auto object-contain" />
          </span>
        </div>
        <nav className="hidden items-center gap-6 lg:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`border-b pb-0.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                active === s.id ? "text-white" : "border-transparent text-white/60 hover:text-white"
              }`}
              style={active === s.id ? { borderColor: ACCENT } : undefined}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/contact?brand=suzuki" className="rounded-lg border border-white/40 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#111418]">
            สอบถาม
          </Link>
          <Link href="/quotation?brand=suzuki" className="hidden rounded-lg px-4 py-2 text-[11px] font-bold text-white transition-all hover:brightness-110 sm:inline-flex" style={{ backgroundColor: ACCENT }}>
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#13100C]">
      <h1 className="sr-only">Suzuki XL7 Hybrid SUV 7 ที่นั่ง ISG Mild Hybrid ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>

      <div className="absolute inset-0">
        <Image
          src={P + "hero.jpg"}
          alt="Suzuki XL7 Hybrid"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "60% 55%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#13100C]/90 via-[#13100C]/55 to-[#13100C]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13100C]/60 via-transparent to-transparent" />
      </div>

      {/* Amber accent stripe */}
      <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}, transparent)` }} />

      <div className="container-page relative z-10 flex min-h-[calc(100vh-4.5rem)] flex-col justify-center py-28" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }} className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Suzuki XL7 Hybrid · SUV ครอบครัว 7 ที่นั่ง</p>
          <p className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Family.<br />Hybrid.
          </p>
          <p className="mt-4 text-base text-white/85 sm:text-lg">7 ที่นั่ง 3 แถว ระบบ ISG Mild Hybrid ประหยัดน้ำมัน 19.2 กม./ลิตร จอสัมผัส 10 นิ้ว ชาร์จไร้สาย พร้อมทุกเส้นทาง เริ่มต้น {formatTHB(825000)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#design" className="rounded-lg px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ดูสเปก
            </Link>
            <Link href="/contact?brand=suzuki" className="rounded-lg border border-white/50 bg-[#13100C]/60 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#13100C]">
              สอบถามราคา
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 sm:max-w-md"
        >
          {[
            { label: "ที่นั่ง", value: "7" },
            { label: "แรงม้า", value: "105" },
            { label: "ประหยัดน้ำมัน", value: "19.2 กม./ล." },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center bg-white/[0.07] px-4 py-4 text-center">
              <p className="text-xl font-extrabold text-white sm:text-2xl">{s.value}</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Design() {
  return (
    <section id="design" className="scroll-mt-32 border-t border-white/[0.06] bg-[#17140E]">
      {/* Main exterior + features */}
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden lg:min-h-[440px]">
          <Image src={P + "aero.jpg"} alt="Suzuki XL7 Hybrid ดีไซน์ภายนอก" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17140E]/50 to-transparent" />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Exterior Design</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">สปอร์ต.<br />Two-Tone.</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">ดีไซน์ภายนอกที่ปรับใหม่ให้โฉบเฉี่ยวกว่าเดิม กระจังหน้าโครเมียม ไฟ LED ทั้งหน้าและท้าย ล้ออะลูมิเนียม 16 นิ้ว สีให้เลือก 6 สีทั้งแบบ Solid และ Two-Tone</p>
            <ul className="mt-6 space-y-2.5">
              {DESIGN_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Detail shots */}
      <div className="grid grid-cols-2 gap-px bg-white/5 lg:grid-cols-4">
        <div className="relative aspect-video overflow-hidden bg-[#13100C]">
          <Image src={P + "headlight.jpg"} alt="ไฟหน้า LED" fill className="object-cover transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-3">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-white">ไฟหน้า LED</p>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden bg-[#13100C]">
          <Image src={P + "taillight.jpg"} alt="ไฟท้าย LED" fill className="object-cover transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-3">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-white">ไฟท้าย LED</p>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden bg-[#13100C]">
          <Image src={P + "rear.jpg"} alt="เซนเซอร์จอด" fill className="object-cover transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-3">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-white">เซนเซอร์ถอย</p>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden bg-[#0F0D09]">
          <Image src={P + "exterior.png"} alt="Suzuki XL7 Hybrid สี" fill className="object-contain p-4 transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 p-3">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-white">6 สีให้เลือก</p>
          </div>
        </div>
      </div>

      {/* Color picker */}
      <div className="px-6 py-10 sm:px-12">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/60">สีภายนอก · 6 Colors</p>
        <div className="flex flex-wrap gap-4">
          {COLORS.map((c) => (
            <div key={c.name} className="flex items-center gap-2.5">
              <span className="relative h-7 w-7 rounded-full border-2 border-white/20 shadow-lg" style={{ backgroundColor: c.hex }}>
                {c.hex2 && (
                  <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border border-white/10" style={{ backgroundColor: c.hex2 }} />
                )}
              </span>
              <span className="text-[11px] text-white/60">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Interior() {
  const stats = [
    { icon: Users, value: 7, unit: "ที่นั่ง", label: "3 แถว", note: "ปรับพับได้ยืดหยุ่น" },
    { icon: Cpu, value: 10, unit: "นิ้ว", label: "จอสัมผัส", note: "LCD ความละเอียดสูง" },
    { icon: Zap, value: 15, unit: "W", label: "Wireless", note: "ชาร์จโทรศัพท์ไร้สาย" },
    { icon: Gauge, value: 200, unit: "กม./ชม.", label: "Speedometer", note: "มาตรวัดดิจิทัล Hybrid" },
  ];
  return (
    <section id="interior" className="scroll-mt-32 grid border-t border-white/[0.06] bg-[#13100C] lg:grid-cols-2">
      <div className="relative min-h-[360px] overflow-hidden lg:min-h-[480px]">
        <Image src={P + "interior.jpg"} alt="ห้องโดยสาร XL7 Hybrid" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Smart<br />Interior.
          </h2>
          <p className="mt-2 text-sm text-white/85 sm:text-base">ห้องโดยสาร 7 ที่นั่งออกแบบเพื่อครอบครัว เทคโนโลยีครบ สะดวกสบายทุกระยะทาง</p>
        </motion.div>
      </div>

      <div className="bg-[#17140E] p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
          {stats.map(({ icon: Icon, ...s }) => (
            <div key={s.label}>
              <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
              <Stat value={s.value} unit={s.unit} label={s.label} note={s.note} size="md" />
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#1C1812] p-6">
          <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-white">
            <Cpu className="h-5 w-5" style={{ color: ACCENT }} /> อุปกรณ์ภายใน
          </p>
          <ul className="space-y-2.5">
            {INTERIOR_FEATURES.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-white/75">
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Hybrid() {
  return (
    <section id="hybrid" className="scroll-mt-32 border-t border-white/[0.06] bg-[#17140E] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            <Zap className="h-4 w-4" /> ISG Mild Hybrid Technology
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">ประหยัดยิ่งขึ้น<br />ด้วยพลังไฮบริด</h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">ระบบ ISG Mild Hybrid เสริมพลังงาน ลดการสิ้นเปลือง ประหยัดน้ำมัน 19.2 กม./ลิตร</p>
        </div>

        <div className="mb-10 overflow-hidden rounded-2xl">
          <Image src={P + "isg.jpeg"} alt="ISG Hybrid System" width={1536} height={864} className="w-full object-cover" style={{ maxHeight: 380 }} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HYBRID_FACTS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[#1C1812] p-5"
            >
              <p className="text-lg font-extrabold tracking-tight text-white" style={{ color: ACCENT }}>{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{f.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Engine specs strip */}
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {[
            { label: "เครื่องยนต์", val: "1.5L K15B" },
            { label: "กำลัง", val: "105 hp" },
            { label: "แรงบิด", val: "138 Nm" },
            { label: "เกียร์", val: "4AT" },
            { label: "ประหยัดน้ำมัน", val: "19.2 กม./ล." },
            { label: "0-100 กม./ชม.", val: "~13 วิ" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-[#1C1812] p-4 text-center">
              <p className="text-base font-extrabold text-white sm:text-lg">{s.val}</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section id="safety" className="scroll-mt-32 border-t border-white/[0.06] bg-[#13100C] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            <ShieldCheck className="h-4 w-4" /> Safety
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">ปลอดภัยครบครัน<br />ทุกเส้นทาง</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_ITEMS.map((s, i) => (
            <motion.div
              key={s.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: (i % 3) * 0.07 }}
              className="rounded-2xl border border-white/10 bg-[#1C1812] p-6 transition-colors hover:border-[#C47B2B]/50"
            >
              <p className="text-2xl font-extrabold tracking-tight" style={{ color: ACCENT }}>{s.code}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trims() {
  const m = getModel("suzuki-xl7");
  const variants = m?.variants ?? [];
  return (
    <section id="trims" className="scroll-mt-32 border-t border-white/[0.06] bg-[#17140E] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>ราคาและการผ่อน</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Suzuki XL7 Hybrid</h2>
          <p className="mt-2 text-sm text-white/60">เริ่มต้น {formatTHB(825000)} · ผ่อนสบายหลายแผน</p>
        </div>

        <div className="mb-10 flex justify-center gap-4">
          {variants.map((v) => (
            <div key={v.name} className="w-full max-w-xs rounded-2xl border border-white/15 bg-[#1C1812] p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>{v.name}</p>
              <p className="mt-2 text-4xl font-extrabold text-white">{formatTHB(v.price)}</p>
              <p className="mt-1 text-xs text-white/50">{v.engine} · {v.power} · {v.seats} ที่นั่ง</p>
              <div className="mt-4">
                <Link href="/quotation?brand=suzuki" className="rounded-lg px-5 py-2 text-xs font-bold text-white transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
                  ขอใบเสนอราคา
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-[0.12em]" style={{ backgroundColor: ACCENT }}>
                <th className="px-4 py-3 text-left text-white">เงินดาวน์ %</th>
                <th className="px-4 py-3 text-right text-white">เงินดาวน์</th>
                <th className="px-4 py-3 text-right text-white">48 งวด</th>
                <th className="px-4 py-3 text-right text-white">60 งวด</th>
                <th className="px-4 py-3 text-right text-white">72 งวด</th>
                <th className="px-4 py-3 text-right text-white">84 งวด</th>
              </tr>
            </thead>
            <tbody>
              {INSTALLMENTS.map((row, i) => (
                <tr key={row.down} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "bg-[#1C1812]" : "bg-[#17140E]"}`}>
                  <td className="px-4 py-3 font-bold text-white">{row.down}</td>
                  <td className="px-4 py-3 text-right text-white/80">฿{row.downAmt}</td>
                  <td className="px-4 py-3 text-right text-white/80">฿{row.m48}</td>
                  <td className="px-4 py-3 text-right text-white/80">฿{row.m60}</td>
                  <td className="px-4 py-3 text-right text-white/80">฿{row.m72}</td>
                  <td className="px-4 py-3 text-right text-white/80">฿{row.m84}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-4 py-3 text-[11px] text-white/40">*ราคา 825,000 บาท รวมค่าจดทะเบียน 3,000 บาท · อัตราดอกเบี้ยตามเงื่อนไขไฟแนนซ์ สอบถามโชว์รูม</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/quotation?brand=suzuki" className="rounded-lg px-7 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
            ขอใบเสนอราคา
          </Link>
          <Link href="/contact?brand=suzuki" className="rounded-lg border border-white/40 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#13100C]">
            สอบถามรายละเอียด
          </Link>
          <a href="tel:023223663" className="rounded-lg border border-white/40 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#13100C]">
            โทร 02-322-3663-5
          </a>
        </div>
        <p className="mt-6 text-center text-[11px] text-white/40">*ราคาและตารางผ่อนชำระสำหรับการอ้างอิงเบื้องต้น รายละเอียดอาจเปลี่ยนแปลง กรุณาติดต่อโชว์รูมเพื่อยืนยัน</p>
      </div>
    </section>
  );
}

export default function SuzukiXL7Showroom() {
  return (
    <div className="bg-[#13100C]">
      <Nav />
      <Hero />
      <Design />
      <Interior />
      <Hybrid />
      <Safety />
      <Trims />
    </div>
  );
}
