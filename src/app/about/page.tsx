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
import ScrollFx from "@/components/ui/ScrollFx";
import MapornLogo from "@/components/ui/MapornLogo";

// About page — dark premium layout matching the homepage. Photos in public/brand/about/ are
// Maporn's own showroom pictures that no other page uses.
const IMG = {
  hero: "/brand/about/hero-sriracha.webp",
  customers: "/brand/about/customers.webp",
  hospitality: "/brand/about/hospitality.webp",
  technicians: "/brand/about/technicians.webp",
  team: "/brand/about/team-wall.webp",
};

const DEALER_SIGNS = [
  { src: "/brand/about/sign-gwm.webp", alt: "GWM Maporn Lamlukka", href: "/branches/lamlukka", fit: "aspect-square" },
  { src: "/brand/about/sign-omoda-jaecoo.webp", alt: "OMODA | JAECOO Maporn Rayong", href: "/branches/rayong-omoda-jaecoo", fit: "aspect-[1600/325]" },
  { src: "/brand/about/sign-farizon.webp", alt: "Farizon Maporn Auto Tech", href: "/branches/srinakarin", fit: "aspect-square" },
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
  title: "เกี่ยวกับเรา ตัวแทนจำหน่ายรถยนต์ก่อตั้งปี 1988",
  description: "Maporn Autogroup (มาพรพาณิชย์) ตัวแทนจำหน่ายรถยนต์ 7 แบรนด์ ก่อตั้งปี 1988 ทำความรู้จักประวัติ ปรัชญาการบริการ และศูนย์บริการครบวงจร",
};

const VALUE_ICONS = [ShieldCheck, LayoutGrid, Wrench, Users];
const DEPT_ICONS = [Car, PackageSearch, PaintBucket, Fuel];

const TEAM = [
  { name: "นางทิพย์รัตน์ โอภาสรังสรรค์", role: "ประธานกรรมการบริหาร" },
  { name: "นายทวีศักดิ์ โอภาสรังสรรค์", role: "กรรมการผู้จัดการ" },
];

