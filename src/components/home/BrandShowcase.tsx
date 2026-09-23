import Link from "next/link";
import BrandGrid from "@/components/home/BrandGrid";
import ScrollFx from "@/components/ui/ScrollFx";

export default function BrandShowcase() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="container-page">
        <ScrollFx effect="fade-up" className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-4">Our Brands</p>
            <h2 className="text-h2 text-brand-navy text-balance">โชว์รูมออนไลน์ 7 แบรนด์ระดับโลก</h2>
            <p className="mt-4 text-brand-slate text-base sm:text-lg font-light leading-relaxed text-pretty">
              รถยนต์คุณภาพจาก 7 แบรนด์ชั้นนำ ครบทุกไลฟ์สไตล์การขับขี่ ในที่เดียว
            </p>
          </div>
          <Link
            href="/brands"
            className="group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-slate shrink-0 transition-colors duration-500 hover:text-brand-navy"
          >
            ดูแบรนด์ทั้งหมด
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">→</span>
          </Link>
        </ScrollFx>

        <div className="hairline mt-8 mb-10 sm:mb-12" />

        <BrandGrid />
      </div>
    </section>
  );
}
