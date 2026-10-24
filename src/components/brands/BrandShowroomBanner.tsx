import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Navigation, MessageCircle } from "lucide-react";
import type { Branch } from "@/lib/types";
import { getBranch } from "@/lib/data/branches";
import { branchCover, branchGallery } from "@/lib/data/branchPhotos";

// "Visit our showroom" band for brand pages: showroom photo + address, map, call and LINE.
// One slug → a wide feature card; several → a compact card per showroom.

function photoFor(slug: string) {
  const cover = branchCover[slug];
  if (cover) return cover;
  const first = branchGallery[slug]?.[0];
  return first ? { src: first.src, alt: first.alt, position: undefined } : undefined;
}

const mapsUrl = (b: Branch) => b.googleMapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`;
const telOf = (b: Branch) => b.phone.replace(/[^0-9+]/g, "");

function Actions({ branch, compact }: { branch: Branch; compact?: boolean }) {
  const btn = compact ? "py-2.5 text-xs" : "py-3 text-sm";
  return (
    <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
      <a href={mapsUrl(branch)} target="_blank" rel="noreferrer" className={`flex items-center justify-center gap-2 rounded-xl bg-brand-red-gradient font-bold text-white transition-all hover:brightness-110 ${btn}`}>
        <Navigation className="h-4 w-4" /> {compact ? "เส้นทาง" : "เส้นทาง Google Maps"}
      </a>
      {branch.lineUrl ? (
        <a href={branch.lineUrl} target="_blank" rel="noreferrer" className={`flex items-center justify-center gap-2 rounded-xl border border-white/20 font-bold transition-colors hover:bg-white hover:text-[#101113] ${btn}`}>
          <MessageCircle className="h-4 w-4" /> LINE
        </a>
      ) : (
        <Link href={`/branches/${branch.slug}`} className={`flex items-center justify-center gap-2 rounded-xl border border-white/20 font-bold transition-colors hover:bg-white hover:text-[#101113] ${btn}`}>
          ข้อมูลสาขา
        </Link>
      )}
    </div>
  );
}

export default function BrandShowroomBanner({ slug, slugs, title }: { slug?: string; slugs?: string[]; title?: string }) {
  const list = (slugs ?? (slug ? [slug] : []))
    .map((s) => ({ branch: getBranch(s), photo: photoFor(s) }))
    .filter((x): x is { branch: Branch; photo: NonNullable<ReturnType<typeof photoFor>> } => !!x.branch && !!x.photo);
  if (list.length === 0) return null;

  if (list.length === 1) {
    const { branch, photo } = list[0];
    return (
      <section className="bg-[#101113] py-14 text-white sm:py-20">
        <div className="container-page">
          <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#1C1E22] lg:grid-cols-[1.35fr_1fr]">
            <Link href={`/branches/${branch.slug}`} className="group relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px]">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: photo.position ?? "center" }} />
            </Link>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF0000]">Showroom</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{branch.name}</h2>
              <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-white/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF0000]" /> {branch.address}
              </p>
              <a href={`tel:${telOf(branch)}`} className="mt-4 flex items-center gap-2 text-2xl font-extrabold tracking-tight hover:text-[#FF0000]">
                <Phone className="h-5 w-5 text-[#FF0000]" /> {branch.phone}
              </a>
              <Actions branch={branch} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#101113] py-14 text-white sm:py-20">
      <div className="container-page">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF0000]">Showroom</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title ?? "โชว์รูมในเครือมาพร"}</h2>
        <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${list.length >= 3 ? "lg:grid-cols-3" : ""}`}>
          {list.map(({ branch, photo }) => (
            <div key={branch.slug} className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22]">
              <Link href={`/branches/${branch.slug}`} className="group relative block aspect-[16/10] overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: photo.position ?? "center" }} />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-extrabold tracking-tight">{branch.name}</h3>
                <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-white/70">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF0000]" /> {branch.address}
                </p>
                <a href={`tel:${telOf(branch)}`} className="mt-3 flex items-center gap-2 text-lg font-extrabold hover:text-[#FF0000]">
                  <Phone className="h-4 w-4 text-[#FF0000]" /> {branch.phone}
                </a>
                <Actions branch={branch} compact />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