const CERTIFICATIONS = [
  "ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการครบทั้ง 7 แบรนด์",
  "ดำเนินธุรกิจตัวแทนจำหน่ายรถยนต์มาตั้งแต่ปี พ.ศ. 2531 กว่า 38 ปี",
  "ศูนย์ติดตั้งแก๊ส LPG ที่ได้รับใบอนุญาตจากกรมการขนส่งทางบก",
  "ศูนย์บริการครบวงจร ทั้งซ่อมบำรุง ซ่อมสีและตัวถัง พร้อมศูนย์อะไหล่แท้",
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
  const STATS = [
    { value: `${years}+`, label: "ปีแห่งความไว้วางใจ" },
    { value: String(brands.length), label: "แบรนด์ชั้นนำ" },
    { value: String(company.branchCount), label: "สาขาโชว์รูม" },
    { value: String(company.serviceCenterCount), label: "ศูนย์บริการ" },
  ];

  return (
    <div className="bg-[#101113] text-white">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden">
        <Image src={IMG.hero} alt="โชว์รูม Suzuki Maporn ศรีราชา" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101113] via-[#101113]/85 to-[#101113]/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101113] via-transparent to-[#101113]/40" />

        <div className="container-page flex min-h-[640px] flex-col justify-center py-20 sm:min-h-[720px]">
          <ScrollFx effect="fade-up" className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-brand-red/30 bg-brand-red/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#FF0000] backdrop-blur-md">
              <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-brand-red" />
              About Maporn Auto Group
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-b from-[#FF0000] to-[#AD0000] bg-clip-text text-transparent">{years} ปี</span>
              <br />
              แห่งความไว้วางใจ
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {company.legalName} ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ {brands.length} แบรนด์ เริ่มต้นตั้งแต่ปี พ.ศ.{" "}
              {Number(company.foundedYear) + 543} ด้วยรถรุ่นแรก Suzuki Caribian จนวันนี้ดูแลลูกค้าทั้งกรุงเทพฯ ปริมณฑล และภาคตะวันออก
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/branches" className="inline-flex items-center gap-2 rounded-lg bg-brand-red-gradient px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(255,0,0,0.6)] transition-all hover:-translate-y-0.5 hover:brightness-110">
                ดูโชว์รูมทุกสาขา <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#101113]">
                ติดต่อเรา
              </Link>
            </div>
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.15} className="mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <p className="text-3xl font-black tracking-tight text-white sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-white/60 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </ScrollFx>
        </div>
      </section>

      {/* ================= STORY + MOTTO ================= */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-[520px] rounded-full bg-brand-red/[0.08] blur-[130px]" />
        <div className="container-page relative grid items-center gap-14 lg:grid-cols-2">
          <ScrollFx effect="fade-up">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              จาก Suzuki Caribian
              <br />
              สู่ {brands.length} แบรนด์ชั้นนำ
            </h2>
            <p className="mt-6 leading-relaxed text-white/70">
              มาพรพาณิชย์เริ่มต้นจากตัวแทนจำหน่ายรถยนต์ซูซูกิในปี {company.foundedYear} และเติบโตมาพร้อมกับลูกค้าตลอด {years} ปี
              วันนี้เรารวมแบรนด์รถยนต์ชั้นนำ ทั้งรถยนต์นั่ง รถเพื่อการพาณิชย์ และรถยนต์ไฟฟ้า ไว้ภายใต้เครือเดียว
              พร้อมศูนย์บริการที่ดูแลรถของคุณได้ครบทุกขั้นตอน
            </p>

            <div className="relative mt-10 rounded-2xl border border-white/10 bg-[#1C1E22] p-7">
              <Quote className="absolute -top-4 left-6 h-8 w-8 rounded-lg bg-brand-red-gradient p-1.5 text-white" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">Our Motto</p>
              <p className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">&ldquo;{company.motto}&rdquo;</p>
              <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                <MapornLogo variant="white" className="h-8 w-auto" />
                <span className="text-sm text-white/55">{company.servicePhilosophy}</span>
              </div>
            </div>
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.1} className="relative pb-16 sm:pb-20">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <Image src={IMG.customers} alt="ลูกค้าชมรถในโชว์รูม Maporn" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold backdrop-blur-md">ประสบการณ์ในโชว์รูม</span>
            </div>
            <div className="absolute -bottom-2 right-0 w-1/2 overflow-hidden rounded-2xl border-4 border-[#101113] shadow-[0_20px_50px_rgba(0,0,0,0.6)] sm:right-[-1rem]">
              <div className="relative aspect-[4/3]">
                <Image src={IMG.hospitality} alt="ทีมงานต้อนรับพร้อมเครื่องดื่มและของว่าง" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <p className="bg-brand-red-gradient px-4 py-2 text-xs font-bold">บริการด้วยใจ ทุกครั้งที่มาเยือน</p>
            </div>
          </ScrollFx>
        </div>
      </section>

      {/* ================= VISION + MISSION ================= */}
      <section className="bg-[#15161A] py-20 sm:py-24">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          {[
            {
              icon: Eye,
              eyebrow: "Vision",
              title: "วิสัยทัศน์",
              lead: null as string | null,
              text: "มาพร ออโต้ กรุ๊ป มุ่งมั่นพัฒนาธุรกิจเพื่อเป็นเครือข่ายตัวแทนจำหน่ายรถยนต์ที่ดูแลลูกค้าทั่วประเทศ พร้อมศูนย์บริการสำหรับในกรุงเทพฯและภาคตะวันออก (ระยอง จันทบุรี ตราด ชลบุรี) ที่ให้ความอุ่นใจแก่ลูกค้าตลอดการเป็นเจ้าของรถ ไม่ใช่แค่วันที่ซื้อ",
            },
            {
              icon: HeartHandshake,
              eyebrow: "Mission",
              title: "พันธกิจ",
              lead: "อุ่นใจเมื่อซื้อรถและใช้บริการกับมาพร",
              text: "มาพร ออโต้ กรุ๊ป มอบความอุ่นใจให้ลูกค้าตั้งแต่วันแรกที่เดินเข้ามาหาเรา จนถึงทุกวันที่คุณใช้รถ — เพราะเรามุ่งมั่นดูแลลูกค้าด้วยใจ เราพร้อมดูแลคุณต่อไปตลอดทาง",
            },
          ].map(({ icon: Icon, ...c }, i) => (
            <ScrollFx key={c.title} effect="fade-up" delay={i * 0.1} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1f2125] to-[#141518] p-8 sm:p-10">
              <span className="absolute inset-x-0 top-0 h-1 bg-brand-red-gradient" />
              <span className="pointer-events-none absolute -right-6 -top-10 text-[9rem] font-black leading-none text-white/[0.03]">{c.eyebrow}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/15 text-[#FF0000]">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-white/45">{c.eyebrow}</p>
              <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">{c.title}</h2>
              {c.lead && <p className="mt-4 text-lg font-bold text-[#FF0000]">&ldquo;{c.lead}&rdquo;</p>}
              <p className="mt-4 leading-relaxed text-white/70">{c.text}</p>
            </ScrollFx>
          ))}
        </div>
      </section>

      {/* ================= STRENGTHS ================= */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-brand-red/[0.10] blur-[120px]" />
        <div className="container-page relative">
          <div className="text-center">
            <Eyebrow center>Why Maporn</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">จุดเด่นของเรา</h2>
          </div>
          <ScrollFx effect="fade-up" stagger={0.1} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div
                  key={v.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-red/50 hover:shadow-[0_18px_40px_rgba(255,0,0,0.15)]"
                >
                  <span className="absolute right-5 top-4 text-4xl font-black text-white/[0.06]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-red-gradient transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/15 text-[#FF0000] transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{v.description}</p>
                </div>
              );
            })}
          </ScrollFx>
        </div>
      </section>

      {/* ================= FULL SERVICE ================= */}
      <section className="bg-[#15161A] py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollFx effect="fade-up" className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <Image src={IMG.technicians} alt="ทีมช่างผู้ชำนาญการในศูนย์บริการ" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6 pt-20">
                <p className="text-sm font-semibold text-white/70">ศูนย์บริการมาตรฐาน</p>
                <p className="text-xl font-bold">ช่างผู้ชำนาญการจากทุกแบรนด์</p>
              </div>
            </div>
          </ScrollFx>
          <div>
            <ScrollFx effect="fade-up">
              <Eyebrow>Full Service</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">ศูนย์บริการครบวงจร</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-white/65">ดูแลรถของคุณตั้งแต่วันที่ออกจากโชว์รูม ด้วยบริการหลังการขายที่ครบในที่เดียว</p>
            </ScrollFx>
            <ScrollFx effect="fade-up" stagger={0.08} className="mt-8 space-y-3">
              {serviceDepartments.map((s, i) => {
                const Icon = DEPT_ICONS[i % DEPT_ICONS.length];
                return (
                  <div key={s.title} className="flex gap-4 rounded-2xl border border-white/10 bg-[#1C1E22] p-5 transition-colors hover:border-brand-red/40">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/15 text-[#FF0000]">
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
            <Link href="/service/appointment" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#FF0000] hover:text-white">
              นัดหมายเข้าศูนย์บริการ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="text-center">
            <Eyebrow center>Milestones</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">เส้นทางการเติบโตของเรา</h2>
          </div>
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-brand-red/70 via-brand-red/30 to-transparent md:left-1/2" />
            <ScrollFx effect="fade-up" stagger={0.12} className="space-y-8 md:space-y-10">
              {companyTimeline.map((t, i) => {
                const left = i % 2 === 0;
                return (
                  <div key={t.year} className="relative grid grid-cols-[40px_1fr] gap-4 md:grid-cols-[1fr_40px_1fr] md:gap-8">
                    <span className="relative z-10 mt-5 flex h-10 w-10 items-center justify-center md:col-start-2 md:row-start-1">
                      <span className="absolute h-5 w-5 rounded-full bg-brand-red/25" />
                      <span className="h-3 w-3 rounded-full bg-brand-red ring-4 ring-[#101113]" />
                    </span>
                    <div className={`rounded-2xl border border-white/10 bg-[#1C1E22] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:row-start-1 ${left ? "md:col-start-1 md:text-right" : "md:col-start-3"}`}>
                      <span className="inline-block rounded-full bg-brand-red-gradient px-3 py-1 text-xs font-black tracking-wider text-white">{t.year}</span>
                      <h3 className="mt-3 text-lg font-bold">{t.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/65">{t.description}</p>
                    </div>
                  </div>
                );
              })}
            </ScrollFx>
          </div>
        </div>
      </section>

      {/* ================= NETWORK: dealer signs + brands ================= */}
      <section className="relative overflow-hidden bg-[#15161A] py-20 sm:py-28">
        <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-[560px] rounded-full bg-brand-red/[0.10] blur-[130px]" />
        <div className="container-page relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Our Network</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">เครือข่ายโชว์รูมและแบรนด์</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-white/65">
                {company.branchCount} สาขาโชว์รูม และ {company.serviceCenterCount} ศูนย์บริการ ในกรุงเทพฯ ปทุมธานี ชลบุรี และระยอง
              </p>
            </div>
            <Link href="/branches" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-bold transition-colors hover:border-white hover:bg-white hover:text-[#101113]">
              <MapPin className="h-4 w-4" /> ดูแผนที่ทุกสาขา
            </Link>
          </div>

          <ScrollFx effect="fade-up" stagger={0.1} className="mt-12 grid gap-4 md:grid-cols-[1fr_2fr_1fr]">
            {DEALER_SIGNS.map((s) => (
              <Link key={s.alt} href={s.href} className="group flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c0e] p-4 transition-all hover:-translate-y-1 hover:border-brand-red/50">
                <div className={`relative w-full ${s.fit} ${s.fit === "aspect-square" ? "max-w-[220px]" : ""}`}>
                  <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>
            ))}
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.1} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                title={b.name}
                className="flex h-16 items-center justify-center rounded-xl bg-white px-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,0,0,0.25)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.logo} alt={b.name} className="h-7 w-auto max-w-[100px] object-contain" />
              </Link>
            ))}
          </ScrollFx>
        </div>
      </section>

      {/* ================= LEADERSHIP + STANDARDS ================= */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <ScrollFx effect="fade-up">
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">ทีมผู้บริหาร</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {TEAM.map((m) => (
                <div key={m.name} className="rounded-2xl border border-white/10 bg-[#1C1E22] p-6 transition-colors hover:border-brand-red/40">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red-gradient shadow-[0_10px_30px_rgba(255,0,0,0.3)]">
                    <UserRound className="h-7 w-7 text-white" strokeWidth={1.5} />
                  </span>
                  <p className="mt-5 font-bold">{m.name}</p>
                  <p className="mt-1 text-sm text-white/55">{m.role}</p>
                </div>
              ))}
            </div>
          </ScrollFx>
          <ScrollFx effect="fade-up" delay={0.1}>
            <Eyebrow>Trust &amp; Standards</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">มาตรฐานและความน่าเชื่อถือ</h2>
            <ul className="mt-8 space-y-3">
              {CERTIFICATIONS.map((c) => (
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
      </section>

      {/* ================= CTA ================= */}
      <section className="relative isolate overflow-hidden">
        <Image src={IMG.team} alt="ทีมงาน Maporn Autogroup" fill sizes="100vw" className="-z-20 object-cover object-[50%_30%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101113] via-[#101113]/80 to-[#101113]/40" />
        <div className="container-page flex min-h-[460px] flex-col justify-center py-16">
          <ScrollFx effect="fade-up" className="max-w-xl">
            <Eyebrow>Our People</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">ทีมงานมาพร พร้อมดูแลคุณตลอดเส้นทาง</h2>
            <p className="mt-4 leading-relaxed text-white/75">ที่ปรึกษาการขายและทีมช่างของเรายินดีให้คำแนะนำ ตั้งแต่เลือกรถคันแรกจนถึงการดูแลหลังการขาย</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-brand-red-gradient px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:brightness-110">
                ติดต่อเรา <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${company.phone.replace(/[^0-9]/g, "").slice(0, 9)}`} className="inline-flex items-center rounded-lg border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-bold backdrop-blur-md transition-colors hover:bg-white hover:text-[#101113]">
                โทร {company.phone}
              </a>
              <div className="ml-1 flex items-center gap-2">
                <a href={company.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-brand-red hover:bg-brand-red">
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a href={`https://line.me/ti/p/${company.line}`} target="_blank" rel="noreferrer" aria-label="LINE" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-brand-red hover:bg-brand-red">
                  <LineIcon className="h-4 w-4" />
                </a>
                <a href={company.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-brand-red hover:bg-brand-red">
                  <InstagramIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </ScrollFx>
        </div>
      </section>
    </div>
  );
}
