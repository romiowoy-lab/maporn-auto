"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock, Navigation } from "lucide-react";
import type { Branch } from "./page";

interface Props {
  branches: Branch[];
}

const PROVINCES = ["ทั้งหมด", "กรุงเทพมหานคร", "ปทุมธานี", "ชลบุรี", "ระยอง"];

export default function BranchExplorerClient({ branches }: Props) {
  const [filter, setFilter] = useState("ทั้งหมด");

  const filtered =
    filter === "ทั้งหมด" ? branches : branches.filter((b) => b.province === filter);

  return (
    <div>
      {/* Province filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {PROVINCES.map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
              filter === p
                ? "bg-brand-red text-white border-brand-red"
                : "border-brand-line text-brand-navy hover:border-brand-red hover:text-brand-red"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((b) => (
          <div
            key={b.slug}
            className="card-elevated p-5 flex flex-col justify-between rounded-xl border border-brand-line/60 bg-white hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div>
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-navy bg-brand-line/30 rounded">
                  {b.province}
                </span>
                <h3 className="mt-1.5 font-bold text-brand-navy text-base leading-snug">{b.name}</h3>
              </div>

              <div className="flex items-start gap-2 text-xs text-brand-slate leading-relaxed">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <span>{b.address}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-brand-slate">
                <Clock className="h-4 w-4 shrink-0 text-brand-slate/70" />
                <span>{b.hours}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-brand-line/40 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${b.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-line px-3 py-2 text-xs font-medium text-brand-navy hover:bg-brand-navy hover:text-white transition-all"
                >
                  <Phone className="h-3.5 w-3.5" /> โทร
                </a>
                {b.lineUrl && (
                  <a
                    href={b.lineUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-[#06C755] px-3 py-2 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> LINE
                  </a>
                )}
              </div>
              {b.mapUrl && (
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-line px-3 py-2 text-xs font-medium text-brand-slate hover:bg-brand-line/30 transition-colors"
                >
                  <Navigation className="h-3.5 w-3.5" /> ดูเส้นทาง Google Maps
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-brand-slate py-12">ไม่พบสาขาในจังหวัดที่เลือก</p>
      )}
    </div>
  );
}
