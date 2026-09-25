"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Zap, Gauge, Monitor, ShieldCheck, Mountain, Truck } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";
import { formatTHB } from "@/lib/utils";
import { getModel } from "@/lib/data/models";

const ACCENT = "#B07B3E";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" };
const P = "/brand/gwm-poer/";

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
    { title: "2.4T Diesel", text: "184 แรงม้า แรงบิด 480 Nm" },
    { title: "9-Speed Automatic", text: "เกียร์อัตโนมัติ 9 สปีด (9AT)" },
    { title: "4WD System", text: "ระบบขับเคลื่อน 4 ล้อ 2H / 4H / 4L" },
  ],
  right: [
    { title: "14.6\" Display", text: "จอมัลติมีเดียระบบสัมผัส" },
    { title: "Wireless CarPlay", text: "Apple CarPlay / Android Auto ไร้สาย" },
    { title: "360° Camera", text: "กล้องมองภาพรอบทิศทาง" },
  ],
};

const HIGHLIGHTS = [
  { src: P + "hero2.jpg", label: "พิชิตทุกเส้นทาง", span: "md:col-span-2" },
  { src: P + "exterior-1.jpg", label: "ดีไซน์บึกบึน", span: "" },
  { src: P + "detail.jpg", label: "รายละเอียดพรีเมียม", span: "" },
  { src: P + "acc.jpg", label: "ACC ควบคุมความเร็วอัตโนมัติ", span: "md:col-span-2" },
  { src: P + "fcw.jpg", label: "FCW เตือนการชนด้านหน้า", span: "" },
  { src: P + "rcta.jpg", label: "RCTA จุดอับสายตาขณะถอยหลัง", span: "" },
  { src: P + "powerful.jpg", label: "พลังดีเซล 2.4T", span: "md:col-span-2" },
];

const CAPABILITY = [
  "ระบบขับเคลื่อน 4 ล้อ 2H / 4H / 4L",
  "โหมดขับขี่ ECO / Normal / Sport / Off-Road",
  "ระยะห่างจากพื้นสูง รองรับการใช้งานนอกถนน",
  "กระบะ Double Cab / Single Cab ตอบโจทย์ทุกการใช้งาน",
  "กำลังลากจูง เหมาะงานหนัก",
];

const COMFORT = [
  "จอมัลติมีเดีย 14.6 นิ้ว ระบบสัมผัส",
  "จอมาตรวัดดิจิทัล 12.3 นิ้ว",
  "Apple CarPlay / Android Auto ไร้สาย",
  "ชาร์จมือถือไร้สาย",
  "ควบคุมรถผ่าน GWM App ระยะไกล",
];

const SAFETY = [
  { code: "FCW", text: "เตือนเมื่อเสี่ยงต่อการชนด้านหน้า" },
  { code: "AEB", text: "ระบบเบรกฉุกเฉินอัตโนมัติ" },
  { code: "ACC", text: "ควบคุมความเร็วอัตโนมัติแบบแปรผัน" },
  { code: "RCTA · RCTB", text: "เตือน/ช่วยเบรกจุดอับสายตาขณะถอยหลัง" },
  { code: "LKA", text: "ระบบช่วยรักษาเลน" },
  { code: "BSD", text: "เตือนจุดอับสายตาด้านข้าง" },
  { code: "360°", text: "กล้องมองภาพรอบทิศทาง" },
];

