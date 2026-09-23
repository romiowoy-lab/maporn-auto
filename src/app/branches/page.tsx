import type { Metadata } from "next";
import Image from "next/image";
import { branches } from "@/lib/data/branches";
import BranchExplorer from "@/components/branches/BranchExplorer";

export const metadata: Metadata = {
  title: "โชว์รูมและศูนย์บริการ กรุงเทพ ปทุมธานี ระยอง ศรีราชา",
  description: "ค้นหาโชว์รูมและศูนย์บริการ Maporn Autogroup พร้อมที่อยู่ แผนที่ และแบรนด์ที่จำหน่ายในแต่ละสาขา",
};

export default function BranchesPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-navy text-white">
        {/* Full-bleed background photo (fills 100% of the hero, no empty area) */}
        <Image
          src="/brand/branches-network-map.jpg"
          alt="แผนที่เครือข่ายโชว์รูมและศูนย์บริการ Maporn Autogroup กรุงเทพฯ ชลบุรี ระยอง"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "70% 8%" }}
        />
        <div className="container-page relative z-10 flex min-h-[520px] items-center py-16 sm:min-h-[600px] sm:py-20">
          <div style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75), 0 8px 28px rgba(0,0,0,0.55)" }}>
            <p className="section-eyebrow-light mb-3">Showroom Network</p>
            <h1 className="text-display text-white max-w-2xl">เครือข่ายโชว์รูมและศูนย์บริการ มาพรพาณิชย์</h1>
            <p className="mt-5 max-w-xl text-white/90 text-sm sm:text-base leading-relaxed">
              พร้อมดูแลคุณใน {branches.length} สาขาทั่วประเทศ ครอบคลุมกรุงเทพฯ ปริมณฑล ชลบุรี และระยอง
            </p>
          </div>
        </div>
      </section>

      <div className="container-page py-10 sm:py-14">
        <BranchExplorer branches={branches} />
      </div>
    </div>
  );
}
