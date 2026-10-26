import Link from "next/link";
import MapornLogo from "@/components/ui/MapornLogo";

// Placeholder for sections not ready yet — dark theme like the rest of the site.
// `eyebrow` is accepted for call-site compatibility; section tags are not shown site-wide.
export default function ComingSoon({ title, description }: { eyebrow?: string; title: string; description: string }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#101113] px-4 py-24 text-white sm:py-32">
      <div className="max-w-xl text-center">
        <MapornLogo variant="white" className="mx-auto mb-10 h-10 w-auto opacity-90" />
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mb-8 leading-relaxed text-white/65">{description}</p>
        <p className="mb-8 inline-block rounded-full border border-white/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-white/80">Coming Soon · เร็วๆ นี้</p>
        <div>
          <Link href="/" className="inline-flex items-center rounded-lg border border-white/25 px-6 py-3 text-xs font-bold transition-colors hover:bg-white hover:text-[#101113]">
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
}
