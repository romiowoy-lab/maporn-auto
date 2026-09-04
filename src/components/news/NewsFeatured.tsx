import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { NewsArticle } from "@/lib/types";
import { formatDateTH } from "@/lib/utils";

export default function NewsFeatured({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="group grid md:grid-cols-2 gap-6 md:gap-10 items-center">
      <PlaceholderImage
        label={article.category}
        sublabel={formatDateTH(article.publishDate)}
        colorHex="#1F7A4D"
        className="aspect-[16/10] rounded-2xl md:rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-red">{article.category}</p>
        <h3 className="mt-2 text-2xl sm:text-3xl font-bold leading-tight text-brand-navy group-hover:text-brand-red transition-colors">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-slate line-clamp-3">{article.excerpt}</p>
        <p className="mt-4 text-xs text-brand-slate">{formatDateTH(article.publishDate)}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy">
          อ่านข่าวเต็ม
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
