"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Check, Truck, ShieldCheck, Leaf, Wrench, PaintBucket, Phone, ExternalLink, MessageCircle, Award, CalendarCheck } from "lucide-react";
import {
  SUZUKI_MODELS,
  type SuzukiShowcaseModel,
  LINE_BOOKING_URL,
  MAPORN_SUZUKI_URL,
  MAPORN_SUZUKI_CONTACT_URL,
  type SuzukiCategory,
} from "@/lib/data/suzukiShowcase";

// Suzuki brand page — model-led showroom layout. No prices anywhere on this page.
// Only Fronx, XL7 Hybrid and Carry are shown (client request); specs are from the
// official Maporn Suzuki site.

const BLUE = "#0A4DA2";
const BLUE_TEXT = "#6FB1FF"; // lighter blue for text/numbers on dark
const NAVY = "#0B1B3A";
const ease = [0.16, 1, 0.3, 1] as const;

function Stage({ m, big }: { m: SuzukiShowcaseModel; big?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${big ? "aspect-[3/2]" : "aspect-[16/10]"}`} style={m.stageBg ? { backgroundColor: m.stageBg } : { background: "radial-gradient(ellipse at 50% 70%, #3b3e45 0%, #1d1e22 60%, #141518 100%)" }}>
      {m.image && (
        <Image
          src={m.image}
          alt={m.name}
          fill
          sizes={big ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
          className="object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      )}
    </div>
  );
}

function ModelAction({ m, primary }: { m: SuzukiShowcaseModel; primary?: boolean }) {
  const cls = primary
    ? "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all hover:brightness-110"
    : "inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:border-[#0A4DA2] hover:bg-[#0A4DA2]";
  const label = primary ? "Explore " + (m.name.includes("FRONX") ? "Fronx" : m.name.replace("SUZUKI ", "")) : "View model";
  const style = primary ? { backgroundColor: BLUE } : undefined;
  return m.href ? (
    <Link href={m.href} className={cls} style={style}>{label} →</Link>
  ) : (
    <a href={m.detailUrl} target="_blank" rel="noreferrer" className={cls} style={style}>{label} <ExternalLink className="h-3.5 w-3.5" /></a>
  );
}

const TABS: { key: "all" | SuzukiCategory; label: string }[] = [
  { key: "all", label: "ทั้งหมด (All)" },
  { key: "suv", label: "SUV & Crossover" },
  { key: "commercial", label: "รถยนต์เพื่อการพาณิชย์ (Commercial)" },
];

const TECH = [
  {
    icon: Leaf,
    title: "Smart Hybrid (SHVS / ISG)",
    text: "Fronx และ XL7 Hybrid ใช้ระบบ ISG Mild Hybrid พร้อมแบตเตอรี่ลิเธียมไอออน ช่วยเสริมแรงและประหยัดน้ำมัน พร้อมระบบ Auto Start/Stop",
  },
  {
    icon: ShieldCheck,
    title: "Suzuki Safety Support",
    text: "Fronx ติดตั้งเบรกฉุกเฉินอัตโนมัติ (AEB), ACC, ระบบช่วยรักษาเลน, เตือนจุดอับสายตา, เตือนรถผ่านขณะถอย, ไฟสูงอัตโนมัติ, กล้อง 360° และถุงลมนิรภัย 6 ตำแหน่ง",
  },
  {
    icon: Truck,
    title: "พร้อมทำงานทุกวัน",
    text: "Carry กระบะพื้นเรียบเปิดได้ 3 ด้าน บรรทุกได้ 945 กก. รองรับการดัดแปลงเป็น Food Truck หรือบริการเคลื่อนที่",
  },
];

const SERVICES = [
  { icon: CalendarCheck, title: "ตัวแทนจำหน่ายซูซูกิ", text: "ผู้แทนจำหน่ายรถยนต์ซูซูกิมานานกว่า 30 ปี" },
  { icon: Wrench, title: "ศูนย์บริการมาตรฐาน", text: "ศูนย์บริการและอะไหล่แท้ครบวงจร" },
  { icon: PaintBucket, title: "ศูนย์ซ่อมสีและตัวถัง", text: "งานซ่อมสีและตัวถังมาตรฐาน Suzy Fix" },
  { icon: Award, title: "ติดตั้งแก๊สรถยนต์", text: "ศูนย์ติดตั้งแก๊สที่ได้รับใบอนุญาตจากกรมการขนส่งทางบก" },
];

export default function SuzukiShowcase() {
  const [tab, setTab] = useState<"all" | SuzukiCategory>("all");
  const models = SUZUKI_MODELS.filter((m) => tab === "all" || m.category === tab);
  const reduce = useReducedMotion();
  const [feat, ...rest] = models;
  // Scroll-linked hero motion: background drifts/zooms, copy fades and rises as you scroll past.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#101113] text-white">
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#101113]">
        <h1 className="sr-only">ALL NEW SUZUKI FRONX THE ICONIC DRIVE — ตัวแทนจำหน่ายซูซูกิอย่างเป็นทางการ Maporn Suzuki</h1>
        {/* Official banner shown as-is: the artwork already carries its own headline */}
        <motion.div style={{ y: bgY, scale: bgScale }} className="relative aspect-[4/3] w-full sm:aspect-[1901/752]">
          <Image
            src="/brand/models/suzuki-fronx-iconic-drive-banner.webp"
            alt="ALL NEW SUZUKI FRONX THE ICONIC DRIVE"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "38% 50%" }}
          />
          <motion.span
            aria-hidden="true"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.6, repeat: Infinity, repeatDelay: 6 }}
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
          />
        </motion.div>
        <motion.div style={{ opacity: copyOpacity }} className="absolute inset-x-0 bottom-4 z-10 flex flex-wrap justify-center gap-3 px-4 sm:bottom-8">
          <a href="#models" className="rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: BLUE }}>
            ดูรุ่นรถทั้งหมด
          </a>
          <a href={LINE_BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/30 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101113]">
            <MessageCircle className="h-4 w-4" /> จองทดลองขับ
          </a>
        </motion.div>
      </section>

      {/* MODELS — showroom layout: one featured vehicle + secondary showcases */}
      <section id="models" className="scroll-mt-28 bg-[#101113] py-16 sm:py-24">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: BLUE_TEXT }}>SUZUKI / MODELS</p>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Explore the Suzuki Range</h2>
              <p className="mt-3 text-base text-white/60 sm:text-lg">ค้นพบรถยนต์ซูซูกิที่ตอบโจทย์ทุกสไตล์การขับขี่</p>
            </div>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0" role="tablist" aria-label="กรองประเภทรถ">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    tab === t.key ? "border-transparent text-white shadow-md" : "border-white/15 bg-white/5 text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                  style={tab === t.key ? { backgroundColor: BLUE } : undefined}
                >
                  {t.label.replace(" (Commercial)", "").replace(" (All)", "")}
                </button>
              ))}
            </div>
          </div>

          <div>
            <motion.div key={tab} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} className="space-y-6">
              {feat && (
                <article className="group grid overflow-hidden rounded-[28px] border border-white/10 bg-[#1C1E22] shadow-[0_20px_60px_rgba(0,0,0,0.45)] lg:grid-cols-[1.6fr_1fr]">
                  <Stage m={feat} big />
                  <div className="flex flex-col justify-center p-7 sm:p-10">
                    <span className="mb-4 inline-flex w-fit rounded-full px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: feat.category === "commercial" ? NAVY : "#D40F1F" }}>
                      {feat.badge}
                    </span>
                    <h3 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{feat.name}</h3>
                    <p className="mt-2 text-lg font-light italic text-white/60">{feat.subtitle}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/65">{feat.tagline}</p>
                    <dl className="mt-7 grid grid-cols-3 gap-3 border-y border-white/10 py-5">
                      {feat.stats.map((s) => (
                        <div key={s.label}>
                          <dt className="text-2xl font-extrabold sm:text-3xl" style={{ color: BLUE_TEXT }}>{s.value}</dt>
                          <dd className="mt-1 text-[11px] leading-tight text-white/55">{s.label}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <ModelAction m={feat} primary />
                      <a href={LINE_BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline" style={{ color: BLUE_TEXT }}>
                        <MessageCircle className="h-4 w-4" /> จองทดลองขับ
                      </a>
                    </div>
                  </div>
                </article>
              )}

              {rest.length > 0 && (
                <div className={`grid gap-6 ${rest.length > 1 ? "md:grid-cols-2" : ""}`}>
                  {rest.map((m, i) => (
                    <motion.article
                      key={m.id}
                      initial={reduce ? false : { opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                      className={`group overflow-hidden rounded-[24px] border border-white/10 bg-[#1C1E22] shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(10,77,162,0.16)] ${rest.length === 1 ? "md:grid md:grid-cols-[1.3fr_1fr]" : ""}`}
                    >
                      <Stage m={m} />
                      <div className="flex flex-col justify-center p-6 sm:p-8">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: BLUE_TEXT }}>{m.badge}</p>
                        <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{m.name}</h3>
                        <p className="mt-1 text-sm italic text-white/55">{m.subtitle}</p>
                        <p className="mt-3 text-sm leading-relaxed text-white/65">{m.tagline}</p>
                        <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                          {m.stats.map((s) => (
                            <div key={s.label}>
                              <dt className="text-xl font-extrabold" style={{ color: BLUE_TEXT }}>{s.value}</dt>
                              <dd className="mt-0.5 text-[10px] leading-tight text-white/55">{s.label}</dd>
                            </div>
                          ))}
                        </dl>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <ModelAction m={m} />
                          <a href={LINE_BOOKING_URL} target="_blank" rel="noreferrer" className="text-sm font-bold underline-offset-4 hover:underline" style={{ color: BLUE_TEXT }}>จองทดลองขับ</a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="bg-[#15161A] py-14 sm:py-20">
        <div className="container-page">
          <div className="mb-10 text-center">
            <p className="mb-2 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: BLUE_TEXT }}>
              <span className="h-px w-8" style={{ backgroundColor: BLUE }} /> Technology <span className="h-px w-8" style={{ backgroundColor: BLUE }} />
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">เทคโนโลยีที่มากับรถซูซูกิ</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {TECH.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                  className="rounded-3xl border border-white/10 bg-[#1C1E22] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(10,77,162,0.25)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: BLUE }}>
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{t.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CARRY — business solution */}
      <section className="container-page py-14 sm:py-20">
        <div className="mb-10 text-center">
          <p className="mb-2 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: BLUE_TEXT }}>
            <span className="h-px w-8" style={{ backgroundColor: BLUE }} /> Suzuki Carry <span className="h-px w-8" style={{ backgroundColor: BLUE }} />
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">พร้อมทำงานทุกวัน ต่อยอดธุรกิจได้หลากหลาย</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { src: "/brand/suzuki-carry/bed.jpg", title: "กระบะพื้นเรียบ ยาว 2,450 มม.", text: "พื้นที่บรรทุกกว้าง บรรทุกได้สูงสุด 945 กก." },
            { src: "/brand/suzuki-carry/three-sides.jpg", title: "เปิดได้ 3 ด้าน", text: "ขนถ่ายสินค้าสะดวก รองรับการดัดแปลงเป็น Food Truck หรือบริการเคลื่อนที่" },
            { src: "/brand/suzuki-carry/turning.jpg", title: "รัศมีวงเลี้ยวแคบ 4.4 เมตร", text: "คล่องตัวในตรอกซอกซอยและงานในเมือง" },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-[#1C1E22] shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(10,77,162,0.16)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                <Image src={c.src} alt={c.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">{c.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HERITAGE & DEALER */}
      <section className="relative overflow-hidden py-16 text-white sm:py-24" style={{ backgroundColor: "#15161A" }}>
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full blur-[120px]" style={{ backgroundColor: BLUE, opacity: 0.35 }} />
        <div className="container-page relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#7FB2F0]">Maporn Suzuki</p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">ผู้แทนจำหน่ายซูซูกิ
                <br />มานานกว่า 30 ปี</h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                จากการขายสู่การบริการหลังการขาย มาพรพาณิชย์ดูแลรถซูซูกิของคุณครบวงจร ตั้งแต่เลือกรถ ทดลองขับ ซ่อมบำรุง ไปจนถึงงานซ่อมสีและตัวถัง
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={MAPORN_SUZUKI_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0B1B3A] transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  ไปที่เว็บไซต์ Maporn Suzuki <ExternalLink className="h-4 w-4" />
                </a>
                <a href={MAPORN_SUZUKI_CONTACT_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
                  นัดหมายเข้ารับบริการ / สอบถามข้อมูล
                </a>
                <a href="tel:023223663" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
                  <Phone className="h-4 w-4" /> 02-322-3663 ต่อ 3-5
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.1]">
                    <Icon className="h-6 w-6 text-[#7FB2F0]" strokeWidth={1.6} />
                    <h3 className="mt-3 font-bold">{s.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/65">{s.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/50">
            <Link href="/service#suzy-fix" className="underline-offset-4 hover:text-white hover:underline">ศูนย์ซ่อมสีและตัวถัง Suzy Fix</Link>
            <Link href="/branches" className="underline-offset-4 hover:text-white hover:underline">สาขาและแผนที่</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
