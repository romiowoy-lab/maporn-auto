import Link from "next/link";
import ArticleForm from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="text-white/40 hover:text-white text-sm">← กลับ</Link>
        <h1 className="text-xl font-bold text-white">เพิ่มบทความใหม่</h1>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-6">
        <ArticleForm />
      </div>
    </div>
  );
}
