import Link from "next/link";
import Image from "next/image";

export default function OmodaCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/brand/brands-hero/omoda-jaecoo.jpg"
          alt="OMODA | JAECOO"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-[#0a0a0b]/20" />
      </div>

      <div className="relative z-10 container-page text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-4">Book a Test Drive</p>
        <h2 className="text-3xl sm:text-5xl font-bold text-white">สัมผัสประสบการณ์จริง</h2>
        <p className="mt-3 text-white/70 text-sm sm:text-base">
          พร้อมให้คุณทดลองขับที่โชว์รูม Maporn Autogroup
        </p>
        <Link
          href="/test-drive?brand=omoda"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 hover:-translate-y-0.5"
        >
          ทดลองขับ →
        </Link>
      </div>
    </section>
  );
}
