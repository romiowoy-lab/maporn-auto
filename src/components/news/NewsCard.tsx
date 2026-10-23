import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { NewsArticle } from "@/lib/types";
import { NEWS_CATEGORY_LABEL } from "@/lib/data/news";
import { formatDateTH } from "@/lib/utils";

export default function NewsCard({ article }: { article: NewsArticle }) {
  const label = NEWS_CATEGORY_LABEL[article.category] ?? article.category;
  return (
    <Link href={`/news/${article.slug}`} className="card-elevated overflow-hidden flex flex-col h-full group">
      {article.image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          <Image src={article.image} alt={article.imageAlt ?? article.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      ) : (
        <PlaceholderImage label={label} sublabel={formatDateTH(article.publishDate)} colorHex="#1F7A4D" className="aspect-[16/9]" />
      )}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="text-[11px] font-semibold text-brand-red uppercase tracking-wide">{label}</p>
        <h3 className="font-bold text-brand-navy mt-1 line-clamp-2 group-hover:text-brand-red transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-brand-slate mt-2 line-clamp-2 flex-1">{article.excerpt}</p>
        <p className="text-[11px] text-brand-slate mt-3">{formatDateTH(article.publishDate)}</p>
      </div>
    </Link>
  );
}
