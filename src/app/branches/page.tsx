import type { Metadata } from "next";
import { branches } from "@/lib/data/branches";
import BranchExplorer from "@/components/branches/BranchExplorer";

export const metadata: Metadata = {
  title: "โชว์รูมและสาขาทั้งหมด",
  description: "ค้นหาโชว์รูมและศูนย์บริการ Maporn Autogroup ทั่วประเทศไทย พร้อมข้อมูลที่อยู่ เบอร์โทร และแบรนด์ที่จำหน่าย",
};

export default function BranchesPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mb-10">
        <p className="section-eyebrow mb-2">Showroom Network</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">โชว์รูมและสาขาทั้งหมด</h1>
        <p className="mt-2 text-brand-slate text-sm max-w-2xl">
          ให้บริการแล้ว {branches.length} สาขาทั่วประเทศไทย ครอบคลุมทั้งโชว์รูมและศูนย์บริการมาตรฐาน
        </p>
      </div>
      <BranchExplorer branches={branches} />
    </div>
  );
}
