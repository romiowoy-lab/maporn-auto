"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Zap, Gauge, Monitor, ShieldCheck, Battery, Leaf } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";
import { formatTHB } from "@/lib/utils";
import { getModel } from "@/lib/data/models";

const ACCENT = "#0080C0";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" };
const P = "/brand/gwm-haval-h6/";

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
    { title: "Hi4 AWD", text: "มอเตอร์ไฟฟ้าหน้า + หลัง ขับเคลื่อน 4 ล้อ" },
    { title: "243 PS / 530 Nm", text: "กำลังรวมระบบ PHEV เหนือกว่าทุกรุ่น" },
    { title: "150 km EV", text: "ไฟฟ้าล้วนสูงสุด 150 กม. (CLTC รุ่น PHEV)" },
  ],
  right: [
    { title: "14.6\" Coffee OS 3", text: "จอมัลติมีเดียระบบสัมผัสขนาดใหญ่" },
    { title: "Wireless CarPlay", text: "Apple CarPlay / Android Auto ไร้สาย" },
    { title: "GWM App", text: "ควบคุมรถผ่านแอปพลิเคชันระยะไกล" },
  ],
};

const HIGHLIGHTS = [
  { src: P + "exterior.webp", label: "ดีไซน์ยุคใหม่", span: "md:col-span-2" },
  { src: P + "detail-1.webp", label: "รายละเอียดพรีเมียม", span: "" },
  { src: P + "detail-2.webp", label: "ออกแบบอย่างพิถีพิถัน", span: "" },
  { src: P + "interior-1.webp", label: "ห้องโดยสารระดับ Luxury", span: "md:col-span-2" },
  { src: P + "interior-2.webp", label: "เบาะนุ่มสบาย", span: "" },
  { src: P + "app.webp", label: "GWM App ควบคุมอัจฉริยะ", span: "" },
  { src: P + "phev.webp", label: "Haval H6 PHEV — Hi4 AWD", span: "md:col-span-2" },
];

const FEATURES = [
  "ระบบ Hi4 AWD มอเตอร์ไฟฟ้าหน้า-หลัง สมรรถนะสูงสุด",
  "หลังคาซันรูฟพาโนรามิคขนาดใหญ่",
  "ชาร์จ AC 6.6 kW / DC 40 kW (รุ่น PHEV)",
  "เบาะหนังปรับไฟฟ้าพร้อมระบบนวด (รุ่น ULTRA)",
];

const TECH = [
  "จอ 14.6 นิ้ว GWM Coffee OS 3 หน้าจอสัมผัสขนาดใหญ่",
  "Apple CarPlay / Android Auto ไร้สาย",
  "ชาร์จมือถือไร้สาย",
  "IIP ระบบจอดรถอัตโนมัติอัจฉริยะ (รุ่น ULTRA)",
  "ARA สตาร์ทจากระยะไกลผ่าน App (รุ่น ULTRA)",
  "Voice Command สั่งงานด้วยเสียง",
  "GWM App เชื่อมต่อรถยนต์",
];

const SAFETY = [
  { code: "IACC", text: "ควบคุมความเร็วอัตโนมัติอัจฉริยะ" },
  { code: "AEB", text: "ระบบเบรกฉุกเฉินอัตโนมัติ" },
  { code: "LKA", text: "ระบบช่วยรักษาเลนการขับขี่" },
  { code: "BSD", text: "เตือนจุดอับสายตาด้านข้าง" },
  { code: "RCTA", text: "เตือนยานพาหนะด้านหลังขณะถอย" },
  { code: "360°", text: "กล้องมองภาพรอบทิศทาง" },
];

