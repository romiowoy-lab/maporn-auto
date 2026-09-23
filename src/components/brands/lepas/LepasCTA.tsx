import Link from "next/link";
import Image from "next/image";
import ScrollFx from "@/components/ui/ScrollFx";

export default function LepasCTA() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <Image
        src="/brand/studio2/lepas-l6-launch-hood.jpg"
        alt="Lepas L6"
        fill
        sizes="100vw"
        className="object-cover object-[50%_35%]"
      />

      <div className="relative z-10 flex h-full items-center justify-center">
        <ScrollFx effect="fade-up" className="container-page text-center">
          <div style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9), 0 14px 36px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.95)" }}>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#E8C77E] mb-5">Lepas L6</p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              พร้อมเลือกรถคันใหม่แล้วหรือยัง?
            </h2>
            <p className="mt-4 text-white/90 text-sm sm:text-base">
              ทีมงาน Maporn Autogroup พร้อมให้คำปรึกษาและนัดหมายทดลองขับ
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quotation?brand=lepas"
              className="rounded-full bg-gradient-to-r from-[#C9A15A] to-[#E8C77E] px-9 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#1a1408] transition-all hover:brightness-110 hover:-translate-y-0.5"
            >
              ขอใบเสนอราคา
            </Link>
            <a
              href="tel:023223663"
              className="rounded-full border border-white/40 bg-white/10 px-9 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#0a0a0b]"
            >
              โทร 02-322-3663-5
            </a>
          </div>
        </ScrollFx>
      </div>
    </section>
  );
}
