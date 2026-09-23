'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MapornHero from '@/components/home/MapornHero';
import ExploreRange from '@/components/home/ExploreRange';
import ScrollFx from '@/components/ui/ScrollFx';
import { branches } from '@/lib/data/branches';
import { news } from '@/lib/data/news';
import { formatDateTH } from '@/lib/utils';
import {
  MapPin,
  Car,
  History,
  Users,
  Briefcase,
  Wrench,
  ChevronRight,
  ArrowRight,
  Newspaper,
  Phone,
} from 'lucide-react';

// Real per-branch showroom photos, one for each of the 5 real branches (public/brand/branches/).
const BRANCH_COVER: Record<string, string> = {
  srinakarin: '/brand/branches/srinakarin.jpg',
  minburi: '/brand/branches/minburi.jpg',
  lamlukka: '/brand/branches/lamlukka.jpg',
  sriracha: '/brand/branches/sriracha.jpg',
  rayong: '/brand/branches/rayong.jpg',
};

// Which real brand(s) each branch actually carries, per the client's showroom-network
// brief — a branch with multiple brand lines gets one tile per line, matching the
// brief's own layout (e.g. Srinakarin and Rayong each get multiple tiles). An optional
// `image` overrides the branch's generic cover photo with a real brand-specific one
// (e.g. the actual OMODA|JAECOO building at Rayong, distinct from the shared branch photo).
// `region` groups tiles by the branch's real province — กรุงเทพและปริมณฑล (Srinakarin/
// Minburi in Bangkok, Lamlukka in Pathum Thani) vs. ภาคตะวันออก (Rayong, Sriracha — both
// in the real East-coast provinces).
const BRANCH_BRAND_TILES: { label: string; branchSlug: string; image?: string; region: 'bangkok' | 'east' }[] = [
  { label: 'Suzuki ศรีนครินทร์', branchSlug: 'srinakarin', region: 'bangkok' },
  { label: 'GWM ลำลูกกา', branchSlug: 'lamlukka', region: 'bangkok' },
  { label: 'Suzy Fix มีนบุรี', branchSlug: 'minburi', region: 'bangkok' },
  { label: 'Farizon และ Nex ศรีนครินทร์', branchSlug: 'srinakarin', region: 'bangkok' },
  { label: 'Suzuki ระยอง', branchSlug: 'rayong', region: 'east' },
  { label: 'Suzuki ศรีราชา', branchSlug: 'sriracha', region: 'east' },
  { label: 'OMODA | JAECOO ระยอง', branchSlug: 'rayong', image: '/brand/branches/rayong-omoda-jaecoo.jpg', region: 'east' },
  { label: 'Lepas / Wuling ระยอง', branchSlug: 'rayong', region: 'east' },
];

const BRANCH_REGIONS: { key: 'bangkok' | 'east'; label: string }[] = [
  { key: 'bangkok', label: 'กรุงเทพและปริมณฑล' },
  { key: 'east', label: 'ภาคตะวันออก' },
];

// Only these branches' phone numbers are verified against a real source (the legacy Suzuki
// site). The others' phones are still placeholders, so they are not shown on the cards.
const VERIFIED_PHONE = new Set(['srinakarin', 'rayong']);

const NEWS_CATEGORY_LABEL: Record<string, string> = {
  Company: 'ข่าวบริษัท',
  Vehicle: 'รถยนต์',
  Technology: 'เทคโนโลยี',
  EV: 'รถยนต์ไฟฟ้า',
  Event: 'กิจกรรม',
  CSR: 'CSR',
  Lifestyle: 'ไลฟ์สไตล์',
};

