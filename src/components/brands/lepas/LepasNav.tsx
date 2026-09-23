"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SECTIONS = [
  { id: "hero", label: "L6" },
  { id: "design", label: "Design" },
  { id: "interior", label: "Interior" },
  { id: "technology", label: "Technology" },
  { id: "experience", label: "Experience" },
];

export default function LepasNav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <div
      className={`sticky top-16 z-40 w-full border-b transition-colors duration-300 ${
        scrolled ? "bg-[#0a0a0b]/95 backdrop-blur-md border-white/[0.08]" : "bg-[#0a0a0b] border-white/[0.06]"
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-9 items-center rounded-md bg-white px-2.5 py-1">
            <Image
              src="/brand/logos/lepas-maporn-rayong.png"
              alt="Lepas Maporn Rayong"
              width={1577}
              height={472}
              className="h-full w-auto object-contain"
            />
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                active === s.id ? "text-[#C9A15A]" : "text-white/50 hover:text-white"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/test-drive?brand=lepas"
            className="rounded-full border border-white/25 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#0a0a0b]"
          >
            ทดลองขับ
          </Link>
          <Link
            href="/quotation?brand=lepas"
            className="hidden sm:inline-flex rounded-full bg-gradient-to-r from-[#C9A15A] to-[#E8C77E] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#1a1408] transition-all hover:brightness-110"
          >
            ขอใบเสนอราคา
          </Link>
        </div>
      </div>
    </div>
  );
}
