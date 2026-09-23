"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Truck, Leaf, Building2 } from "lucide-react";

// NEX showroom — same section structure as the Wuling / JAECOO showrooms. Only facts from the
// brand record (brands.ts) are stated: Dayun Auto group, 100% electric vans/pickups,
// "Net-Zero Emissions Expert". The catalog's per-model specs/prices for Nex are not verified,
// so no numbers are shown here — each model links to its catalog page / the sales team.

const ACCENT = "#19C3BA"; // brighter tint of the Nex teal (#00A19A) for legibility on dark
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" };

const SECTIONS = [
  { id: "model", label: "Model" },
  { id: "lineup", label: "Lineup" },
  { id: "why", label: "Why Nex" },
  { id: "fleet", label: "Fleet" },
];

const LINEUP = [
  { href: "/cars/nex-bev-pickup", name: "BEV Pickup", type: "Double Cab Pickup", image: "/brand/showcase/nex.jpg", },
  { href: "/cars/nex-vantastic", name: "Vantastic", type: "Electric Van", image: "/brand/models/nex-vantastic.jpg", },
];

const PILLARS = [
  { icon: Zap, title: "Electric 100%", text: "รถตู้และปิกอัพไฟฟ้า 100%" },
  { icon: Leaf, title: "Net-Zero Emissions Expert", text: "แนวคิดด้านการลดการปล่อยมลพิษของแบรนด์" },
  { icon: Building2, title: "ในเครือ Dayun Auto", text: "ผู้ผลิตรถยนต์จากประเทศจีน" },
  { icon: Truck, title: "เพื่อธุรกิจขนส่ง", text: "พัฒนาเพื่อตอบโจทย์ธุรกิจขนส่งยุคใหม่" },
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
    <div className="sticky top-[4.5rem] z-40 -mb-16 px-3 pt-2 sm:px-6">
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
            <img src="/brand/logos/nex.png" alt="Nex" className="h-4 w-auto object-contain" />
          </span>
        </div>
        <nav className="hidden items-center gap-7 md:flex">
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
          <Link href="/test-drive?brand=nex" className="rounded-lg border border-white/40 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
            ทดลองขับ
          </Link>
          <Link href="/quotation?brand=nex" className="hidden rounded-lg px-4 py-2 text-[11px] font-bold text-[#04211f] transition-all hover:brightness-110 sm:inline-flex" style={{ backgroundColor: ACCENT }}>
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="model" className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#0d0e11]">
      <h1 className="sr-only">Nex ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>
      {/* studio glow behind the truck */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(25,195,186,0.28)_0%,rgba(13,14,17,0)_60%),radial-gradient(ellipse_at_20%_10%,rgba(200,30,30,0.18)_0%,rgba(13,14,17,0)_55%)]" />

      <motion.div initial={{ opacity: 0, x: 60, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1.2, ease }} className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <Image src="/brand/studio2/nex-truck-cutout.png" alt="Nex Electric Truck" fill priority sizes="(min-width: 1024px) 62vw, 100vw" className="object-contain object-[60%_65%] p-6 sm:p-12 drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
      </motion.div>

      <div className="container-page relative z-10 flex min-h-[calc(100vh-4.5rem)] items-center pb-24 pt-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }} className="max-w-xl" style={SHADOW}>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/85">Nex · Electric Commercial</p>
          <p className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Drive the
            <br />
            Better Future
          </p>
          <p className="mt-5 text-base text-white/85 sm:text-lg">รถตู้และปิกอัพไฟฟ้า 100% เพื่อธุรกิจขนส่งยุคใหม่</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#lineup" className="rounded-lg px-8 py-3 text-sm font-bold text-[#04211f] transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ดูรถ
            </Link>
            <Link href="/test-drive?brand=nex" className="rounded-lg border border-white/40 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-[#101114]">
              ทดลองขับ
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Lineup() {
  return (
    <section id="lineup" className="scroll-mt-24 border-t border-white/[0.06] bg-[#15161A] py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
            <span className="h-px w-8" style={{ backgroundColor: ACCENT }} /> Lineup <span className="h-px w-8" style={{ backgroundColor: ACCENT }} />
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">The Nex lineup</h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">เลือกรุ่นที่ตอบโจทย์ธุรกิจของคุณ</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {LINEUP.map((m, i) => (
            <motion.div key={m.href} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.7, ease, delay: i * 0.1 }}>
              <Link href={m.href} className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#19C3BA]/50">
                <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(ellipse_at_50%_65%,#3b3e45_0%,#1d1e22_60%,#141518_100%)]">
                  {m.image && <Image src={m.image} alt={`Nex ${m.name}`} fill sizes="(min-width: 768px) 50vw, 100vw" className={`object-cover transition-transform duration-700 group-hover:scale-105`} />}
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>{m.type}</p>
                  <h3 className="mt-1 text-2xl font-bold text-white">Nex {m.name}</h3>
                  <p className="mt-2 text-sm text-white/60 group-hover:text-white/80">ดูรายละเอียดรุ่น →</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] text-white/40">สเปกและราคาล่าสุด สอบถามฝ่ายขาย</p>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="grid scroll-mt-24 border-t border-white/[0.06] bg-[#101114] lg:grid-cols-2">
      <div className="relative min-h-[380px] overflow-hidden lg:min-h-[460px]">
        <Image src="/brand/showcase/nex.jpg" alt="Nex BEV Pickup" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="relative z-10 p-6 sm:p-10" style={SHADOW}>
          <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Net-Zero
            <br />
            Emissions Expert
          </h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">ยานยนต์ไฟฟ้าเพื่อการพาณิชย์ในเครือ Dayun</p>
        </motion.div>
      </div>

      <div className="grid content-center gap-4 bg-[#17181c] p-6 sm:grid-cols-2 sm:p-10 lg:p-12">
        {PILLARS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-[#1C1E22] p-5">
              <Icon className="h-6 w-6" style={{ color: ACCENT }} strokeWidth={1.6} />
              <h3 className="mt-3 font-bold text-white">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/60">{p.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Fleet() {
  return (
    <section id="fleet" className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.06] bg-[#0d0e11]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(25,195,186,0.22)_0%,rgba(13,14,17,0)_60%)]" />
      <div className="container-page relative z-10 grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
        <div className="relative aspect-[16/10] w-full">
          <Image src="/brand/studio/nex-transparent.png" alt="Nex Electric Truck" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Fleet &amp; Business</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">พร้อมเลือกรถคันใหม่แล้วหรือยัง?<span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">ทีมงาน Maporn Autogroup พร้อมให้คำปรึกษาและนัดหมายทดลองขับ</span></h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            Maporn Autogroup นำ Nex เข้ามาเสริมไลน์อัพรถเพื่อการพาณิชย์ไฟฟ้าให้ครอบคลุมยิ่งขึ้น ปรึกษาทีมขายเพื่อเลือกรุ่นที่เหมาะกับธุรกิจของคุณ
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quotation?brand=nex" className="rounded-lg px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#04211f] transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ขอใบเสนอราคา
            </Link>
            <a href="tel:023223663" className="rounded-lg border border-white/40 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:bg-white hover:text-[#101114]">
              โทร 02-322-3663-5</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function NexShowroom() {
  return (
    <div className="bg-[#101114]">
      <Nav />
      <Hero />
      <Lineup />
      <Why />
      <Fleet />
    </div>
  );
}
