import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Eye, HeartHandshake } from "lucide-react";
import { company, companyTimeline } from "@/lib/data/company";
import { telHref } from "@/lib/utils";
import { getBrand } from "@/lib/data/brands";
import { getBrandGroups } from "@/lib/data/brandGroups";
import ScrollFx from "@/components/ui/ScrollFx";
import MapornLogo from "@/components/ui/MapornLogo";

// About page — premium dark layout. Typography and spacing carry the design; photos are few,
// framed rather than darkened. Photos in public/brand/about/ are not used on any other page.
const IMG = {
  hero: "/brand/about/customers.webp",
};

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา ผู้จัดจำหน่ายรถยนต์ในเครือ 7 แบรนด์ พร้อมศูนย์ซ่อมตัวถังและสี",
  description:
    "Maporn Auto Group (มาพร ออโต้ กรุ๊ป) ผู้แทนจำหน่ายรถยนต์มากถึง 7 แบรนด์ พร้อมศูนย์บริการครบวงจร (เช็คระยะ ซ่อมสีและตัวถัง) ให้บริการในธุรกิจนี้มานานถึงกว่า 40 ปี",
};


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

// Glowing red milestone dot (Brand Book "Our History" style): soft halo around a bright core.
function GlowDot() {
  return (
    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center" aria-hidden>
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,0,0,0.75)_0%,rgba(255,0,0,0.35)_40%,rgba(255,0,0,0)_70%)] blur-[2px]" />
      <span className="h-4 w-4 rounded-full bg-brand-red shadow-[0_0_18px_6px_rgba(255,0,0,0.65)]" />
    </span>
  );
}

function SectionTitle({ title, sub, center = false }: { title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-[2.6rem]">{title}</h2>
      {sub && <p className="mt-3 leading-relaxed text-white/60">{sub}</p>}
    </div>
  );
}

