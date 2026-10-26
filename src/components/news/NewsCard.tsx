import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { NewsArticle } from "@/lib/types";
import { NEWS_CATEGORY_LABEL } from "@/lib/data/news";
import { formatDateTH } from "@/lib/utils";

export default function NewsCard({ article }: { article: NewsArticle }) {
  const label = NEWS_CATEGORY_LABEL[article.category] ?? article.category;
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1C1E22] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)]"
    >
      {article.image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
          <Image src={article.image} alt={article.imageAlt ?? article.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      ) : (
        <PlaceholderImage label={label} sublabel={formatDateTH(article.publishDate)} colorHex="#1F7A4D" className="aspect-[16/9]" />
      )}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#FF4D4D]">{label}</p>
        <h3 className="mt-1 line-clamp-2 font-bold text-white transition-colors group-hover:text-[#FF4D4D]">{article.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs text-white/60">{article.excerpt}</p>
        <p className="mt-3 text-[11px] text-white/45">{formatDateTH(article.publishDate)}</p>
      </div>
    </Link>
  );
}
