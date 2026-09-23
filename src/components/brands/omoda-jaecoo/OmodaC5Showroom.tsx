"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Zap, Gauge, Route, Monitor } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";
import OmodaColorShowcase from "@/components/brands/omoda/OmodaColorShowcase";

// OMODA showroom — same section structure as the JAECOO / Wuling showrooms, built around the
// OMODA C5 EV. All figures come from the official OMODA & JAECOO Thailand brochure (see
// models.ts "omoda-c5-ev"). The price is not in the brochure, so it is not shown.
// The colour showcase ("เลือกสีที่ใช่สำหรับคุณ") is the existing component, kept as-is.

const ACCENT = "#7FE3C4";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" };
const P = "/brand/omoda-c5/";

const SECTIONS = [
  { id: "model", label: "Model" },
  { id: "design", label: "Design" },
  { id: "interior", label: "Interior" },
  { id: "technology", label: "Technology" },
  { id: "colors", label: "Colors" },
  { id: "experience", label: "Experience" },
];

const CALLOUTS = {
  left: [
    { title: "Long-range Battery", text: "แบตเตอรี่ 58.9 kWh วิ่งไกลสูงสุด 505 กม. (NEDC)" },
    { title: "Fast DC Charging", text: "ชาร์จ DC 30–80% ภายใน 28 นาที" },
    { title: "V2L", text: "จ่ายไฟให้อุปกรณ์ภายนอก 3.3 กิโลวัตต์" },
  ],
  right: [
    { title: "Display", text: "จอแสดงผลแบบจอกว้าง 24.6 นิ้ว" },
    { title: "Wireless Charging", text: "ชาร์จมือถือไร้สาย 50 วัตต์" },
    { title: "Safety", text: "ระบบช่วยเหลือการขับขี่ ADAS (AEB, ACC, LDW/LDP, BSD ฯลฯ)" },
  ],
};

const HIGHLIGHTS = [
  { src: P + "screen.jpg", label: "จอกว้าง 24.6 นิ้ว", span: "md:col-span-2" },
  { src: P + "wireless.jpg", label: "ชาร์จไร้สาย 50 วัตต์", span: "" },
  { src: P + "charge.jpg", label: "ชาร์จ DC 30–80% ใน 28 นาที", span: "" },
  { src: P + "trunk.jpg", label: "พื้นที่เก็บของ 432 ลิตร", span: "" },
  { src: P + "taillight.jpg", label: "ไฟท้ายเต็มความกว้าง", span: "md:col-span-2" },
];

