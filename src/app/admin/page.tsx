import Link from "next/link";
import { listManagedArticles } from "@/lib/data/managed-articles";
import { news } from "@/lib/data/news";
import { NEWS_CATEGORY_LABEL } from "@/lib/data/news";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const managed = listManagedArticles();
  const staticCount = news.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">จัดการบทความ</h1>
          <p className="text-sm text-white/40 mt-1">
            บทความในระบบ {managed.length} บทความ · บทความ static {staticCount} บทความ
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red-gradient px-4 py-2 text-sm font-bold text-white"
          >
            + เพิ่มบทความ
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      {managed.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#1C1E22] p-12 text-center text-white/40 text-sm">
          ยังไม่มีบทความในระบบ — กด &quot;เพิ่มบทความ&quot; เพื่อเริ่มต้น
        </div>
      ) : (
        <div className="space-y-2">
          {managed.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#1C1E22] px-4 py-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{a.title}</p>
                <p className="text-xs text-white/40 mt-0.5">
                  {NEWS_CATEGORY_LABEL[a.category] ?? a.category} · {a.publishDate} ·{" "}
                  {a.published ? (
                    <span className="text-green-400">เผยแพร่แล้ว</span>
                  ) : (
                    <span className="text-yellow-400">ฉบับร่าง</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/blog/${a.slug}`}
                  target="_blank"
                  className="rounded-md border border-white/15 px-3 py-1.5 text-xs text-white/60 hover:text-white hover:border-white/40 transition-colors"
                >
                  ดู
                </Link>
                <Link
                  href={`/admin/articles/${a.id}/edit`}
                  className="rounded-md border border-white/15 px-3 py-1.5 text-xs text-white/60 hover:text-white hover:border-white/40 transition-colors"
                >
                  แก้ไข
                </Link>
                <AdminDeleteButton id={a.id} title={a.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
