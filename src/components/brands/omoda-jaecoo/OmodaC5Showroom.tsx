"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Zap, Gauge, BatteryCharging, PlugZap } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";
import OmodaColorShowcase from "@/components/brands/omoda/OmodaColorShowcase";
import { c5 } from "@/lib/data/omoda-c5-ev";
import { formatTHB } from "@/lib/utils";
import MapornLogo from "@/components/ui/MapornLogo";

// OMODA showroom — same section structure as the JAECOO / Wuling showrooms, built around the
// New OMODA C5 EV (MAX+). All figures and the price come from src/lib/data/omoda-c5-ev.ts
// (official spec sheet + omodajaecoo.co.th). The colour showcase is the shared component.

const ACCENT = "#7FE3C4";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" };
const P = "/brand/omoda-c5/";
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease },
};

const SECTIONS = [
  { id: "model", label: "Model" },
  { id: "design", label: "Design" },
  { id: "performance", label: "Performance" },
  { id: "interior", label: "Interior" },
  { id: "technology", label: "ADAS" },
  { id: "colors", label: "Colors" },
  { id: "specs", label: "Specs" },
];

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

function Photo({ src, alt, className = "", position = "center", label }: { src: string; alt: string; className?: string; position?: string; label?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: position }} />
      {label && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 text-sm font-semibold text-white">{label}</span>
      )}
    </div>
  );
}

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
          <MapornLogo variant="white" className="h-6 w-auto sm:h-7" />
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
      <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease }} className="absolute inset-0">
        <Image src={P + "hero.jpg"} alt="OMODA C5 EV" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "40% 60%" }} />
      </motion.div>

      <div className="container-page relative z-10 pt-28 sm:pt-32" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }} className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">Electric Crossover · Already part of your tomorrow</p>
          <h1 className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">OMODA C5 EV</h1>
          <p className="mt-4 text-base text-white/90 sm:text-lg">ไฟฟ้า 100% วิ่งไกล 422 กม. (NEDC) · เริ่มต้น {formatTHB(c5.price)}</p>
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

function Highlights() {
  return (
    <section className="border-t border-white/[0.06] bg-[#17191c] py-12 sm:py-16">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {c5.highlights.map((s) => (
          <Stat key={s.label} value={s.value} unit={s.unit} label={s.label} note={s.note} size="md" />
        ))}
      </div>
    </section>
  );
}

function Design() {
  const { images } = c5;
  return (
    <section id="design" className="scroll-mt-40 border-t border-white/[0.06] bg-[#1a1c1f] py-14 sm:py-20">
      <div className="container-page">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>The art of design</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">ครอสโอเวอร์ไฟฟ้า ดีไซน์ล้ำอนาคต</h2>
        </motion.div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Photo src={images.frontDetail} alt="ด้านหน้า OMODA C5 EV" label="ดีไซน์ด้านหน้า" className="aspect-[640/576] w-full rounded-2xl" />
          <Photo src={images.headlight} alt="ไฟหน้า LED" label="ไฟหน้า LED" className="aspect-[640/576] w-full rounded-2xl" />
          <Photo src={images.taillight} alt="ไฟท้าย LED" label="ไฟท้าย LED" className="aspect-[640/576] w-full rounded-2xl" />
        </div>
        <div className="mt-10 max-w-3xl">
          <CheckList items={c5.design} />
        </div>
      </div>
    </section>
  );
}

function Performance() {
  const icons = [Zap, Gauge, BatteryCharging, PlugZap];
  return (
    <section id="performance" className="scroll-mt-40 border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.div {...reveal}>
            <Eyebrow>Electric Performance</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">แรง เงียบ ชาร์จไว</h2>
          </motion.div>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
            {c5.performance.map((p, i) => {
              const Icon = icons[i];
              return (
                <div key={p.label}>
                  <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
                  <Stat value={p.value} unit={p.unit} label={p.label} note={p.note} size="md" />
                </div>
              );
            })}
          </div>
          <div className="mt-10">
            <CheckList items={c5.powertrain} />
          </div>
        </div>
        <Photo src={c5.images.camping} alt="โหมดแคมป์ปิ้ง OMODA C5 EV" className="aspect-[648/520] w-full rounded-2xl" />
      </div>
    </section>
  );
}