export default function AboutPage() {
  // Client-set brand order: OJ, GWM, Suzuki, Lepas, Wuling, Farizon
  const ORDER = ["omoda-jaecoo", "gwm", "suzuki", "lepas", "wuling", "farizon"];
  const groups = [...getBrandGroups()].sort((x, y) => (ORDER.indexOf(x.key) + 99) % 99 - (ORDER.indexOf(y.key) + 99) % 99);
  // Count OMODA and JAECOO as two brands (7 total, per the client brief).
  const brandCount = groups.reduce((n, g) => n + g.slugs.length, 0);
  const STATS = [
    { value: "กว่า 40 ปี", label: "แห่งความไว้วางใจ" },
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
            <h1 className="text-[2.6rem] font-black leading-[1.08] tracking-tight sm:text-6xl">
              ผู้จัดจำหน่ายรถยนต์
              <br />
              ในเครือ <span className="bg-gradient-to-b from-[#FF0000] to-[#AD0000] bg-clip-text text-transparent">{brandCount} แบรนด์</span>
            </h1>
            <p className="mt-5 inline-flex items-center gap-3 text-lg font-semibold sm:text-xl">
              <span className="h-[3px] w-10 rounded-full bg-brand-red-gradient" />
              พร้อมศูนย์ซ่อมตัวถังและสีแบบมืออาชีพ
            </p>
            <div className="mt-6 max-w-lg">
              <p className="text-lg font-bold">Maporn Auto Group</p>
              <p className="font-semibold text-white/80">มาพร ออโต้ กรุ๊ป</p>
              <p className="mt-3 leading-relaxed text-white/60">
                ผู้แทนจำหน่ายรถยนต์มากถึง 7 แบรนด์ พร้อมศูนย์บริการครบวงจร (เช็คระยะ ซ่อมสีและตัวถัง)
                ให้บริการในธุรกิจนี้มานานถึงกว่า 40 ปี
              </p>
            </div>
            <div className="mt-7 max-w-lg border-l-[3px] border-brand-red pl-5">
              <p className="text-xl font-extrabold tracking-tight sm:text-2xl">Every Journey Matter</p>
              <p className="mt-1 font-semibold text-brand-red">ดูแลด้วยใจ อุ่นใจทุกเส้นทาง</p>
            </div>
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.1} className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -inset-3 rounded-[34px] bg-gradient-to-br from-brand-red/40 via-transparent to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
              <div className="relative aspect-[5/4]">
                <Image src={IMG.hero} alt="ลูกค้าเลือกชมรถในโชว์รูม Maporn Autogroup" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            </div>
          </ScrollFx>
        </div>

      </section>

      {/* ================= VISION / MISSION ================= */}
      <section className="pb-10">
        <div className="container-page">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: Eye,
                label: "Vision",
                title: "วิสัยทัศน์",
                lead: null as string | null,
                text: "มาพร ออโต้ กรุ๊ป มุ่งมั่นพัฒนาธุรกิจเพื่อเป็นเครือข่ายตัวแทนจำหน่ายรถยนต์ที่ดูแลลูกค้าทั่วประเทศ พร้อมศูนย์บริการสำหรับในกรุงเทพฯและภาคตะวันออก (ระยอง จันทบุรี ตราด ชลบุรี) ที่ให้ความอุ่นใจแก่ลูกค้าตลอดการเป็นเจ้าของรถ ไม่ใช่แค่วันที่ซื้อ",
              },
              {
                icon: HeartHandshake,
                label: "Mission",
                title: "พันธกิจ",
                lead: "อุ่นใจเมื่อซื้อรถและใช้บริการกับมาพร",
                text: "มาพร ออโต้ กรุ๊ป มอบความอุ่นใจให้ลูกค้าตั้งแต่วันแรกที่เดินเข้ามาหาเรา จนถึงทุกวันที่คุณใช้รถ — เพราะเรามุ่งมั่นดูแลลูกค้าด้วยใจ เราพร้อมดูแลคุณต่อไปตลอดทาง",
              },
            ].map(({ icon: Icon, ...c }, i) => (
              <ScrollFx key={c.title} effect="fade-up" delay={i * 0.08} className="min-h-[190px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#17181c] to-[#111215] p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/15 text-brand-red">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">{c.label}</p>
                    <h3 className="text-lg font-bold">{c.title}</h3>
                  </div>
                </div>
                {c.lead && <p className="mt-4 font-semibold text-brand-red">&ldquo;{c.lead}&rdquo;</p>}
                {c.text && <p className="mt-3 text-sm leading-relaxed text-white/60">{c.text}</p>}
              </ScrollFx>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section>
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
          <SectionTitle center title={<>แบรนด์ในเครือ Maporn Autogroup</>} sub={`ตัวแทนจำหน่ายอย่างเป็นทางการ ${brandCount} แบรนด์ ครอบคลุมรถยนต์นั่ง รถเพื่อการพาณิชย์ และรถยนต์ไฟฟ้า`} />
          <ScrollFx effect="fade-up" stagger={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => {
              const logos = (g.isCombined ? [g.logo] : g.slugs.map((s) => getBrand(s)?.logo)).filter(Boolean) as string[];
              return (
                <Link key={g.key} href={g.href} className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-[#17181c] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#1c1d22]">
                  <span className="flex h-20 w-32 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-3">
                    {logos.map((l) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={l} src={l} alt="" className={g.isCombined ? "h-auto w-full object-contain" : "h-8 w-auto max-w-[96px] object-contain"} />
                    ))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{g.name}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition-colors group-hover:text-brand-red" />
                </Link>
              );
            })}
          </ScrollFx>
        </div>
      </section>

      {/* ================= MILESTONES ================= */}
      {/* Brand Book "Our History": a red line with glowing dots. Desktop snakes 5 milestones
          left→right, turns down at the right edge and runs back right→left for the rest;
          mobile is a vertical line. Row 1 has a fixed height so the turn lands on row 2's dots. */}
      <section className="border-y border-white/[0.06] bg-black py-16 sm:py-20">
        <div className="container-page">
          <SectionTitle center title="เส้นทางการเติบโตของเรา" />

          {/* Desktop */}
          <ScrollFx effect="fade-up" className="relative mx-auto mt-14 hidden max-w-6xl lg:block">
            {/* top run from the first dot to the turn */}
            {/* column 1 centre = 10% minus a share of the 4 × 16px gaps */}
            <div className="absolute left-[calc(10%-6.4px)] right-[50%] top-[19px] h-[3px] bg-brand-red" />
            {/* turn: top-right-bottom border from the middle column (centre = 50%) out to the right edge;
                height = row 1 (200px) + row 2 margin (24px) + half a dot (20px) - top offset - half the border */}
            <div className="absolute left-[50%] right-0 top-[19px] h-[227px] rounded-r-[28px] border-y-[3px] border-r-[3px] border-brand-red" />
            <ol className="relative grid grid-cols-5 gap-x-4">
              {companyTimeline.map((t, i) => {
                const row2 = i >= 5;
                // Row 2 runs back from column 5 toward column 1.
                const col = row2 ? 5 - (i - 5) : i + 1;
                return (
                  <li
                    key={i}
                    style={{ gridColumnStart: col, gridRowStart: row2 ? 2 : 1 }}
                    className={`flex flex-col items-center text-center ${row2 ? "mt-6" : "h-[200px]"}`}
                  >
                    <GlowDot />
                    <p className="mt-4 text-xl font-extrabold tracking-tight xl:text-2xl">{t.period}</p>
                    <div className="mt-2 space-y-2.5">
                      {t.items.map((item) => (
                        <p key={item} className="text-sm leading-snug text-white/75">{item}</p>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ol>
          </ScrollFx>

          {/* Mobile / tablet */}
          <ol className="relative mx-auto mt-10 max-w-md lg:hidden">
            <span className="absolute bottom-5 left-[19px] top-5 w-[3px] bg-brand-red" />
            {companyTimeline.map((t, i) => (
              <li key={i} className="relative flex gap-4 pb-7 last:pb-0">
                <GlowDot />
                <div className="pt-1.5">
                  <p className="text-lg font-extrabold tracking-tight">{t.period}</p>
                  {t.items.map((item) => (
                    <p key={item} className="mt-1 text-sm leading-snug text-white/75">{item}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          {/* "ทำไมลูกค้าไว้วางใจมาพร" (values + standards) hidden for now at the client's request */}
          <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionTitle title="ทีมผู้บริหาร" />
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
                  <a href={telHref(company.phone)} className="inline-flex items-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold transition-colors hover:bg-white hover:text-[#0c0d0f]">
                    โทร {company.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { href: company.facebook, label: "Facebook", Icon: FacebookIcon },
                    { href: company.lineUrl, label: "LINE", Icon: LineIcon },
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
