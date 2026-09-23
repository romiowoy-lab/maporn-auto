"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ImageSlot from "@/components/brands/wuling/ImageSlot";
import { darion, PENDING } from "@/lib/data/wuling-darion";
import { formatTHB } from "@/lib/utils";

// Left: lifestyle image "Move with confidence". Right: model card (price + equipment).
export default function WulingConfidence() {
  const { model, images } = darion;
  return (
    <section id="experience" className="scroll-mt-24 grid lg:grid-cols-2 border-t border-white/[0.06] bg-[#101114]">
      <div className="relative min-h-[380px] lg:min-h-[460px] overflow-hidden">
        <ImageSlot src={images.lifestyle} label="Darion EV — ภาพ lifestyle" className="absolute inset-0 h-full w-full" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 p-6 sm:p-10 text-center"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">Move with confidence</h2>
          <p className="mt-2 text-sm sm:text-base text-white/85">อิสระในทุกเส้นทางของคุณ</p>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center gap-8 bg-[#26272b] p-6 sm:p-10 lg:p-12">
        <ImageSlot src={images.modelCar} label="Darion EV — ภาพรุ่น" className="aspect-[16/9] w-full rounded-2xl" fit="contain" />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Model</p>
          <h3 className="mt-1 text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">Starlight Darion EV</h3>
          <p className="mt-2 text-lg text-white/85">
            {model.startPrice !== null ? `เริ่มต้นที่ ${formatTHB(model.startPrice)}` : "เริ่มต้นที่ —"}
          </p>
          {model.startPrice === null && <p className="text-[11px] text-white/35">ราคา{PENDING}</p>}

          <ul className="mt-4 space-y-2">
            {model.features.length > 0 ? (
              model.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/75">
                  <Check className="h-4 w-4 text-[#D8BFA0]" />
                  {f}
                </li>
              ))
            ) : (
              <li className="text-sm text-white/40">รายการอุปกรณ์{PENDING}</li>
            )}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/cars?brand=wuling" className="rounded-lg bg-[#D8BFA0] px-6 py-2.5 text-sm font-bold text-[#231b10] transition-all hover:brightness-110">
              ดูรายละเอียด
            </Link>
            <Link href="/quotation?brand=wuling" className="rounded-lg border border-white/40 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#101114]">
              ขอใบเสนอราคา
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
