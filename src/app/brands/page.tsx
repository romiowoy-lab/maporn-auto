import Link from "next/link";
import type { Metadata } from "next";
import { getBrandGroups } from "@/lib/data/brandGroups";

export const metadata: Metadata = {
  title: "แบรนด์รถยนต์ Suzuki GWM OMODA JAECOO Lepas Wuling Farizon",
  description: "รวมแบรนด์รถยนต์ในเครือ Maporn Autogroup OJ (OMODA & JAECOO), GWM, Suzuki, Lepas, Wuling และ Farizon เลือกแบรนด์ ดูรุ่น และจองทดลองขับ",
};

// Display order per client: OJ, GWM, Suzuki, Lepas, Wuling, Farizon, Suzy Fix.
const ORDER = ["omoda-jaecoo", "gwm", "suzuki", "lepas", "wuling", "farizon"];

export default function BrandsPage() {
  const groups = [...getBrandGroups()].sort((a, b) => ORDER.indexOf(a.key) - ORDER.indexOf(b.key));

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <div className="container-page py-10 sm:py-14">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">แบรนด์ที่มาพร ออโต้ กรุ๊ป จัดจำหน่าย</h1>
          <p className="mt-2 text-brand-slate text-sm max-w-2xl">
            Maporn Autogroup เป็นตัวแทนจำหน่ายอย่างเป็นทางการของ 7 แบรนด์รถยนต์ชั้นนำ ครอบคลุมทุกไลฟ์สไตล์การเดินทาง
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {groups.map((g) => (
            <Link
              key={g.key}
              href={g.href}
              className="brand-tile group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-brand-red/30 active:scale-[0.98] active:duration-100"
            >
              <div className="flex h-32 sm:h-36 items-center justify-center gap-4">
                {g.isCombined ? (
                  <img
                    src={g.logo}
                    alt="OMODA | JAECOO"
                    className="h-auto w-[85%] object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                ) : g.logo ? (
                  <img
                    src={g.logo}
                    alt={g.name}
                    className="h-16 sm:h-20 w-auto max-w-[70%] object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                ) : (
                  <span className="text-2xl font-bold tracking-wide text-brand-navy">{g.name}</span>
                )}
              </div>
              <div className="mt-2 border-t border-black/[0.06] pt-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold tracking-wide text-brand-navy">{g.name}</h2>
                </div>
                <span className="inline-block mt-2 text-sm font-medium text-brand-slate underline decoration-black/15 underline-offset-4 transition-colors group-hover:text-brand-red group-hover:decoration-brand-red/40">
                  ดูรายละเอียดแบรนด์ →
                </span>
              </div>
            </Link>
          ))}

          {/* Suzy Fix — real Suzuki-official body/paint service center, not a brand, but
              included as its own tile per this page's requested order. */}
          <Link
            href="/branches/suzy-fix"
            className="brand-tile group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-brand-red/30 active:scale-[0.98] active:duration-100"
          >
            <div className="flex h-32 sm:h-36 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logos/suzyfix.png" alt="Suzy Fix" className="h-auto w-[70%] object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
            </div>
            <div className="mt-2 border-t border-black/[0.06] pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold tracking-wide text-brand-navy">Suzy Fix</h2>
              </div>
              <span className="inline-block mt-2 text-sm font-medium text-brand-slate underline decoration-black/15 underline-offset-4 transition-colors group-hover:text-brand-red group-hover:decoration-brand-red/40">
                ดูรายละเอียดแบรนด์ →
              </span>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .brand-tile:hover { box-shadow: 0 16px 35px -12px rgba(0,0,0,0.12); }
      `}</style>
    </div>
  );
}