const COLORS = [
  { name: "Ayers Grey", hex: "#8A8D90", img: P + "color-grey.png" },
  { name: "Hamilton White", hex: "#F2F2EF", img: P + "color-white.webp" },
  { name: "Sun Black", hex: "#0e0e0f", img: P + "color-black.png" },
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
            <img src="/brand/logos/gwm.png" alt="GWM" className="h-4 w-auto object-contain" />
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
          <Link href="/test-drive?model=gwm-haval-h6" className="rounded-lg border border-white/40 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
            ทดลองขับ
          </Link>
          <Link href="/quotation?model=gwm-haval-h6" className="hidden rounded-lg px-4 py-2 text-[11px] font-bold text-white transition-all hover:brightness-110 sm:inline-flex" style={{ backgroundColor: ACCENT }}>
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#0a0d12]">
      <h1 className="sr-only">GWM Haval H6 HEV/PHEV ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>
      <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease }} className="absolute inset-0">
        <Image src={P + "hero.jpg"} alt="GWM Haval H6" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
      </motion.div>

      <div className="container-page relative z-10 pt-28 sm:pt-32" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }} className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">GWM · Haval H6</p>
          <p className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">Power meets efficiency</p>
          <p className="mt-4 text-base text-white/90 sm:text-lg">Hi4 AWD · ไฟฟ้าล้วน 150 กม. · กำลังรวม 243 PS</p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-wrap justify-center gap-3 px-4">
        <Link href="#design" className="rounded-lg px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
          ดูรถ
        </Link>
        <Link href="/test-drive?model=gwm-haval-h6" className="rounded-lg border border-white/50 bg-[#0a0d12]/60 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]">
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
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Designed for the future</h2>
              <p className="mt-3 text-sm text-white/75 sm:text-base">ดีไซน์เหนือระดับ ยาว 4,620 มม. ฐานล้อ 2,738 มม. ซันรูฟพาโนรามิคขนาดใหญ่</p>
            </motion.div>
          </div>
          <div className="relative min-h-[280px] sm:min-h-[380px]">
            <Image src={P + "side.webp"} alt="GWM Haval H6 ด้านข้าง" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
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
            <Image src={P + "exterior.webp"} alt="GWM Haval H6 ภายนอก" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
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
    { icon: Zap, value: 243, unit: "PS", label: "System Power", note: "กำลังรวมระบบ PHEV" },
    { icon: Gauge, value: 530, unit: "Nm", label: "Torque", note: "แรงบิดรวมสูงสุด" },
    { icon: Battery, value: 150, unit: "km", label: "EV Range", note: "ไฟฟ้าล้วน (CLTC PHEV)" },
    { icon: Monitor, value: 14.6, unit: "inch", label: "Display", note: "GWM Coffee OS 3" },
  ];
  return (
    <section id="interior" className="grid scroll-mt-32 border-t border-white/[0.06] bg-[#101114] lg:grid-cols-2">
      <div className="relative min-h-[360px] overflow-hidden lg:min-h-[440px]">
        <Image src={P + "phev.webp"} alt="GWM Haval H6 PHEV" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Hi4 AWD.
            <br />
            Electrified.
          </h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">PHEV 1.5T + มอเตอร์หน้า-หลัง 243 PS 530 Nm</p>
        </motion.div>
      </div>

      <div className="relative bg-[#17181b] p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
          {items.map(({ icon: Icon, ...s }) => (
            <div key={s.label}>
              <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
              <Stat value={s.value} unit={s.unit || undefined} label={s.label} note={s.note} size="md" />
            </div>
          ))}
        </div>
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl lg:absolute lg:bottom-6 lg:right-6 lg:mt-0 lg:w-[52%]">
          <Image src={P + "interior-3.webp"} alt="ห้องโดยสาร Haval H6" fill sizes="(min-width: 1024px) 26vw, 100vw" className="object-cover" />
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
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Luxury redefined</h2>
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
              <Leaf className="h-5 w-5" style={{ color: ACCENT }} /> PHEV Features
            </p>
            <ul className="space-y-3">
              {FEATURES.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-white/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-6 sm:p-8">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-white">
              <Monitor className="h-5 w-5" style={{ color: ACCENT }} /> Technology &amp; Comfort
            </p>
            <ul className="space-y-3">
              {TECH.map((t) => (
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
            <ShieldCheck className="h-4 w-4" /> Safety &amp; Assist
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Drive with confidence</h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">ระบบช่วยเหลือการขับขี่และความปลอดภัย ADAS</p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl">
            <Image src={P + "detail-4.webp"} alt="ระบบความปลอดภัย Haval H6" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {SAFETY.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.6, ease, delay: (i % 2) * 0.07 }}
                className="rounded-2xl border border-white/10 bg-[#1C1E22] p-5 transition-colors hover:border-[#0080C0]/50"
              >
                <p className="text-xl font-extrabold tracking-tight" style={{ color: ACCENT }}>{s.code}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Trims() {
  const m = getModel("gwm-haval-h6");
  const [selectedColor, setSelectedColor] = useState(0);
  const color = COLORS[selectedColor];

  return (
    <section id="trims" className="scroll-mt-32 border-t border-white/[0.06] bg-[#101114]">
      {/* Color viewer */}
      <div className="border-b border-white/[0.06] bg-[#0c0d0e] py-10 sm:py-14">
        <div className="container-page">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            สีตัวถัง — เลือกสีที่ชื่นชอบ
          </p>
          <div className="relative mx-auto aspect-[16/9] max-w-2xl overflow-hidden rounded-2xl bg-[#f5f5f3]">
            {COLORS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={false}
                animate={{ opacity: i === selectedColor ? 1 : 0 }}
                transition={{ duration: 0.35, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={c.img}
                  alt={`GWM Haval H6 สี ${c.name}`}
                  fill
                  sizes="(min-width: 768px) 672px, 100vw"
                  className="object-contain p-4"
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {COLORS.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(i)}
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
                style={
                  i === selectedColor
                    ? { borderColor: ACCENT, color: "#fff", backgroundColor: "rgba(0,128,192,0.18)" }
                    : { borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.65)" }
                }
              >
                <span
                  className="h-4 w-4 rounded-full border-2"
                  style={{
                    backgroundColor: c.hex,
                    borderColor: i === selectedColor ? ACCENT : "rgba(255,255,255,0.35)",
                  }}
                />
                {c.name}
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-white/40">{color.name} · สอบถามสีที่มีจำหน่ายที่โชว์รูม</p>
        </div>
      </div>

      {/* Trims + specs */}
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden lg:min-h-[400px]">
          <Image src={P + "interior-4.webp"} alt="GWM Haval H6 ภายใน" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 text-center sm:p-10" style={SHADOW}>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Choose your H6</h2>
            <p className="mt-2 text-sm text-white/90 sm:text-base">3 รุ่นย่อย HEV และ PHEV — Hi4 AWD</p>
          </motion.div>
        </div>

        <div className="flex flex-col justify-center gap-6 bg-[#26282b] p-6 sm:p-10 lg:p-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Model</p>
            <h3 className="mt-1 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">GWM Haval H6</h3>
            <p className="mt-2 text-lg font-extrabold text-white">
              เริ่มต้น {m ? formatTHB(m.startPrice) : ""}
            </p>
            <p className="text-[11px] text-white/45">ราคาเริ่มต้น · สอบถามราคาแต่ละรุ่นย่อยที่โชว์รูม</p>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">รุ่นย่อย</p>
            <div className="grid grid-cols-3 gap-2">
              {["HEV PRO", "PHEV PRO", "PHEV ULTRA"].map((t) => (
                <span key={t} className="rounded-lg border bg-[#1C1E22] px-3 py-2.5 text-center text-xs font-bold text-white/85" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <ul className="space-y-2">
            {["ขนาดตัวถัง 4,620 × 1,886 × 1,730 มม. ฐานล้อ 2,738 มม.", "Hi4 AWD · PHEV 243 PS 530 Nm · ไฟฟ้าล้วน 150 กม. (CLTC)"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/75">
                <Check className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link href="/cars/gwm-haval-h6" className="rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ดูรายละเอียด
            </Link>
            <Link href="/quotation?model=gwm-haval-h6" className="rounded-lg border border-white/40 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
              ขอใบเสนอราคา
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#101114]">
      <Image src={P + "hero.jpg"} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 50%" }} />
      <div className="container-page relative z-10 flex min-h-[520px] flex-col items-center justify-between gap-10 py-14 text-center">
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl" style={SHADOW}>
          พร้อมเลือกรถคันใหม่แล้วหรือยัง?<span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">ทีมงาน Maporn Autogroup พร้อมให้คำปรึกษาและนัดหมายทดลองขับ</span>
        </motion.h2>
        <div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/quotation?model=gwm-haval-h6" className="rounded-lg px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ขอใบเสนอราคา
            </Link>
            <a href="tel:023223663" className="rounded-lg border border-white/40 bg-[#101114]/50 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]">
              โทร 02-322-3663-5
            </a>
          </div>
          <p className="mt-4 text-[11px] text-white/70" style={SHADOW}>*ภาพประกอบเพื่อการนำเสนอเท่านั้น โปรดอ้างอิงข้อมูลจากตัวรถจริง</p>
        </div>
      </div>
    </section>
  );
}

export default function GwmHavalH6Showroom() {
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