const FEATURES = [
  "มอเตอร์ไฟฟ้า 155 กิโลวัตต์ (211 แรงม้า) ขับเคลื่อนล้อหน้า",
  "หลังคาซันรูฟ (เฉพาะรุ่น Max)",
  "พื้นที่บรรทุกสัมภาระ 432 ลิตร",
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
            <img src="/brand/logos/omoda.svg" alt="OMODA" className="h-4 w-auto object-contain" />
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
          <Link href="/test-drive?brand=omoda" className="rounded-lg border border-white/40 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
            ทดลองขับ
          </Link>
          <Link href="/quotation?brand=omoda" className="hidden rounded-lg px-4 py-2 text-[11px] font-bold text-[#052018] transition-all hover:brightness-110 sm:inline-flex" style={{ backgroundColor: ACCENT }}>
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#0d1012]">
      <h1 className="sr-only">OMODA C5 EV รถยนต์ไฟฟ้า ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>
      <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease }} className="absolute inset-0">
        <Image src={P + "hero.jpg"} alt="OMODA C5 EV" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "40% 60%" }} />
      </motion.div>

      <div className="container-page relative z-10 pt-28 sm:pt-32" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }} className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">OMODA C5 EV</p>
          <p className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">Electric Crossover</p>
          <p className="mt-4 text-base text-white/90 sm:text-lg">ไฟฟ้า 100% วิ่งไกลสูงสุด 505 กม. (NEDC)</p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-wrap justify-center gap-3 px-4">
        <Link href="#design" className="rounded-lg px-8 py-3 text-sm font-bold text-[#052018] shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
          ดูรถ
        </Link>
        <Link href="/test-drive?brand=omoda" className="rounded-lg border border-white/50 bg-[#101114]/60 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]">
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
      <section id="design" className="relative scroll-mt-40 overflow-hidden border-t border-white/[0.06] bg-[#1a1c1f]">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-6 py-14 sm:px-12 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">The art of design</h2>
              <p className="mt-3 text-sm text-white/75 sm:text-base">ครอสโอเวอร์ไฟฟ้า ดีไซน์ล้ำสมัย ไฟท้ายเต็มความกว้าง</p>
            </motion.div>
          </div>
          <div className="relative min-h-[280px] sm:min-h-[360px]">
            <Image src={P + "front.jpg"} alt="OMODA C5 EV ด้านหน้า" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section id="technology" className="scroll-mt-40 bg-[#26292d] py-14 sm:py-20">
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
            <Image src={P + "threeq.jpg"} alt="OMODA C5 EV ด้านข้าง" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
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
    { icon: Zap, value: 211, unit: "hp", label: "Motor", note: "มอเตอร์ไฟฟ้า 155 kW" },
    { icon: Gauge, value: 288, unit: "Nm", label: "Torque", note: "แรงบิด" },
    { icon: Route, value: 505, unit: "km", label: "Range*", note: "* NEDC (430 กม. ตามมาตรฐาน WLTP)" },
    { icon: Monitor, value: 24.6, unit: "inch", label: "Display", note: "จอแสดงผลแบบจอกว้าง" },
  ];
  return (
    <section id="interior" className="grid scroll-mt-40 border-t border-white/[0.06] bg-[#101114] lg:grid-cols-2">
      <div className="relative min-h-[360px] overflow-hidden lg:min-h-[440px]">
        <Image src={P + "interior.jpg"} alt="ห้องโดยสาร OMODA C5 EV" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Your space.
            <br />
            Your experience.
          </h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">ห้องโดยสารล้ำสมัย พร้อมจอกว้าง 24.6 นิ้ว</p>
        </motion.div>
      </div>

      <div className="relative bg-[#17191c] p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
          {items.map(({ icon: Icon, ...s }) => (
            <div key={s.label}>
              <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
              <Stat value={s.value} unit={s.unit} label={s.label} note={s.note} size="md" />
            </div>
          ))}
        </div>
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl lg:absolute lg:bottom-6 lg:right-6 lg:mt-0 lg:w-[52%]">
          <Image src={P + "topview.jpg"} alt="OMODA C5 EV มุมมองด้านบน" fill sizes="(min-width: 1024px) 26vw, 100vw" className="object-cover" />
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
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Everything you need</h2>
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
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="grid scroll-mt-40 border-t border-white/[0.06] bg-[#101114] lg:grid-cols-2">
      <div className="relative min-h-[380px] overflow-hidden lg:min-h-[460px]">
        <Image src={P + "dash.jpg"} alt="ภายใน OMODA C5 EV" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 text-center sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Move with confidence</h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">อัตราเร่ง 0–100 กม./ชม. ใน 7.2 วินาที</p>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center gap-8 bg-[#26292d] p-6 sm:p-10 lg:p-12">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image src={P + "glow.jpg"} alt="OMODA C5 EV" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Model</p>
          <h3 className="mt-1 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">OMODA C5 EV</h3>
          <p className="mt-2 text-sm text-white/70">มี 2 รุ่นย่อย: Long Range Dynamic และ Long Range Max — สอบถามราคาล่าสุดได้ที่โชว์รูม</p>
          <ul className="mt-4 space-y-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/75">
                <Check className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/cars/omoda-c5-ev" className="rounded-lg px-6 py-2.5 text-sm font-bold text-[#052018] transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ดูรายละเอียด
            </Link>
            <Link href="/quotation?brand=omoda" className="rounded-lg border border-white/40 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
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
      <Image src={P + "city.jpg"} alt="" fill sizes="100vw" className="object-cover" />
      <div className="container-page relative z-10 flex min-h-[520px] flex-col items-center justify-between gap-10 py-14 text-center">
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl" style={SHADOW}>
          พร้อมเลือกรถคันใหม่แล้วหรือยัง?<span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">ทีมงาน Maporn Autogroup พร้อมให้คำปรึกษาและนัดหมายทดลองขับ</span>
        </motion.h2>
        <div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/quotation?brand=omoda" className="rounded-lg px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#052018] transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ขอใบเสนอราคา
            </Link>
            <a href="tel:023223663" className="rounded-lg border border-white/40 bg-[#101114]/50 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]">
              โทร 02-322-3663-5</a>
          </div>
          <p className="mt-4 text-[11px] text-white/70" style={SHADOW}>*ภาพประกอบเพื่อการนำเสนอเท่านั้น รายละเอียดอาจแตกต่างจากรถจริง</p>
        </div>
      </div>
    </section>
  );
}

export default function OmodaC5Showroom() {
  return (
    <div className="bg-[#101114]">
      <Nav />
      <Hero />
      <Design />
      <Interior />
      <Highlights />
      <div id="colors" className="scroll-mt-40">
        <OmodaColorShowcase only="omoda-c5-ev" />
      </div>
      <Experience />
      <CTA />
    </div>
  );
}
