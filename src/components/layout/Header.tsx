"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Calendar, Menu, X, ChevronDown } from "lucide-react";
import { company } from "@/lib/data/company";
import MapornLogo from "@/components/ui/MapornLogo";

const NAV_LINKS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/brands", label: "แบรนด์ที่มาพร ออโต้ กรุ๊ป จัดจำหน่าย" },
  { href: "/service", label: "ศูนย์บริการ/ซ่อมสีและตัวถัง" },
  { href: "/branches", label: "โชว์รูม & สาขา" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อเรา" },
];

// Brand order per client: OMODA | JAECOO, GWM, Suzuki, Lepas, Wuling, Farizon, Suzy Fix (NEX hidden for now).
// Logos are trimmed copies (public/brand/logos/header/) and `ratio` is each file's width ÷ height, so every
// mark can be drawn at the same visual area (see BrandMark) instead of the same box.
const BRAND_STRIP = [
  { key: "omoda-jaecoo", name: "OMODA | JAECOO", href: "/brands/omoda", logo: "/brand/logos/omoda-jaecoo.svg", ratio: 18.82, wide: true },
  { key: "gwm", name: "GWM", href: "/brands/gwm", logo: "/brand/logos/header/gwm.png", ratio: 4.89 },
  { key: "suzuki", name: "Suzuki", href: "/brands/suzuki", logo: "/brand/logos/header/suzuki.png", ratio: 1.49 },
  { key: "lepas", name: "Lepas", href: "/brands/lepas", logo: "/brand/logos/header/lepas.png", ratio: 3.3 },
  { key: "wuling", name: "Wuling", href: "/brands/wuling", logo: "/brand/logos/header/wuling.png", ratio: 1.54 },
  { key: "farizon", name: "Farizon", href: "/brands/farizon", logo: "/brand/logos/header/farizon.png", ratio: 1.59 },
  { key: "suzyfix", name: "Suzy Fix", href: "/service#suzy-fix", logo: "/brand/logos/header/suzyfix.png", ratio: 1 },
];

type BrandItem = (typeof BRAND_STRIP)[number];

// Equal visual area: width × height is the same for every logo (height capped so square marks don't tower).
// The OMODA | JAECOO wordmark is so long that equal area would make it unreadable, so it gets a fixed width.
const LOGO_AREA = 1400;
const LOGO_MAX_H = 32;
function BrandMark({ b, compact }: { b: BrandItem; compact?: boolean }) {
  let w: number;
  let h: number;
  if ("wide" in b && b.wide) {
    w = 150;
    h = w / b.ratio;
  } else {
    const k = compact ? 0.82 : 1;
    h = Math.min(LOGO_MAX_H, Math.sqrt(LOGO_AREA / b.ratio)) * k;
    w = h * b.ratio;
  }
  return <img src={b.logo} alt={b.name} width={Math.round(w)} height={Math.round(h)} style={{ width: w, height: h }} className="max-w-full object-contain" />;
}

