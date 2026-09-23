"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { branches } from "@/lib/data/branches";
import BranchCard from "@/components/branches/BranchCard";
import SectionHeading from "@/components/ui/SectionHeading";

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const easeOut = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function BranchesSection() {
  const preview = branches.slice(0, 4);
  return (
    <section className="py-20 sm:py-32 bg-[#f7f7f5]">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <SectionHeading
            eyebrow="Showroom Network"
            title="โชว์รูมและสาขาของเรา"
            description={`ให้บริการแล้ว ${branches.length} สาขาทั่วประเทศไทย`}
          />
          <Link href="/branches" className="btn-outline text-xs shrink-0">
            ดูสาขาทั้งหมด
          </Link>
        </div>
        <div className="hairline mt-8" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={gridVariants}
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {preview.map((b) => (
            <motion.div key={b.slug} variants={cardVariants}>
              <BranchCard branch={b} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
