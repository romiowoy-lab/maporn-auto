"use client";

import { motion } from "framer-motion";
import { Zap, Gauge, Route, Monitor } from "lucide-react";
import ImageSlot from "@/components/brands/wuling/ImageSlot";
import Stat from "@/components/brands/wuling/Stat";
import { darion } from "@/lib/data/wuling-darion";

// Left: interior image with headline. Right: big-number specs grid + car.
export default function WulingInterior() {
  const { specs, images } = darion;
  const items = [
    { icon: Zap, value: specs.powerKw, unit: "kW", label: "Power", note: null as string | null },
    { icon: Gauge, value: specs.torqueNm, unit: "Nm", label: "Torque", note: null },
    { icon: Route, value: specs.rangeKm, unit: "km", label: "Range*", note: specs.rangeStandard ? `* มาตรฐาน ${specs.rangeStandard}` : null },
    { icon: Monitor, value: specs.displayInch, unit: "inch", label: "Display", note: null },
  ];

  return (
    <section id="interior" className="scroll-mt-24 grid lg:grid-cols-2 border-t border-white/[0.06] bg-[#101114]">
      <div className="relative min-h-[360px] lg:min-h-[440px] overflow-hidden">
        <ImageSlot src={images.interior} label="Darion EV — ภายในห้องโดยสาร" className="absolute inset-0 h-full w-full" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 p-6 sm:p-10"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold uppercase leading-tight tracking-tight text-white">
            Your space.
            <br />
            Your experience.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/85">พื้นที่แห่งความสุขสำหรับการเดินทาง</p>
        </motion.div>
      </div>

      <div className="relative bg-[#17181c] p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
          {items.map(({ icon: Icon, ...s }) => (
            <div key={s.label}>
              <Icon className="mb-2 h-4 w-4 text-[#D8BFA0]" />
              <Stat value={s.value} unit={s.unit} label={s.label} note={s.note} size="md" />
            </div>
          ))}
        </div>
        <ImageSlot
          src={images.specsCar}
          label="Darion EV — ภาพประกอบสเปก"
          className="mt-8 aspect-[16/9] w-full rounded-2xl lg:absolute lg:bottom-6 lg:right-6 lg:mt-0 lg:w-[52%]"
          fit="contain"
        />
      </div>
    </section>
  );
}
