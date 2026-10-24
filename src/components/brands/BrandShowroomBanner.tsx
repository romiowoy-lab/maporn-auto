import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Navigation, MessageCircle } from "lucide-react";
import { getBranch } from "@/lib/data/branches";
import { branchCover } from "@/lib/data/branchPhotos";

// "Visit our showroom" band for brand pages: client cover photo + address, map, call and LINE.
export default function BrandShowroomBanner({ slug }: { slug: string }) {
  const branch = getBranch(slug);
  const cover = branchCover[slug];
  if (!branch || !cover) return null;
  const maps = branch.googleMapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`;
  const tel = branch.phone.replace(/[^0-9+]/g, "");

  return (
    <section className="bg-[#101113] py-14 text-white sm:py-20">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#1C1E22] lg:grid-cols-[1.35fr_1fr]">
          <Link href={`/branches/${branch.slug}`} className="group relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px]">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: cover.position ?? "center" }}
            />
          </Link>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF0000]">Showroom</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{branch.name}</h2>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-white/75">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF0000]" /> {branch.address}
            </p>
            <a href={`tel:${tel}`} className="mt-4 flex items-center gap-2 text-2xl font-extrabold tracking-tight hover:text-[#FF0000]">
              <Phone className="h-5 w-5 text-[#FF0000]" /> {branch.phone}
            </a>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <a href={maps} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-brand-red-gradient py-3 text-sm font-bold text-white transition-all hover:brightness-110">
                <Navigation className="h-4 w-4" /> เส้นทาง Google Maps
              </a>
              {branch.lineUrl ? (
                <a href={branch.lineUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/20 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#101113]">
                  <MessageCircle className="h-4 w-4" /> LINE
                </a>
              ) : (
                <Link href={`/branches/${branch.slug}`} className="flex items-center justify-center gap-2 rounded-xl border border-white/20 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#101113]">
                  ข้อมูลสาขา
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
