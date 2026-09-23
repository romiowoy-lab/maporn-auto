"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Calendar, Menu, X, ChevronDown } from "lucide-react";
import { company } from "@/lib/data/company";

const NAV_LINKS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/brands", label: "แบรนด์ของเรา" },
  { href: "/service", label: "ศูนย์บริการ/ซ่อมสีและตัวถัง" },
  { href: "/branches", label: "โชว์รูม & สาขา" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อเรา" },
];

// 7 brands + Suzy Fix, 8 logo slots — OMODA and JAECOO share one dealership/showroom, so
// they share one nav slot (two real logos side by side) same as everywhere else on the
// site. Order per explicit request: OMODA|JAECOO, GWM, Suzuki, Lepas, Wuling, Farizon,
// Nex, Suzy Fix. Lepas renders at a bigger box (`big: true`) — its real logo is a thin
// cursive wordmark that reads much smaller than the others at the shared default size.
const BRAND_STRIP = [
  { key: "omoda-jaecoo", name: "OMODA | JAECOO", href: "/brands/omoda", logos: ["/brand/logos/omoda.svg", "/brand/logos/jaecoo.svg"] },
  { key: "gwm", name: "GWM", href: "/brands/gwm", logos: ["/brand/logos/gwm.png"] },
  { key: "suzuki", name: "Suzuki", href: "/brands/suzuki", logos: ["/brand/logos/suzuki.svg"] },
  { key: "lepas", name: "Lepas", href: "/brands/lepas", logos: ["/brand/logos/lepas.png"], big: true },
  { key: "wuling", name: "Wuling", href: "/brands/wuling", logos: ["/brand/logos/wuling.png"] },
  { key: "farizon", name: "Farizon", href: "/brands/farizon", logos: ["/brand/logos/farizon.png"] },
  { key: "nex", name: "Nex", href: "/brands/nex", logos: ["/brand/logos/nex.png"] },
  { key: "suzyfix", name: "Suzy Fix", href: "/service#suzy-fix", logos: ["/brand/logos/suzyfix.jpg"] },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-black/[0.06] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 h-16">
        {/* Logo / wordmark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg bg-white border border-black/[0.06] p-1 shadow-sm flex items-center justify-center shrink-0">
            <img src="/Maporn.png" alt="Maporn" className="h-full w-full object-contain" />
          </div>
          <span className="hidden sm:block leading-tight">
            <span className="block text-sm font-extrabold tracking-wide text-brand-navy">
              MAPORN <span className="text-brand-red">AUTO GROUP</span>
            </span>
          </span>
        </Link>

        {/* Center: 7-brand logo strip — infinite marquee, pauses on hover. Track is the
            brand list duplicated once so the -50% loop point is seamless. */}
        <nav className="hidden lg:flex flex-1 min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="brand-marquee flex items-center gap-3 shrink-0">
            {[...BRAND_STRIP, ...BRAND_STRIP].map((b, i) => (
              <Link
                key={`${b.key}-${i}`}
                href={b.href}
                title={b.name}
                className="group flex h-10 shrink-0 items-center gap-2 opacity-60 transition-opacity duration-200 hover:opacity-100"
              >
                {b.logos.map((src, j) => (
                  <span key={src} className="flex h-10 items-center gap-2">
                    {j > 0 && <span className="h-4 w-px bg-black/15" />}
                    <img
                      src={src}
                      alt={b.name}
                      className={b.big ? "h-11 w-[86px] object-contain" : "h-8 w-[62px] object-contain"}
                    />
                  </span>
                ))}
              </Link>
            ))}
          </div>
        </nav>

        <style>{`
          @keyframes brandMarquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .brand-marquee {
            animation: brandMarquee 28s linear infinite;
            width: max-content;
            padding-left: 0.75rem;
          }
          nav:hover .brand-marquee {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .brand-marquee {
              animation: none;
            }
          }
        `}</style>

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
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-red hover:brightness-110 text-white text-xs font-bold shadow-sm transition-all"
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
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-red text-white text-xs font-bold shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>ทดลองขับ</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
