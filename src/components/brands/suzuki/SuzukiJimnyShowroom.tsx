"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Gauge, Mountain, ShieldCheck, Cpu, Zap, Navigation } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";
import { getModel } from "@/lib/data/models";
import { formatTHB } from "@/lib/utils";

const ACCENT = "#3A7D44";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.85), 0 8px 24px rgba(0,0,0,0.65)" };
const P = "/brand/suzuki-jimny/";

const SECTIONS = [
  { id: "model", label: "Model" },
  { id: "design", label: "Design" },
  { id: "interior", label: "Interior" },
  { id: "capability", label: "4WD" },
  { id: "safety", label: "Safety" },
  { id: "trims", label: "Trims" },
];

const CALLOUTS = {
  left: [
    { title: "ALLGRIP PRO 4WD", text: "ระบบ Part-time 4WD ขับเคลื่อน 4 ล้อแท้จริง 2H / 4H / 4L สำหรับทุกสภาพเส้นทาง" },
    { title: "Ladder Frame", text: "โครงตัวถังแยกจากห้องโดยสาร แข็งแกร่งรับแรงกระแทกออฟโรดได้เต็มสมรรถนะ" },
    { title: "210 มม. Clearance", text: "ระยะห่างจากพื้น 210 มม. ผ่านสิ่งกีดขวางได้ทุกชนิด" },
  ],
  right: [
    { title: "37° Approach", text: "มุมป้องกันการติดขัดด้านหน้า 37 องศา พุ่งสู่เนินได้อย่างมั่นใจ" },
    { title: "49° Departure", text: "มุมออกจากเนิน 49 องศา ไม่กระแทกกันชนท้ายเมื่อลงจากสันเขา" },
    { title: "Hill Descent", text: "Hill Hold Control + Hill Descent Control ควบคุมความเร็วขณะลงเนินอัตโนมัติ" },
  ],
};

const OFFROAD_FEATURES = [
  "โครง Ladder Frame แยกตัวถัง แข็งแกร่งระดับออฟโรดแท้",
  "ALLGRIP PRO Part-time 4WD: 2H (ถนน) / 4H (ออฟโรดทั่วไป) / 4L (ออฟโรดหนัก)",
  "เพลาแบบ 3-Link Rigid Axle แขวนล้อหลังเพลาแข็ง ทนทานสูง",
  "ระยะห่างจากพื้น 210 มม. มุมเข้า 37° ออก 49° Ramp 28°",
  "Hill Hold Control + Hill Descent Control",
  "เกียร์ Auto 4 สปีด พร้อม Transfer Case สับเปลี่ยน 4WD",
];

const INTERIOR_FEATURES = [
  "จอสัมผัส 9 นิ้ว Wireless Apple CarPlay / Android Auto",
  "ระบบเสียง Suzuki พร้อมลำโพง 4 ตำแหน่ง",
  "พวงมาลัยหุ้มหนัง + ปุ่มควบคุมบนพวงมาลัย",
  "เบาะผ้าโทนดำ สปอร์ตสไตล์ออฟโรด",
  "กระจกหน้า 1 ชิ้น มุมมองกว้างสำหรับออฟโรด",
  "ที่ชาร์จ USB พร้อม 12V Power Outlet",
  "Rear Folding Seat พับได้เพื่อเพิ่มพื้นที่บรรทุก",
  "กระจกบังลม Heated Rear Window ป้องกันฝ้า",
];

const SAFETY = [
  { code: "AEB", text: "เบรกฉุกเฉินอัตโนมัติ ตรวจจับคนเดินเท้าและยานพาหนะด้านหน้า" },
  { code: "LKA", text: "ระบบช่วยควบคุมรถให้อยู่ในเลน ลดความเสี่ยงออกนอกเส้น" },
  { code: "BSD", text: "เตือนยานพาหนะในจุดอับสายตาด้านข้าง-หลัง" },
  { code: "RCTA", text: "เตือนการจราจรด้านหลังขณะถอยหลัง" },
  { code: "HHC", text: "Hill Hold Control ป้องกันรถไหลถอยบนเนิน" },
  { code: "HDC", text: "Hill Descent Control ควบคุมความเร็วอัตโนมัติขณะลงเนินชัน" },
  { code: "ESP", text: "Electronic Stability Program ป้องกันการลื่นไถล + Traction Control" },
  { code: "SRS × 6", text: "ถุงลมนิรภัย 6 ตำแหน่ง คุ้มครองผู้โดยสารทุกด้าน" },
];

