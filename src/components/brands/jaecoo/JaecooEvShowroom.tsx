"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Stat from "@/components/brands/wuling/Stat";
import { formatTHB } from "@/lib/utils";
import BrandHeroCTA from "@/components/brands/BrandHeroCTA";

// Shared showroom for the JAECOO EV tabs of the OMODA | JAECOO page (JAECOO 5 EV, JAECOO 6 EV).
// Each model is a JaecooEvData object in src/lib/data/jaecoo-j*.ts; this file only lays it out.

type StatItem = { value: number; unit: string; label: string; note: string | null; decimals?: number };

export interface JaecooEvData {
  id: string; // prefix for section ids, e.g. "j6"
  name: string;
  tagline: string;
  headline: string;
  startPrice: number;
  hero: { video?: string; image: string; position?: string };
  highlights: StatItem[];
  design: { eyebrow: string; title: string; wide: string; wideAlt: string; wideAspect: string; points: string[]; detail: string; detailAlt: string; detailAspect: string };
  battery: { title: string; image: string; imageAlt: string; imageAspect: string; stats: StatItem[]; points: string[] };
  interior: { title: string; main: string; mainAlt: string; tiles: { src: string; alt: string; label?: string }[]; points: string[] };
  driveModes?: { title: string; note: string; modes: string[]; highlightFirst: number };
  safety: { eyebrow: string; title: string; note: string; items: { code: string; name: string; img: string | null; badge?: string }[] };
  colors: { title: string; items: { name: string; swatch: string; img: string }[]; note?: string };
  specs: { columns: string[]; rows: { label: string; values: string[] }[]; source: string; extra?: string };
  cta: { title: string; image: string };
}

const ACCENT = "#C8B27A";
const ease = [0.16, 1, 0.3, 1] as const;
const SHADOW = { textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" };
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
      {children}
    </p>
  );
}

function CheckList({ items, dark = true }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className={`flex gap-3 text-sm sm:text-base ${dark ? "text-white/80" : "text-[#101114]/80"}`}>
          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "" : "text-[#9a8550]"}`} style={dark ? { color: ACCENT } : undefined} />
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
      {label && <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 text-sm font-semibold text-white">{label}</span>}
    </div>
  );
}

function Hero({ d }: { d: JaecooEvData }) {
  return (
    <section id={`${d.id}-model`} className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden bg-[#101114]">
      {d.hero.video ? (
        <video className="absolute inset-0 h-full w-full object-cover" src={d.hero.video} poster={d.hero.image} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
      ) : (
        <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease }} className="absolute inset-0">
          <Image src={d.hero.image} alt={d.name} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: d.hero.position ?? "center" }} />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#101114]/70 via-transparent to-[#101114]/80" />

      <div className="container-page relative z-10 pt-28 sm:pt-32" style={SHADOW}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }}>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">{d.tagline}</p>
          <h1 className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">{d.name}</h1>
          <p className="mt-4 text-base text-white/90 sm:text-lg">
            {d.headline} · เริ่มต้น {formatTHB(d.startPrice)}
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 px-4">
        <BrandHeroCTA detailsHref={`#${d.id}-design`} testDriveHref="/test-drive?brand=jaecoo" center />
      </div>
    </section>
  );
}

function Highlights({ d }: { d: JaecooEvData }) {
  return (
    <section className="border-t border-white/[0.06] bg-[#17181c] py-12 sm:py-16">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {d.highlights.map((s) => (
          <Stat key={s.label} value={s.value} unit={s.unit} label={s.label} note={s.note} decimals={s.decimals} size="md" />
        ))}
      </div>
    </section>
  );
}

