import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarCheck, ExternalLink, MessageCircle } from "lucide-react";
import { news, getArticle, NEWS_CATEGORY_LABEL } from "@/lib/data/news";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import NewsCard from "@/components/news/NewsCard";
import ArticleBody from "@/components/news/ArticleBody";
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
  return {
    title: article.title,
    description: article.excerpt,
    // Republished from Maporn Suzuki's blog: point search engines at the original
    alternates: article.sourceUrl ? { canonical: article.sourceUrl } : undefined,
    openGraph: article.image ? { images: [{ url: article.image, alt: article.imageAlt ?? article.title }] } : undefined,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = news.filter((n) => n.slug !== article.slug && n.category === article.category).slice(0, 3);
  const label = NEWS_CATEGORY_LABEL[article.category] ?? article.category;

  return (
    <div className="bg-[#101113] text-white">
    <div className="container-page py-10 sm:py-14">
      <nav className="text-xs text-white/50 mb-6 flex items-center gap-1.5">
        <Link href="/news" className="hover:text-white">
          ข่าวสารและบทความ
        </Link>
        <span>/</span>
        <span className="text-white/85 font-medium line-clamp-1">{article.title}</span>
      </nav>

      <article className="max-w-3xl mx-auto">
        <span className="text-xs font-semibold bg-white/10 text-white px-3 py-1.5 rounded-full">{label}</span>
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight text-white mt-4">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 mt-3">
          <span>โดย {article.author}</span>
          <span>•</span>
          <span>{formatDateTH(article.publishDate)}</span>
        </div>

        {article.image ? (
          <div className="relative my-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image src={article.image} alt={article.imageAlt ?? article.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
        ) : (
          <PlaceholderImage label={label} colorHex="#1F7A4D" className="aspect-[16/9] rounded-2xl my-8" />
        )}

        {article.body ? (
          <ArticleBody blocks={article.body} />
        ) : (
          <div className="space-y-4">
            {article.content.map((p, i) => (
              <p key={i} className="text-white/75 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        )}

        {article.category === "Service" && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#1C1E22] p-6 text-white sm:p-8">
            <p className="text-lg font-bold">นัดหมายเข้าศูนย์บริการ Maporn Suzuki</p>
            <p className="mt-1 text-sm text-white/70">ช่างผู้เชี่ยวชาญ อะไหล่แท้ พร้อมห้องรับรองระหว่างรอ</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/service/appointment" className="inline-flex items-center gap-2 rounded-lg bg-brand-red-gradient px-5 py-3 text-sm font-bold text-white transition-all hover:brightness-110">
                <CalendarCheck className="h-4 w-4" /> นัดหมายเข้าศูนย์
              </Link>
              <a href="https://line.me/R/ti/p/@mapornsuzuki" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#101113]">
                <MessageCircle className="h-4 w-4" /> LINE @mapornsuzuki
              </a>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-8">
          {article.tags.map((t) => (
            <span key={t} className="text-xs border border-white/15 rounded-full px-3 py-1 text-white/60">
              #{t}
            </span>
          ))}
        </div>

        {article.sourceUrl && (
          <a href={article.sourceUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white">
            เผยแพร่ครั้งแรกที่ mapornsuzukith.com <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </article>

      {related.length > 0 && (
        <section className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-5">บทความที่เกี่ยวข้อง</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((n) => (
              <NewsCard key={n.slug} article={n} />
            ))}
          </div>
        </section>
      )}
    </div>
    </div>
  );
}
