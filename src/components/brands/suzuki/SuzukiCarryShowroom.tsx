"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Package, Gauge, ShieldCheck, Cpu, Truck, Wrench } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";
import { getModel } from "@/lib/data/models";
import { formatTHB } from "@/lib/utils";

const ACCENT = "#1461A3";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.85), 0 8px 24px rgba(0,0,0,0.65)" };
const P = "/brand/suzuki-carry/";

const SECTIONS = [
  { id: "model", label: "Model" },
  { id: "cargo", label: "Cargo" },
  { id: "interior", label: "Interior" },
  { id: "performance", label: "Engine" },
  { id: "safety", label: "Safety" },
  { id: "trims", label: "Price" },
];

const CARGO_CALLOUTS = {
  left: [
    { title: "กระบะ 3 ด้าน", text: "เปิดได้ทั้งซ้าย ขวา และท้าย ขนถ่ายสัมภาระได้สะดวกทุกสถานการณ์" },
    { title: "1,955 × 1,395 มม.", text: "พื้นที่กระบะบรรทุกใหญ่กว้าง รองรับสินค้าได้หลากหลายรูปแบบ" },
    { title: "บรรทุก 750 กก.", text: "น้ำหนักบรรทุกสูงสุด 750 กก. รองรับทุกงานขนส่งเชิงพาณิชย์" },
  ],
  right: [
    { title: "Turning Radius 4.4 ม.", text: "วงเลี้ยวแคบ 4.4 เมตร เข้าออกตรอกซอกซอยได้คล่องตัว" },
    { title: "ช่วงล่างแข็งแกร่ง", text: "โครงสร้างรับน้ำหนักแข็งแกร่ง ช่วงล่างทนทานสำหรับงานบรรทุก" },
    { title: "ต่อยอดธุรกิจ", text: "ดัดแปลงได้หลากหลาย ติดตั้งโครงกระบะ หลังคา ตู้บรรทุกได้ตามต้องการ" },
  ],
};

const BUSINESS_FEATURES = [
  "กระบะบรรทุกเหล็กอัดเสริมความแข็งแรง เปิดได้ 3 ด้าน",
  "พื้นที่กระบะ 1,955 มม. (ยาว) × 1,395 มม. (กว้าง)",
  "ขอบกระบะสูง 290 มม. ป้องกันสินค้าตกหล่น",
  "วงเลี้ยว 4.4 เมตร เข้าพื้นที่แคบได้ดีกว่ารถบรรทุกทั่วไป",
  "รับน้ำหนักบรรทุกสูงสุด 750 กก. สำหรับงานพาณิชย์",
  "ดัดแปลงได้ตามธุรกิจ: โครงกระบะ, หลังคาผ้าใบ, ตู้บรรทุก",
];

const INTERIOR_FEATURES = [
  "เบาะนั่งพนักพิงพับได้ เพิ่มพื้นที่เก็บสัมภาระด้านหลัง",
  "ถาดเก็บของด้านบนแผงหน้าปัด ใส่กล่องทิชชู่ได้พอดี",
  "ช่องเก็บของขนาดใหญ่ทั้งสองข้างประตู",
  "วิทยุ AM/FM พร้อม USB/iPod Connection",
  "แอร์ปรับอากาศ Manual ทำความเย็นได้ดี",
  "มาตรวัดความเร็วชัดเจน อ่านง่ายขณะขับงาน",
  "พวงมาลัยปรับระดับได้ รองรับผู้ขับขี่หลายรูปร่าง",
  "ไฟส่องสว่างภายในห้องโดยสาร",
];