function Design({ d }: { d: JaecooEvData }) {
  const g = d.design;
  return (
    <section id={`${d.id}-design`} className="scroll-mt-40 border-t border-white/[0.06] bg-[#e9ecef] py-14 text-[#101114] sm:py-20">
      <div className="container-page">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>{g.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl">{g.title}</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease }}
          className="relative mt-8 w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: g.wideAspect }}
        >
          <Image src={g.wide} alt={g.wideAlt} fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <CheckList items={g.points} dark={false} />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl lg:justify-self-end" style={{ aspectRatio: g.detailAspect }}>
            <Image src={g.detail} alt={g.detailAlt} fill sizes="(max-width: 1024px) 100vw, 448px" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Battery({ d }: { d: JaecooEvData }) {
  const b = d.battery;
  return (
    <section id={`${d.id}-battery`} className="scroll-mt-40 border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: b.imageAspect }}>
          <Image src={b.image} alt={b.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        <div>
          <motion.div {...reveal}>
            <Eyebrow>Battery &amp; Charging</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">{b.title}</h2>
          </motion.div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
            {b.stats.map((s) => (
              <Stat key={s.label} value={s.value} unit={s.unit} label={s.label} note={s.note} decimals={s.decimals} size="md" />
            ))}
          </div>
          <div className="mt-10">
            <CheckList items={b.points} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Interior({ d }: { d: JaecooEvData }) {
  const it = d.interior;
  return (
    <section id={`${d.id}-interior`} className="scroll-mt-40 border-t border-white/[0.06] bg-[#26272b] py-14 sm:py-20">
      <div className="container-page">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>Interior</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">{it.title}</h2>
        </motion.div>
        <Photo src={it.main} alt={it.mainAlt} className="mt-8 aspect-[3/2] w-full rounded-2xl sm:aspect-[16/7]" position="50% 55%" />
        <div className={`mt-4 grid gap-4 ${it.tiles.length === 3 ? "sm:grid-cols-3" : it.tiles.length > 3 ? "grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2"}`}>
          {it.tiles.map((t) => (
            <Photo key={t.src} src={t.src} alt={t.alt} label={t.label} className="aspect-[3/2] w-full rounded-2xl" />
          ))}
        </div>
        <div className="mt-10 max-w-3xl">
          <CheckList items={it.points} />
        </div>
      </div>
    </section>
  );
}

function DriveModes({ d }: { d: JaecooEvData }) {
  const m = d.driveModes;
  if (!m) return null;
  return (
    <section className="border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
      <div className="container-page text-center">
        <motion.div {...reveal}>
          <Eyebrow>Drive Modes</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">{m.title}</h2>
          <p className="mt-2 text-sm text-white/60">{m.note}</p>
        </motion.div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {m.modes.map((mode, i) => (
            <span
              key={mode}
              className="rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.1em]"
              style={i < m.highlightFirst ? { borderColor: ACCENT, color: ACCENT } : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              {mode}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Safety({ d }: { d: JaecooEvData }) {
  const s = d.safety;
  return (
    <section id={`${d.id}-safety`} className="scroll-mt-40 border-t border-white/[0.06] bg-[#17181c] py-14 sm:py-20">
      <div className="container-page">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">{s.title}</h2>
          <p className="mt-2 text-sm text-white/60">{s.note}</p>
        </motion.div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {s.items.map((a) => (
            <div key={a.code} className="overflow-hidden rounded-2xl border border-white/10 bg-[#101114]">
              <div className="relative aspect-[3/2]">
                {a.img ? (
                  <Image src={a.img} alt={`${a.code} — ${a.name}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#2a2618] to-[#101114]">
                    <span className="text-3xl font-extrabold tracking-[0.15em]" style={{ color: ACCENT }}>{a.code}</span>
                  </div>
                )}
                {a.badge && (
                  <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">{a.badge}</span>
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

function Colors({ d }: { d: JaecooEvData }) {
  const [active, setActive] = useState(0);
  const c = d.colors.items[active];
  return (
    <section id={`${d.id}-colors`} className="scroll-mt-40 border-t border-white/[0.06] bg-[#f3f4f5] py-14 text-[#101114] sm:py-20">
      <div className="container-page text-center">
        <motion.div {...reveal}>
          <Eyebrow>Colors</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl">{d.colors.title}</h2>
        </motion.div>
        <div className="relative mx-auto mt-6 aspect-[8/5] w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={c.name} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease }} className="absolute inset-0">
              <Image src={c.img} alt={`${d.name} สี ${c.name}`} fill sizes="(max-width: 768px) 100vw, 768px" className="object-contain" />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-2 text-lg font-semibold">{c.name}</p>
        <div className="mt-4 flex justify-center gap-3" role="radiogroup" aria-label={`เลือกสี ${d.name}`}>
          {d.colors.items.map((col, i) => (
            <button
              key={col.name}
              type="button"
              role="radio"
              aria-checked={i === active}
              aria-label={col.name}
              onClick={() => setActive(i)}
              className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${i === active ? "scale-110 border-[#101114]" : "border-black/15"}`}
              style={{ backgroundColor: col.swatch }}
            />
          ))}
        </div>
        {d.colors.note && <p className="mt-4 text-xs text-[#101114]/55">{d.colors.note}</p>}
      </div>
    </section>
  );
}

function Specs({ d }: { d: JaecooEvData }) {
  const s = d.specs;
  return (
    <section id={`${d.id}-specs`} className="scroll-mt-40 border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
      <div className="container-page">
        <motion.div {...reveal}>
          <Eyebrow>Specifications</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">{s.columns.length > 1 ? "เปรียบเทียบรุ่น" : `ข้อมูลจำเพาะ ${d.name} ${s.columns[0]}`}</h2>
        </motion.div>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className={`w-full text-left text-sm ${s.columns.length > 1 ? "min-w-[560px]" : ""}`}>
            <thead className="bg-white/[0.04]">
              <tr>
                <th className="p-4 font-medium text-white/50">รายการ</th>
                {s.columns.map((c) => (
                  <th key={c} className="p-4 font-bold text-white">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r, i) => (
                <tr key={r.label} className={i % 2 ? "bg-white/[0.02]" : ""}>
                  <td className="p-4 text-white/60">{r.label}</td>
                  {r.values.map((v, j) => (
                    <td key={j} className={`p-4 text-white ${i === 0 ? "font-bold" : ""}`} style={i === 0 ? { color: ACCENT } : undefined}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {s.extra && <p className="mt-4 text-sm text-white/75">{s.extra}</p>}
        <p className="mt-3 text-[11px] text-white/40">{s.source}</p>
      </div>
    </section>
  );
}

function CTA({ d }: { d: JaecooEvData }) {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#101114]">
      <div className="absolute inset-0">
        <Photo src={d.cta.image} alt="" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-[#101114]/70" />
      <div className="container-page relative z-10 flex min-h-[440px] flex-col items-center justify-center gap-8 py-14 text-center">
        <motion.h2 {...reveal} className="text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl" style={SHADOW}>
          {d.cta.title}
          <span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">ทีมงาน Maporn Autogroup พร้อมให้คำปรึกษาและนัดหมายทดลองขับ</span>
        </motion.h2>
        <div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/quotation?brand=jaecoo" className="rounded-lg px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#241d0f] transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ backgroundColor: ACCENT }}>
              ขอใบเสนอราคา
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

export default function JaecooEvShowroom({ data }: { data: JaecooEvData }) {
  return (
    <div className="bg-[#101114]">
      <Hero d={data} />
      <Highlights d={data} />
      <Design d={data} />
      <Battery d={data} />
      <Interior d={data} />
      <DriveModes d={data} />
      <Safety d={data} />
      <Colors d={data} />
      <Specs d={data} />
      <CTA d={data} />
    </div>
  );
}
