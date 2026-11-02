"use client";
import { useRouter } from "next/navigation";

export default function AdminDeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm(`ลบบทความ "${title}" ใช่หรือไม่?`)) return;
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    router.refresh();
  }
  return (
    <button
      onClick={handleDelete}
      className="rounded-md border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 hover:border-red-500/60 transition-colors"
    >
      ลบ
    </button>
  );
}
