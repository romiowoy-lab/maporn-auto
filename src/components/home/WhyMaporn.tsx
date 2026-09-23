import Link from "next/link";
import Image from "next/image";
import { branches } from "@/lib/data/branches";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";

const TOPICS = [
  { label: "Our Story", href: "/about" },
  { label: "ตัวจริงรถ", href: "/our-people" },
  { label: "Location", href: "/branches" },
  { label: "ตัวจริงด้านซ่อมสี", href: "/body-shop" },
  { label: "ครอบครัวมาพร", href: "/family" },
  { label: "ร่วมงานกับเรา", href: "/careers" },
];

function mapsHref(mapQuery: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
}

export default function WhyMaporn() {
  return (
    <section className="py-16 sm:py-28 bg-white">
      <div className="container-page">
        <SectionHeading eyebrow="Why Maporn" title="ทำไมต้องมาพร" />

        <ScrollFx effect="reveal" className="mt-8 relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden rounded-xl">
          <Image
            src="/brand/showroom-banner.jpg"
            alt="โชว์รูม Maporn Autogroup"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </ScrollFx>

        <ScrollFx effect="fade-up" stagger={0.06} className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TOPICS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="card-elevated flex items-center justify-center text-center px-3 py-5 text-sm font-semibold text-brand-navy hover:text-brand-red transition-colors"
            >
              {t.label}
            </Link>
          ))}
        </ScrollFx>

        <div className="mt-14">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-brand-navy">สาขาและโชว์รูมของเรา</h3>
            <Link href="/branches" className="text-xs font-semibold text-brand-slate hover:text-brand-navy shrink-0">
              ดูทั้งหมด →
            </Link>
          </div>

          <ScrollFx effect="fade-up" stagger={0.08} className="flex flex-col divide-y divide-brand-line border-y border-brand-line">
            {branches.map((b) => (
              <div key={b.slug} className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-bold text-brand-navy">{b.name}</p>
                  <p className="text-sm text-brand-slate mt-1">{b.address}</p>
                  <p className="text-xs text-brand-slate/70 mt-1">{b.hours}</p>
                </div>
                <a
                  href={mapsHref(b.mapQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs shrink-0 self-start sm:self-center"
                >
                  ดูแผนที่
                </a>
              </div>
            ))}
          </ScrollFx>
        </div>
      </div>
    </section>
  );
}