const COLORS = [
  { name: "Lime Green Metallic / Black", hex: "#7BBD3A", code: "79U/ZJ3" },
  { name: "Pearl Snow White / Black", hex: "#F4F5F0", code: "ZQZ/ZJ3" },
  { name: "Silky Silver / Black", hex: "#B4B7B2", code: "Z2S/ZJ3" },
  { name: "Chiffon Ivory / Black", hex: "#E6DFC8", code: "WBY/ZJ3" },
  { name: "Bluish Black Pearl 3", hex: "#1B1F24", code: "ZJ3" },
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
    <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#0a1208]">
      <h1 className="sr-only">Suzuki Jimny ALLGRIP PRO ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={P + "hero.jpg"}
          className="h-full w-full object-cover"
        >
          <source src={P + "hero.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1208]/70 via-transparent to-[#0a1208]/30" />

      <div className="container-page relative z-10 pt-28 sm:pt-32" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }} className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">Suzuki Jimny · ALLGRIP PRO 4WD</p>
          <p className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">Nobody<br />but Jimny.</p>
          <p className="mt-4 text-base text-white/90 sm:text-lg">Authentic compact 4WD ปลดล็อกทุกอิสระการเดินทาง ออฟโรดแท้ ไปได้ทุกที่ที่ใจต้องการ</p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-wrap justify-center gap-3 px-4">
        <Link href="#design" className="rounded-lg px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
          ดูรถ
        </Link>
        <Link href="/test-drive?brand=suzuki" className="rounded-lg border border-white/50 bg-[#0a1208]/60 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#0a1208]">
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
      <section id="design" className="relative scroll-mt-32 overflow-hidden border-t border-white/[0.06] bg-[#111410]">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-6 py-14 sm:px-12 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Built for the wild</h2>
              <p className="mt-3 text-sm text-white/75 sm:text-base">ดีไซน์ไม่เปลี่ยนแปลง เพราะไม่มีอะไรดีกว่าต้นฉบับ กระจังหน้าทรงเหลี่ยม Round LED Headlights ยางนอก All-terrain เพื่อทุกเส้นทาง</p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Round LED Headlights + LED DRL ไฟวิ่งกลางวัน",
                  "กระจังหน้าทรงเหลี่ยม Jimny Classic ดีไซน์ไม่รู้เสื่อม",
                  "Flared Fender บังโคลนพลาสติกขยาย ป้องกันโคลนกระเซ็น",
                  "Spare Tire ยางอะไหล่นอก ติดฝาท้ายสไตล์ออฟโรด",
                  "ล้ออัลลอย 15 นิ้ว ยาง All-terrain 195/80R15",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div className="relative min-h-[280px] sm:min-h-[380px]">
            <Image src={P + "exterior.jpg"} alt="Suzuki Jimny ภายนอก Off-road" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: "50% 30%" }} />
          </div>
        </div>
      </section>

      <section id="capability" className="scroll-mt-32 bg-[#1a1d15] py-14 sm:py-20">
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
            <Image src={P + "performance.jpg"} alt="Suzuki Jimny สมรรถนะ ALLGRIP PRO" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
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
    { icon: Zap, value: 102, unit: "hp", label: "Power", note: "K15B 1.5L DOHC สูงสุด" },
    { icon: Gauge, value: 130, unit: "Nm", label: "Torque", note: "แรงบิดสูงสุด @ 4,000 rpm" },
    { icon: Mountain, value: 210, unit: "mm", label: "Clearance", note: "ระยะห่างจากพื้นสูงสุด" },
    { icon: Navigation, value: 37, unit: "°", label: "Approach", note: "มุมป้องกันการติดขัดด้านหน้า" },
  ];
  return (
    <section id="interior" className="grid scroll-mt-32 border-t border-white/[0.06] bg-[#0d100b] lg:grid-cols-2">
      <div className="relative min-h-[360px] overflow-hidden lg:min-h-[440px]">
        <Image src={P + "interior.jpg"} alt="ห้องโดยสาร Suzuki Jimny" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Pure.<br />Purposeful.
          </h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">ห้องโดยสารออกแบบเพื่อการผจญภัย จอ 9 นิ้ว + Transfer Case 4WD</p>
        </motion.div>
      </div>

      <div className="relative bg-[#141710] p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
          {items.map(({ icon: Icon, ...s }) => (
            <div key={s.label}>
              <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
              <Stat value={s.value} unit={s.unit} label={s.label} note={s.note} size="md" />
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#1C1F18] p-6">
          <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-white">
            <Cpu className="h-5 w-5" style={{ color: ACCENT }} /> ALLGRIP PRO Off-Road System
          </p>
          <ul className="space-y-3">
            {OFFROAD_FEATURES.map((t) => (
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

function ConnectedComfort() {
  return (
    <section className="border-t border-white/[0.06] bg-[#141710] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            <span className="h-px w-8" style={{ backgroundColor: ACCENT }} /> Interior <span className="h-px w-8" style={{ backgroundColor: ACCENT }} />
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Adventure ready</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INTERIOR_FEATURES.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease, delay: (i % 4) * 0.07 }}
              className="rounded-2xl border border-white/10 bg-[#1C1F18] p-5"
            >
              <Check className="mb-3 h-4 w-4" style={{ color: ACCENT }} />
              <p className="text-sm leading-relaxed text-white/80">{f}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section id="safety" className="scroll-mt-32 border-t border-white/[0.06] bg-[#0d100b] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            <ShieldCheck className="h-4 w-4" /> Suzuki Safety Support
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">Safe everywhere</h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">ความปลอดภัยครบครันทั้งบนถนนและออฟโรด</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY.map((s, i) => (
            <motion.div
              key={s.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease, delay: (i % 4) * 0.07 }}
              className="rounded-2xl border border-white/10 bg-[#1C1F18] p-6 transition-colors hover:border-[#3A7D44]/50"
            >
              <p className="text-2xl font-extrabold tracking-tight" style={{ color: ACCENT }}>{s.code}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="relative mt-10 overflow-hidden rounded-2xl">
          <Image src={P + "rear.jpg"} alt="Suzuki Jimny Safety ระบบความปลอดภัย" width={1440} height={540} className="w-full object-cover" style={{ maxHeight: 360, objectPosition: "50% 40%" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d100b]/85 to-transparent" />
          <div className="absolute inset-y-0 left-6 flex flex-col justify-center sm:left-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Suzuki Safety Support</p>
            <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">มั่นใจทุกเส้นทาง<br />ทุกสภาพการขับขี่</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trims() {
  const m = getModel("suzuki-jimny");
  const variants = m?.variants ?? [];
  return (
    <section id="trims" className="scroll-mt-32 grid border-t border-white/[0.06] bg-[#0d100b] lg:grid-cols-2">
      <div className="relative min-h-[380px] overflow-hidden lg:min-h-[460px]">
        <Image src={P + "hero.jpg"} alt="Suzuki Jimny บนภูมิประเทศออฟโรด" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: "50% 30%" }} />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 text-center sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Go anywhere</h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">ALLGRIP PRO 4WD · Ladder Frame · 210mm Ground Clearance</p>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center gap-6 bg-[#1a1d15] p-6 sm:p-10 lg:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Model</p>
          <h3 className="mt-1 text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">Suzuki Jimny</h3>
          <p className="mt-1 text-sm text-white/60">Authentic compact 4WD — Nobody but Jimny</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {variants.map((v) => (
            <div key={v.name} className="rounded-xl border border-white/10 bg-[#1C1F18] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>{v.name}</p>
              <p className="mt-1 text-xl font-extrabold text-white">{formatTHB(v.price)}</p>
              <p className="mt-1 text-[11px] text-white/50">ราคาอ้างอิง · สอบถามราคาล่าสุดที่โชว์รูม</p>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">สีตัวถัง ({COLORS.length} สี)</p>
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
            "4 ที่นั่ง ตัวถัง 3 ประตู Ladder Frame Body-on-Frame",
            "ขนาดตัวถัง 3,645 × 1,645 × 1,720 มม. ฐานล้อ 2,250 มม.",
            "น้ำหนักตัวรถ 1,090 กก. เบาเหมาะสำหรับออฟโรด",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-white/75">
              <Check className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <Link href="/cars/suzuki-jimny" className="rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
            ดูรายละเอียด
          </Link>
          <Link href="/quotation?brand=suzuki" className="rounded-lg border border-white/40 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#0d100b]">
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0a1208]">
      <Image src={P + "exterior.jpg"} alt="Suzuki Jimny Adventure" fill sizes="100vw" className="object-cover opacity-55" style={{ objectPosition: "50% 40%" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1208]/90 via-[#0a1208]/40 to-[#0a1208]/20" />
      <div className="container-page relative z-10 flex min-h-[520px] flex-col items-center justify-between gap-10 py-14 text-center">
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl" style={SHADOW}>
          พร้อมพิชิตทุกเส้นทางกับ Jimny?
          <span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">ทีมงาน Maporn Autogroup ตัวแทนจำหน่าย Suzuki อย่างเป็นทางการ พร้อมให้คำปรึกษาและนัดหมายทดลองขับ</span>
        </motion.h2>
        <div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/quotation?brand=suzuki" className="rounded-lg px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ขอใบเสนอราคา
            </Link>
            <Link href="/test-drive?brand=suzuki" className="rounded-lg border border-white/40 bg-[#0a1208]/50 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#0a1208]">
              จองทดลองขับ
            </Link>
            <a href="tel:023223663" className="rounded-lg border border-white/40 bg-[#0a1208]/50 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#0a1208]">
              โทร 02-322-3663-5
            </a>
          </div>
          <p className="mt-4 text-[11px] text-white/70" style={SHADOW}>*ภาพประกอบเพื่อการนำเสนอเท่านั้น รายละเอียดอาจแตกต่างจากรถจริง</p>
        </div>
      </div>
    </section>
  );
}

export default function SuzukiJimnyShowroom() {
  return (
    <div className="bg-[#0d100b]">
      <Nav />
      <Hero />
      <Design />
      <Interior />
      <ConnectedComfort />
      <Safety />
      <Trims />
      <CTA />
    </div>
  );
}
