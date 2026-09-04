import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { NewsArticle } from "@/lib/types";
import { formatDateTH } from "@/lib/utils";

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="card-elevated overflow-hidden flex flex-col h-full group">
      <PlaceholderImage label={article.category} sublabel={formatDateTH(article.publishDate)} colorHex="#1F7A4D" className="aspect-[16/9]" />
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="text-[11px] font-semibold text-brand-red uppercase tracking-wide">{article.category}</p>
        <h3 className="font-bold text-brand-navy mt-1 line-clamp-2 group-hover:text-brand-red transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-brand-slate mt-2 line-clamp-2 flex-1">{article.excerpt}</p>
        <p className="text-[11px] text-brand-slate mt-3">{formatDateTH(article.publishDate)}</p>
      </div>
    </Link>
  );
}
