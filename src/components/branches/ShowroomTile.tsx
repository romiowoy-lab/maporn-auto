import Link from "next/link";
import { MapPin, Phone, MessageCircle, Navigation } from "lucide-react";
import type { Branch } from "@/lib/types";

// Dark showroom card (homepage + service page): photo, name, address, CRM phone and LINE OA,
// with working call / LINE / Google Maps buttons. Red on dark uses #FF4D4D for legibility.
export const RED_ON_DARK = "#FF4D4D";

export const lineHref = (b: Branch) => b.lineUrl ?? `https://line.me/R/ti/p/${b.line}`;
export const mapsHref = (b: Branch) => b.googleMapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`;
const telHref = (b: Branch) => `tel:${b.phone.replace(/[^0-9+]/g, "").slice(0, 10)}`;

export default function ShowroomTile({ branch: b, label, image, position }: { branch: Branch; label: string; image?: string; position?: string }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/branches/${b.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: position ?? "center" }} />
          )}
        </div>
        <div className="p-6 pb-4">
          <h3 className="mb-3 text-lg font-bold text-white">{label}</h3>
          <div className="space-y-2.5 text-xs text-white/70">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: RED_ON_DARK }} />
              <span className="leading-relaxed">{b.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0" style={{ color: RED_ON_DARK }} />
              <span>{b.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle className="h-4 w-4 shrink-0" style={{ color: RED_ON_DARK }} />
              <span>LINE {b.line}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="mt-auto grid grid-cols-3 gap-2 p-6 pt-0">
        <a href={telHref(b)} className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white hover:text-[#101113]">
          <Phone className="h-4 w-4" /> โทร
        </a>
        <a href={lineHref(b)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl bg-[#06C755] py-2.5 text-xs font-bold text-white transition-all hover:brightness-110">
          <MessageCircle className="h-4 w-4" /> LINE
        </a>
        <a href={mapsHref(b)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-red-gradient py-2.5 text-xs font-bold text-white transition-all hover:brightness-110">
          <Navigation className="h-4 w-4" /> Google Maps
        </a>
      </div>
    </div>
  );
}
