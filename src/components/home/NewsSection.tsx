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
    <section className="py-20 sm:py-32 bg-[#f7f7f5]">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <SectionHeading eyebrow="News & Updates" title="ข่าวสารและกิจกรรม" />
          <Link href="/news" className="btn-outline text-xs shrink-0">
            ดูข่าวสารทั้งหมด
          </Link>
        </div>

        <div className="hairline mt-8" />

        {featured && (
          <ScrollFx effect="scale" className="mt-10 sm:mt-12">
            <NewsFeatured article={featured} />
          </ScrollFx>
        )}

        {rest.length > 0 && (
          <ScrollFx effect="fade-up" stagger={0.1} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {rest.slice(0, 3).map((n) => (
              <NewsCard key={n.slug} article={n} />
            ))}
          </ScrollFx>
        )}
      </div>
    </section>
  );
}
