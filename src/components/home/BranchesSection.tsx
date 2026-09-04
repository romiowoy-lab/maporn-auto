import Link from "next/link";
import { branches } from "@/lib/data/branches";
import BranchCard from "@/components/branches/BranchCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";

export default function BranchesSection() {
  const preview = branches.slice(0, 4);
  return (
    <section className="py-16 sm:py-20 bg-[#f7f7f5]">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            eyebrow="Showroom Network"
            title="โชว์รูมและสาขาของเรา"
            description={`ให้บริการแล้ว ${branches.length} สาขาทั่วประเทศไทย`}
          />
          <Link href="/branches" className="btn-outline text-xs shrink-0">
            ดูสาขาทั้งหมด
          </Link>
        </div>
        <ScrollFx effect="slide-left" stagger={0.1} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {preview.map((b) => (
            <BranchCard key={b.slug} branch={b} />
          ))}
        </ScrollFx>
      </div>
    </section>
  );
}
