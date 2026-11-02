"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ManagedArticle } from "@/lib/data/managed-articles";
import { NEWS_CATEGORY_LABEL } from "@/lib/data/news";

const CATEGORIES = Object.keys(NEWS_CATEGORY_LABEL) as ManagedArticle["category"][];

interface Props {
  initial?: Partial<ManagedArticle>;
  id?: string;
}

export default function ArticleForm({ initial, id }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    category: initial?.category ?? ("Vehicle" as ManagedArticle["category"]),
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    image: initial?.image ?? "",
    imageAlt: initial?.imageAlt ?? "",
    author: initial?.author ?? "Maporn Autogroup",
    publishDate: initial?.publishDate ?? new Date().toISOString().slice(0, 10),
    tags: initial?.tags ?? "",
    published: initial?.published ?? true,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9฀-๿\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);
  }

  function set(key: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const url = id ? `/api/admin/articles/${id}` : "/api/admin/articles";
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setError("บันทึกไม่สำเร็จ");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "w-full rounded-lg bg-[#101113] border border-white/10 px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30";
  const labelCls = "block text-xs font-semibold text-white/50 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className={labelCls}>หัวข้อบทความ *</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => {
            set("title", e.target.value);
            if (!id) set("slug", generateSlug(e.target.value));
          }}
          className={inputCls}
          placeholder="ชื่อบทความ"
        />
      </div>

      {/* Slug */}
      <div>
        <label className={labelCls}>Slug (URL)</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => set("slug", e.target.value)}
          className={inputCls}
          placeholder="article-slug"
        />
        {form.slug && (
          <p className="text-xs text-white/30 mt-1">/blog/{form.slug}</p>
        )}
      </div>

      {/* Category + Date row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>หมวดหมู่ *</label>
          <select
            required
            value={form.category}
            onChange={(e) => set("category", e.target.value as ManagedArticle["category"])}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{NEWS_CATEGORY_LABEL[c]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>วันที่เผยแพร่ *</label>
          <input
            type="date"
            required
            value={form.publishDate}
            onChange={(e) => set("publishDate", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className={labelCls}>คำอธิบายสั้น (excerpt) *</label>
        <textarea
          required
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          rows={2}
          className={inputCls}
          placeholder="สรุปเนื้อหาบทความ 1–2 ประโยค"
        />
      </div>

      {/* Content */}
      <div>
        <label className={labelCls}>เนื้อหาบทความ *</label>
        <textarea
          required
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          rows={12}
          className={inputCls}
          placeholder="เขียนเนื้อหา — คั่นแต่ละย่อหน้าด้วยการขึ้นบรรทัดใหม่ 2 ครั้ง"
        />
        <p className="text-xs text-white/30 mt-1">กด Enter 2 ครั้งเพื่อขึ้นย่อหน้าใหม่</p>
      </div>

      {/* Image */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>URL รูปภาพ</label>
          <input
            type="url"
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            className={inputCls}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className={labelCls}>Alt text รูปภาพ</label>
          <input
            type="text"
            value={form.imageAlt}
            onChange={(e) => set("imageAlt", e.target.value)}
            className={inputCls}
            placeholder="คำอธิบายรูป"
          />
        </div>
      </div>

      {/* Author + Tags row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>ผู้เขียน</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>แท็ก (คั่นด้วยจุลภาค)</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
            className={inputCls}
            placeholder="EV, รถยนต์, บำรุงรักษา"
          />
        </div>
      </div>

      {/* Published toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          checked={form.published}
          onChange={(e) => set("published", e.target.checked)}
          className="h-4 w-4 rounded accent-red-500"
        />
        <label htmlFor="published" className="text-sm text-white/70">เผยแพร่ทันที</label>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-red-gradient px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? "กำลังบันทึก…" : id ? "บันทึกการแก้ไข" : "สร้างบทความ"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-white/15 px-6 py-2.5 text-sm text-white/60 hover:text-white"
        >
          ยกเลิก
        </button>
      </div>
    </form>
  );
}
