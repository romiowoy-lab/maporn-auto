import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/data/company";
import ScrollFx from "@/components/ui/ScrollFx";

export default function WarrantyBanner() {
  const years = new Date().getFullYear() - Number(company.foundedYear);

  return (
    <section className="bg-brand-navy text-white overflow-hidden">
      <div className="container-page py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <ScrollFx effect="fade-up">
            <p className="text-6xl sm:text-7xl font-black leading-[0.95] tracking-tight">{years}+ ปี</p>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-white/90">แห่งความไว้วางใจ</p>
            <p className="mt-5 text-white/70 font-light max-w-md text-sm sm:text-base leading-relaxed">
              รับประกันคุณภาพจากผู้ผลิตโดยตรง ทุกแบรนด์ ทุกรุ่น พร้อมบริการหลังการขายครบวงจรทั่วประเทศ
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/promotions" className="btn-red">
                ดูข้อเสนอพิเศษ
              </Link>
              <Link href="/test-drive" className="btn-outline border-white! text-white! hover:bg-white! hover:text-brand-navy!">
                ทดลองขับ
              </Link>
            </div>
            <p className="mt-6 text-[11px] text-white/40">*เงื่อนไขการรับประกันเป็นไปตามที่แต่ละแบรนด์กำหนด</p>
          </ScrollFx>

          <ScrollFx effect="scale" className="relative h-[220px] sm:h-[300px] md:h-[360px]">
            <Image
              src="/brand/models/gwm-tank-500.jpg"
              alt="GWM Tank 500"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </ScrollFx>
        </div>
      </div>
    </section>
  );
}
