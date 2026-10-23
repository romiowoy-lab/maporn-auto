import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Eye,
  HeartHandshake,
  ShieldCheck,
  LayoutGrid,
  Wrench,
  Users,
  UserRound,
  Car,
  PackageSearch,
  PaintBucket,
  Fuel,
  Quote,
  MapPin,
  Check,
} from "lucide-react";
import { company, companyTimeline, companyValues, serviceDepartments } from "@/lib/data/company";
import { brands } from "@/lib/data/brands";
import { getBrandGroups } from "@/lib/data/brandGroups";
import ScrollFx from "@/components/ui/ScrollFx";
import MapornLogo from "@/components/ui/MapornLogo";

// About page — dark premium layout matching the homepage, kept compact. It presents Maporn
// Autogroup as a multi-brand dealer group with a professional body & paint centre (Suzy Fix).
// Photos in public/brand/about/ are Maporn showroom pictures that no other page uses.
const IMG = {
  heroSuzuki: "/brand/about/hero-sriracha.webp",
  heroOmodaJaecoo: "/brand/about/omoda-jaecoo-exterior.webp",
  heroGwm: "/brand/about/team-wall.webp",
  customers: "/brand/about/customers.webp",
  hospitality: "/brand/about/hospitality.webp",
  technicians: "/brand/about/technicians.webp",
};

const DEALER_SIGNS = [
  { src: "/brand/about/sign-gwm.webp", alt: "GWM Maporn Lamlukka", href: "/branches/lamlukka", fit: "aspect-square max-w-[150px]" },
  { src: "/brand/about/sign-omoda-jaecoo.webp", alt: "OMODA | JAECOO Maporn Rayong", href: "/branches/rayong-omoda-jaecoo", fit: "aspect-[1600/325]" },
  { src: "/brand/about/sign-farizon.webp", alt: "Farizon Maporn Auto Tech", href: "/branches/srinakarin", fit: "aspect-square max-w-[150px]" },
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
      <path
        d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3 0 .7 0 1l-.1 1c0 .3-.2 1.1 1 .6s6.4-3.8 8.8-6.5C22.5 13.7 22 12.4 22 11c0-4.4-4.5-8-10-8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
  { name: "นางทิพย์รัตน์ โอภาสรังสรรค์", role: "ประธานกรรมการบริหาร" },
  { name: "นายทวีศักดิ์ โอภาสรังสรรค์", role: "กรรมการผู้จัดการ" },
];

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#FF0000] ${center ? "justify-center" : ""}`}>
      <span className="h-px w-8 bg-brand-red" />
      {children}
      {center && <span className="h-px w-8 bg-brand-red" />}
    </p>
  );
}

