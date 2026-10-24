import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Eye, HeartHandshake, ShieldCheck, LayoutGrid, Wrench, Users, Car, PackageSearch, PaintBucket, Fuel, Check } from "lucide-react";
import { company, companyTimeline, companyValues, serviceDepartments } from "@/lib/data/company";
import { getBrand } from "@/lib/data/brands";
import { getBrandGroups } from "@/lib/data/brandGroups";
import ScrollFx from "@/components/ui/ScrollFx";
import MapornLogo from "@/components/ui/MapornLogo";

// About page — premium dark layout. Typography and spacing carry the design; photos are few,
// framed rather than darkened. Photos in public/brand/about/ are not used on any other page.
const IMG = {
  hero: "/brand/about/customers.webp",
  // Suzy Fix body & paint centre front (also in the Suzy Fix branch gallery, chosen by the client)
  service: "/brand/branches/suzy-fix/front.webp",
};

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา ผู้จัดจำหน่ายรถยนต์ในเครือ 6 แบรนด์ พร้อมศูนย์ซ่อมตัวถังและสี",
  description:
    "Maporn Autogroup (มาพรพาณิชย์) ผู้จัดจำหน่ายรถยนต์อย่างเป็นทางการในเครือ 6 แบรนด์ พร้อมศูนย์ซ่อมตัวถังและสีแบบมืออาชีพ ดำเนินธุรกิจมาตั้งแต่ปี 1988",
};

const VALUE_ICONS = [ShieldCheck, LayoutGrid, Wrench, Users];
// Body & paint leads the service list on this page
const DEPT_ORDER = [2, 0, 1, 3];
const DEPT_ICONS: Record<number, typeof Car> = { 0: Car, 1: PackageSearch, 2: PaintBucket, 3: Fuel };

const TEAM = [
  { name: "นางทิพย์รัตน์ โอภาสรังสรรค์", initial: "ท", role: "ประธานกรรมการบริหาร" },
  { name: "นายทวีศักดิ์ โอภาสรังสรรค์", initial: "ท", role: "กรรมการผู้จัดการ" },
];