// Floating brand logo: no box. Each logo bobs gently on its own soft shadow; on hover it lifts,
// the shadow widens and a red hairline + "ดูรุ่นรถ" caption appear. The current brand keeps the hairline.
function BrandFloat({ b, active, index, compact }: { b: BrandItem; active: boolean; index: number; compact?: boolean }) {
  return (
    <Link
      href={b.href}
      title={b.key === "suzyfix" ? "ศูนย์ซ่อมสีและตัวถัง Suzy Fix" : `ดูรุ่นรถ ${b.name}`}
      aria-current={active ? "page" : undefined}
      className={`brand-float group relative flex min-w-0 flex-col items-center justify-center ${compact ? "h-14 px-0" : "h-16 shrink px-0"}`}
      style={{ ["--d" as string]: `${index * -0.45}s` }}
    >
      <span className="brand-float-mark flex h-9 max-w-full items-center transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
        <BrandMark b={b} compact={compact} />
      </span>
      {/* floor shadow — sells the "floating" */}
      <span className="brand-float-shadow pointer-events-none mt-1 h-1 w-10 rounded-[50%] bg-black/15 blur-[3px] transition-all duration-300 group-hover:w-12 group-hover:bg-black/10" />
      <span
        className={`pointer-events-none absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-brand-red transition-all duration-300 ${active ? "w-6" : "w-0 group-hover:w-6"}`}
      />
      <span className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#101113] px-2.5 py-1 text-[10px] font-bold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-bottom-6 group-hover:opacity-100">
        {b.key === "suzyfix" ? "ซ่อมสี/ตัวถัง" : "ดูรุ่นรถ"}
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (b: BrandItem) =>
    b.key === "omoda-jaecoo" ? /^\/brands\/(omoda|jaecoo)/.test(pathname) : b.href.startsWith("/brands/") && pathname.startsWith(b.href);

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-black/[0.06] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 h-16">
        {/* Logo / wordmark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 lg:mr-2 lg:border-r lg:border-black/10 lg:pr-6 xl:mr-4 xl:pr-8" onClick={() => setOpen(false)}>
          <MapornLogo variant="red" className="h-8 w-auto sm:h-9 xl:h-10" />
        </Link>

        {/* Center: floating brand logos (no boxes), full colour, static. */}
        <nav aria-label="แบรนด์รถยนต์" className="hidden lg:flex flex-1 min-w-0 items-center justify-evenly gap-3 overflow-x-clip">
          {BRAND_STRIP.map((b, i) => (
            <BrandFloat key={b.key} b={b} active={isActive(b)} index={i} />
          ))}
        </nav>

        <style>{`
          @keyframes brandBob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          @keyframes brandBobShadow {
            0%, 100% { transform: scaleX(1); opacity: 1; }
            50% { transform: scaleX(0.82); opacity: 0.7; }
          }
          .brand-float .brand-float-mark > * { animation: brandBob 3.6s ease-in-out infinite; animation-delay: var(--d, 0s); }
          .brand-float .brand-float-shadow { animation: brandBobShadow 3.6s ease-in-out infinite; animation-delay: var(--d, 0s); }
          .brand-float:hover .brand-float-mark > *, .brand-float:hover .brand-float-shadow { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            .brand-float .brand-float-mark > *, .brand-float .brand-float-shadow { animation: none; }
          }
        `}</style>

        {/* Right: actions */}
        <div className="flex items-center gap-2 ml-auto lg:ml-0">
          {/* Menu toggle — full site nav (kept on every breakpoint since the desktop bar
              above only carries brand quick-links, not the หน้าแรก/บริการ/ฯลฯ page links) */}
          <button
            type="button"
            aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/10 bg-black/[0.02] text-brand-navy"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Menu panel — luxury minimal drawer: plain text links, no boxes, compact buttons */}
      {open && (
        <div className="border-t border-black/[0.06] bg-white px-6 py-10">
          <nav className="flex flex-col space-y-6">
            {NAV_LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              if (link.href === "/brands") {
                return (
                  <div key={link.href}>
                    <button
                      type="button"
                      aria-expanded={brandsOpen}
                      onClick={() => setBrandsOpen((v) => !v)}
                      className={`flex w-full items-center gap-2 text-2xl font-light transition-all duration-300 hover:text-brand-red ${
                        active || brandsOpen ? "text-brand-red" : "text-brand-navy"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${brandsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {brandsOpen && (
                      <div className="mt-6 grid max-w-3xl grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
                        {BRAND_STRIP.map((b) => (
                          <Link
                            key={b.key}
                            href={b.href}
                            onClick={() => setOpen(false)}
                            className="group flex flex-col items-center gap-2"
                          >
                            <span className="flex h-10 items-center transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
                              <BrandMark b={b} />
                            </span>
                            <span className="h-1 w-10 rounded-[50%] bg-black/10 blur-[3px] transition-all duration-300 group-hover:w-12" />
                            <span className="text-[11px] font-semibold tracking-wide text-brand-slate transition-colors group-hover:text-brand-red">
                              {b.key === "suzyfix" ? "ซ่อมสี/ตัวถัง" : b.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`w-fit text-2xl font-light transition-all duration-300 hover:translate-x-3 hover:text-brand-red ${
                    active ? "text-brand-red" : "text-brand-navy"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`tel:${company.salesPhone}`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-black/10 bg-black/[0.02] text-brand-navy text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>โทรสอบถาม</span>
            </a>
            <a
              href={company.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-red-gradient text-white text-xs font-bold shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>ทดลองขับ</span>
            </a>
          </div>
        </div>
      )}
    </header>

    <div className="lg:hidden border-b border-black/[0.06] bg-white">
      {/* All logos fit the screen width: one equal column each, nothing runs past the edge */}
      <nav aria-label="แบรนด์รถยนต์" className="grid grid-cols-4 items-center px-1">
        {BRAND_STRIP.map((b, i) => (
          <div key={b.key} className={"wide" in b && b.wide ? "col-span-2 flex justify-center" : "flex justify-center"}>
            <BrandFloat b={b} active={isActive(b)} index={i} compact />
          </div>
        ))}
      </nav>
    </div>
    </>
  );
}
