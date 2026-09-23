"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Phone, MessageCircle, ExternalLink, Navigation } from "lucide-react";
import { Branch } from "@/lib/types";
import { getBrand } from "@/lib/data/brands";
import { company } from "@/lib/data/company";
import { BRANCH_PHOTO } from "@/components/branches/BranchCard";

// Only these branches' phone / LINE are verified against a real source (legacy Suzuki site).
// Other branches still hold placeholder contact data, so their cards fall back to the
// head-office number and the company LINE instead of showing unverified details.
const VERIFIED_CONTACT = new Set(["srinakarin", "rayong"]);

function mapsHref(mapQuery: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
}

function FacebookGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14 8.5h2V5.5h-2c-1.93 0-3.5 1.57-3.5 3.5v1.5H8.5v3H10.5V22h3v-8.5H15.83l.5-3H13.5V9c0-.28.22-.5.5-.5Z" />
    </svg>
  );
}

function BranchWideCard({ b }: { b: Branch }) {
  const verified = VERIFIED_CONTACT.has(b.slug);
  const phone = verified ? b.phone : company.phone;
  const lineId = verified ? b.line : company.line;
  const photo = BRANCH_PHOTO[b.slug];
  const short = b.name.replace("Maporn Autogroup ", "");

  return (
    <article className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
      <div className="grid lg:grid-cols-[0.9fr_1fr_1.1fr]">
        {/* Photo */}
        <div className="relative min-h-[260px] lg:min-h-full">
          {photo && <Image src={photo} alt={b.name} fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover" />}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {b.isShowroom && <span className="rounded-full bg-brand-red px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow">Showroom</span>}
            {b.isServiceCenter && <span className="rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-brand-navy shadow">Service Center</span>}
          </div>
          <div className="absolute bottom-4 left-5 right-5 text-white" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85), 0 6px 22px rgba(0,0,0,0.6)" }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">{b.province}</p>
            <h3 className="mt-1 text-xl font-extrabold leading-tight sm:text-2xl">{short}</h3>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/70 p-4">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
            <p className="text-sm leading-relaxed text-brand-navy">{b.address}</p>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
            <p className="text-sm leading-relaxed text-brand-navy">{b.hours}</p>
          </div>
          <div className="rounded-xl border border-black/[0.06] bg-white p-4">
            <p className="text-[11px] font-semibold text-brand-slate">{verified ? "ติดต่อสาขา" : "ติดต่อสอบถาม (สำนักงานใหญ่)"}</p>
            <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="mt-1 flex items-center gap-2 text-2xl font-extrabold tracking-tight text-brand-navy hover:text-brand-red">
              <Phone className="h-5 w-5 text-brand-red" />
              {phone}
            </a>
          </div>

          {b.brands.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {b.brands.map((slug) => {
                const br = getBrand(slug);
                if (!br) return null;
                return (
                  <span key={slug} className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ backgroundColor: br.colorHex }}>
                    {br.name}
                  </span>
                );
              })}
            </div>
          )}

          <div className="mt-auto grid grid-cols-3 gap-2 pt-1">
            <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="flex flex-col items-center gap-1 rounded-xl border border-sky-100 bg-sky-50 py-3 text-[11px] font-bold text-sky-800 transition-colors hover:bg-sky-100">
              <Phone className="h-5 w-5" />
              โทร
            </a>
            <a href={`https://line.me/R/ti/p/${encodeURIComponent(lineId)}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 rounded-xl border border-green-100 bg-green-50 py-3 text-[11px] font-bold text-green-800 transition-colors hover:bg-green-100">
              <MessageCircle className="h-5 w-5" />
              LINE
            </a>
            <a href={company.facebook} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 rounded-xl border border-blue-100 bg-blue-50 py-3 text-[11px] font-bold text-blue-800 transition-colors hover:bg-blue-100">
              <FacebookGlyph className="h-5 w-5" />
              Facebook
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="flex flex-col border-t border-black/[0.06] lg:border-l lg:border-t-0">
          <div className="relative min-h-[260px] flex-1 bg-slate-100">
            <iframe
              title={`แผนที่ ${b.name}`}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(b.mapQuery)}&output=embed`}
            />
            <a
              href={mapsHref(b.mapQuery)}
              target="_blank"
              rel="noreferrer"
              className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-sky-700 shadow-md hover:bg-sky-50"
            >
              เปิดใน Maps <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="grid gap-2 p-4 sm:grid-cols-2">
            <a
              href={mapsHref(b.mapQuery)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-red"
            >
              <Navigation className="h-4 w-4" />
              เปิดเส้นทาง Google Maps
            </a>
            <Link
              href={`/test-drive?branch=${b.slug}`}
              className="inline-flex items-center justify-center rounded-xl border border-brand-navy/20 px-4 py-3 text-sm font-bold text-brand-navy transition-colors hover:border-brand-red hover:text-brand-red"
            >
              นัดหมายเข้าชม
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BranchExplorer({ branches }: { branches: Branch[] }) {
  const [province, setProvince] = useState("");
  const provinces = useMemo(() => Array.from(new Set(branches.map((b) => b.province))), [branches]);
  const filtered = province ? branches.filter((b) => b.province === province) : branches;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {[{ key: "", label: "ทั้งหมด", count: branches.length }, ...provinces.map((p) => ({ key: p, label: p, count: branches.filter((b) => b.province === p).length }))].map((t) => (
          <button
            key={t.key || "all"}
            type="button"
            onClick={() => setProvince(t.key)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              province === t.key ? "border-brand-navy bg-brand-navy text-white" : "border-brand-line text-brand-slate hover:border-brand-navy hover:text-brand-navy"
            }`}
          >
            {t.label}
            <span className="ml-1.5 opacity-60">{t.count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card-elevated p-12 text-center text-sm text-brand-slate">ไม่พบสาขาในจังหวัดนี้</div>
      ) : (
        <div className="space-y-8">
          {filtered.map((b) => (
            <BranchWideCard key={b.slug} b={b} />
          ))}
        </div>
      )}
    </div>
  );
}
