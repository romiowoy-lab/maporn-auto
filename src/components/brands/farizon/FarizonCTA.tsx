"use client";

import { ExternalLink } from "lucide-react";
import { SALES_SITE_URL } from "@/lib/data/farizonData";

export default function FarizonCTA() {
  return (
    <section className="border-t border-white/10 bg-[#0B0F12] py-20 sm:py-28 text-center">
      <div className="container-page">
        <h2 className="mx-auto max-w-3xl text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">Find the right Farizon for your business</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#E2E8F0]/70">
          Discover complete vehicle specifications or visit our dedicated sales platform for purchasing options.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#overview" className="rounded-md bg-white px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-black transition-colors hover:bg-[#E2E8F0]">
            Explore Farizon
          </a>
          {SALES_SITE_URL ? (
            <a
              href={SALES_SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:border-[#00F0FF] hover:text-[#00F0FF]"
            >
              Visit Farizon sales website <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="รอลิงก์เว็บไซต์ขายอย่างเป็นทางการ"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-white/10 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-white/35"
            >
              Visit Farizon sales website <ExternalLink className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
        {!SALES_SITE_URL && <p className="mt-3 text-[11px] text-white/35">รอลิงก์เว็บไซต์ขายอย่างเป็นทางการ</p>}
      </div>
    </section>
  );
}
