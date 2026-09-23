import Image from "next/image";
import { Gauge, Sofa, Cpu, ShieldCheck } from "lucide-react";
import ScrollFx from "@/components/ui/ScrollFx";

const INDICATORS = [
  { icon: Gauge, label: "Performance" },
  { icon: Sofa, label: "Comfort" },
  { icon: Cpu, label: "Technology" },
  { icon: ShieldCheck, label: "Safety" },
];

export default function LepasExperience() {
  return (
    <section id="experience" className="scroll-mt-32 relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-[#0a0a0b] border-t border-white/[0.06]">
      <Image
        src="/brand/studio2/lepas-l6-outdoor-gate.jpg"
        alt="Lepas L6"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/25 to-[#0a0a0b]/10" />

      <div className="relative z-10 flex h-full flex-col justify-end pb-14 sm:pb-20">
        <div className="container-page flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <ScrollFx effect="fade-up">
            <h2 className="text-4xl sm:text-6xl font-extralight tracking-tight text-white">Move with Elegance</h2>
            <p className="mt-3 max-w-md text-sm sm:text-base text-white/70">
              ออกแบบมาเพื่อการเดินทางในยุคใหม่ ขับเคลื่อนด้วยไฟฟ้าอย่างชาญฉลาด
            </p>
          </ScrollFx>

          <ScrollFx effect="fade-up" delay={0.15} stagger={0.08} className="flex flex-wrap sm:flex-col gap-4 sm:gap-3">
            {INDICATORS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/80">
                <Icon className="h-4 w-4 text-[#E8C77E]" />
                <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </ScrollFx>
        </div>
      </div>
    </section>
  );
}
