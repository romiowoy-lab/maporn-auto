import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Branch } from "@/lib/types";

export default function BranchContactList({ branches }: { branches: Branch[] }) {
  if (branches.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {branches.map((b) => (
        <div key={b.slug} className="flex flex-col rounded-2xl border border-white/10 bg-[#1C1E22] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-colors hover:border-brand-red/40">
          <h3 className="text-lg font-bold text-white">{b.name}</h3>
          <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-white/65">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5A5A]" />
            {b.address}
          </p>
          <div className="mt-3 space-y-1 text-sm text-white/65">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[#FF5A5A]" />
              {b.phone}
            </p>
            <p className="pl-6 text-xs text-white/50">Line: {b.line}</p>
          </div>
          <div className="mt-5 flex gap-2">
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(b.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-md border border-white/30 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#101113]"
            >
              กดเพื่อนำทาง
            </a>
            <Link href={`/branches/${b.slug}`} className="flex-1 rounded-md bg-brand-red py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-[#c00000]">
              ดูสาขา
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
