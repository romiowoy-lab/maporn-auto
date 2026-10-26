import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { NewsArticle } from "@/lib/types";
import { NEWS_CATEGORY_LABEL } from "@/lib/data/news";
import { formatDateTH } from "@/lib/utils";

export default function NewsFeatured({ article }: { article: NewsArticle }) {
  const label = NEWS_CATEGORY_LABEL[article.category] ?? article.category;
  return (
    <Link href={`/news/${article.slug}`} className="group grid md:grid-cols-2 gap-6 md:gap-10 items-center">
      {article.image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:rounded-3xl">
          <Image src={article.image} alt={article.imageAlt ?? article.title} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      ) : (
        <PlaceholderImage
          label={label}
          sublabel={formatDateTH(article.publishDate)}
          colorHex="#1F7A4D"
          className="aspect-[16/10] rounded-2xl md:rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
        />
      )}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF4D4D]">{label}</p>
        <h3 className="mt-2 text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:text-[#FF4D4D] transition-colors">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/65 line-clamp-3">{article.excerpt}</p>
        <p className="mt-4 text-xs text-white/45">{formatDateTH(article.publishDate)}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          อ่านบทความเต็ม
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
