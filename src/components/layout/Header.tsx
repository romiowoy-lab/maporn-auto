"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Calendar, Menu, X, ChevronDown } from "lucide-react";
import { company } from "@/lib/data/company";
import MapornLogo from "@/components/ui/MapornLogo";

const NAV_LINKS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/brands", label: "แบรนด์ของเรา" },
  { href: "/service", label: "ศูนย์บริการ/ซ่อมสีและตัวถัง" },
  { href: "/branches", label: "โชว์รูม & สาขา" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อเรา" },
];

// Brand order per client: OJ (OMODA & JAECOO as one slot, shown as "OJ"), GWM, Suzuki, Lepas, Wuling,
// Farizon, NEX, Suzy Fix. Lepas renders at a bigger box (`big: true`): its logo is a thin cursive wordmark.
const BRAND_STRIP = [
  { key: "omoda-jaecoo", name: "OJ", href: "/brands/omoda", logos: [] as string[], text: "OJ" },
  { key: "gwm", name: "GWM", href: "/brands/gwm", logos: ["/brand/logos/gwm.png"] },
  { key: "suzuki", name: "Suzuki", href: "/brands/suzuki", logos: ["/brand/logos/suzuki.svg"] },
  { key: "lepas", name: "Lepas", href: "/brands/lepas", logos: ["/brand/logos/lepas.png"], big: true },
  { key: "wuling", name: "Wuling", href: "/brands/wuling", logos: ["/brand/logos/wuling.png"] },
  { key: "farizon", name: "Farizon", href: "/brands/farizon", logos: ["/brand/logos/farizon.png"] },
  { key: "nex", name: "NEX", href: "/brands/nex", logos: ["/brand/logos/nex.png"] },
  { key: "suzyfix", name: "Suzy Fix", href: "/service#suzy-fix", logos: ["/brand/logos/suzyfix.jpg"] },
];

type BrandItem = (typeof BRAND_STRIP)[number];

function BrandChip({ b, active, compact }: { b: BrandItem; active: boolean; compact?: boolean }) {
  return (
    <Link
      href={b.href}
      title={`ดูรุ่นรถ ${b.name}`}
      aria-current={active ? "page" : undefined}
      className={`group relative flex shrink-0 flex-col items-center justify-center rounded-xl border bg-white px-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-red/50 hover:shadow-[0_6px_16px_-6px_rgba(220,0,0,0.35)] ${
        compact ? "h-12 min-w-[76px]" : "h-[52px] min-w-[78px]"
      } ${active ? "border-brand-red bg-red-50/60 shadow-[0_0_0_1px_rgba(220,0,0,0.25)]" : "border-black/10"}`}
    >
      <span className="flex items-center gap-1.5">
        {"text" in b && b.text && <span className="flex h-[22px] w-[52px] items-center justify-center text-lg font-black tracking-tight text-[#101113]">{b.text}</span>}
        {b.logos.map((src, j) => (
          <span key={src} className="flex items-center gap-1.5">
            {j > 0 && <span className="h-3.5 w-px bg-black/15" />}
            <img src={src} alt={b.name} className={b.big ? "h-8 w-[66px] object-contain" : "h-[22px] w-[52px] object-contain"} />
          </span>
        ))}
      </span>
      <span className={`mt-0.5 text-[9px] font-bold leading-none tracking-wide transition-colors ${active ? "text-brand-red" : "text-brand-slate group-hover:text-brand-red"}`}>
        {b.key === "suzyfix" ? "ซ่อมสี/ตัวถัง ›" : "ดูรุ่น ›"}
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
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <MapornLogo variant="red" className="h-9 w-auto sm:h-10" />
        </Link>

        {/* Center: brand chips. Static (not a marquee) and full colour so they read as buttons;
            each carries a "ดูรุ่น" cue and the current brand is highlighted. Scrolls sideways if narrow. */}
        <nav aria-label="แบรนด์รถยนต์" className="hidden lg:flex flex-1 min-w-0 items-center gap-2">
          <span className="hidden xl:flex shrink-0 flex-col text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-brand-slate">
            เลือกแบรนด์
            <span className="text-brand-red">ดูรุ่นรถ →</span>
          </span>
          <div className="no-scrollbar flex min-w-0 items-center gap-1.5 overflow-x-auto py-1 pr-6 [mask-image:linear-gradient(to_right,black_88%,transparent)] 2xl:pr-0 2xl:[mask-image:none]">
            {BRAND_STRIP.map((b) => (
              <BrandChip key={b.key} b={b} active={isActive(b)} />
            ))}
          </div>
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-2 ml-auto lg:ml-0">
          <a
            href={`tel:${company.salesPhone}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-black/10 bg-black/[0.02] text-brand-navy text-xs font-semibold transition-colors hover:bg-black/[0.05] hover:border-black/20"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>โทรสอบถาม</span>
          </a>
          <a
            href={`https://line.me/ti/p/${company.line}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-red-gradient hover:brightness-110 text-white text-xs font-bold shadow-sm transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>ทดลองขับ</span>
          </a>

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
                      <div className="mt-4 ml-1 flex flex-col space-y-3 border-l border-black/10 pl-5">
                        {BRAND_STRIP.map((b) => (
                          <Link
                            key={b.key}
                            href={b.href}
                            onClick={() => setOpen(false)}
                            className="w-fit text-base font-medium text-brand-slate transition-colors hover:text-brand-red"
                          >
                            {b.name}
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
              href={`https://line.me/ti/p/${company.line}`}
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
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-4 py-2">
        <span className="shrink-0 text-[10px] font-bold leading-tight text-brand-slate">
          เลือกแบรนด์
          <br />
          <span className="text-brand-red">ดูรุ่นรถ →</span>
        </span>
        {BRAND_STRIP.map((b) => (
          <BrandChip key={b.key} b={b} active={isActive(b)} compact />
        ))}
      </div>
    </div>
    </>
  );
}
