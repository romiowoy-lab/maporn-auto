"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, MessageCircle, Navigation, ArrowRight } from "lucide-react";
import { Branch } from "@/lib/types";
import { telHref } from "@/lib/utils";
import { BRANCH_PHOTO, BRANCH_PHOTO_POSITION } from "@/components/branches/BranchCard";

// /branches — a calm grid of showroom cards: photo with the red name band, then only what people need
// to act (address, hours, phone) and three buttons. The map, Facebook and department numbers live on
// each branch's own page ("ดูรายละเอียดสาขา").
const RED = "#FF4D4D";

const lineHref = (b: Branch) => b.lineUrl ?? `https://line.me/R/ti/p/${b.line}`;
const mapsHref = (b: Branch) => b.googleMapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`;

function BranchCard({ b }: { b: Branch }) {
  const photo = BRANCH_PHOTO[b.slug];
  // Keep the brand: several Rayong showrooms share an address, so "Maporn ระยอง" alone looks duplicated
  const short = b.name.replace("Maporn Autogroup ", "").replace("Maporn", "มาพร");

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/branches/${b.slug}`} className="group relative block aspect-[16/10] overflow-hidden bg-white/5">
        {photo && (
          <Image
            src={photo}
            alt={b.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: BRANCH_PHOTO_POSITION[b.slug] ?? "center" }}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-brand-red-gradient px-5 py-3">
          <h2 className="text-lg font-extrabold leading-tight text-white">{short}</h2>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <ul className="space-y-3 text-sm text-white/75">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: RED }} />
            <span className="leading-relaxed">{b.address}</span>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0" style={{ color: RED }} />
            <span>{b.hours}</span>
          </li>
          <li>
            <a href={telHref(b.phone)} className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-white hover:text-[#FF4D4D]">
              <Phone className="h-4 w-4 shrink-0" style={{ color: RED }} />
              {b.phone}
            </a>
          </li>
        </ul>

        <div className="mt-auto pt-5">
          <div className="grid grid-cols-3 gap-2">
            <a href={telHref(b.phone)} className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white hover:text-[#101113]">
              <Phone className="h-4 w-4" /> โทร
            </a>
            <a href={lineHref(b)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl bg-[#06C755] py-2.5 text-xs font-bold text-white transition-all hover:brightness-110">
              <MessageCircle className="h-4 w-4" /> LINE
            </a>
            <a href={mapsHref(b)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-red-gradient py-2.5 text-xs font-bold text-white transition-all hover:brightness-110">
              <Navigation className="h-4 w-4" /> Google Map
            </a>
          </div>
          <Link href={`/branches/${b.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 transition-colors hover:text-white">
            ดูรายละเอียดสาขา <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BranchExplorer({ branches }: { branches: Branch[] }) {
  const [province, setProvince] = useState("");
  const provinces = useMemo(() => Array.from(new Set(branches.map((b) => b.province))), [branches]);
  const filtered = province ? branches.filter((b) => b.province === province) : branches;
  const tabs = [{ key: "", label: "ทั้งหมด", count: branches.length }, ...provinces.map((p) => ({ key: p, label: p, count: branches.filter((b) => b.province === p).length }))];

  return (
    <div>
      <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {tabs.map((t) => {
          const active = province === t.key;
          return (
            <button
              key={t.key || "all"}
              type="button"
              onClick={() => setProvince(t.key)}
              aria-pressed={active}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active ? "border-transparent bg-brand-red-gradient text-white" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {t.label}
              <span className={`ml-1.5 ${active ? "text-white/80" : "text-white/40"}`}>{t.count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-12 text-center text-sm text-white/60">ไม่พบสาขาในจังหวัดนี้</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <BranchCard key={b.slug} b={b} />
          ))}
        </div>
      )}
    </div>
  );
}
