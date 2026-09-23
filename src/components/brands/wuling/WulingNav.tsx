"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "model", label: "Model" },
  { id: "design", label: "Design" },
  { id: "interior", label: "Interior" },
  { id: "technology", label: "Technology" },
  { id: "experience", label: "Experience" },
];

// Sticky glassmorphism pill nav, sitting under the site header.
export default function WulingNav() {
  const [active, setActive] = useState("model");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-[4.5rem] z-40 -mb-16 px-3 sm:px-6 pt-2">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.08] px-4 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.2em] text-white">
            Maporn
            <br />
            Autogroup
          </span>
          <span className="h-7 w-px bg-white/25" />
          <span className="flex h-8 items-center rounded-md bg-white px-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logos/wuling.png" alt="Wuling" className="h-5 w-auto object-contain" />
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`border-b pb-0.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                active === s.id ? "border-[#D8BFA0] text-white" : "border-transparent text-white/60 hover:text-white"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/test-drive?brand=wuling"
            className="rounded-lg border border-white/40 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#101114]"
          >
            ทดลองขับ
          </Link>
          <Link
            href="/quotation?brand=wuling"
            className="hidden sm:inline-flex rounded-lg bg-[#D8BFA0] px-4 py-2 text-[11px] font-bold text-[#231b10] transition-all hover:brightness-110"
          >
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </div>
  );
}
