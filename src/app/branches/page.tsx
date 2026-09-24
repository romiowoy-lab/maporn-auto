import type { Metadata } from "next";
import { branches } from "@/lib/data/branches";
import BranchExplorer from "@/components/branches/BranchExplorer";

export const metadata: Metadata = {
  title: "โชว์รูมและศูนย์บริการทุกสาขา | Maporn Autogroup",
  description:
    "ค้นหาโชว์รูมและศูนย์บริการ Maporn Autogroup ทุกสาขา พร้อมที่อยู่ แผนที่ Google Maps และช่องทาง LINE ฝ่ายขายแต่ละสาขา",
};

export default function BranchesPage() {
  return (
    <div className="bg-[#f6f6f5] min-h-screen">
      <div className="bg-brand-navy text-white">
        <div className="container-page py-14 sm:py-20">
          <p className="section-eyebrow-light mb-3">Our Locations</p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            โชว์รูมและ<br className="sm:hidden" />ศูนย์บริการ
          </h1>
          <p className="mt-3 text-white/70 text-sm sm:text-base max-w-xl">
            {branches.length} สาขาทั่วประเทศ ครอบคลุมกรุงเทพฯ ปทุมธานี ชลบุรี และระยอง
          </p>
        </div>
      </div>

      <div className="container-page py-10 sm:py-14">
        <BranchExplorer branches={branches} />
      </div>
    </div>
  );
}
