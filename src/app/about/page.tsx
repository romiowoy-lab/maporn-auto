import type { Metadata } from "next";
import Link from "next/link";
import { Eye, HeartHandshake, ShieldCheck, LayoutGrid, Wrench, Users, UserRound, Car, PackageSearch, PaintBucket, Fuel } from "lucide-react";
import { company, companyTimeline, companyValues, serviceDepartments } from "@/lib/data/company";
import { brands } from "@/lib/data/brands";
import { getBrandGroups } from "@/lib/data/brandGroups";
import ScrollFx from "@/components/ui/ScrollFx";

// Small inline brand-mark icons — lucide-react in this project doesn't ship Facebook/
// Instagram glyphs (same reason MobileBottomNav.tsx hand-draws its own Facebook icon).
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

function DarkHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A5A]">
        <span className="h-px w-8 bg-brand-red" /> {eyebrow} <span className="h-px w-8 bg-brand-red" />
      </p>
      <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">{title}</h2>
    </div>
  );
}

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

export default function AboutPage() {
  return (
    <div>
      {/* ================= ABOUT HERO — split screen: dark story+motto+photo (left),
          white stats+vision+mission+social (right). Desktop 50/50, stacks on mobile. ================= */}
      <section className="grid lg:grid-cols-2">
        {/* LEFT — dark */}
        <div className="bg-brand-navy text-white px-6 sm:px-10 lg:px-14 py-14 sm:py-20 flex flex-col justify-center">
          <ScrollFx effect="fade-up">
            <p className="section-eyebrow-light mb-4">About Us</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-lg">
              เกี่ยวกับ {company.name}
            </h1>
            <p className="mt-5 max-w-md text-white/70 text-sm sm:text-base leading-relaxed">
              {company.legalName} ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ 7 แบรนด์ ดำเนินธุรกิจมาตั้งแต่ปี พ.ศ.{" "}
              {Number(company.foundedYear) + 543} ด้วยรถรุ่นแรก Suzuki Caribian จนถึงวันนี้กว่า{" "}
              {new Date().getFullYear() - Number(company.foundedYear)} ปี
            </p>
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.1} className="mt-10 pt-8 border-t border-white/15">
            <p className="text-white/45 text-xs font-semibold uppercase tracking-[0.3em] mb-3">Our Motto</p>
            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug max-w-md text-balance">
              &ldquo;{company.motto}&rdquo;
            </p>
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.15} className="mt-8 rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/branches/suzuki-maporn-showroom-exterior.webp"
              alt="โชว์รูม Maporn Autogroup"
              className="w-full aspect-[4/3] sm:aspect-[16/9] object-cover"
            />
          </ScrollFx>
        </div>

        {/* RIGHT — white */}
        <div className="bg-white px-6 sm:px-10 lg:px-14 py-14 sm:py-20 flex flex-col justify-center">
          <ScrollFx effect="fade-up" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Maporn.png" alt="Maporn" className="h-10 w-10 object-contain shrink-0" />
            <div className="leading-tight">
              <p className="font-black text-brand-navy text-lg">Maporn Auto Group</p>
              <p className="font-bold text-brand-red text-lg">มาพร ออโต้ กรุ๊ป</p>
            </div>
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.1} className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 text-center">
              <p className="text-4xl sm:text-5xl font-black text-brand-red">
                {new Date().getFullYear() - Number(company.foundedYear)}+
              </p>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-brand-slate">ปีแห่งประสบการณ์</p>
            </div>
            <div className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 text-center">
              <p className="text-4xl sm:text-5xl font-black text-brand-red">{getBrandGroups().length}</p>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-brand-slate">แบรนด์ชั้นนำ</p>
            </div>
          </ScrollFx>

          <div className="mt-6 space-y-4">
            <ScrollFx
              effect="fade-up"
              delay={0.15}
              className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 flex gap-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red/[0.08] text-brand-red">
                <Eye className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-bold text-brand-navy mb-1.5">วิสัยทัศน์ (Vision)</h2>
                <p className="text-brand-slate leading-relaxed text-sm">
                  มาพร ออโต้ กรุ๊ป มุ่งมั่นพัฒนาธุรกิจเพื่อเป็นเครือข่ายตัวแทนจำหน่ายรถยนต์ที่ดูแลลูกค้าทั่วประเทศ
                  พร้อมศูนย์บริการสำหรับในกรุงเทพฯและภาคตะวันออก (ระยอง จันทบุรี ตราด ชลบุรี)
                  ที่ให้ความอุ่นใจแก่ลูกค้าตลอดการเป็นเจ้าของรถ ไม่ใช่แค่วันที่ซื้อ
                </p>
              </div>
            </ScrollFx>

            <ScrollFx
              effect="fade-up"
              delay={0.2}
              className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 flex gap-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red/[0.08] text-brand-red">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-bold text-brand-navy mb-1.5">พันธกิจ (Mission)</h2>
                <p className="font-bold text-brand-red leading-snug mb-2 text-balance">
                  &ldquo;อุ่นใจเมื่อซื้อรถและใช้บริการกับมาพร&rdquo;
                </p>
                <p className="text-brand-slate leading-relaxed text-sm">
                  มาพร ออโต้ กรุ๊ป มอบความอุ่นใจให้ลูกค้าตั้งแต่วันแรกที่เดินเข้ามาหาเรา จนถึงทุกวันที่คุณใช้รถ
                  — เพราะเรามุ่งมั่นดูแลลูกค้าด้วยใจ เราพร้อมดูแลคุณต่อไปตลอดทาง
                </p>
              </div>
            </ScrollFx>
          </div>

          <div className="mt-10 pt-6 border-t border-black/[0.06] flex items-center justify-between">
            <p className="text-xs font-semibold text-brand-slate">Maporn Autogroup | มาพร ออโต้ กรุ๊ป</p>
            <div className="flex items-center gap-3">
              <a
                href={company.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-brand-slate transition-colors hover:text-brand-red"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={`https://line.me/ti/p/${company.line}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Line"
                className="text-brand-slate transition-colors hover:text-brand-red"
              >
                <LineIcon className="h-4 w-4" />
              </a>
              <a
                href={company.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-brand-slate transition-colors hover:text-brand-red"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STRENGTHS */}
      <section className="relative overflow-hidden bg-[#101113] py-16 sm:py-24">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-brand-red/[0.10] blur-[120px]" />
        <div className="container-page relative">
          <DarkHeading eyebrow="Our Strengths" title="จุดเด่นของบริษัท" />
          <ScrollFx effect="fade-up" stagger={0.1} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {companyValues.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div
                  key={v.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-red/50 hover:shadow-[0_18px_40px_rgba(223,0,0,0.15)]"
                >
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-red transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/15 text-[#FF5A5A] transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </ScrollFx>
        </div>
      </section>

      {/* FULL SERVICE */}
      <section className="relative overflow-hidden bg-[#15161A] py-16 sm:py-24">
        <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-[560px] rounded-full bg-brand-red/[0.12] blur-[130px]" />
        <div className="container-page relative">
          <DarkHeading eyebrow="Full Service" title="ศูนย์บริการครบวงจร" />
          <ScrollFx effect="fade-up" stagger={0.1} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceDepartments.map((s, i) => {
              const Icon = DEPT_ICONS[i % DEPT_ICONS.length];
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/10 bg-[#1C1E22] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:border-brand-red/50"
                >
                  <Icon className="h-9 w-9 text-[#FF5A5A]" strokeWidth={1.5} />
                  <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </ScrollFx>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-[#101113] py-16 sm:py-24">
        <div className="container-page">
          <DarkHeading eyebrow="Timeline" title="เส้นทางการเติบโตของเรา" />
          <div className="relative mx-auto mt-14 max-w-4xl">
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
                    <div
                      className={`rounded-2xl border border-white/10 bg-[#1C1E22] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:row-start-1 ${
                        left ? "md:col-start-1 md:text-right" : "md:col-start-3"
                      }`}
                    >
                      <span className="inline-block rounded-full bg-brand-red px-3 py-1 text-xs font-black tracking-wider text-white">{t.year}</span>
                      <h3 className="mt-3 text-lg font-bold text-white">{t.title}</h3>
                      <p className="mt-1.5 text-sm text-white/65 leading-relaxed">{t.description}</p>
                    </div>
                  </div>
                );
              })}
            </ScrollFx>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="relative overflow-hidden bg-[#15161A] py-16 sm:py-24">
        <div className="pointer-events-none absolute -top-20 right-1/4 h-64 w-[420px] rounded-full bg-brand-red/[0.08] blur-[110px]" />
        <div className="container-page relative">
          <DarkHeading eyebrow="Leadership" title="ทีมผู้บริหาร" />
          <ScrollFx effect="fade-up" stagger={0.1} className="mx-auto mt-12 grid max-w-2xl gap-5 sm:grid-cols-2">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-white/10 bg-[#1C1E22] p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:border-brand-red/40"
              >
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-[#8a0000] shadow-[0_10px_30px_rgba(223,0,0,0.3)] ring-4 ring-white/10">
                  <UserRound className="h-9 w-9 text-white" strokeWidth={1.5} />
                </span>
                <p className="mt-5 text-base font-bold text-white">{m.name}</p>
                <p className="mt-1 text-sm text-[#FF9A9A]">{m.role}</p>
              </div>
            ))}
          </ScrollFx>
        </div>
      </section>

      {/* STANDARDS + BRANDS */}
      <section className="bg-[#101113] py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <ScrollFx effect="fade-up">
            <h2 className="mb-6 text-xl sm:text-2xl font-bold text-white">มาตรฐานและความน่าเชื่อถือ</h2>
            <ul className="space-y-4">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#1C1E22] p-4 text-sm text-white/80 leading-relaxed">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5 text-[#FF5A5A]">
                      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </ScrollFx>
          <ScrollFx effect="fade-up" delay={0.1}>
            <h2 className="mb-6 text-xl sm:text-2xl font-bold text-white">บริษัทในเครือ / แบรนด์ที่จำหน่าย</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {brands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  title={b.name}
                  className="flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white px-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(223,0,0,0.25)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.logo} alt={b.name} className="h-7 w-auto max-w-[110px] object-contain" />
                </Link>
              ))}
            </div>
          </ScrollFx>
        </div>
      </section>
    </div>
  );
}