const COLORS = [
  { name: "Sun Black", hex: "#0e0e0f" },
  { name: "Hamilton White", hex: "#F2F2EF" },
  { name: "Ayers Grey", hex: "#8A8D90" },
  { name: "Snow White", hex: "#E8EAE8" },
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
          <Link href="/test-drive?model=gwm-poer-sahar-diesel" className="rounded-lg border border-white/40 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
            ทดลองขับ
          </Link>
          <Link href="/quotation?model=gwm-poer-sahar-diesel" className="hidden rounded-lg px-4 py-2 text-[11px] font-bold text-[#2a1500] transition-all hover:brightness-110 sm:inline-flex" style={{ backgroundColor: ACCENT }}>
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#0f1011]">
      <h1 className="sr-only">GWM POER SAHAR Diesel ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>
      <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease }} className="absolute inset-0">
        <Image src={P + "hero.jpg"} alt="GWM POER SAHAR Diesel" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
      </motion.div>

      <div className="container-page relative z-10 pt-28 sm:pt-32" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }} className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">GWM POER · SAHAR Diesel</p>
          <p className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">Built for the bold</p>
          <p className="mt-4 text-base text-white/90 sm:text-lg">ดีเซล 2.4T 184 แรงม้า แรงบิด 480 Nm เกียร์อัตโนมัติ 9 สปีด</p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-wrap justify-center gap-3 px-4">
        <Link href="#design" className="rounded-lg px-8 py-3 text-sm font-bold text-[#2a1500] shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
          ดูรถ
        </Link>
        <Link href="/test-drive?model=gwm-poer-sahar-diesel" className="rounded-lg border border-white/50 bg-[#101114]/60 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]">
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
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Designed to dominate</h2>
              <p className="mt-3 text-sm text-white/75 sm:text-base">ปิกอัพดีไซน์บึกบึน ยาว 5,360 มม. ฐานล้อ 3,130 มม. พร้อมทุกเส้นทาง</p>
            </motion.div>
          </div>
          <div className="relative min-h-[280px] sm:min-h-[380px]">
            <Image src={P + "side.jpg"} alt="GWM POER SAHAR ด้านข้าง" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
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
            <Image src={P + "front.jpg"} alt="GWM POER SAHAR ด้านหน้า" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
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
    { icon: Zap, value: 184, unit: "hp", label: "Power", note: "2.4L Turbo Diesel" },
    { icon: Gauge, value: 480, unit: "Nm", label: "Torque", note: "แรงบิดสูงสุด" },
    { icon: Monitor, value: 14.6, unit: "inch", label: "Display", note: "จอมัลติมีเดียระบบสัมผัส" },
    { icon: Truck, value: 9, unit: "spd", label: "Gearbox", note: "เกียร์อัตโนมัติ 9 สปีด" },
  ];
  return (
    <section id="interior" className="grid scroll-mt-32 border-t border-white/[0.06] bg-[#101114] lg:grid-cols-2">
      <div className="relative min-h-[360px] overflow-hidden lg:min-h-[440px]">
        <Image src={P + "exterior-2.jpg"} alt="GWM POER SAHAR ภายนอก" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Power.
            <br />
            Performance.
          </h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">ดีเซล 2.4T 184 แรงม้า แรงบิด 480 Nm เกียร์ 9 สปีด</p>
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
          <Image src={P + "engine.jpg"} alt="เครื่องยนต์ดีเซล 2.4T 9AT" fill sizes="(min-width: 1024px) 26vw, 100vw" className="object-cover" />
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
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Ready for any challenge</h2>
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
              <Mountain className="h-5 w-5" style={{ color: ACCENT }} /> Off-road Capability
            </p>
            <ul className="space-y-3">
              {CAPABILITY.map((t) => (
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
              {COMFORT.map((t) => (
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
            <Image src={P + "acc.jpg"} alt="ระบบ ACC ควบคุมความเร็วอัตโนมัติ" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {SAFETY.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.6, ease, delay: (i % 2) * 0.07 }}
                className="rounded-2xl border border-white/10 bg-[#1C1E22] p-5 transition-colors hover:border-[#B07B3E]/50"
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
  const m = getModel("gwm-poer-sahar-diesel");
  return (
    <section id="trims" className="grid scroll-mt-32 border-t border-white/[0.06] bg-[#101114] lg:grid-cols-2">
      <div className="relative min-h-[380px] overflow-hidden lg:min-h-[460px]">
        <Image src={P + "rear.jpg"} alt="GWM POER SAHAR ด้านหลัง" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 text-center sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Choose your POER</h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">หลายรุ่นย่อย ทั้ง Double Cab และ Single Cab</p>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center gap-6 bg-[#26282b] p-6 sm:p-10 lg:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Model</p>
          <h3 className="mt-1 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">GWM POER SAHAR Diesel</h3>
          <p className="mt-2 text-lg font-extrabold text-white">
            เริ่มต้น {m ? formatTHB(m.startPrice) : ""}
          </p>
          <p className="text-[11px] text-white/45">ราคาเริ่มต้น · สอบถามราคาแต่ละรุ่นย่อยที่โชว์รูม</p>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">รุ่นย่อย</p>
          <div className="grid grid-cols-2 gap-2">
            {["ULTRA 4WD", "ULTRA 2WD", "PRO 2WD", "Single Cab S", "Single Cab L"].map((t) => (
              <span key={t} className="rounded-lg border border-white/12 bg-[#1C1E22] px-3 py-2.5 text-center text-xs font-bold text-white/85" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">สีตัวถัง</p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <span key={c.name} className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80">
                <span className="h-3.5 w-3.5 rounded-full border border-white/30" style={{ backgroundColor: c.hex }} />
                {c.name}
              </span>
            ))}
          </div>
        </div>

        <ul className="space-y-2">
          {["ขนาดตัวถัง 5,360 × 1,934 × 1,847 มม. ฐานล้อ 3,130 มม.", "เครื่องยนต์ดีเซล 2.4L เทอร์โบ 184 แรงม้า แรงบิด 480 Nm เกียร์ 9 สปีด"].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-white/75">
              <Check className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <Link href="/cars/gwm-poer-sahar-diesel" className="rounded-lg px-6 py-2.5 text-sm font-bold text-[#2a1500] transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
            ดูรายละเอียด
          </Link>
          <Link href="/quotation?model=gwm-poer-sahar-diesel" className="rounded-lg border border-white/40 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#101114]">
      <Image src={P + "hero2.jpg"} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 50%" }} />
      <div className="container-page relative z-10 flex min-h-[520px] flex-col items-center justify-between gap-10 py-14 text-center">
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl" style={SHADOW}>
          พร้อมเลือกรถคันใหม่แล้วหรือยัง?<span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">ทีมงาน Maporn Autogroup พร้อมให้คำปรึกษาและนัดหมายทดลองขับ</span>
        </motion.h2>
        <div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/quotation?model=gwm-poer-sahar-diesel" className="rounded-lg px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#2a1500] transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
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

export default function GwmPoerShowroom() {
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