// Lucide in this project has no Facebook/Instagram glyphs (same as MobileBottomNav).
function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 8.5h2V5.5h-2c-1.93 0-3.5 1.57-3.5 3.5v1.5H8.5v3H10.5V22h3v-8.5H15.83l.5-3H13.5V9c0-.28.22-.5.5-.5Z" />
    </svg>
  );
}
function LineIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3 0 .7 0 1l-.1 1c0 .3-.2 1.1 1 .6s6.4-3.8 8.8-6.5C22.5 13.7 22 12.4 22 11c0-4.4-4.5-8-10-8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF0000] ${center ? "justify-center" : ""}`}>
      <span className="h-px w-8 bg-brand-red" />
      {children}
      {center && <span className="h-px w-8 bg-brand-red" />}
    </p>
  );
}

function SectionTitle({ eyebrow, title, sub, center = false }: { eyebrow: string; title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-[2.6rem]">{title}</h2>
      {sub && <p className="mt-3 leading-relaxed text-white/60">{sub}</p>}
    </div>
  );
}

export default function AboutPage() {
  const years = new Date().getFullYear() - Number(company.foundedYear);
  // Client-set brand order: OMODA | JAECOO, GWM, Suzuki, Lepas, Wuling, Farizon
  const ORDER = ["omoda-jaecoo", "gwm", "suzuki", "lepas", "wuling", "farizon", "nex"];
  const groups = [...getBrandGroups()].sort((x, y) => (ORDER.indexOf(x.key) + 99) % 99 - (ORDER.indexOf(y.key) + 99) % 99);
  const brandCount = groups.length;
  const values = companyValues.map((v) => ({ ...v, description: v.description.replace(/\d+ แบรนด์/, `${brandCount} แบรนด์`) }));
  const standards = [
    `ผู้จัดจำหน่ายอย่างเป็นทางการ ${brandCount} แบรนด์`,
    `ดำเนินธุรกิจมากว่า ${years} ปี`,
    "ศูนย์ซ่อมสีและตัวถังมาตรฐาน Suzy Fix",
    "ศูนย์ติดตั้งแก๊ส LPG ได้รับใบอนุญาตกรมการขนส่งทางบก",
  ];
  const STATS = [
    { value: `${years}+`, label: "ปีแห่งความไว้วางใจ" },
    { value: String(brandCount), label: "แบรนด์ในเครือ" },
    { value: String(company.branchCount), label: "สาขาโชว์รูม" },
    { value: String(company.serviceCenterCount), label: "ศูนย์บริการ" },
  ];

  return (
    <div className="bg-[#0c0d0f] text-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-red/20 blur-[140px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-brand-red/10 blur-[120px]" />

        <div className="container-page relative grid items-center gap-14 pb-12 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 lg:pt-20">
          <ScrollFx effect="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/75 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              มาพร ออโต้ กรุ๊ป · ก่อตั้ง {company.foundedYear}
            </span>
            <h1 className="mt-6 text-[2.6rem] font-black leading-[1.08] tracking-tight sm:text-6xl">
              ผู้จัดจำหน่ายรถยนต์
              <br />
              ในเครือ <span className="bg-gradient-to-b from-[#FF0000] to-[#AD0000] bg-clip-text text-transparent">{brandCount} แบรนด์</span>
            </h1>
            <p className="mt-5 inline-flex items-center gap-3 text-lg font-semibold sm:text-xl">
              <span className="h-[3px] w-10 rounded-full bg-brand-red-gradient" />
              พร้อมศูนย์ซ่อมตัวถังและสีแบบมืออาชีพ
            </p>
            <p className="mt-5 max-w-lg leading-relaxed text-white/60">
              {company.legalName} ดูแลลูกค้ามากว่า {years} ปี ครบตั้งแต่การเลือกซื้อรถใหม่ ไฟแนนซ์ ศูนย์บริการ
              จนถึงงานซ่อมสีและตัวถังมาตรฐานโรงงาน
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/brands" className="inline-flex items-center gap-2 rounded-xl bg-brand-red-gradient px-6 py-3.5 text-sm font-bold shadow-[0_14px_34px_-12px_rgba(255,0,0,0.7)] transition-all hover:-translate-y-0.5 hover:brightness-110">
                แบรนด์ในเครือ <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/body-shop" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-white hover:text-[#0c0d0f]">
                ศูนย์ซ่อมตัวถังและสี
              </Link>
            </div>
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.1} className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -inset-3 rounded-[34px] bg-gradient-to-br from-brand-red/40 via-transparent to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
              <div className="relative aspect-[5/4]">
                <Image src={IMG.hero} alt="ลูกค้าเลือกชมรถในโชว์รูม Maporn Autogroup" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            </div>
            <div className="absolute -left-4 top-6 rounded-2xl border border-white/15 bg-[#0c0d0f]/80 px-5 py-4 shadow-xl backdrop-blur-xl sm:-left-8">
              <p className="text-3xl font-black leading-none">{years}+</p>
              <p className="mt-1 text-xs text-white/60">ปีแห่งความไว้วางใจ</p>
            </div>
            <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#0c0d0f]/85 py-3 pl-3 pr-5 shadow-xl backdrop-blur-xl sm:-right-6">
              <span className="flex h-11 items-center rounded-lg bg-white px-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logos/suzyfix.jpg" alt="Suzy Fix" className="h-7 w-auto" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">ศูนย์ซ่อมสีและตัวถัง</p>
                <p className="text-xs text-white/55">มาตรฐานโรงงาน</p>
              </div>
            </div>
          </ScrollFx>
        </div>

        <div className="container-page relative pb-16">
          <ScrollFx effect="fade-up" className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={`px-6 py-5 ${i % 2 ? "border-l border-white/10" : ""} ${i > 1 ? "border-t border-white/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
                <p className="text-3xl font-black tracking-tight">{s.value}</p>
                <p className="mt-0.5 text-sm text-white/55">{s.label}</p>
              </div>
            ))}
          </ScrollFx>
        </div>
      </section>

      {/* ================= BRANDS ================= */}
      <section className="border-t border-white/[0.06] bg-[#111215] py-16 sm:py-20">
        <div className="container-page">
          <SectionTitle center eyebrow="Our Brands" title={<>แบรนด์ในเครือ Maporn Autogroup</>} sub={`ตัวแทนจำหน่ายอย่างเป็นทางการ ${brandCount} แบรนด์ ครอบคลุมรถยนต์นั่ง รถเพื่อการพาณิชย์ และรถยนต์ไฟฟ้า`} />
          <ScrollFx effect="fade-up" stagger={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => {
              const logos = g.slugs.map((s) => getBrand(s)?.logo).filter(Boolean) as string[];
              return (
                <Link key={g.key} href={g.href} className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-[#17181c] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#1c1d22]">
                  <span className="flex h-20 w-32 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-3">
                    {logos.map((l) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={l} src={l} alt="" className={`w-auto object-contain ${logos.length > 1 ? "h-4 max-w-[52px]" : "h-8 max-w-[96px]"}`} />
                    ))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{g.name}</span>
                    <span className="mt-0.5 block truncate text-sm italic text-white/50">{g.tagline}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition-colors group-hover:text-[#FF0000]" />
                </Link>
              );
            })}
          </ScrollFx>
        </div>
      </section>

      {/* ================= STORY + VISION / MISSION ================= */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollFx effect="fade-up">
            <SectionTitle eyebrow="Our Story" title={<>{years} ปีบนเส้นทาง<br />แห่งความไว้วางใจ</>} />
            <p className="mt-6 leading-relaxed text-white/65">
              มาพรพาณิชย์เริ่มต้นธุรกิจตัวแทนจำหน่ายรถยนต์ในปี {company.foundedYear} และเติบโตเป็น Maporn Autogroup ในวันนี้
              เรารวมแบรนด์รถยนต์ชั้นนำไว้ในเครือเดียว พร้อมศูนย์บริการและศูนย์ซ่อมสีตัวถังที่ดูแลรถของคุณได้ครบในที่เดียว
            </p>
            <figure className="mt-8 border-l-2 border-brand-red pl-6">
              <blockquote className="text-2xl font-semibold leading-snug">&ldquo;{company.motto}&rdquo;</blockquote>
              <figcaption className="mt-4 flex items-center gap-4">
                <MapornLogo variant="white" className="h-7 w-auto" />
                <span className="text-sm text-white/50">{company.servicePhilosophy}</span>
              </figcaption>
            </figure>
          </ScrollFx>

          <div className="space-y-4">
            {[
              { icon: Eye, label: "Vision", title: "วิสัยทัศน์", lead: null as string | null, text: "เป็นเครือข่ายผู้จัดจำหน่ายรถยนต์ที่ดูแลลูกค้าทั่วประเทศ พร้อมศูนย์บริการในกรุงเทพฯ และภาคตะวันออก ที่ให้ความอุ่นใจตลอดการเป็นเจ้าของรถ ไม่ใช่แค่วันที่ซื้อ" },
              { icon: HeartHandshake, label: "Mission", title: "พันธกิจ", lead: "อุ่นใจเมื่อซื้อรถและใช้บริการกับมาพร", text: "มอบความอุ่นใจตั้งแต่วันแรกที่คุณเดินเข้ามา จนถึงทุกวันที่คุณใช้รถ ด้วยการดูแลลูกค้าด้วยใจตลอดทาง" },
            ].map(({ icon: Icon, ...c }, i) => (
              <ScrollFx key={c.title} effect="fade-up" delay={i * 0.08} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#17181c] to-[#111215] p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/15 text-[#FF0000]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">{c.label}</p>
                    <h3 className="text-lg font-bold">{c.title}</h3>
                  </div>
                </div>
                {c.lead && <p className="mt-4 font-semibold text-[#FF0000]">&ldquo;{c.lead}&rdquo;</p>}
                <p className="mt-3 text-sm leading-relaxed text-white/60">{c.text}</p>
              </ScrollFx>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BODY & PAINT ================= */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <ScrollFx effect="fade-up" className="grid overflow-hidden rounded-[28px] border border-white/10 bg-[#141518] lg:grid-cols-2">
            <div className="relative min-h-[300px] lg:min-h-full">
              <Image src={IMG.service} alt="ศูนย์บริการมาตรฐานซ่อมตัวถังและสี Suzy Fix" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[40%_50%]" />
            </div>
            <div className="p-7 sm:p-10">
              <Eyebrow>Body &amp; Paint · Full Service</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">ศูนย์ซ่อมตัวถังและสี<br />แบบมืออาชีพ</h2>
              <p className="mt-4 leading-relaxed text-white/60">
                ศูนย์ซ่อมสีและตัวถัง Suzy Fix งานมาตรฐานโรงงาน ทั้งเคลมประกันและงานเงินสด พร้อมศูนย์บริการสำหรับทุกแบรนด์ในเครือ
              </p>
              <ul className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {DEPT_ORDER.map((idx) => {
                  const s = serviceDepartments[idx];
                  const Icon = DEPT_ICONS[idx];
                  return (
                    <li key={s.title} className="flex gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#FF0000]" strokeWidth={1.8} />
                      <div>
                        <p className="font-semibold">{s.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-white/50">{s.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/body-shop" className="inline-flex items-center gap-2 rounded-xl bg-brand-red-gradient px-5 py-3 text-sm font-bold transition-all hover:brightness-110">
                  ดูงานซ่อมสีและตัวถัง <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/service/appointment" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#0c0d0f]">
                  นัดหมายเข้าศูนย์
                </Link>
              </div>
            </div>
          </ScrollFx>
        </div>
      </section>

      {/* ================= MILESTONES ================= */}
      <section className="border-y border-white/[0.06] bg-[#111215] py-16 sm:py-20">
        <div className="container-page">
          <SectionTitle center eyebrow="Milestones" title="เส้นทางการเติบโตของเรา" />
          <div className="relative mt-12">
            <div className="absolute left-0 right-0 top-[18px] hidden h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent lg:block" />
            <ol className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
              {companyTimeline.map((t) => (
                <li key={t.year} className="relative w-[72%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
                  <span className="relative z-10 mx-auto hidden h-9 w-9 items-center justify-center lg:flex">
                    <span className="absolute h-5 w-5 rounded-full bg-brand-red/25" />
                    <span className="h-3 w-3 rounded-full bg-brand-red ring-4 ring-[#111215]" />
                  </span>
                  <div className="h-full rounded-2xl border border-white/10 bg-[#17181c] p-5 lg:mt-4">
                    <p className="text-2xl font-black text-[#FF0000]">{t.year}</p>
                    <h3 className="mt-2 font-bold leading-snug">{t.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/55">{t.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-center text-xs text-white/40 lg:hidden">ปัดเพื่อดูปีถัดไป →</p>
          </div>
        </div>
      </section>

      {/* ================= WHY MAPORN + LEADERSHIP ================= */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionTitle center eyebrow="Why Maporn" title="ทำไมลูกค้าไว้วางใจมาพร" />
          <ScrollFx effect="fade-up" stagger={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div key={v.title} className="rounded-2xl border border-white/10 bg-[#141518] p-6 transition-colors hover:border-white/25">
                  <Icon className="h-6 w-6 text-[#FF0000]" strokeWidth={1.8} />
                  <h3 className="mt-5 font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{v.description}</p>
                </div>
              );
            })}
          </ScrollFx>

          <ScrollFx effect="fade-up" className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 rounded-2xl border border-white/10 px-6 py-5">
            {standards.map((s) => (
              <span key={s} className="inline-flex items-center gap-2 text-sm text-white/75">
                <Check className="h-4 w-4 text-[#FF0000]" strokeWidth={3} /> {s}
              </span>
            ))}
          </ScrollFx>

          <div className="mt-16 grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionTitle eyebrow="Leadership" title="ทีมผู้บริหาร" />
            <ScrollFx effect="fade-up" className="grid gap-4 sm:grid-cols-2">
              {TEAM.map((m) => (
                <div key={m.name} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#141518] p-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-red-gradient text-xl font-black shadow-[0_10px_24px_-8px_rgba(255,0,0,0.7)]">{m.initial}</span>
                  <div>
                    <p className="font-bold">{m.name}</p>
                    <p className="mt-0.5 text-sm text-white/50">{m.role}</p>
                  </div>
                </div>
              ))}
            </ScrollFx>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="pb-20">
        <div className="container-page">
          <ScrollFx effect="fade-up" className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#141518] px-7 py-10 sm:px-12 sm:py-12">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-red/25 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-brand-red/10 blur-[100px]" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <MapornLogo variant="white" className="h-9 w-auto" />
                <h2 className="mt-6 text-2xl font-extrabold leading-tight sm:text-3xl">พร้อมดูแลคุณตลอดเส้นทาง</h2>
                <p className="mt-2 text-white/60">ตั้งแต่เลือกรถคันแรก จนถึงงานซ่อมสีตัวถังและบริการหลังการขาย</p>
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-brand-red-gradient px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5 hover:brightness-110">
                    ติดต่อเรา <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={`tel:${company.phone.replace(/[^0-9]/g, "").slice(0, 9)}`} className="inline-flex items-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-white hover:text-[#0c0d0f]">
                    โทร {company.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { href: company.facebook, label: "Facebook", Icon: FacebookIcon },
                    { href: `https://line.me/ti/p/${company.line}`, label: "LINE", Icon: LineIcon },
                    { href: company.instagram, label: "Instagram", Icon: InstagramIcon },
                  ].map(({ href, label, Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollFx>
        </div>
      </section>
    </div>
  );
}
