import type { Metadata } from "next";
import Link from "next/link";
import { news, NEWS_CATEGORY_LABEL } from "@/lib/data/news";
import { listManagedArticles, toNewsArticle } from "@/lib/data/managed-articles";
import NewsCard from "@/components/news/NewsCard";
import NewsFeatured from "@/components/news/NewsFeatured";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ข่าวสารและบทความรถยนต์",
  description: "บทความความรู้เรื่องรถยนต์ การดูแลรักษา ช่วงล่าง เบรก เกียร์ น้ำมันเครื่อง และการซ่อมสี จาก Maporn Autogroup",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : "";
  const managedNews = listManagedArticles()
    .filter((a) => a.published)
    .map(toNewsArticle);
  const allNews = [...managedNews, ...news];
  const CATEGORIES = [...new Set(allNews.map((n) => n.category))];
  const sorted = [...allNews].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  const filtered = category ? sorted.filter((n) => n.category === category) : sorted;
  const [featured, ...filteredRest] = filtered;

  return (
    <div className="min-h-screen bg-[#101113] text-white">
    <div className="container-page py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">ข่าวสารและบทความ</h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/blog"
          className={`text-xs font-semibold rounded-full px-3.5 py-1.5 ${!category ? "bg-brand-red-gradient text-white" : "border border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`}
        >
          ทั้งหมด
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/blog?category=${c}`}
            className={`text-xs font-semibold rounded-full px-3.5 py-1.5 ${category === c ? "bg-brand-red-gradient text-white" : "border border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`}
          >
            {NEWS_CATEGORY_LABEL[c as keyof typeof NEWS_CATEGORY_LABEL] ?? c}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-12 text-center text-white/60 text-sm">ไม่พบข่าวสารในหมวดหมู่นี้</div>
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
    </div>
  );
}
