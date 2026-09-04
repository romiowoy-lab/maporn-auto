import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { news, getArticle } from "@/lib/data/news";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import NewsCard from "@/components/news/NewsCard";
import { formatDateTH } from "@/lib/utils";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = news.filter((n) => n.slug !== article.slug && n.category === article.category).slice(0, 3);

  return (
    <div className="container-page py-10 sm:py-14">
      <nav className="text-xs text-brand-slate mb-6 flex items-center gap-1.5">
        <Link href="/news" className="hover:text-brand-navy">
          ข่าวสาร
        </Link>
        <span>/</span>
        <span className="text-brand-navy font-medium line-clamp-1">{article.title}</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <span className="text-xs font-semibold bg-slate-100 text-brand-navy px-3 py-1.5 rounded-full">
          {article.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-brand-navy mt-4">{article.title}</h1>
        <div className="flex items-center gap-3 text-xs text-brand-slate mt-3">
          <span>โดย {article.author}</span>
          <span>•</span>
          <span>{formatDateTH(article.publishDate)}</span>
        </div>

        <PlaceholderImage label={article.category} colorHex="#1F7A4D" className="aspect-[16/9] rounded-2xl my-8" />

        <div className="prose-content space-y-4">
          {article.content.map((p, i) => (
            <p key={i} className="text-brand-slate leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {article.tags.map((t) => (
            <span key={t} className="text-xs border border-brand-line rounded-full px-3 py-1 text-brand-slate">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-brand-navy mb-5">ข่าวสารที่เกี่ยวข้อง</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((n) => (
              <NewsCard key={n.slug} article={n} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
