"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { company } from "@/lib/data/company";
import { getBrandGroups, getModelsForGroup } from "@/lib/data/brandGroups";

const PRIMARY_LINKS = [
  { href: "/cars", label: "รถยนต์" },
  { href: "/promotions", label: "โปรโมชั่น" },
  { href: "/branches", label: "โชว์รูม" },
  { href: "/service", label: "บริการ" },
  { href: "/news", label: "ข่าวสาร" },
  { href: "/about", label: "เกี่ยวกับเรา" },
];

function navLinkClasses(active: boolean, solid: boolean) {
  const idleColor = solid ? "text-brand-navy" : "text-white";
  return `relative shrink-0 px-2.5 py-2 text-sm font-medium transition-colors hover:text-brand-red after:absolute after:left-2.5 after:right-2.5 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-brand-red after:origin-left after:transition-transform after:duration-300 ${
    active ? "text-brand-red after:scale-x-100" : `${idleColor} after:scale-x-0 hover:after:scale-x-100`
  }`;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobileBrand, setMobileBrand] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    setMobileBrandsOpen(false);
    setMobileBrand(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;
  const brandGroups = getBrandGroups();

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur transition-all duration-300 ${
        solid
          ? `bg-white/95 border-b ${scrolled ? "shadow-[0_8px_24px_-12px_rgba(17,17,17,0.18)] border-transparent" : "border-brand-line"}`
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`hidden md:flex items-center justify-end gap-6 bg-brand-navy text-white text-xs overflow-hidden transition-all duration-300 ${
          scrolled ? "max-h-0 py-0 opacity-0" : "max-h-8 py-1.5 opacity-100"
        }`}
      >
        <div className="container-page flex items-center justify-end gap-6">
          <span>โทรฝ่ายขาย: {company.salesPhone}</span>
          <span>Line: {company.line}</span>
          <span>อีเมล: {company.email}</span>
        </div>
      </div>

      <div
        className={`container-page flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
        }`}
      >
        <Link href="/" className="flex items-center shrink-0">
          <span className={`rounded-lg transition-all duration-300 ${solid ? "" : "bg-white/95 px-2.5 py-1.5"}`}>
            <Image
              src="/brand/maporn-logo.png"
              alt="Maporn Trading Co., Ltd."
              width={394}
              height={112}
              priority
              className={`w-auto transition-all duration-300 ${scrolled ? "h-8 md:h-9" : "h-9 md:h-11"}`}
            />
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar min-w-0">
          <Link href="/" className={navLinkClasses(pathname === "/", solid)}>
            หน้าแรก
          </Link>

          <Link
            href="/cars"
            className={navLinkClasses(pathname === "/cars", solid)}
          >
            รถยนต์
          </Link>

          <div className="relative group shrink-0">
            <Link
              href="/brands"
              className={`${navLinkClasses(pathname.startsWith("/brands"), solid)} flex items-center gap-1`}
            >
              แบรนด์
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="h-3 w-3 mt-px transition-transform duration-200 group-hover:rotate-180"
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <div className="invisible opacity-0 -translate-y-1 scale-95 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 origin-top absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
              <div className="w-[680px] rounded-2xl border border-brand-line bg-white shadow-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brand-slate">
                    7 แบรนด์ในเครือ Maporn Autogroup
                  </p>
                  <Link href="/brands" className="text-xs font-semibold text-brand-red hover:underline">
                    ดูแบรนด์ทั้งหมด →
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {brandGroups.map((g) => (
                    <Link
                      key={g.key}
                      href={g.href}
                      className="group/item flex flex-col items-center gap-2 rounded-xl p-3 text-center hover:bg-slate-50 transition-colors"
                    >
                      <span
                        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full overflow-hidden ring-2"
                        style={{ ["--tw-ring-color" as string]: g.colorHex }}
                      >
                        {g.heroImage ? (
                          <Image src={g.heroImage} alt={g.name} fill className="object-cover" />
                        ) : (
                          <span
                            className="flex h-full w-full items-center justify-center text-white font-black text-xs"
                            style={{ backgroundColor: g.colorHex }}
                          >
                            {g.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </span>
                      <span>
                        <p className="font-bold text-brand-navy text-xs leading-tight group-hover/item:text-brand-red transition-colors">
                          {g.name}
                        </p>
                        <p className="text-[10px] text-brand-slate leading-tight mt-0.5 line-clamp-1">{g.tagline}</p>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {PRIMARY_LINKS.filter((l) => l.href !== "/cars").map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClasses(pathname === link.href, solid)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${company.salesPhone}`}
            className={`btn-outline text-xs px-4 py-2.5 ${solid ? "" : "border-white text-white hover:bg-white hover:text-brand-navy"}`}
          >
            โทรฝ่ายขาย
          </a>
          <Link href="/test-drive" className="btn-red text-xs px-4 py-2.5">
            จองทดลองขับ
          </Link>
        </div>

        <button
          type="button"
          aria-label="เปิดเมนู"
          aria-expanded={open}
          className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-full border shrink-0 transition-colors ${
            solid ? "border-brand-line" : "border-white/40 bg-white/10"
          }`}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">เมนู</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 transition-transform ${solid ? "bg-brand-navy" : "bg-white"} ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block h-0.5 w-5 transition-opacity ${solid ? "bg-brand-navy" : "bg-white"} ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-5 transition-transform ${solid ? "bg-brand-navy" : "bg-white"} ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-brand-line bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="container-page py-4 flex flex-col gap-1">
            <Link href="/" className={`py-2.5 text-sm font-medium border-b border-brand-line ${pathname === "/" ? "text-brand-red" : "text-brand-navy"}`}>
              หน้าแรก
            </Link>

            <Link
              href="/cars"
              className={`py-2.5 text-sm font-medium border-b border-brand-line ${pathname === "/cars" ? "text-brand-red" : "text-brand-navy"}`}
            >
              รถยนต์
            </Link>

            <div className="border-b border-brand-line">
              <button
                type="button"
                aria-expanded={mobileBrandsOpen}
                onClick={() => setMobileBrandsOpen((v) => !v)}
                className={`flex w-full items-center justify-between py-2.5 text-sm font-medium ${
                  pathname.startsWith("/brands") ? "text-brand-red" : "text-brand-navy"
                }`}
              >
                แบรนด์
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${mobileBrandsOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {mobileBrandsOpen && (
                <div className="pb-2 flex flex-col gap-1">
                  <Link href="/brands" className="text-xs font-semibold text-brand-red py-1.5 pl-1">
                    ดูแบรนด์ทั้งหมด →
                  </Link>
                  {brandGroups.map((g) => {
                    const groupModels = getModelsForGroup(g);
                    const expanded = mobileBrand === g.key;
                    return (
                      <div key={g.key}>
                        <div className="flex items-center justify-between gap-3 py-1.5">
                          <Link href={g.href} className="flex-1 flex items-center gap-2.5 text-sm font-medium text-brand-navy">
                            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden ring-2 ring-brand-line">
                              {g.heroImage ? (
                                <Image src={g.heroImage} alt={g.name} fill className="object-cover" />
                              ) : (
                                <span
                                  className="flex h-full w-full items-center justify-center text-white font-black text-[10px]"
                                  style={{ backgroundColor: g.colorHex }}
                                >
                                  {g.name.slice(0, 2).toUpperCase()}
                                </span>
                              )}
                            </span>
                            {g.name}
                          </Link>
                          <button
                            type="button"
                            aria-label={`แสดงรุ่นรถของ ${g.name}`}
                            aria-expanded={expanded}
                            onClick={() => setMobileBrand(expanded ? null : g.key)}
                            className="flex h-9 w-9 items-center justify-center shrink-0 text-brand-navy"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.5}
                              className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
                            >
                              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                        {expanded && (
                          <div className="pb-2 pl-11 flex flex-col gap-1">
                            {groupModels.map((m) => (
                              <Link key={m.slug} href={`/cars/${m.slug}`} className="text-sm text-brand-slate py-1.5">
                                {m.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {PRIMARY_LINKS.filter((l) => l.href !== "/cars").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2.5 text-sm font-medium border-b border-brand-line last:border-none ${
                  pathname === link.href ? "text-brand-red" : "text-brand-navy"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-4 pb-2">
              <a href={`tel:${company.salesPhone}`} className="btn-outline flex-1 text-xs">
                โทรฝ่ายขาย
              </a>
              <Link href="/test-drive" className="btn-red flex-1 text-xs">
                จองทดลองขับ
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
