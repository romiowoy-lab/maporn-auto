"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ImageSlot from "@/components/brands/wuling/ImageSlot";
import { darion } from "@/lib/data/wuling-darion";

export default function WulingCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#101114]">
      <ImageSlot src={darion.images.cta} label="Darion EV — ภาพปิดท้าย" className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 container-page flex min-h-[520px] flex-col items-center justify-between gap-10 py-14 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" }}
        >
          พร้อมเลือกรถคันใหม่แล้วหรือยัง?<span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">ทีมงาน Maporn Autogroup พร้อมให้คำปรึกษาและนัดหมายทดลองขับ</span>
        </motion.h2>

        <div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quotation?brand=wuling"
              className="rounded-lg bg-[#D8BFA0] px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#231b10] transition-all hover:brightness-110 hover:-translate-y-0.5"
            >
              ขอใบเสนอราคา
            </Link>
            <a href="tel:023223663"
              className="rounded-lg border border-white/40 bg-[#101114]/50 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]"
            >
              โทร 02-322-3663-5</a>
          </div>
          <p className="mt-4 text-[11px] text-white/60">*ภาพประกอบเพื่อการนำเสนอเท่านั้น รายละเอียดอาจแตกต่างจากรถจริง</p>
        </div>
      </div>
    </section>
  );
}
