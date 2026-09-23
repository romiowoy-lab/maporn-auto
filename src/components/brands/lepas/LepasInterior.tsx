import Image from "next/image";
import ScrollFx from "@/components/ui/ScrollFx";

// Real feature list — pulled straight from the verified catalog (technology + features
// arrays for lepas-l6 in models.ts), not invented for this page.
const FEATURES = [
  "จอสัมผัสกลาง 14.6 นิ้ว",
  "หลังคาพาโนรามา",
  "เบาะหนังปรับไฟฟ้าพร้อมนวด",
  "ระบบเสียงพรีเมียม",
  "ที่ชาร์จไร้สาย",
];

export default function LepasInterior() {
  return (
    <section id="interior" className="scroll-mt-32 relative bg-[#0a0a0b] border-t border-white/[0.06]">
      <ScrollFx effect="scale" className="relative w-full">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
          <Image
            src="/brand/studio2/lepas-l6-interior.jpg"
            alt="Lepas L6 interior"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 pt-6 sm:pt-12">
            <div className="container-page" style={{ textShadow: "0 2px 14px rgba(0,0,0,0.6)" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E8C77E]">Interior</p>
              <h2 className="mt-2 text-3xl sm:text-5xl font-extralight tracking-tight text-white">
                A Third Space,
                <br className="hidden sm:block" /> Made for You
              </h2>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent pt-16 pb-6">
            <div className="container-page flex flex-wrap gap-x-8 gap-y-3">
              {FEATURES.map((f) => (
                <span key={f} className="text-xs sm:text-sm text-white/85 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#E8C77E]" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollFx>
    </section>
  );
}
