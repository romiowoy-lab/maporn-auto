"use client";
import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={handleLogout}
      className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/40 transition-colors"
    >
      ออกจากระบบ
    </button>
  );
}
