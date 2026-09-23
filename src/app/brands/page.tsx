import Link from "next/link";
import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import { getBrandGroups } from "@/lib/data/brandGroups";
import { getBrand } from "@/lib/data/brands";

export const metadata: Metadata = {
  title: "แบรนด์รถยนต์ Suzuki GWM OMODA JAECOO Lepas Wuling Farizon Nex",
  description: "รวม 7 แบรนด์รถยนต์ในเครือ Maporn Autogroup Suzuki, Farizon, Nex, OMODA | JAECOO, Lepas, Wuling และ GWM เลือกแบรนด์ ดูรุ่น และจองทดลองขับ",
};

// Display order requested for this page: Suzuki, OMODA|JAECOO, GWM, Lepas, Wuling, Farizon, Nex, Suzy Fix.
const ORDER = ["suzuki", "omoda-jaecoo", "gwm", "lepas", "wuling", "farizon", "nex"];

export default function BrandsPage() {
  const groups = [...getBrandGroups()].sort((a, b) => ORDER.indexOf(a.key) - ORDER.indexOf(b.key));
  const jaecoo = getBrand("jaecoo");

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <div className="container-page py-10 sm:py-14">
        <div className="mb-10">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-red mb-3">
            <span className="h-px w-6 bg-brand-red/60" />
            Our Brands
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">แบรนด์รถยนต์ทั้งหมด</h1>
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
                  <>
                    <img
                      src={g.logo}
                      alt="OMODA"
                      className="h-12 sm:h-14 w-auto max-w-[40%] object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <span className="h-10 w-px bg-black/10" />
                    {jaecoo?.logo && (
                      <img
                        src={jaecoo.logo}
                        alt="JAECOO"
                        className="h-12 sm:h-14 w-auto max-w-[40%] object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    )}
                  </>
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
            href="/service#suzy-fix"
            className="brand-tile group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-brand-red/30 active:scale-[0.98] active:duration-100"
          >
            <div className="flex h-32 sm:h-36 items-center justify-center">
              <Wrench className="h-14 w-14 sm:h-16 sm:w-16 text-brand-red transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
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
