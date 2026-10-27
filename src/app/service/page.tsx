import Image from "next/image";
import type { Metadata } from "next";
import { Wrench, Settings, PaintBucket, PackageSearch, ShieldCheck, Siren, MapPin } from "lucide-react";
import { serviceOfferings, branches } from "@/lib/data/branches";
import { BRANCH_PHOTO, BRANCH_PHOTO_POSITION } from "@/components/branches/BranchCard";
import ShowroomTile from "@/components/branches/ShowroomTile";

export const metadata: Metadata = {
  title: "ศูนย์บริการและซ่อมสีตัวถัง Suzy Fix",
  description: "ศูนย์บริการ Maporn Autogroup ซ่อมบำรุง ซ่อมสีและตัวถังด้วย Suzy Fix อะไหล่แท้ พร้อมข้อมูลสาขาและแผนที่",
};

// Real service icons, matched by keyword against the real serviceOfferings titles
// (lib/data/branches.ts) — no fabricated service categories.
const SERVICE_ICON: Record<string, typeof Wrench> = {
  เช็คระยะ: Wrench,
  ซ่อมทั่วไป: Settings,
  สีและตัวถัง: PaintBucket,
  อะไหล่: PackageSearch,
  หมดประกัน: ShieldCheck,
  ฉุกเฉิน: Siren,
};

function iconFor(title: string) {
  const key = Object.keys(SERVICE_ICON).find((k) => title.includes(k));
  return key ? SERVICE_ICON[key] : Wrench;
}

export default function ServicePage() {
  // Body & paint shops first (branch flag), then every other showroom
  const bodyPaintCenters = branches.filter((b) => b.hasBodyPaint);
  const showroomCenters = branches.filter((b) => b.isShowroom && !b.hasBodyPaint);

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
              <div
                key={s.title}
                className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
              >
                <Icon className="h-9 w-9 text-brand-red" />
                <h3 className="mt-5 font-bold text-brand-navy text-lg leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm text-brand-slate leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICE CENTERS — same dark showroom cards as the homepage; body & paint shops first */}
      <section id="service-centers" className="bg-[#101113] py-14 sm:py-20 scroll-mt-24 text-white">
        <div className="container-page">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">ศูนย์บริการทั่วประเทศ</h2>
          <p className="mt-2 text-sm text-white/65 sm:text-base">{bodyPaintCenters.length + showroomCenters.length} สาขา ครอบคลุมกรุงเทพฯ ปริมณฑล และภาคตะวันออก</p>

          <div className="mt-10 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#FF4D4D]"><PaintBucket className="h-5 w-5" /></span>
            <h3 className="text-lg font-bold">ศูนย์บริการ + ซ่อมสีและตัวถัง ({bodyPaintCenters.length})</h3>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bodyPaintCenters.map((b) => (
              <ShowroomTile key={b.slug} branch={b} label={b.name.replace("Maporn ", "")} image={BRANCH_PHOTO[b.slug]} position={BRANCH_PHOTO_POSITION[b.slug]} />
            ))}
          </div>

          <div className="mt-12 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white"><Wrench className="h-5 w-5" /></span>
            <h3 className="text-lg font-bold">โชว์รูมและศูนย์บริการ ({showroomCenters.length})</h3>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showroomCenters.map((b) => (
              <ShowroomTile key={b.slug} branch={b} label={b.name.replace("Maporn ", "")} image={BRANCH_PHOTO[b.slug]} position={BRANCH_PHOTO_POSITION[b.slug]} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
