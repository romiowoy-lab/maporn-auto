"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Zap, Gauge, Leaf, Monitor, ShieldCheck, Cpu, Sofa } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";
import { getModel } from "@/lib/data/models";
import { formatTHB } from "@/lib/utils";

const ACCENT = "#1B6EC8";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" };
const P = "/brand/suzuki-fronx/";

const SECTIONS = [
  { id: "model", label: "Model" },
  { id: "design", label: "Design" },
  { id: "interior", label: "Interior" },
  { id: "technology", label: "Technology" },
  { id: "safety", label: "Safety" },
  { id: "trims", label: "Trims" },
];

const CALLOUTS = {
  left: [
    { title: "1.5L DUALJET Hybrid", text: "เครื่องยนต์ K15C 103 แรงม้า + ISG มอเตอร์ไฟฟ้า SHVS" },
    { title: "19.2 กม./ลิตร", text: "อัตราสิ้นเปลืองน้ำมันเฉลี่ย (WLTC) ประหยัดสูงสุด" },
    { title: "Auto Start/Stop", text: "Idling Stop ระบบดับเครื่องอัตโนมัติขณะจอดนิ่ง ลดการสิ้นเปลืองน้ำมัน" },
  ],
  right: [
    { title: "9\" Touchscreen", text: "Apple CarPlay / Android Auto ไร้สาย พร้อม Voice Command" },
    { title: "360° Camera", text: "กล้องมองรอบคัน 4 ทิศทาง ช่วยจอดและขับขี่ในพื้นที่แคบ" },
    { title: "Keyless Push Start", text: "ระบบสตาร์ทรถและล็อกประตูอัตโนมัติ ไม่ต้องใช้กุญแจ" },
  ],
};

const HIGHLIGHTS = [
  { src: P + "interior.jpg", label: "ห้องโดยสาร Black & Burgundy สองโทนสี", span: "md:col-span-2" },
  { src: P + "steering.jpg", label: "พวงมาลัยหนัง Paddle Shift · Cruise Control", span: "" },
  { src: P + "screen.jpg", label: "จอ 9 นิ้ว · Apple CarPlay · Android Auto", span: "" },
  { src: P + "hybrid.jpg", label: "K15C DUALJET + ISG Mild Hybrid System", span: "md:col-span-2" },
];

const HYBRID_FEATURES = [
  "เครื่องยนต์ K15C 1.5 ลิตร DUALJET 4 สูบ DOHC VVT",
  "มอเตอร์ไฟฟ้า ISG (Integrated Starter Generator)",
  "แบตเตอรี่ลิเธียม-ไอออน ประสิทธิภาพสูง",
  "ระบบ Auto Start/Stop Idling Stop",
  "เกียร์อัตโนมัติ 6 สปีด พร้อม Paddle Shift หนังแท้",
  "ประหยัดน้ำมันเฉลี่ย 19.2 กม./ลิตร (WLTC)",
];

const COMFORT_FEATURES = [
  "จอ Touchscreen 9 นิ้ว Wireless Apple CarPlay / Android Auto",
  "Keyless Entry & Push Start System",
  "ชาร์จมือถือไร้สายบนคอนโซลกลาง",
  "ที่วางแก้ว 6 ช่อง + ช่องเก็บของด้านหลัง",
  "พอร์ต USB-A + USB-C แถวนั่งด้านหลัง",
  "เบาะผ้าสองโทน Burgundy & Black คุณภาพสูง",
  "แอร์อัตโนมัติ AUTO A/C พร้อม Rear Air Vent",
  "Ambient Light ไฟตกแต่งภายในสีน้ำเงิน",
];

