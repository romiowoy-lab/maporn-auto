import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth/session";
import { logout } from "@/app/actions/auth";

export const metadata = { title: "Admin · Maporn Autogroup", robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // Login page renders without the nav shell
  if (!session) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col">
      {/* Top nav */}
      <nav className="bg-[#0b1220] border-b border-white/10 px-4 h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Image src="/Maporn.png" alt="Maporn" width={32} height={32} className="rounded-md" />
          <span className="text-white font-semibold text-sm hidden sm:block">Maporn Admin</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          <Link href="/admin" className="text-white/60 hover:text-white transition">Dashboard</Link>
          <Link href="/admin/leads" className="text-white/60 hover:text-white transition">Leads</Link>
          {session.role === "admin" && (
            <Link href="/admin/users" className="text-white/60 hover:text-white transition">ผู้ใช้</Link>
          )}
          <span className="text-[#c9a227] text-xs hidden sm:block">{session.displayName}</span>
          <form action={logout}>
            <button type="submit" className="text-white/40 hover:text-red-400 transition text-xs">ออกจากระบบ</button>
          </form>
        </div>
      </nav>

      <main className="flex-1 p-4 sm:p-6">{children}</main>
    </div>
  );
}
