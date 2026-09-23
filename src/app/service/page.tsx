import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Wrench, Settings, PaintBucket, PackageSearch, ShieldCheck, Siren, MapPin, ChevronRight } from "lucide-react";
import { serviceOfferings, branches } from "@/lib/data/branches";
import SuzyFixGallery from "@/components/service/SuzyFixGallery";
import BranchCard from "@/components/branches/BranchCard";

export const metadata: Metadata = {
  title: "ศูนย์บริการและซ่อมสีตัวถัง Suzy Fix",
  description: "ศูนย์บริการ Maporn Autogroup ซ่อมบำรุง ซ่อมสีและตัวถังด้วย Suzy Fix อะไหล่แท้ พร้อมข้อมูลสาขาและแผนที่",
};

// Real service icons, matched by keyword against the real serviceOfferings titles
// (lib/data/branches.ts) — no fabricated service categories.
const SERVICE_ICON: Record<string, typeof Wrench> = {
  Maintenance: Wrench,
  Repair: Settings,
  Body: PaintBucket,
  Spare: PackageSearch,
  ตรวจเช็ก: ShieldCheck,
  Roadside: Siren,
};

function iconFor(title: string) {
  const key = Object.keys(SERVICE_ICON).find((k) => title.includes(k));
  return key ? SERVICE_ICON[key] : Wrench;
}

export default function ServicePage() {
  const serviceCenters = branches.filter((b) => b.isServiceCenter && b.slug !== "sriracha" && b.slug !== "lamlukka");

  return (
    <div className="bg-[#F7F7F5]">
      {/* HERO — real photo, dark overlay kept here only for text legibility over the image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/brand/maporn-bodyshop-illustrated.jpg"
            alt="ศูนย์บริการมาตรฐาน Maporn"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-[#F7F7F5]" />
        </div>

        <div className="relative container-page py-20 sm:py-28">
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-bold text-white backdrop-blur-sm">
            SERVICE CENTER
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl md:text-6xl font-bold text-white leading-tight">
            ศูนย์บริการมาตรฐาน ดูแลรถคุณครบวงจร
          </h1>
          <p className="mt-5 max-w-xl text-white/80 text-sm sm:text-base leading-relaxed">
            ทีมช่างผู้เชี่ยวชาญที่ผ่านการอบรมมาตรฐานจากทุกแบรนด์ พร้อมอะไหล่แท้และอุปกรณ์ตรวจเช็กทันสมัย
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/service/appointment"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(223,0,0,0.5)] transition-all hover:brightness-110"
            >
              นัดหมายเข้าศูนย์บริการ
            </Link>
            <a
              href="#service-centers"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40"
            >
              <MapPin className="h-4 w-4" />
              ค้นหาศูนย์บริการใกล้บ้าน
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="container-page py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">บริการของเรา</h2>
          <p className="mt-3 text-sm sm:text-base text-brand-slate">
            ยกระดับมาตรฐานการดูแลรักษารถยนต์ระดับพรีเมียม ครอบคลุมทุกความต้องการ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceOfferings.map((s) => {
            const Icon = iconFor(s.title);
            return (
              <Link
                key={s.title}
                href="/service/appointment"
                className="group rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-red/40"
              >
                <Icon className="h-9 w-9 text-brand-red" />
                <h3 className="mt-5 font-bold text-brand-navy text-lg leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm text-brand-slate leading-relaxed">{s.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-slate transition-colors group-hover:text-brand-red">
                  จองบริการนี้
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SUZY FIX */}
      <section id="suzy-fix" className="relative scroll-mt-24 overflow-hidden bg-[#14110F] py-16 sm:py-24 text-white">
        {/* warm workshop glow, echoing the orange bays in the photos */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-[#F26A1B]/[0.12] blur-[140px]" />
        <div className="container-page relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <span className="shrink-0 h-16 w-16 rounded-2xl bg-[#F26A1B] text-white flex items-center justify-center font-black text-xl shadow-[0_10px_30px_rgba(242,106,27,0.35)]">
              SF
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF9A57] mb-1">Suzuki Official Service</p>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Suzy Fix</h2>
              <p className="mt-3 text-base text-white/85 leading-relaxed max-w-2xl">
                ศูนย์บริการมาตรฐานภายใต้แบรนด์ Suzuki ดูแลโดยทีมช่างที่ผ่านการรับรองจาก Suzuki โดยตรง
                พร้อมอะไหล่แท้และมาตรฐานการซ่อมบำรุงเดียวกับโรงงาน
              </p>
            </div>
          </div>
          <SuzyFixGallery />
        </div>
      </section>

      {/* SERVICE CENTERS — real branch data, shared BranchCard component (light theme, unchanged) */}
      <section id="service-centers" className="bg-white py-14 sm:py-20 scroll-mt-24">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-brand-navy mb-8">ศูนย์บริการทั่วประเทศ ({serviceCenters.length})</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceCenters.map((b) => (
              <BranchCard key={b.slug} branch={b} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
