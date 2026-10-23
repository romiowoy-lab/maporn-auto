import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

// The one hero button row used on every brand / model hero (same as the homepage hero):
// ดูรายละเอียด · ทดลองขับ → · นัดหมายเช็คระยะ/ สีและตัวถัง
export default function BrandHeroCTA({
  detailsHref,
  testDriveHref,
  serviceHref = "/service/appointment",
  center = false,
}: {
  detailsHref: string;
  testDriveHref: string;
  serviceHref?: string;
  center?: boolean;
}) {
  const external = /^https?:\/\//.test(detailsHref);
  const primary =
    "rounded-lg bg-brand-red-gradient px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(255,0,0,0.5)] transition-all hover:brightness-110 hover:-translate-y-0.5";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`} style={{ textShadow: "none" }}>
      {external ? (
        <a href={detailsHref} target="_blank" rel="noreferrer" className={primary}>
          ดูรายละเอียด
        </a>
      ) : (
        <Link href={detailsHref} className={primary}>
          ดูรายละเอียด
        </Link>
      )}
      <Link
        href={testDriveHref}
        className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
      >
        ทดลองขับ
        <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
        href={serviceHref}
        className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 px-6 py-3.5 text-sm font-semibold tracking-wide text-white/85 backdrop-blur-sm transition-all hover:border-white/40 hover:text-white"
      >
        <Wrench className="h-4 w-4" />
        นัดหมายเช็คระยะ/ สีและตัวถัง
      </Link>
    </div>
  );
}