// 8 real photos/logos for this highlight grid (public/brand/highlight/) — uniform 4-col x
// 2-row grid, no asymmetric "big tile" sizing. Suzy Fix (8th) has no separate large photo
// (it's a service sub-brand, not a car) — its own real logo file is used as-is, shown
// object-contain on a solid tint rather than stretched/cropped like the 7 car photos.
const BENTO_UNITS: { key: string; tag: string; title: string; href: string; img: string; pos?: string; logo: string | null; color: string; fit?: 'contain' }[] = [
  { key: 'suzuki', tag: 'Suzuki', title: 'Way of Life!', href: '/brands/suzuki', img: '/brand/showcase/suzuki.jpg', pos: '20% 50%', logo: '/brand/logos/suzuki.svg', color: '#E30016' },
  { key: 'gwm', tag: 'GWM', title: 'Tank 300 · Tank 500', href: '/brands/gwm', img: '/brand/gwm-tank300/front.jpg', pos: '40% 50%', logo: '/brand/logos/gwm.png', color: '#FF6600' },
  { key: 'omoda', tag: 'OMODA', title: 'Electric Crossover', href: '/brands/omoda', img: '/brand/omoda-c5/threeq.jpg', pos: '50% 50%', logo: '/brand/logos/omoda.svg', color: '#7B2D8E' },
  { key: 'jaecoo', tag: 'JAECOO', title: 'Feel Alive', href: '/brands/jaecoo', img: '/brand/jaecoo-j7/road.jpg', pos: '65% 50%', logo: '/brand/logos/jaecoo.svg', color: '#B8860B' },
  { key: 'lepas', tag: 'Lepas', title: 'Drive Your Elegance', href: '/brands/lepas', img: '/brand/lepas-l6/street.jpg', pos: '55% 50%', logo: '/brand/logos/lepas.png', color: '#A0522D' },
  { key: 'nex', tag: 'Nex', title: 'Drive the Better Future', href: '/brands/nex', img: '/brand/hero/nex-ev-tractor-poster.jpg', pos: '35% 50%', logo: '/brand/logos/nex.png', color: '#00A19A' },
  { key: 'wuling', tag: 'Wuling', title: 'Enjoy the Ride', href: '/brands/wuling', img: '/brand/wuling-darion/front34.jpg', pos: '35% 50%', logo: '/brand/logos/wuling.png', color: '#C8102E' },
  { key: 'suzyfix', tag: 'Suzy Fix', title: 'ศูนย์บริการซ่อมสีตัวถังมาตรฐาน Suzuki', href: '/service#suzy-fix', img: '/brand/suzyfix/suzyfix-mechanic.jpg', pos: '50% 40%', logo: null, color: '#E85D2F' },
];

