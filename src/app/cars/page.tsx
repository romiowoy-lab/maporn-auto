import Link from "next/link";
import type { Metadata } from "next";
import { models } from "@/lib/data/models";
import CarCard from "@/components/cars/CarCard";
import CarFilters from "@/components/cars/CarFilters";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "รถยนต์ทั้งหมด",
  description: "ค้นหาและเปรียบเทียบรถยนต์จากทั้ง 7 แบรนด์ในเครือ Maporn Autogroup พร้อมตัวกรองแบรนด์ ประเภทตัวถัง เชื้อเพลิง และราคา",
};

const PAGE_SIZE = 9;

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const brand = typeof sp.brand === "string" ? sp.brand : "";
  const body = typeof sp.body === "string" ? sp.body : "";
  const fuel = typeof sp.fuel === "string" ? sp.fuel : "";
  const transmission = typeof sp.transmission === "string" ? sp.transmission : "";
  const seats = typeof sp.seats === "string" ? sp.seats : "";
  const price = typeof sp.price === "string" ? sp.price : "";
  const page = Math.max(1, parseInt((typeof sp.page === "string" ? sp.page : "1") || "1", 10));

  let [minPrice, maxPrice] = price ? price.split("-").map(Number) : [0, Infinity];
  if (Number.isNaN(minPrice)) minPrice = 0;
  if (Number.isNaN(maxPrice)) maxPrice = Infinity;

  const filtered = models.filter((m) => {
    if (brand && m.brandSlug !== brand) return false;
    if (body && m.bodyType !== body) return false;
    if (fuel && m.fuelType !== fuel) return false;
    if (transmission && !m.variants.some((v) => v.transmission === transmission)) return false;
    if (seats && !m.variants.some((v) => String(v.seats) === seats)) return false;
    if (price && (m.startPrice < minPrice || m.startPrice > maxPrice)) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (body) params.set("body", body);
    if (fuel) params.set("fuel", fuel);
    if (transmission) params.set("transmission", transmission);
    if (seats) params.set("seats", seats);
    if (price) params.set("price", price);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/cars${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mb-8">
        <p className="section-eyebrow mb-2">Vehicle Catalog</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">รถยนต์ทั้งหมด</h1>
        <p className="mt-2 text-brand-slate text-sm">พบ {filtered.length} รุ่นที่ตรงกับเงื่อนไข</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 h-fit">
          <Suspense fallback={<div className="card-elevated p-5 h-96 animate-pulse" />}>
            <CarFilters />
          </Suspense>
        </aside>

        <div>
          {paged.length === 0 ? (
            <div className="card-elevated p-12 text-center">
              <p className="text-brand-navy font-semibold mb-2">ไม่พบรถยนต์ที่ตรงกับเงื่อนไขที่เลือก</p>
              <p className="text-sm text-brand-slate mb-4">ลองปรับเปลี่ยนตัวกรองเพื่อดูรถยนต์รุ่นอื่น</p>
              <Link href="/cars" className="btn-outline text-xs">
                ล้างตัวกรองทั้งหมด
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paged.map((m) => (
                  <CarCard key={m.slug} model={m} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    return (
                      <Link
                        key={p}
                        href={pageHref(p)}
                        className={`h-9 w-9 flex items-center justify-center rounded-full text-sm font-semibold ${
                          p === currentPage ? "bg-brand-navy text-white" : "border border-brand-line text-brand-navy"
                        }`}
                      >
                        {p}
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
