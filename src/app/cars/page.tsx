import Link from "next/link";
import type { Metadata } from "next";
import { models } from "@/lib/data/models";
import CarCardDark from "@/components/cars/CarCardDark";
import BrandLogoCarousel from "@/components/cars/BrandLogoCarousel";
import { getBrandGroups } from "@/lib/data/brandGroups";
import CarFilters from "@/components/cars/CarFilters";
import CarSort from "@/components/cars/CarSort";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "รถยนต์ใหม่ทุกแบรนด์ ค้นหาและเปรียบเทียบรุ่น",
  description: "ค้นหารถยนต์ใหม่จาก 7 แบรนด์ในเครือ Maporn Autogroup กรองตามแบรนด์ ประเภทตัวถัง เชื้อเพลิง และราคา พร้อมเปรียบเทียบรุ่น",
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
  const sort = typeof sp.sort === "string" ? sp.sort : "";
  const page = Math.max(1, parseInt((typeof sp.page === "string" ? sp.page : "1") || "1", 10));

  let [minPrice, maxPrice] = price ? price.split("-").map(Number) : [0, Infinity];
  if (Number.isNaN(minPrice)) minPrice = 0;
  if (Number.isNaN(maxPrice)) maxPrice = Infinity;

  const brandList = brand ? brand.split(",") : [];
  const bodyTypes = body ? body.split(",") : [];
  const fuelTypes = fuel ? fuel.split(",") : [];

  const filtered = models.filter((m) => {
    if (brandList.length > 0 && !brandList.includes(m.brandSlug)) return false;
    if (bodyTypes.length > 0 && !bodyTypes.includes(m.bodyType)) return false;
    if (fuelTypes.length > 0 && !fuelTypes.includes(m.fuelType)) return false;
    if (transmission && !m.variants.some((v) => v.transmission === transmission)) return false;
    if (seats && !m.variants.some((v) => String(v.seats) === seats)) return false;
    if (price && (m.startPrice < minPrice || m.startPrice > maxPrice)) return false;
    return true;
  });

  if (sort === "price-asc") filtered.sort((a, b) => a.startPrice - b.startPrice);
  else if (sort === "price-desc") filtered.sort((a, b) => b.startPrice - a.startPrice);

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
    if (sort) params.set("sort", sort);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/cars${qs ? `?${qs}` : ""}`;
  }

  function brandHref(value: string) {
    const params = new URLSearchParams();
    if (value) params.set("brand", value);
    if (body) params.set("body", body);
    if (fuel) params.set("fuel", fuel);
    if (transmission) params.set("transmission", transmission);
    if (seats) params.set("seats", seats);
    if (price) params.set("price", price);
    if (sort) params.set("sort", sort);
    const qs = params.toString();
    return `/cars${qs ? `?${qs}` : ""}`;
  }

  const chips = [
    { key: "all", name: "ทุกแบรนด์", logo: undefined, href: brandHref(""), active: !brand },
    ...getBrandGroups().map((g) => {
      const value = g.slugs.join(",");
      return { key: g.key, name: g.name, logo: g.logo, href: brandHref(value), active: brand === value || (g.slugs.length === 1 && brand === g.slugs[0]) };
    }),
  ];

  return (
    <div className="bg-[#101113] text-white">
      <div className="container-page py-10 sm:py-14">
        <div className="mb-8">
          <p className="mb-2 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A5A]">
            <span className="h-px w-8 bg-brand-red" /> Vehicle Catalog
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">รถยนต์ทั้งหมด</h1>
          <p className="mt-3 text-sm sm:text-base text-white/65">เลือกดูรถยนต์จากทั้ง 7 แบรนด์ในเครือ Maporn Autogroup</p>
        </div>

        <div className="mb-8">
          <BrandLogoCarousel items={chips} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 h-fit">
            {/* Phones: filters collapse behind a toggle so cars are reachable without a long scroll */}
            <details className="group rounded-2xl border border-white/10 bg-white/[0.04] lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-white">
                ตัวกรองและค้นหา
                <span className="text-xs text-white/60 group-open:hidden">แตะเพื่อเปิด</span>
              </summary>
              <div className="px-3 pb-3">
                <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-white/5" />}>
                  <CarFilters />
                </Suspense>
              </div>
            </details>
            <div className="hidden lg:block">
              <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white/5" />}>
                <CarFilters />
              </Suspense>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-white/65">พบ {filtered.length} รุ่นที่ตรงกับเงื่อนไข</p>
              <Suspense fallback={<div className="h-10 w-56 animate-pulse rounded-lg bg-white/5" />}>
                <CarSort />
              </Suspense>
            </div>

            {paged.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
                <p className="mb-2 font-semibold text-white">ไม่พบรถยนต์ที่ตรงกับเงื่อนไขที่เลือก</p>
                <p className="mb-4 text-sm text-white/60">ลองปรับเปลี่ยนตัวกรองเพื่อดูรถยนต์รุ่นอื่น</p>
                <Link href="/cars" className="inline-block rounded-lg border border-white/25 px-4 py-2 text-xs font-semibold text-white hover:bg-white hover:text-[#101113]">
                  ล้างตัวกรองทั้งหมด
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {paged.map((m, i) => (
                    <CarCardDark key={m.slug} model={m} index={i} />
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
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                            p === currentPage ? "bg-brand-red text-white" : "border border-white/20 text-white/80 hover:bg-white/10"
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
    </div>
  );
}
