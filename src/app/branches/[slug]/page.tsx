import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { branches, getBranch } from "@/lib/data/branches";
import { getBrand } from "@/lib/data/brands";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

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
  return { title: branch.name, description: `${branch.name} — ${branch.address}` };
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

  return (
    <div className="container-page py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <nav className="text-xs text-brand-slate mb-6 flex items-center gap-1.5">
        <Link href="/branches" className="hover:text-brand-navy">
          โชว์รูม / สาขา
        </Link>
        <span>/</span>
        <span className="text-brand-navy font-medium">{branch.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-3">
          <PlaceholderImage label={branch.name} sublabel="โชว์รูม" colorHex="#0b1220" className="aspect-[4/3] rounded-2xl" />
          {branch.isServiceCenter && (
            <PlaceholderImage label={branch.name} sublabel="ศูนย์บริการ" colorHex="#1F7A4D" className="aspect-[16/9] rounded-xl" />
          )}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy">{branch.name}</h1>
          <p className="text-brand-red text-sm font-semibold mt-1">{branch.province}</p>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="text-brand-slate w-28 shrink-0">ที่อยู่</dt>
              <dd className="text-brand-navy font-medium">{branch.address}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-brand-slate w-28 shrink-0">โทรศัพท์</dt>
              <dd className="text-brand-navy font-medium">{branch.phone}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-brand-slate w-28 shrink-0">Line</dt>
              <dd className="text-brand-navy font-medium">{branch.line}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-brand-slate w-28 shrink-0">เวลาทำการ</dt>
              <dd className="text-brand-navy font-medium">{branch.hours}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-brand-slate w-28 shrink-0">ฝ่ายขาย</dt>
              <dd className="text-brand-navy font-medium">{branch.salesContact}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <p className="text-xs font-semibold text-brand-navy mb-2">แบรนด์ที่จำหน่าย</p>
            <div className="flex flex-wrap gap-2">
              {branch.brands.map((slug) => {
                const b = getBrand(slug);
                if (!b) return null;
                return (
                  <Link
                    key={slug}
                    href={`/brands/${slug}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                    style={{ backgroundColor: b.colorHex }}
                  >
                    {b.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/test-drive?branch=${branch.slug}`} className="btn-red">
              จองทดลองขับที่สาขานี้
            </Link>
            {branch.isServiceCenter && (
              <Link href={`/service/appointment?branch=${branch.slug}`} className="btn-outline">
                นัดหมายเข้าศูนย์บริการ
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl overflow-hidden border border-brand-line aspect-[16/7]">
        <iframe
          title={`แผนที่ ${branch.name}`}
          className="h-full w-full"
          loading="lazy"
          src={`https://www.google.com/maps?q=${encodeURIComponent(branch.mapQuery)}&output=embed`}
        />
      </div>
    </div>
  );
}
