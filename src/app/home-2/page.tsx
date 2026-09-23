import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { getBrandGroups } from "@/lib/data/brandGroups";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "HomePage 2 (Demo)",
  description: "หน้าแรกทางเลือก B — Split Showroom, single-viewport layout สำหรับเปรียบเทียบ UX/UI กับหน้าแรกหลัก",
  robots: { index: false, follow: false },
};

const SHOWCASE_IMAGE: Record<string, string> = {
  suzuki: "/brand/cutouts/suzuki-fronx-cutout.png",
  farizon: "/brand/showcase/farizon.jpg",
  wuling: "/brand/showcase/wuling.jpg",
  nex: "/brand/showcase/nex.jpg",
  gwm: "/brand/showcase/gwm.jpg",
  "omoda-jaecoo": "/brand/showcase/omoda-jaecoo.jpg",
  lepas: "/brand/showcase/lepas.jpg",
};
// Only Suzuki has a real transparent cutout asset — every other brand uses its
// real dealership photo, so those get object-contain (not a fabricated cutout).
const IS_CUTOUT: Record<string, boolean> = { suzuki: true };

export default function HomePage2Demo() {
  const brandGroups = getBrandGroups();
  const yearsTrusted = new Date().getFullYear() - Number(company.foundedYear);

  return (
    <div className="w-full overflow-x-hidden bg-[#0a0d14] text-[#f5f5f4]">
      {/* Demo banner so this never gets mistaken for the live homepage */}
      <div className="bg-amber-500 text-black text-center text-[10px] font-bold py-1">
        DEMO — HomePage 2 (Option B: Split Showroom) · ไม่ใช่หน้าแรกจริงของเว็บ
      </div>

      {/* Single-viewport stage: 100vh minus the real site header (~65px) and this demo strip (~24px) */}
      <div className="h-[calc(100vh-89px)] w-full overflow-hidden flex flex-col lg:flex-row">
        {/* ================= LEFT 40% — Master Brand ================= */}
        <div className="relative flex flex-col justify-center w-full lg:w-[40%] shrink-0 px-8 sm:px-12 py-6 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden">
          {/* Spotlight ambient glow behind the branding */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[380px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[180px] bg-amber-400/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative">
            <Link href="/" className="flex items-center gap-2.5 w-fit mb-6">
              <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center overflow-hidden shadow">
                <Image src="/Maporn.png" alt="Maporn" width={36} height={36} className="h-7 w-7 object-contain" />
              </div>
              <span className="text-xs font-bold tracking-wider text-white">
                MAPORN <span className="text-amber-400 font-normal">AUTO GROUP</span>
              </span>
            </Link>

            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/[0.03] backdrop-blur-md border border-amber-500/25 text-amber-400 text-[10px] font-semibold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse mr-2" />
              {yearsTrusted}+ ปีแห่งความไว้วางใจ
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.08] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 drop-shadow-[0_0_28px_rgba(212,175,55,0.35)]">
              MAPORN
              <br />
              AUTO GROUP
            </h1>
            <p className="text-white/70 text-sm mt-3 max-w-xs leading-relaxed">
              ผู้นำด้านยานยนต์และศูนย์บริการครบวงจร ตลอด {yearsTrusted} ปี ตัวแทนจำหน่ายอย่างเป็นทางการ 7 แบรนด์ชั้นนำ
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 mt-6 max-w-sm">
              <Link
                href="/brands"
                className="shimmer-btn relative overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-600 text-black font-bold text-xs text-center shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition-transform hover:scale-[1.02]"
              >
                <span className="relative z-10">เลือกชม 7 แบรนด์ชั้นนำ</span>
                <span className="shimmer-sweep" aria-hidden="true" />
              </Link>
              <Link
                href="/service"
                className="px-5 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/20 text-white font-medium text-xs text-center hover:bg-white/10 hover:border-white/30 transition-colors"
              >
                ศูนย์บริการซ่อมสี &amp; ตัวถัง
              </Link>
            </div>

            <div className="flex items-stretch gap-0 max-w-xs mt-8">
              <div className="pr-4">
                <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500">
                  {yearsTrusted}
                  <span>+</span>
                </p>
                <p className="text-[9px] text-white/40 mt-0.5">ปีในธุรกิจ</p>
              </div>
              <div className="border-l border-white/10 pl-4 pr-4">
                <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500">7</p>
                <p className="text-[9px] text-white/40 mt-0.5">แบรนด์ในเครือ</p>
              </div>
              <div className="border-l border-white/10 pl-4">
                <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500">
                  {company.branchCount}
                </p>
                <p className="text-[9px] text-white/40 mt-0.5">สาขาทั่วประเทศ</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT 60% — 2x4 brand grid, no scroll ================= */}
        <div className="relative flex-1 min-h-0 px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 h-full content-center">
            {brandGroups.map((g) => (
              <Link
                key={g.key}
                href={g.href}
                className="brand-card group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-2.5 sm:p-3 transition-all duration-500 ease-out hover:border-amber-500/50"
              >
                <div className="relative h-16 w-20 sm:h-20 sm:w-24 shrink-0 overflow-visible">
                  {/* Light-flare glow behind the car */}
                  <div
                    className="absolute inset-0 m-auto h-12 w-12 rounded-full blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                    style={{ background: g.colorHex }}
                  />
                  {SHOWCASE_IMAGE[g.key] && (
                    <Image
                      src={SHOWCASE_IMAGE[g.key]}
                      alt={g.name}
                      fill
                      sizes="140px"
                      className={`relative object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 ${
                        IS_CUTOUT[g.key] ? "" : "scale-125"
                      }`}
                    />
                  )}
                </div>
                <div className="relative min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    {g.logo && (
                      <span className="relative h-4 w-4 shrink-0 rounded-full bg-white p-0.5">
                        <Image src={g.logo} alt="" fill className="object-contain p-px" />
                      </span>
                    )}
                    <span className="text-sm sm:text-base font-bold text-white truncate">{g.name}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold mt-0.5 inline-block text-amber-400/90 group-hover:text-amber-300 transition-colors">
                    ดูรุ่นรถ →
                  </span>
                </div>
              </Link>
            ))}

            {/* Slot #8 — Maporn Service & Body Paint Center: metallic gold gradient border, balances the 2x4 grid */}
            <Link href="/service#suzy-fix" className="group relative rounded-xl p-[1.5px] bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 transition-transform duration-500 ease-out hover:scale-[1.015]">
              <div className="flex h-full items-center gap-3 rounded-[10px] bg-[#0d1018]/95 backdrop-blur-xl p-2.5 sm:p-3">
                <div className="relative flex h-16 w-20 sm:h-20 sm:w-24 shrink-0 items-center justify-center overflow-visible">
                  <div className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-amber-400 blur-xl opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
                  <Wrench className="relative h-7 w-7 sm:h-8 sm:w-8 text-amber-300 drop-shadow-[0_0_12px_rgba(212,175,55,0.8)] transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-sm sm:text-base font-bold text-white block truncate">Maporn Service</span>
                  <span className="text-[10px] sm:text-[11px] text-white/50 block truncate">ศูนย์ซ่อมสี &amp; ตัวถัง (Suzy Fix)</span>
                  <span className="text-[10px] sm:text-[11px] font-semibold mt-0.5 inline-block text-amber-300">จองคิวบริการ →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .brand-card:hover {
          box-shadow: 0 0 0 1px rgba(212,175,55,0.25), 0 12px 32px -12px rgba(212,175,55,0.35);
          transform: translateY(-3px);
        }
        .shimmer-btn { isolation: isolate; }
        .shimmer-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%);
          transform: translateX(-120%);
          transition: transform 0.6s ease;
        }
        .shimmer-btn:hover .shimmer-sweep {
          transform: translateX(120%);
        }
      `}</style>
    </div>
  );
}
