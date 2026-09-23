import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Real JAECOO J7 studio photography (same combined-dealership line as OMODA on this
// page) — used here as real placeholder imagery until OMODA-specific interior/driving
// photos are supplied, per explicit instruction. Not fabricated stock.
const ITEMS = [
  { key: "design", label: "Design", copy: "ภาษาการออกแบบที่ทันสมัย สำหรับคนยุคใหม่", image: "/brand/studio2/jaecoo-j7-front-3q.jpg" },
  { key: "technology", label: "Technology", copy: "เทคโนโลยีอัจฉริยะ เพื่อการขับขี่ที่ฉลาดกว่า", image: "/brand/studio2/jaecoo-j7-interior.jpg" },
  { key: "experience", label: "Experience", copy: "อิสระในทุกการเดินทาง มากกว่าที่เคย", image: "/brand/studio2/jaecoo-j7-side-3q.jpg" },
];

export default function OmodaHighlights() {
  return (
    <section className="bg-[#0a0a0b] py-16 sm:py-20 border-t border-white/[0.06]">
      <div className="container-page mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Discover OMODA</p>
        <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-white">More Than a Car</h2>
        <p className="mt-1 text-sm text-white/60">มากกว่าการเดินทาง คือประสบการณ์ที่เหนือกว่า</p>
      </div>

      <div className="grid sm:grid-cols-3">
        {ITEMS.map((item) => (
          <div key={item.key} className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden group">
            <Image
              src={item.image}
              alt={item.label}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute top-5 left-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-all group-hover:bg-white group-hover:text-[#0a0a0b]">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">{item.label}</h3>
              <p className="mt-1 text-xs text-white/60 leading-relaxed">{item.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
