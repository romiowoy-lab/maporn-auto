import type { Metadata } from "next";
import Link from "next/link";
import { news } from "@/lib/data/news";
import NewsCard from "@/components/news/NewsCard";
import NewsFeatured from "@/components/news/NewsFeatured";

export const metadata: Metadata = {
  title: "ข่าวสารและกิจกรรมรถยนต์",
  description: "ข่าวสาร กิจกรรม และบทความเกี่ยวกับรถยนต์และรถ EV จาก Maporn Autogroup",
};

const CATEGORIES = ["Company", "Vehicle", "Technology", "EV", "Lifestyle", "Event", "CSR"] as const;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : "";
  const sorted = [...news].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  const filtered = category ? sorted.filter((n) => n.category === category) : sorted;
  const [featured, ...filteredRest] = filtered;

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mb-8">
        <p className="section-eyebrow mb-2">News & Updates</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">ข่าวสารและกิจกรรม</h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/news"
          className={`text-xs font-semibold rounded-full px-3.5 py-1.5 ${!category ? "bg-brand-navy text-white" : "border border-brand-line text-brand-slate"}`}
        >
          ทั้งหมด
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/news?category=${c}`}
            className={`text-xs font-semibold rounded-full px-3.5 py-1.5 ${category === c ? "bg-brand-navy text-white" : "border border-brand-line text-brand-slate"}`}
          >
            {c}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card-elevated p-12 text-center text-brand-slate text-sm">ไม่พบข่าวสารในหมวดหมู่นี้</div>
      ) : (
        <>
          {featured && (
            <div className="mb-10">
              <NewsFeatured article={featured} />
            </div>
          )}
          {filteredRest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRest.map((n) => (
                <NewsCard key={n.slug} article={n} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
