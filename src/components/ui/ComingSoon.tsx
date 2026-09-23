import Link from "next/link";

export default function ComingSoon({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="container-page py-24 sm:py-32 max-w-xl mx-auto text-center">
      <p className="section-eyebrow justify-center mb-4">{eyebrow}</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4">{title}</h1>
      <p className="text-brand-slate leading-relaxed mb-8">{description}</p>
      <p className="text-sm font-semibold text-brand-red uppercase tracking-widest mb-8">เร็วๆ นี้</p>
      <Link href="/" className="btn-outline text-xs">
        กลับหน้าแรก
      </Link>
    </div>
  );
}
