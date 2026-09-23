import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { branches, getBranch } from "@/lib/data/branches";
import { getBrand } from "@/lib/data/brands";
import Image from "next/image";
import { MapPin, Clock, Phone, MessageCircle, Navigation } from "lucide-react";
import { BRANCH_PHOTO } from "@/components/branches/BranchCard";
import { company } from "@/lib/data/company";

// Only these branches' phone/LINE are verified against a real source; others fall back to head office.
const VERIFIED_CONTACT = new Set(["srinakarin", "rayong"]);

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) return {};
  const short = branch.name.replace("Maporn Autogroup ", "");
  return {
    title: `${short} ${branch.province} โชว์รูม${branch.isServiceCenter ? "และศูนย์บริการ" : ""}`,
    description: `${branch.name} ที่อยู่ ${branch.address} ดูแผนที่ นัดทดลองขับ หรือสอบถามฝ่ายขาย`,
  };
}

export default async function BranchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) notFound();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: branch.name,
    address: { "@type": "PostalAddress", streetAddress: branch.address, addressCountry: "TH" },
    telephone: branch.phone,
    openingHours: branch.hours,
  };

  const verified = VERIFIED_CONTACT.has(branch.slug);
  const phone = verified ? branch.phone : company.phone;
  const lineId = verified ? branch.line : company.line;
  const photo = BRANCH_PHOTO[branch.slug];
  const short = branch.name.replace("Maporn Autogroup ", "");
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`;

  return (
    <div className="bg-[#101113] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero photo */}
      <section className="relative min-h-[420px] overflow-hidden sm:min-h-[520px]">
        {photo && <Image src={photo} alt={branch.name} fill priority sizes="100vw" className="object-cover" />}
        <div className="container-page relative z-10 flex min-h-[420px] flex-col justify-end pb-10 pt-24 sm:min-h-[520px]" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85), 0 8px 30px rgba(0,0,0,0.6)" }}>
          <nav className="mb-4 flex items-center gap-1.5 text-xs text-white/85">
            <Link href="/branches" className="hover:text-white">โชว์รูม / สาขา</Link>
            <span>/</span>
            <span className="font-medium text-white">{short}</span>
          </nav>
          <div className="mb-3 flex flex-wrap gap-2">
            {branch.isShowroom && <span className="rounded-full bg-brand-red px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">Showroom</span>}
            {branch.isServiceCenter && <span className="rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[#101113]">Service Center</span>}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">{branch.name}</h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/90">{branch.province}</p>
        </div>
      </section>

      <div className="container-page grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_1.1fr]">
        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#1C1E22] p-5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5A5A]" />
            <div><p className="text-xs text-white/50">ที่อยู่</p><p className="mt-1 text-sm leading-relaxed text-white">{branch.address}</p></div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#1C1E22] p-5">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5A5A]" />
            <div><p className="text-xs text-white/50">เวลาทำการ</p><p className="mt-1 text-sm leading-relaxed text-white">{branch.hours}</p></div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-5">
            <p className="text-xs text-white/50">{verified ? "ติดต่อสาขา" : "ติดต่อสอบถาม (สำนักงานใหญ่)"}</p>
            <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="mt-1 flex items-center gap-2 text-3xl font-extrabold tracking-tight hover:text-[#FF5A5A]">
              <Phone className="h-6 w-6 text-[#FF5A5A]" /> {phone}
            </a>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="flex items-center justify-center gap-2 rounded-xl border border-white/20 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#101113]"><Phone className="h-4 w-4" /> โทร</a>
              <a href={`https://line.me/R/ti/p/${encodeURIComponent(lineId)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/20 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#101113]"><MessageCircle className="h-4 w-4" /> LINE {lineId}</a>
            </div>
          </div>

          {branch.brands.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-5">
              <p className="mb-3 text-xs text-white/50">แบรนด์ที่จำหน่าย</p>
              <div className="flex flex-wrap gap-2">
                {branch.brands.map((slug) => {
                  const b = getBrand(slug);
                  if (!b) return null;
                  return (
                    <Link key={slug} href={`/brands/${slug}`} className="rounded-full px-3.5 py-1.5 text-xs font-bold text-white transition-transform hover:scale-105" style={{ backgroundColor: b.colorHex }}>
                      {b.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/test-drive?branch=${branch.slug}`} className="btn-red">จองทดลองขับที่สาขานี้</Link>
            {branch.isServiceCenter && (
              <Link href={`/service/appointment?branch=${branch.slug}`} className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-white hover:text-[#101113]">นัดหมายเข้าศูนย์บริการ</Link>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22]">
          <div className="aspect-[4/3] lg:aspect-auto lg:h-[calc(100%-72px)] lg:min-h-[420px]">
            <iframe title={`แผนที่ ${branch.name}`} className="h-full w-full" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(branch.mapQuery)}&output=embed`} />
          </div>
          <a href={maps} target="_blank" rel="noreferrer" className="flex h-[72px] items-center justify-center gap-2 bg-brand-red text-sm font-bold text-white transition-colors hover:bg-[#c00000]">
            <Navigation className="h-4 w-4" /> เปิดเส้นทาง Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