const SAFETY = [
  { code: "AEB", text: "เบรกฉุกเฉินอัตโนมัติ หยุดก่อนชนหน้า-ทางแยก" },
  { code: "ACC", text: "ควบคุมความเร็วอัตโนมัติแบบปรับตัวตามระยะห่างรถคันหน้า" },
  { code: "LKA", text: "ระบบช่วยควบคุมรถให้อยู่ในเลน ลดความเสี่ยงออกนอกเส้น" },
  { code: "BSD", text: "เตือนยานพาหนะในจุดอับสายตาด้านข้าง-หลัง" },
  { code: "RCTA", text: "เตือนการจราจรด้านหลังขณะถอยหลัง" },
  { code: "AHB", text: "สลับไฟสูง-ต่ำอัตโนมัติตามสภาพการจราจรด้านหน้า" },
  { code: "360°", text: "กล้องมองรอบคัน 4 ทิศทาง ความละเอียดสูง" },
  { code: "SRS × 6", text: "ถุงลมนิรภัย 6 ตำแหน่ง + Hill Hold Control + ESP" },
];

const COLORS = [
  { name: "Ice Grayish Blue / Black", hex: "#7CBCD4", code: "FD1" },
  { name: "Pearl Snow White / Black", hex: "#F5F5F0", code: "ET5" },
  { name: "Savanna Ivory / Black", hex: "#E5D8B5", code: "EYP" },
  { name: "Pearl Snow White", hex: "#F5F5F0", code: "ZQZ" },
  { name: "Silky Silver", hex: "#B8B8B4", code: "Z2S" },
  { name: "Magma Gray", hex: "#5A5A5E", code: "ZYZ" },
  { name: "Cool Black", hex: "#1A1A1C", code: "ZBD" },
  { name: "Savanna Ivory", hex: "#E5D8B5", code: "WBY" },
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
          <Link href="/test-drive?brand=suzuki" className="rounded-lg border border-white/40 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
            ทดลองขับ
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
    <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#0d1520]">
      <h1 className="sr-only">Suzuki Fronx Hybrid ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>
      <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease }} className="absolute inset-0">
        <Image src={P + "hero.jpg"} alt="Suzuki Fronx" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "50% 50%" }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1520]/60 via-transparent to-[#0d1520]/20" />

      <div className="container-page relative z-10 pt-28 sm:pt-32" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }} className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">Suzuki Fronx · Mild Hybrid</p>
          <p className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">Pure design.<br />Smart inside.</p>
          <p className="mt-4 text-base text-white/90 sm:text-lg">ครอสโอเวอร์ SUV Hybrid สมรรถนะเหนือระดับ ดีไซน์โดดเด่น ขับสนุก ประหยัดน้ำมัน</p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-wrap justify-center gap-3 px-4">
        <Link href="#design" className="rounded-lg px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
          ดูรถ
        </Link>
        <Link href="/test-drive?brand=suzuki" className="rounded-lg border border-white/50 bg-[#101114]/60 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]">
          ทดลองขับ
        </Link>
      </div>
    </section>
  );
}

function Callout({ title, text, align }: { title: string; text: string; align: "left" | "right" }) {
  return (
    <div className={`flex items-center gap-3 ${align === "left" ? "lg:flex-row-reverse lg:text-right" : ""}`}>
      <div className="max-w-[16rem]">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-white">{title}</p>
        <p className="mt-0.5 text-xs text-white/60">{text}</p>
      </div>
      <span className="hidden min-w-10 flex-1 items-center lg:flex">
        <span className="h-px flex-1 bg-white/30" />
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
      </span>
    </div>
  );
}

