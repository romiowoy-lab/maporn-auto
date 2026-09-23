import Image from "next/image";
import ScrollFx from "@/components/ui/ScrollFx";

// Full-bleed photo; copy sits in the empty sky above the car (text-shadow only, no overlay).
export default function LepasOutdoor() {
  return (
    <section className="relative border-t border-white/[0.06] bg-[#0a0a0b]">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[92vh] overflow-hidden">
        <Image
          src="/brand/studio3/lepas-l6-purple-lawn.jpg"
          alt="Lepas L6 สีม่วงบนลานหญ้า"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "60% 60%" }}
        />
        <div className="absolute inset-x-0 top-0 pt-6 sm:pt-12">
          <div className="container-page flex justify-end">
            <ScrollFx effect="fade-up">
              <div className="text-right" style={{ textShadow: "0 2px 14px rgba(0,0,0,0.55)" }}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">Outdoor</p>
                <h2 className="mt-2 text-3xl sm:text-5xl font-extralight tracking-tight text-white">
                  Lepas L6
                  <br /> Beyond the City
                </h2>
              </div>
            </ScrollFx>
          </div>
        </div>
      </div>
    </section>
  );
}
