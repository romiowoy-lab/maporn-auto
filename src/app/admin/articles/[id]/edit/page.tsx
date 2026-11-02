import Link from "next/link";
import { notFound } from "next/navigation";
import { getManagedArticle } from "@/lib/data/managed-articles";
import ArticleForm from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = getManagedArticle(id);
  if (!article) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="text-white/40 hover:text-white text-sm">← กลับ</Link>
        <h1 className="text-xl font-bold text-white">แก้ไขบทความ</h1>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-6">
        <ArticleForm id={id} initial={article} />
      </div>
    </div>
  );
}