function Interior() {
  const { images } = c5;
  return (
    <section id="interior" className="scroll-mt-40 border-t border-white/[0.06] bg-[#26292d] py-14 sm:py-20">
      <div className="container-page">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>Your space. Your experience.</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">ห้องโดยสารล้ำสมัย จอกว้าง 15.6 นิ้ว</h2>
        </motion.div>
        <Photo src={images.interior} alt="ห้องโดยสาร OMODA C5 EV" className="mt-8 aspect-[3/2] w-full rounded-2xl sm:aspect-[16/7]" position="50% 45%" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Photo src={images.screen} alt="จอสัมผัส 15.6 นิ้ว" label="จอกลาง 15.6 นิ้ว" className="aspect-[744/500] w-full rounded-2xl" />
          <Photo src={images.camera} alt="กล้องรอบทิศทาง 540 องศา" label="กล้อง 540°" className="aspect-[744/500] w-full rounded-2xl" />
          <Photo src={images.seats} alt="เบาะนั่งสปอร์ตพร้อมฟังก์ชันนวด" label="เบาะนวดผู้ขับขี่" className="aspect-[744/500] w-full rounded-2xl" />
          <Photo src={images.quietGlass} alt="กระจกลดเสียงรบกวน" label="กระจกลดเสียงรบกวน" className="aspect-[744/500] w-full rounded-2xl" />
        </div>
        <div className="mt-10 max-w-3xl">
          <CheckList items={c5.interior} />
        </div>
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section id="technology" className="scroll-mt-40 border-t border-white/[0.06] bg-[#17191c] py-14 sm:py-20">
      <div className="container-page">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>ADAS · 19 ระบบ</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">ระบบช่วยขับอัจฉริยะ ปลอดภัยทุกเส้นทาง</h2>
          <p className="mt-2 text-sm text-white/60">พร้อมถุงลมนิรภัย 6 ใบ · กล้องรอบทิศทาง 540° · ABS, EBD, BAS, ESP, TCS, HAC, HDC</p>
        </motion.div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {c5.adas.map((a) => (
            <div key={a.code} className="overflow-hidden rounded-2xl border border-white/10 bg-[#101114]">
              <div className="relative aspect-[3/2]">
                {a.img ? (
                  <Image src={a.img} alt={`${a.code} — ${a.name}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#0f2a2a] to-[#101114]">
                    <span className="text-3xl font-extrabold tracking-[0.15em]" style={{ color: ACCENT }}>{a.code}</span>
                  </div>
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

function Specs() {
  return (
    <section id="specs" className="scroll-mt-40 border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <motion.div {...reveal}>
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">OMODA C5 EV {c5.variant}</h2>
            <p className="mt-4 text-3xl font-extrabold" style={{ color: ACCENT }}>{formatTHB(c5.price)}</p>
            <p className="mt-1 text-sm text-white/50">ราคาขายปลีกแนะนำ</p>
          </motion.div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quotation?brand=omoda" className="rounded-lg px-6 py-2.5 text-sm font-bold text-[#052018] transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ขอใบเสนอราคา
            </Link>
            <Link href="/cars/omoda-c5-ev" className="rounded-lg border border-white/40 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
              ดูรายละเอียด
            </Link>
          </div>
        </div>
        <div>
          <dl className="overflow-hidden rounded-2xl border border-white/10">
            {c5.specs.map((s, i) => (
              <div key={s.label} className={`grid grid-cols-[1fr_1.2fr] gap-4 p-4 text-sm ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                <dt className="text-white/60">{s.label}</dt>
                <dd className="font-medium text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11px] text-white/40">ที่มา: ตารางสเปก OMODA C5 EV อย่างเป็นทางการ · ระยะทางจริงขึ้นอยู่กับพฤติกรรมการขับขี่และสภาพแวดล้อม</p>
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
      <Highlights />
      <Design />
      <Performance />
      <Interior />
      <Safety />
      <div id="colors" className="scroll-mt-40">
        <OmodaColorShowcase only="omoda-c5-ev" />
      </div>
      <Specs />
      <CTA />
    </div>
  );
}
