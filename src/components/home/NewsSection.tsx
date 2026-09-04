import Link from "next/link";
import { news } from "@/lib/data/news";
import NewsCard from "@/components/news/NewsCard";
import NewsFeatured from "@/components/news/NewsFeatured";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";

export default function NewsSection() {
  const sorted = [...news].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  const [featured, ...rest] = sorted;
  return (
    <section className="py-16 sm:py-20 bg-[#f7f7f5]">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading eyebrow="News & Updates" title="ข่าวสารและกิจกรรม" />
          <Link href="/news" className="btn-outline text-xs shrink-0">
            ดูข่าวสารทั้งหมด
          </Link>
        </div>

        {featured && (
          <ScrollFx effect="scale" className="mt-10">
            <NewsFeatured article={featured} />
          </ScrollFx>
        )}

        {rest.length > 0 && (
          <ScrollFx effect="fade-up" stagger={0.1} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {rest.slice(0, 3).map((n) => (
              <NewsCard key={n.slug} article={n} />
            ))}
          </ScrollFx>
        )}
      </div>
    </section>
  );
}
