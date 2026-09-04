import Link from "next/link";
import Image from "next/image";
import QuickSearch from "@/components/home/QuickSearch";
import ParallaxLayer from "@/components/ui/ParallaxLayer";
import ScrollFx from "@/components/ui/ScrollFx";

export default function Hero() {
  return (
    <section className="relative -mt-16 md:-mt-28 min-h-[640px] md:min-h-[820px] flex flex-col justify-end overflow-hidden text-white">
      <ParallaxLayer className="absolute inset-0" strength={12}>
        <Image
          src="/brand/models/gwm-tank-500.jpg"
          alt="GWM Tank 500"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </ParallaxLayer>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" aria-hidden="true" />

      <ScrollFx effect="fade-up" className="container-page relative z-10 pt-40 md:pt-52 pb-12 md:pb-16">
        <p className="section-eyebrow-light mb-4">Maporn Autogroup — 7 แบรนด์ในที่เดียว</p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] max-w-2xl">
          DRIVE THE
          <br />
          FUTURE
        </h1>
        <p className="mt-5 text-white/75 max-w-md text-sm sm:text-base leading-relaxed">
          ค้นพบรถยนต์ที่เหมาะกับคุณ จาก 7 แบรนด์ชั้นนำ พร้อมบริการครบวงจรทั่วประเทศ
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/cars" className="btn-red">
            ดูรถยนต์
          </Link>
          <Link href="/test-drive" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy">
            ทดลองขับ
          </Link>
        </div>

        <div className="mt-10 max-w-2xl">
          <QuickSearch />
        </div>
      </ScrollFx>
    </section>
  );
}
