import Link from "next/link";
import type { Metadata } from "next";
import { serviceOfferings, branches } from "@/lib/data/branches";
import BranchCard from "@/components/branches/BranchCard";

export const metadata: Metadata = {
  title: "ศูนย์บริการ",
  description: "ศูนย์บริการมาตรฐาน Maporn Autogroup บริการ Maintenance, Repair, Body & Paint และอะไหล่แท้ครบทุกแบรนด์",
};

export default function ServicePage() {
  const serviceCenters = branches.filter((b) => b.isServiceCenter);

  return (
    <div>
      <section className="bg-brand-navy text-white py-16 sm:py-20">
        <div className="container-page">
          <p className="section-eyebrow-light mb-2">Service Center</p>
          <h1 className="text-3xl sm:text-5xl font-black max-w-2xl">ศูนย์บริการมาตรฐาน ดูแลรถคุณครบวงจร</h1>
          <p className="mt-4 max-w-xl text-white/70 text-sm sm:text-base">
            ทีมช่างผู้เชี่ยวชาญที่ผ่านการอบรมมาตรฐานจากทุกแบรนด์ พร้อมอะไหล่แท้และอุปกรณ์ตรวจเช็กทันสมัย
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/service/appointment" className="btn-red">
              นัดหมายเข้าศูนย์บริการ
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <h2 className="text-2xl font-bold text-brand-navy mb-8">บริการของเรา</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceOfferings.map((s) => (
            <div key={s.title} className="card-elevated p-6">
              <h3 className="font-bold text-brand-navy mb-2">{s.title}</h3>
              <p className="text-sm text-brand-slate leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-14 sm:pb-20">
        <div className="rounded-3xl bg-white border border-brand-line p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <span className="shrink-0 h-16 w-16 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-black text-xl">
            SF
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-red mb-1">Suzuki Official Service</p>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-navy">Suzy Fix</h2>
            <p className="mt-2 text-sm text-brand-slate leading-relaxed max-w-2xl">
              ศูนย์บริการมาตรฐานภายใต้แบรนด์ Suzuki ดูแลโดยทีมช่างที่ผ่านการรับรองจาก Suzuki โดยตรง
              พร้อมอะไหล่แท้และมาตรฐานการซ่อมบำรุงเดียวกับโรงงาน
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 sm:py-20">
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