export default function HomePage() {
  const [branchTab, setBranchTab] = useState<string>('all');
  return (
    <div className="min-h-screen bg-[#101113] text-white/85 font-sans pb-24 md:pb-8">

      {/* 1. HERO — mobile: AW rotatable carousel (9 slides, ~80-85vh) / desktop: split-screen brand showcase */}
      {/* Same full-bleed video hero on phone, tablet and desktop */}
      <MapornHero />

      {/* 2. BUSINESS IN MAPORN — brand ecosystem section */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#101113]">
        <div className="absolute -top-20 left-1/4 w-[420px] h-[280px] bg-brand-red/[0.05] blur-[110px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1800px] mx-auto">
          <div className="mb-10 sm:mb-12">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-red/[0.05] border border-brand-red/20 text-brand-red text-[10px] font-semibold tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse mr-2" />
              Business Ecosystem · Highlight
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              ธุรกิจในเครือ มาพร
            </h2>
            <p className="text-sm sm:text-lg mt-2 text-white/65">
              ตัวแทนจำหน่ายครบวงจรทั้งรถบุคคลและยานยนต์เชิงพาณิชย์
            </p>
          </div>

          {/* 8-tile uniform highlight grid — 4 per row / 2 rows, every tile the same size,
              sized large against the widened container for a premium full-width feel. */}
          <ScrollFx effect="fade-up" stagger={0.08} className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
            {BENTO_UNITS.map((u, i) => (
              <Link
                key={u.key}
                href={u.href}
                className="business-card group relative aspect-[4/5] sm:aspect-[4/4.5] overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
                style={{ ["--accent" as string]: u.color }}
              >
                {u.fit === "contain" ? (
                  <div className="flex h-full w-full items-center justify-center p-10 sm:p-14 transition-colors duration-500" style={{ backgroundColor: `${u.color}0F` }}>
                    <img
                      src={u.img}
                      alt={u.tag}
                      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1"
                    />
                  </div>
                ) : (
                  <img
                    src={u.img}
                    alt={u.tag}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ objectPosition: u.pos ?? 'center' }}
                  />
                )}

                {/* diagonal light sweep on hover */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />

                <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${u.fit === "contain" ? "from-black/70 via-black/0 to-transparent" : "from-black/85 via-black/20 to-black/10"} group-hover:opacity-90`} />

                {/* faint index mark, top-right — quiet editorial flair, not decoration-only (matches this grid's fixed brand order) */}
                <span
                  className="absolute top-5 right-5 font-black text-3xl sm:text-4xl leading-none text-white/0 transition-all duration-500 group-hover:text-white/20 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {u.logo && (
                  <span className="absolute top-5 left-5 flex h-12 items-center rounded-xl border border-white/40 bg-white/90 px-3.5 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white/25">
                    <img src={u.logo} alt={u.tag} className="h-7 w-auto max-w-[100px] object-contain sm:h-8" />
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <span
                    className="mb-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 -translate-y-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ backgroundColor: u.color }}
                  >
                    {u.tag}
                  </span>
                  <h3 className="font-bold text-white text-lg sm:text-2xl leading-snug line-clamp-2 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {u.title}
                  </h3>
                  <span
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
                    style={{ color: u.color }}
                  >
                    ดูรายละเอียดเพิ่มเติม
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </ScrollFx>
          <style>{`
            .business-card:hover { border-color: var(--accent); box-shadow: 0 20px 40px -12px var(--accent); }
          `}</style>
        </div>
      </section>

      {/* 2.75 EXPLORE THE RANGE — brand filter tabs + horizontal scroll of real vehicle cards */}
      <ExploreRange />

      {/* 4. LOCATION SHOWROOMS — real 5 branches, tiled by which real brand(s) each branch
          actually carries (per the client's showroom-network brief), not a generic
          "all 7 brands everywhere" claim. Left-aligned heading, no eyebrow/subtitle/count. */}
      <section id="locations" className="relative py-20 px-4 bg-[#15161A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block mb-3 rounded-full border border-brand-red/20 bg-brand-red/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FF5A5A]">
              Our Locations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">โชว์รูมและศูนย์บริการ</h2>
            <p className="mt-2 text-sm sm:text-base text-white/65">ครอบคลุมพื้นที่กรุงเทพฯ ปริมณฑล และภาคตะวันออก</p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[{ key: 'all', label: 'ทั้งหมด' }, ...BRANCH_REGIONS].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setBranchTab(tab.key)}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold shadow-sm transition-all duration-300 ${
                    branchTab === tab.key
                      ? 'border-brand-red bg-brand-red text-white'
                      : 'border-white/15 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div key={branchTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {BRANCH_BRAND_TILES.filter((t) => branchTab === 'all' || t.region === branchTab).map((tile) => {
              const b = branches.find((br) => br.slug === tile.branchSlug)!;
              const isService = tile.label.startsWith('Suzy Fix');
              return (
                <div
                  key={`${tile.branchSlug}-${tile.label}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/branches/${b.slug}`} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                      <img
                        src={tile.image ?? BRANCH_COVER[b.slug]}
                        alt={tile.label}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {isService && (
                        <span className="absolute top-3 left-3 rounded-md bg-black/75 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                          SERVICE CENTER
                        </span>
                      )}
                    </div>
                    <div className="p-6 pb-4">
                      <h3 className="mb-3 text-lg font-bold text-white transition-colors group-hover:text-brand-red">{tile.label}</h3>
                      <div className="space-y-2.5 text-xs text-white/65">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                          <span className="leading-relaxed">{b.address}</span>
                        </div>
                        {VERIFIED_PHONE.has(b.slug) && (
                          <div className="flex items-center gap-2.5">
                            <Phone className="h-4 w-4 shrink-0 text-brand-red" />
                            <span>{b.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="p-6 pt-0">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-red/15 bg-brand-red/5 py-2.5 text-xs font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white"
                    >
                      <MapPin className="h-4 w-4" /> นำทางด้วย Google Maps
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WHY MAPORN — 1 showroom photo, then a 6-item list */}
      <section className="relative py-20 px-4 bg-[#15161A] overflow-hidden">
        <div className="absolute -top-20 left-1/3 w-[420px] h-[280px] bg-brand-red/[0.05] blur-[110px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-10">
            {/* Left: heading + feature cards */}
            <div>
              <span className="text-xs font-bold text-[#FF5A5A] uppercase tracking-widest">Why Maporn</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-6">ทำไมต้องมาพรพาณิชย์</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { badge: '38+', title: 'ประสบการณ์ยาวนาน', text: 'ผู้เชี่ยวชาญในธุรกิจจำหน่ายรถยนต์ที่ได้รับความไว้วางใจกว่า 38 ปี' },
                  { badge: 'EV', title: 'เชี่ยวชาญรถยนต์ EV', text: 'รู้จริงเรื่องตลาดรถยนต์สันดาปและ EV พร้อมตัวเลือกหลากหลายแบรนด์' },
                  { badge: null, icon: MapPin, title: 'ครอบคลุมพื้นที่', text: 'แข็งแกร่งในพื้นที่กรุงเทพฯ และภาคตะวันออก' },
                  { badge: null, icon: Wrench, title: 'บริการครบวงจร', text: 'ศูนย์ซ่อมสีและตัวถังระดับมืออาชีพ ได้มาตรฐานและอะไหล่แท้' },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="p-5 bg-[#1C1E22] rounded-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                      <div className="w-10 h-10 mb-3 flex items-center justify-center rounded-lg bg-brand-red/10 text-brand-red text-sm font-black">
                        {Icon ? <Icon className="w-5 h-5" /> : f.badge}
                      </div>
                      <h3 className="font-bold text-white mb-1">{f.title}</h3>
                      <p className="text-sm text-white/65 leading-relaxed">{f.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: showroom photo */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <img
                src="/brand/maporn-lobby-illustrated.jpg"
                alt="โชว์รูม Maporn Trading"
                className="w-full aspect-[1024/586] lg:aspect-auto lg:h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* 6-item grid — bigger, image-forward cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Our Story เรื่องราวของเรา', icon: History, href: '/about', img: '/brand/maporn-showroom-illustrated.jpg' },
              { title: 'ตัวจริงรถบุคคล & พาณิชย์', icon: Car, href: '/brands', img: '/brand/suzuki-fronx-illustrated.jpg' },
              { title: 'Location ค้นหาโชว์รูมและศูนย์บริการ', icon: MapPin, href: '/branches', img: '/brand/maporn-showroom-suzuki-illustrated.jpg' },
              { title: 'ตัวจริงด้านซ่อมสี & ตัวถัง', icon: Wrench, href: '/service', img: '/brand/maporn-bodyshop-illustrated.jpg' },
              { title: 'ครอบครัวมาพร', icon: Users, href: '/family', img: '/brand/maporn-family-illustrated.jpg' },
              { title: 'ร่วมงานกับเรา', icon: Briefcase, href: '/careers', img: '/brand/maporn-careers-illustrated.jpg' },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <Link
                  key={idx}
                  href={p.href}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-red/40 hover:shadow-[0_16px_35px_rgba(223,0,0,0.12)]"
                >
                  <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                    <span className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-white text-sm font-black shadow-lg">
                      {idx + 1}
                    </span>
                    <Icon className="absolute bottom-3 left-3 w-6 h-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
                  </div>
                  <div className="flex items-center justify-between gap-2 px-5 py-4">
                    <span className="text-base font-bold text-white leading-snug">{p.title}</span>
                    <ChevronRight className="w-5 h-5 text-white/30 shrink-0 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BLOG & NEWS — real articles from lib/data/news.ts */}
      <section className="relative py-20 px-4 bg-[#15161A] overflow-hidden">
        <div className="absolute -bottom-10 left-1/4 w-[420px] h-[280px] bg-brand-red/[0.05] blur-[110px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#FF5A5A] uppercase tracking-widest">Blog &amp; News</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">ข่าวสารและกิจกรรม</h2>
            </div>
            <Link href="/news" className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-brand-red hover:text-brand-red/80 transition-colors shrink-0">
              ดูข่าวสารทั้งหมด
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...news]
              .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
              .slice(0, 3)
              .map((n) => (
                <Link
                  key={n.slug}
                  href={`/news/${n.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1C1E22] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-brand-red/40 hover:-translate-y-1"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-brand-red/15 via-[#1C1E22] to-[#25282D] flex items-center justify-center">
                    <Newspaper className="w-8 h-8 text-brand-red/40" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-brand-red text-white">
                      {NEWS_CATEGORY_LABEL[n.category] ?? n.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-[11px] text-white/65">{formatDateTH(n.publishDate)}</span>
                    <h3 className="text-sm font-bold text-white mt-1.5 leading-snug line-clamp-2">{n.title}</h3>
                    <p className="text-xs text-white/65 mt-2 leading-relaxed line-clamp-2 flex-1">{n.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-red group-hover:text-brand-red/80 transition-colors">
                      อ่านเพิ่มเติม
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

    </div>
  );
}