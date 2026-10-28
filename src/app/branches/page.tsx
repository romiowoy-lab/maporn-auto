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
    <div className="min-h-screen bg-[#101113] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-red/15 blur-[120px]" />
        <div className="container-page relative py-12 sm:py-16">
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">โชว์รูมและศูนย์บริการ</h1>
          <p className="mt-3 max-w-xl text-sm text-white/65 sm:text-base">
            {branches.length} สาขา ครอบคลุมกรุงเทพฯ ปทุมธานี ชลบุรี และระยอง
          </p>
        </div>
      </section>

      <div className="container-page py-10 sm:py-14">
        <BranchExplorer branches={branches} />
      </div>
    </div>
  );
}