const SAFETY_ITEMS = [
  { code: "ABS", text: "ระบบป้องกันล้อล็อก Anti-lock Braking System ลดการลื่นไถลขณะเบรก" },
  { code: "EBD", text: "กระจายแรงเบรกอัตโนมัติตามน้ำหนักบรรทุก ทั้งเบาและหนัก" },
  { code: "IMM", text: "กุญแจอัจฉริยะ Immobilizer ป้องกันการโจรกรรมรถยนต์" },
  { code: "AIRBAG", text: "ถุงลมนิรภัยคู่หน้า คุ้มครองผู้ขับและผู้โดยสาร" },
  { code: "BELT", text: "เข็มขัดนิรภัย 3 จุดพร้อมแรงดึงกลับอัตโนมัติ (ELR) ทุกที่นั่ง" },
  { code: "BODY", text: "โครงตัวถัง TECT แข็งแรง รับแรงกระแทกปกป้องผู้โดยสาร" },
];

const INSTALLMENTS = [
  { down: "10%", downAmt: "39,500", m48: "8,666", m60: "7,303", m72: "6,493", m84: "5,906" },
  { down: "15%", downAmt: "59,250", m48: "8,128", m60: "6,785", m72: "5,965", m84: "5,536" },
  { down: "20%", downAmt: "79,000", m48: "7,545", m60: "6,281", m72: "5,561", m84: "5,105" },
  { down: "25%", downAmt: "98,750", m48: "7,049", m60: "5,864", m72: "5,140", m84: "4,737" },
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
    <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#111418]">
      <h1 className="sr-only">Suzuki Carry กระบะเบาอเนกประสงค์ ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>

      {/* Carry hero — white truck on dark, accented with brand blue */}
      <div className="absolute inset-0 flex items-center justify-end pr-0 sm:pr-8 lg:pr-16">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease }}
          className="relative h-full w-full max-w-3xl"
        >
          <Image
            src={P + "hero.png"}
            alt="Suzuki Carry"
            fill
            priority
            sizes="(min-width: 1280px) 60vw, 100vw"
            className="object-contain object-center"
            style={{ objectPosition: "60% 55%" }}
          />
        </motion.div>
      </div>

      {/* Accent gradient stripe */}
      <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}, transparent)` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111418]/90 via-[#111418]/50 to-transparent" />

      <div className="container-page relative z-10 flex min-h-[calc(100vh-4.5rem)] flex-col justify-center py-28" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }} className="max-w-lg">
          <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Suzuki Carry · กระบะเบาอเนกประสงค์</p>
          <p className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            เคียงข้าง<br />ทุกฝัน.
          </p>
          <p className="mt-4 text-base text-white/85 sm:text-lg">กระบะบรรทุกขนาดใหญ่ เปิดได้ 3 ด้าน น้ำหนักบรรทุก 750 กก. ต่อยอดธุรกิจได้อย่างหลากหลาย เริ่มต้น {formatTHB(395000)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#cargo" className="rounded-lg px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ดูสเปก
            </Link>
            <Link href="/contact?brand=suzuki" className="rounded-lg border border-white/50 bg-[#111418]/60 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#111418]">
              สอบถามราคา
            </Link>
          </div>
        </motion.div>

        {/* Key stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 sm:max-w-md"
        >
          {[
            { label: "น้ำหนักบรรทุก", value: "750 กก." },
            { label: "กระบะ", value: "3 ด้าน" },
            { label: "วงเลี้ยว", value: "4.4 ม." },
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

function Cargo() {
  return (
    <>
      <section id="cargo" className="relative scroll-mt-32 overflow-hidden border-t border-white/[0.06] bg-[#171A1E]">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-6 py-14 sm:px-12 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Cargo Bed</p>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">เปิดได้ 3 ด้าน</h2>
              <p className="mt-3 text-sm text-white/75 sm:text-base">กระบะบรรทุกเหล็กอัดขนาดใหญ่ เปิดได้ทั้งซ้าย ขวา และท้าย ขนถ่ายสัมภาระสะดวกทุกสถานการณ์ รองรับงานพาณิชย์ทุกรูปแบบ</p>
              <ul className="mt-6 space-y-2.5">
                {BUSINESS_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div className="relative min-h-[280px] sm:min-h-[380px]">
            <Image src={P + "work.jpg"} alt="Suzuki Carry กระบะบรรทุก 3 ด้าน" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Callouts section — side view center */}
      <section className="bg-[#1F2328] py-14 sm:py-20">
        <div className="container-page grid items-center gap-8 lg:grid-cols-[1fr_1.6fr_1fr] lg:gap-4">
          <div className="order-2 space-y-8 lg:order-1 lg:space-y-16">
            {CARGO_CALLOUTS.left.map((c) => (
              <Callout key={c.title} {...c} align="left" />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease }}
            className="relative order-1 aspect-[16/9] w-full overflow-hidden rounded-2xl lg:order-2"
          >
            <Image src={P + "side.jpg"} alt="Suzuki Carry ด้านข้าง" fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
          </motion.div>
          <div className="order-3 space-y-8 lg:space-y-16">
            {CARGO_CALLOUTS.right.map((c) => (
              <Callout key={c.title} {...c} align="right" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Interior() {
  const stats = [
    { icon: Package, value: 750, unit: "กก.", label: "Payload", note: "น้ำหนักบรรทุกสูงสุด" },
    { icon: Gauge, value: 83, unit: "hp", label: "Power", note: "K15B 1.5L DOHC แรงม้าสูงสุด" },
    { icon: Truck, value: 4.4, unit: "ม.", label: "วงเลี้ยว", note: "Turning Radius คล่องตัว" },
    { icon: Wrench, value: 3, unit: "ด้าน", label: "เปิดกระบะ", note: "ซ้าย ขวา และท้าย" },
  ];
  return (
    <section id="interior" className="grid scroll-mt-32 border-t border-white/[0.06] bg-[#111418] lg:grid-cols-2">
      <div className="relative min-h-[360px] overflow-hidden lg:min-h-[440px]">
        <Image src={P + "interior.png"} alt="ห้องโดยสาร Suzuki Carry" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: "50% 30%" }} />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Simple.<br />Purposeful.
          </h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">ห้องโดยสารออกแบบเพื่อประสิทธิภาพการทำงาน สะดวกสบาย ทนทาน ใช้งานได้ยาวนาน</p>
        </motion.div>
      </div>

      <div className="bg-[#16191D] p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
          {stats.map(({ icon: Icon, ...s }) => (
            <div key={s.label}>
              <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
              <Stat value={s.value} unit={s.unit} label={s.label} note={s.note} size="md" />
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#1C1F24] p-6">
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

function Performance() {
  return (
    <section id="performance" className="scroll-mt-32 border-t border-white/[0.06] bg-[#171A1E] py-16 sm:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Engine</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">K15B 1.5L DOHC</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">เครื่องยนต์ K15B 1.5 ลิตร DOHC 4 สูบ ให้แรงม้าและแรงบิดเพียงพอสำหรับการบรรทุกหนัก ประหยัดน้ำมัน บำรุงรักษาง่าย ต้นทุนต่ำในระยะยาว</p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "แรงม้าสูงสุด", val: "83 hp" },
              { label: "แรงบิด", val: "130 Nm" },
              { label: "เกียร์", val: "5 สปีด MT" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-[#1C1F24] p-4 text-center">
                <p className="text-lg font-extrabold text-white sm:text-xl">{s.val}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-2.5">
            {[
              "เครื่องยนต์ K15B 1.5L DOHC 16 วาล์ว VVT",
              "เกียร์ธรรมดา 5 สปีด ส่งกำลังตรง ประหยัดน้ำมัน",
              "ขับเคลื่อนล้อหลัง (RWD) รับน้ำหนักบรรทุกได้เต็มที่",
              "ระบบเชื้อเพลิงหัวฉีด EFI ประหยัด บำรุงรักษาง่าย",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl"
        >
          <Image src={P + "engine.jpg"} alt="Suzuki Carry เครื่องยนต์ K15B" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section id="safety" className="scroll-mt-32 border-t border-white/[0.06] bg-[#111418] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            <ShieldCheck className="h-4 w-4" /> Safety
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">มั่นใจทุกเส้นทางงาน</h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">ระบบความปลอดภัยครบครันสำหรับรถเชิงพาณิชย์</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_ITEMS.map((s, i) => (
            <motion.div
              key={s.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease, delay: (i % 3) * 0.07 }}
              className="rounded-2xl border border-white/10 bg-[#1C1F24] p-6 transition-colors hover:border-[#1461A3]/50"
            >
              <p className="text-2xl font-extrabold tracking-tight" style={{ color: ACCENT }}>{s.code}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="relative mt-10 overflow-hidden rounded-2xl">
          <Image src={P + "exterior.jpg"} alt="Suzuki Carry ภายนอก" width={1440} height={540} className="w-full object-cover" style={{ maxHeight: 300, objectPosition: "50% 35%" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111418]/90 to-transparent" />
          <div className="absolute inset-y-0 left-6 flex flex-col justify-center sm:left-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Suzuki Carry</p>
            <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">ขับขี่ปลอดภัย<br />ทุกเส้นทางธุรกิจ</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trims() {
  const m = getModel("suzuki-carry");
  const variants = m?.variants ?? [];
  return (
    <section id="trims" className="scroll-mt-32 border-t border-white/[0.06] bg-[#171A1E] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>ราคาและการผ่อน</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Suzuki Carry</h2>
          <p className="mt-2 text-sm text-white/60">เริ่มต้น {formatTHB(395000)} · ผ่อนสบาย หลายแผนให้เลือก</p>
        </div>

        {/* Variant price card */}
        <div className="mb-10 flex justify-center gap-4">
          {variants.map((v) => (
            <div key={v.name} className="w-full max-w-xs rounded-2xl border border-white/15 bg-[#1C1F24] p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>{v.name}</p>
              <p className="mt-2 text-4xl font-extrabold text-white">{formatTHB(v.price)}</p>
              <p className="mt-1 text-xs text-white/50">เครื่องยนต์ {v.engine} · {v.power}</p>
              <div className="mt-4 flex justify-center gap-2">
                <Link href="/quotation?brand=suzuki" className="rounded-lg px-5 py-2 text-xs font-bold text-white transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
                  ขอใบเสนอราคา
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Installment table */}
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
                <tr key={row.down} className={`border-b border-white/[0.06] ${i % 2 === 0 ? "bg-[#1C1F24]" : "bg-[#171A1E]"}`}>
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
          <p className="px-4 py-3 text-[11px] text-white/40">*ยอดจัดเงิน: ราคา 395,000 บาท · ค่าจดทะเบียน 3,500 บาท · อัตราดอกเบี้ยตามเงื่อนไขไฟแนนซ์ สอบถามโชว์รูม</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/quotation?brand=suzuki" className="rounded-lg px-7 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
            ขอใบเสนอราคา
          </Link>
          <Link href="/contact?brand=suzuki" className="rounded-lg border border-white/40 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#111418]">
            สอบถามรายละเอียด
          </Link>
          <a href="tel:023223663" className="rounded-lg border border-white/40 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#111418]">
            โทร 02-322-3663-5
          </a>
        </div>
        <p className="mt-6 text-center text-[11px] text-white/40">*ราคาและตารางผ่อนชำระสำหรับการอ้างอิงเบื้องต้น รายละเอียดอาจเปลี่ยนแปลง กรุณาติดต่อโชว์รูมเพื่อยืนยันราคาปัจจุบัน</p>
      </div>
    </section>
  );
}

export default function SuzukiCarryShowroom() {
  return (
    <div className="bg-[#111418]">
      <Nav />
      <Hero />
      <Cargo />
      <Interior />
      <Performance />
      <Safety />
      <Trims />
    </div>
  );
}