function Design() {
  return (
    <>
      <section id="design" className="relative scroll-mt-32 overflow-hidden border-t border-white/[0.06] bg-[#1a1b1d]">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-6 py-14 sm:px-12 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Boldly designed</h2>
              <p className="mt-3 text-sm text-white/75 sm:text-base">ดีไซน์หน้ากระจังโครเมียม Diamond Pattern ไฟหน้า LED ทรงสปอร์ต และไฟท้าย LED แบบ Full-width Lightbar</p>
              <ul className="mt-6 space-y-2.5">
                {["Diamond Pattern Front Grille พร้อมสัญลักษณ์ S โครเมียม", "Projector LED Headlights + LED DRL ไฟวิ่งกลางวัน", "Full-width LED Rear Lightbar เส้นไฟท้ายต่อเนื่อง", "Two-tone Dual Body Color พร้อมหลังคาดำ", "Crossover Stance ล้ออัลลอย 16 นิ้ว"].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div className="relative min-h-[280px] sm:min-h-[380px]">
            <Image src={P + "grille.jpg"} alt="Suzuki Fronx หน้ากระจัง Diamond Pattern" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section id="technology" className="scroll-mt-32 bg-[#26282b] py-14 sm:py-20">
        <div className="container-page grid items-center gap-8 lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-4">
          <div className="order-2 space-y-8 lg:order-1 lg:space-y-16">
            {CALLOUTS.left.map((c) => (
              <Callout key={c.title} {...c} align="left" />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease }}
            className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-2xl lg:order-2"
          >
            <Image src={P + "rear.jpg"} alt="Suzuki Fronx ด้านหลัง LED Lightbar" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </motion.div>
          <div className="order-3 space-y-8 lg:space-y-16">
            {CALLOUTS.right.map((c) => (
              <Callout key={c.title} {...c} align="right" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Interior() {
  const items = [
    { icon: Zap, value: 103, unit: "hp", label: "Power", note: "K15C DUALJET Hybrid แรงม้าสูงสุด" },
    { icon: Gauge, value: 137, unit: "Nm", label: "Torque", note: "แรงบิดสูงสุด (เครื่องยนต์)" },
    { icon: Leaf, value: 19, unit: "km/L", label: "Economy", note: "อัตราสิ้นเปลืองน้ำมันเฉลี่ย WLTC" },
    { icon: Monitor, value: 9, unit: "inch", label: "Display", note: "จอ Touchscreen Wireless CarPlay/Auto" },
  ];
  return (
    <section id="interior" className="grid scroll-mt-32 border-t border-white/[0.06] bg-[#101114] lg:grid-cols-2">
      <div className="relative min-h-[360px] overflow-hidden lg:min-h-[440px]">
        <Image src={P + "interior.jpg"} alt="ห้องโดยสาร Suzuki Fronx" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Your space.
            <br />
            Your comfort.
          </h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">เบาะ Burgundy & Black ห้องโดยสาร 5 ที่นั่ง สองโทนสีหรูหรา</p>
        </motion.div>
      </div>

      <div className="relative bg-[#17181b] p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
          {items.map(({ icon: Icon, ...s }) => (
            <div key={s.label}>
              <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
              <Stat value={s.value} unit={s.unit} label={s.label} note={s.note} size="md" />
            </div>
          ))}
        </div>
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl lg:absolute lg:bottom-6 lg:right-6 lg:mt-0 lg:w-[52%]">
          <Image src={P + "steering.jpg"} alt="พวงมาลัย Suzuki Fronx Paddle Shift" fill sizes="(min-width: 1024px) 26vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="border-t border-white/[0.06] bg-[#15161A] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            <span className="h-px w-8" style={{ backgroundColor: ACCENT }} /> Highlights <span className="h-px w-8" style={{ backgroundColor: ACCENT }} />
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Smart meets style</h2>
        </div>
        <div className="grid auto-rows-[220px] gap-3 sm:auto-rows-[260px] md:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.figure
              key={h.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, ease, delay: (i % 3) * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl ${h.span}`}
            >
              <Image src={h.src} alt={h.label} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <figcaption className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-[0.15em] text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.85)" }}>
                {h.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-6 sm:p-8">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-white">
              <Cpu className="h-5 w-5" style={{ color: ACCENT }} /> Smart Hybrid Technology
            </p>
            <ul className="space-y-3">
              {HYBRID_FEATURES.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-white/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-6 sm:p-8">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-white">
              <Sofa className="h-5 w-5" style={{ color: ACCENT }} /> Connected &amp; Comfortable
            </p>
            <ul className="space-y-3">
              {COMFORT_FEATURES.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-white/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section id="safety" className="scroll-mt-32 border-t border-white/[0.06] bg-[#101114] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            <ShieldCheck className="h-4 w-4" /> Suzuki Safety Support
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Drive with confidence</h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">ระบบช่วยเหลือการขับขี่และความปลอดภัยครบครัน</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY.map((s, i) => (
            <motion.div
              key={s.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease, delay: (i % 4) * 0.07 }}
              className="rounded-2xl border border-white/10 bg-[#1C1E22] p-6 transition-colors hover:border-[#1B6EC8]/50"
            >
              <p className="text-2xl font-extrabold tracking-tight" style={{ color: ACCENT }}>{s.code}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="relative mt-10 overflow-hidden rounded-2xl">
          <Image src={P + "safety-interior.jpg"} alt="Suzuki Safety Support ระบบความปลอดภัย" width={1440} height={540} className="w-full object-cover" style={{ maxHeight: 320 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101114]/80 to-transparent" />
          <div className="absolute inset-y-0 left-6 flex flex-col justify-center sm:left-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Suzuki Safety Support</p>
            <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">ขับขี่ปลอดภัย<br />ทุกเส้นทาง</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trims() {
  const m = getModel("suzuki-fronx");
  const variants = m?.variants ?? [];
  return (
    <section id="trims" className="scroll-mt-32 grid border-t border-white/[0.06] bg-[#101114] lg:grid-cols-2">
      <div className="relative min-h-[380px] overflow-hidden lg:min-h-[460px]">
        <Image src={P + "screen.jpg"} alt="จอมัลติมีเดีย 9 นิ้ว Suzuki Fronx" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 text-center sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Move connected</h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">Wireless Apple CarPlay · Android Auto · Voice Command</p>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center gap-6 bg-[#26282b] p-6 sm:p-10 lg:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Model</p>
          <h3 className="mt-1 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">Suzuki Fronx</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {variants.map((v) => (
            <div key={v.name} className="rounded-xl border border-white/10 bg-[#1C1E22] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>{v.name}</p>
              <p className="mt-1 text-xl font-extrabold text-white">{formatTHB(v.price)}</p>
              <p className="mt-1 text-[11px] text-white/50">ราคาอ้างอิง · สอบถามราคาล่าสุดที่โชว์รูม</p>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">สีตัวถัง (8 สี)</p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <span key={c.code} className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80">
                <span className="h-3.5 w-3.5 rounded-full border border-white/30" style={{ backgroundColor: c.hex }} />
                {c.name}
              </span>
            ))}
          </div>
        </div>

        <ul className="space-y-2">
          {[
            "5 ที่นั่ง HEARTECT Platform ตัวถังแข็งแกร่ง",
            "ขนาดตัวถัง 3,995 × 1,765 × 1,550 มม. ฐานล้อ 2,520 มม.",
            "TECT Body Structure + SRS 6 ถุงลมนิรภัย + ISOFIX",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-white/75">
              <Check className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <Link href="/cars/suzuki-fronx" className="rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
            ดูรายละเอียด
          </Link>
          <Link href="/quotation?brand=suzuki" className="rounded-lg border border-white/40 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0d1520]">
      <Image src={P + "startbutton.jpg"} alt="Suzuki Fronx Engine Start Stop Button" fill sizes="100vw" className="object-cover opacity-60" style={{ objectPosition: "50% 50%" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1520]/90 via-[#0d1520]/40 to-[#0d1520]/20" />
      <div className="container-page relative z-10 flex min-h-[520px] flex-col items-center justify-between gap-10 py-14 text-center">
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl" style={SHADOW}>
          พร้อมเป็นเจ้าของ Fronx แล้วหรือยัง?
          <span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">ทีมงาน Maporn Autogroup ตัวแทนจำหน่าย Suzuki อย่างเป็นทางการ พร้อมให้คำปรึกษาและนัดหมายทดลองขับ</span>
        </motion.h2>
        <div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/quotation?brand=suzuki" className="rounded-lg px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ขอใบเสนอราคา
            </Link>
            <Link href="/test-drive?brand=suzuki" className="rounded-lg border border-white/40 bg-[#101114]/50 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]">
              จองทดลองขับ
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

export default function SuzukiFronxShowroom() {
  return (
    <div className="bg-[#101114]">
      <Nav />
      <Hero />
      <Design />
      <Interior />
      <Highlights />
      <Safety />
      <Trims />
      <CTA />
    </div>
  );
}