export default function AboutPage() {
  const years = new Date().getFullYear() - Number(company.foundedYear);
  const groups = getBrandGroups();
  const brandCount = groups.length;
  const brandNames = groups.map((g) => g.name).join(" · ");
  const values = companyValues.map((v) => ({ ...v, description: v.description.replace(/\d+ แบรนด์/, `${brandCount} แบรนด์`) }));
  const certifications = [
    `ผู้จัดจำหน่ายรถยนต์อย่างเป็นทางการในเครือ ${brandCount} แบรนด์`,
    `ดำเนินธุรกิจมาตั้งแต่ปี พ.ศ. ${Number(company.foundedYear) + 543} กว่า ${years} ปี`,
    "ศูนย์ซ่อมสีและตัวถังมาตรฐาน ภายใต้แบรนด์ Suzy Fix",
    "ศูนย์ติดตั้งแก๊ส LPG ที่ได้รับใบอนุญาตจากกรมการขนส่งทางบก",
  ];
  const STATS = [
    { value: `${years}+`, label: "ปีแห่งความไว้วางใจ" },
    { value: String(brandCount), label: "แบรนด์ในเครือ" },
    { value: String(company.branchCount), label: "สาขาโชว์รูม" },
    { value: String(company.serviceCenterCount), label: "ศูนย์บริการ" },
  ];

  return (
    <div className="bg-[#101113] text-white">
      {/* ================= HERO — three showrooms of the group side by side ================= */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 grid grid-cols-3">
          {[
            { src: IMG.heroSuzuki, alt: "โชว์รูม Suzuki Maporn ศรีราชา", pos: "50% 50%" },
            { src: IMG.heroOmodaJaecoo, alt: "โชว์รูม OMODA | JAECOO Maporn ระยอง", pos: "50% 45%" },
            { src: IMG.heroGwm, alt: "ทีมงาน GWM Maporn ลำลูกกา", pos: "50% 35%" },
          ].map((p) => (
            <div key={p.src} className="relative">
              <Image src={p.src} alt={p.alt} fill priority sizes="34vw" className="object-cover" style={{ objectPosition: p.pos }} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101113] via-[#101113]/85 to-[#101113]/45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101113] via-transparent to-[#101113]/50" />

        <div className="container-page flex min-h-[580px] flex-col justify-center py-16">
          <ScrollFx effect="fade-up" className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-brand-red/30 bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#FF0000] backdrop-blur-md">
              <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-brand-red" />
              About Maporn Autogroup
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl">
              ผู้จัดจำหน่ายรถยนต์
              <br />
              ในเครือ <span className="bg-gradient-to-b from-[#FF0000] to-[#AD0000] bg-clip-text text-transparent">{brandCount} แบรนด์</span>
            </h1>
            <p className="mt-4 text-lg font-semibold text-white sm:text-xl">
              พร้อม<span className="text-[#FF0000]">ศูนย์ซ่อมตัวถังและสี</span>แบบมืออาชีพ
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-white/70">
              {company.legalName} ดูแลลูกค้ามากว่า {years} ปี ทั้งการขายรถใหม่ ไฟแนนซ์ ศูนย์บริการ และงานซ่อมสีตัวถังมาตรฐาน
              ครอบคลุมกรุงเทพฯ ปริมณฑล และภาคตะวันออก
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/brands" className="inline-flex items-center gap-2 rounded-lg bg-brand-red-gradient px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(255,0,0,0.6)] transition-all hover:-translate-y-0.5 hover:brightness-110">
                ดูแบรนด์ในเครือ <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/service#suzy-fix" className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#101113]">
                ศูนย์ซ่อมตัวถังและสี
              </Link>
            </div>
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.15} className="mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl sm:p-5">
                <p className="text-3xl font-black tracking-tight sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-white/60 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </ScrollFx>
        </div>
      </section>

      {/* ================= STORY + MOTTO + VISION/MISSION ================= */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="pointer-events-none absolute -left-40 top-10 h-80 w-[520px] rounded-full bg-brand-red/[0.08] blur-[130px]" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
          <ScrollFx effect="fade-up">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              หนึ่งเครือ {brandCount} แบรนด์
              <br />
              ดูแลครบตั้งแต่ซื้อจนซ่อม
            </h2>
            <p className="mt-5 leading-relaxed text-white/70">
              มาพรพาณิชย์เริ่มต้นธุรกิจตัวแทนจำหน่ายรถยนต์ในปี {company.foundedYear} และเติบโตเป็น Maporn Autogroup
              ผู้จัดจำหน่ายรถยนต์ในเครือ {brandCount} แบรนด์ ได้แก่ {brandNames} ครอบคลุมรถยนต์นั่ง รถเพื่อการพาณิชย์ และรถยนต์ไฟฟ้า
              พร้อมศูนย์ซ่อมสีและตัวถัง Suzy Fix ที่ดูแลรถของคุณได้ครบในที่เดียว
            </p>

            <div className="relative mt-8 rounded-2xl border border-white/10 bg-[#1C1E22] p-6">
              <Quote className="absolute -top-4 left-6 h-8 w-8 rounded-lg bg-brand-red-gradient p-1.5 text-white" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">Our Motto</p>
              <p className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">&ldquo;{company.motto}&rdquo;</p>
              <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4">
                <MapornLogo variant="white" className="h-7 w-auto" />
                <span className="text-sm text-white/55">{company.servicePhilosophy}</span>
              </div>
            </div>
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.1} className="relative pb-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <Image src={IMG.customers} alt="ลูกค้าชมรถในโชว์รูม Maporn" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold backdrop-blur-md">ประสบการณ์ในโชว์รูม</span>
            </div>
            <div className="absolute -bottom-1 right-0 w-1/2 overflow-hidden rounded-2xl border-4 border-[#101113] shadow-[0_20px_50px_rgba(0,0,0,0.6)] sm:right-[-1rem]">
              <div className="relative aspect-[4/3]">
                <Image src={IMG.hospitality} alt="ทีมงานต้อนรับพร้อมเครื่องดื่มและของว่าง" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <p className="bg-brand-red-gradient px-4 py-2 text-xs font-bold">บริการด้วยใจ ทุกครั้งที่มาเยือน</p>
            </div>
          </ScrollFx>
        </div>

        <div className="container-page relative mt-12 grid gap-5 md:grid-cols-2">
          {[
            {
              icon: Eye,
              eyebrow: "Vision",
              title: "วิสัยทัศน์",
              lead: null as string | null,
              text: "เป็นเครือข่ายผู้จัดจำหน่ายรถยนต์ที่ดูแลลูกค้าทั่วประเทศ พร้อมศูนย์บริการในกรุงเทพฯ และภาคตะวันออก (ระยอง จันทบุรี ตราด ชลบุรี) ที่ให้ความอุ่นใจตลอดการเป็นเจ้าของรถ ไม่ใช่แค่วันที่ซื้อ",
            },
            {
              icon: HeartHandshake,
              eyebrow: "Mission",
              title: "พันธกิจ",
              lead: "อุ่นใจเมื่อซื้อรถและใช้บริการกับมาพร",
              text: "มอบความอุ่นใจตั้งแต่วันแรกที่คุณเดินเข้ามา จนถึงทุกวันที่คุณใช้รถ ด้วยการดูแลลูกค้าด้วยใจ ตลอดทาง",
            },
          ].map(({ icon: Icon, ...c }, i) => (
            <ScrollFx key={c.title} effect="fade-up" delay={i * 0.1} className="relative flex gap-5 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1f2125] to-[#141518] p-6">
              <span className="absolute inset-x-0 top-0 h-1 bg-brand-red-gradient" />
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/15 text-[#FF0000]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/45">{c.eyebrow}</p>
                <h2 className="text-xl font-extrabold">{c.title}</h2>
                {c.lead && <p className="mt-2 font-bold text-[#FF0000]">&ldquo;{c.lead}&rdquo;</p>}
                <p className="mt-2 text-sm leading-relaxed text-white/70">{c.text}</p>
              </div>
            </ScrollFx>
          ))}
        </div>
      </section>

      {/* ================= BODY & PAINT + FULL SERVICE ================= */}
      <section className="bg-[#15161A] py-14 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollFx effect="fade-up" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] lg:aspect-square">
              <Image src={IMG.technicians} alt="ทีมช่างผู้ชำนาญการในศูนย์บริการ" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 to-transparent p-5 pt-20">
                <div>
                  <p className="text-sm text-white/70">ศูนย์บริการมาตรฐาน</p>
                  <p className="text-lg font-bold">ช่างผู้ชำนาญการทุกแบรนด์</p>
                </div>
                <span className="flex h-12 shrink-0 items-center rounded-lg bg-white px-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/logos/suzyfix.jpg" alt="Suzy Fix" className="h-8 w-auto object-contain" />
                </span>
              </div>
            </div>
          </ScrollFx>
          <div>
            <ScrollFx effect="fade-up">
              <Eyebrow>Body &amp; Paint · Full Service</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">ศูนย์ซ่อมตัวถังและสีแบบมืออาชีพ</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-white/65">
                ศูนย์ซ่อมสีและตัวถัง Suzy Fix งานมาตรฐานโรงงาน ทั้งเคลมประกันและงานเงินสด พร้อมศูนย์บริการครบวงจรสำหรับทุกแบรนด์ในเครือ
              </p>
            </ScrollFx>
            <ScrollFx effect="fade-up" stagger={0.08} className="mt-6 grid gap-3 sm:grid-cols-2">
              {DEPT_ORDER.map((idx, i) => {
                const s = serviceDepartments[idx];
                const Icon = DEPT_ICONS[idx];
                const featured = i === 0;
                return (
                  <div
                    key={s.title}
                    className={`flex gap-4 rounded-2xl border p-5 transition-colors ${featured ? "border-brand-red/50 bg-brand-red/[0.08] sm:col-span-2" : "border-white/10 bg-[#1C1E22] hover:border-brand-red/40"}`}
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${featured ? "bg-brand-red-gradient text-white" : "bg-brand-red/15 text-[#FF0000]"}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="font-bold">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">{s.description}</p>
                    </div>
                  </div>
                );
              })}
            </ScrollFx>
            <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold">
              <Link href="/body-shop" className="inline-flex items-center gap-2 text-[#FF0000] hover:text-white">
                ดูงานซ่อมสีและตัวถัง <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/service/appointment" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
                นัดหมายเข้าศูนย์บริการ <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY + TIMELINE (horizontal, compact) ================= */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-brand-red/[0.10] blur-[120px]" />
        <div className="container-page relative">
          <div className="text-center">
            <Eyebrow center>Why Maporn</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">จุดเด่นของเรา</h2>
          </div>
          <ScrollFx effect="fade-up" stagger={0.08} className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div key={v.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/50 sm:p-6">
                  <span className="absolute right-4 top-3 text-3xl font-black text-white/[0.06]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/15 text-[#FF0000] transition-colors group-hover:bg-brand-red group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 font-bold">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{v.description}</p>
                </div>
              );
            })}
          </ScrollFx>

          <div className="mt-16 text-center">
            <Eyebrow center>Milestones</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">เส้นทางการเติบโตของเรา</h2>
          </div>
          {/* One row on desktop; swipeable strip on phones/tablets */}
          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-[18px] hidden h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent lg:block" />
            <ol className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
              {companyTimeline.map((t) => (
                <li key={t.year} className="relative w-[72%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
                  <span className="relative z-10 mx-auto hidden h-9 w-9 items-center justify-center lg:flex">
                    <span className="absolute h-5 w-5 rounded-full bg-brand-red/25" />
                    <span className="h-3 w-3 rounded-full bg-brand-red ring-4 ring-[#101113]" />
                  </span>
                  <div className="h-full rounded-2xl border border-white/10 bg-[#1C1E22] p-5 lg:mt-4">
                    <span className="inline-block rounded-full bg-brand-red-gradient px-3 py-1 text-xs font-black tracking-wider">{t.year}</span>
                    <h3 className="mt-3 font-bold leading-snug">{t.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/60">{t.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-center text-xs text-white/40 lg:hidden">ปัดเพื่อดูปีถัดไป →</p>
          </div>
        </div>
      </section>

      {/* ================= NETWORK ================= */}
      <section className="relative overflow-hidden bg-[#15161A] py-14 sm:py-20">
        <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-[560px] rounded-full bg-brand-red/[0.10] blur-[130px]" />
        <div className="container-page relative">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow>Our Network</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">เครือข่ายโชว์รูมและแบรนด์ในเครือ</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-white/65">
                {brandCount} แบรนด์ · {company.branchCount} สาขาโชว์รูม · {company.serviceCenterCount} ศูนย์บริการ ในกรุงเทพฯ ปทุมธานี ชลบุรี และระยอง
              </p>
            </div>
            <Link href="/branches" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-bold transition-colors hover:border-white hover:bg-white hover:text-[#101113]">
              <MapPin className="h-4 w-4" /> ดูแผนที่ทุกสาขา
            </Link>
          </div>

          <ScrollFx effect="fade-up" stagger={0.08} className="mt-8 grid gap-3 md:grid-cols-[1fr_2.2fr_1fr]">
            {DEALER_SIGNS.map((s) => (
              <Link key={s.alt} href={s.href} className="group flex items-center justify-center rounded-2xl border border-white/10 bg-[#0b0c0e] p-4 transition-all hover:-translate-y-1 hover:border-brand-red/50">
                <div className={`relative w-full ${s.fit}`}>
                  <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>
            ))}
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.1} className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                title={b.name}
                className="flex h-14 items-center justify-center rounded-xl bg-white px-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,0,0,0.25)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.logo} alt={b.name} className="h-6 w-auto max-w-[90px] object-contain" />
              </Link>
            ))}
          </ScrollFx>
        </div>
      </section>

      {/* ================= LEADERSHIP + STANDARDS + CONTACT ================= */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <ScrollFx effect="fade-up">
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">ทีมผู้บริหาร</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {TEAM.map((m) => (
                <div key={m.name} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#1C1E22] p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red-gradient">
                    <UserRound className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{m.name}</p>
                    <p className="mt-0.5 text-xs text-white/55">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollFx>
          <ScrollFx effect="fade-up" delay={0.1}>
            <Eyebrow>Trust &amp; Standards</Eyebrow>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">มาตรฐานและความน่าเชื่อถือ</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#1C1E22] p-4 text-sm leading-relaxed text-white/80">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red-gradient">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </ScrollFx>
        </div>

        <ScrollFx effect="fade-up" className="container-page mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-brand-red-gradient p-7 sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">ทีมงานมาพร พร้อมดูแลคุณตลอดเส้นทาง</h2>
                <p className="mt-2 text-white/85">ตั้งแต่เลือกรถคันแรก จนถึงงานซ่อมสีตัวถังและบริการหลังการขาย</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-[#AD0000] transition-transform hover:-translate-y-0.5">
                  ติดต่อเรา <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:${company.phone.replace(/[^0-9]/g, "").slice(0, 9)}`} className="inline-flex items-center rounded-lg border border-white/50 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-white hover:text-[#AD0000]">
                  โทร {company.phone}
                </a>
                <div className="flex items-center gap-2">
                  <a href={company.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-[#AD0000]">
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                  <a href={`https://line.me/ti/p/${company.line}`} target="_blank" rel="noreferrer" aria-label="LINE" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-[#AD0000]">
                    <LineIcon className="h-4 w-4" />
                  </a>
                  <a href={company.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-[#AD0000]">
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollFx>
      </section>
    </div>
  );
}
