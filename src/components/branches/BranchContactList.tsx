import Link from "next/link";
import { Branch } from "@/lib/types";

export default function BranchContactList({ branches }: { branches: Branch[] }) {
  if (branches.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {branches.map((b) => (
        <div key={b.slug} className="card-elevated p-5">
          <h3 className="font-bold text-brand-navy">{b.name}</h3>
          <p className="text-xs text-brand-slate mt-2 leading-relaxed">{b.address}</p>
          <div className="mt-3 space-y-1 text-xs text-brand-slate">
            <p>ฝ่ายขาย: {b.salesContact}</p>
            <p>โทร: {b.phone}</p>
            <p>Line: {b.line}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(b.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-outline text-xs flex-1"
            >
              กดเพื่อนำทาง
            </a>
            <Link href={`/branches/${b.slug}`} className="btn-primary text-xs flex-1">
              ดูสาขา
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
