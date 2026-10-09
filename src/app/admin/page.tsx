import { getSession } from "@/lib/auth/session";
import { readLeads } from "@/lib/leads";
import { readUsers } from "@/lib/auth/users";
import { ensureDefaultAdmin } from "@/lib/auth/users";
import Link from "next/link";

export default async function AdminDashboard() {
  await ensureDefaultAdmin();
  const session = await getSession();
  const leads = readLeads();
  const users = readUsers();

  const newLeads = leads.filter((l) => l.status === "New").length;
  const totalLeads = leads.length;
  const todayLeads = leads.filter((l) => {
    const d = new Date(l.createdAt);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  }).length;

  const byType = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.type] = (acc[l.type] ?? 0) + 1;
    return acc;
  }, {});

  const TYPE_LABEL: Record<string, string> = {
    "test-drive": "ทดลองขับ",
    contact: "ติดต่อ",
    quotation: "ใบเสนอราคา",
    service: "บริการ",
    inquiry: "สอบถาม",
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#0b1220]">สวัสดี, {session?.displayName}</h1>
        <p className="text-gray-400 text-sm mt-0.5">ภาพรวมระบบ Maporn Autogroup</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Lead ทั้งหมด", value: totalLeads, color: "#0b1220" },
          { label: "Lead ใหม่", value: newLeads, color: "#c9a227" },
          { label: "วันนี้", value: todayLeads, color: "#16a34a" },
          { label: "ผู้ใช้ระบบ", value: users.length, color: "#4f46e5" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-500 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Lead breakdown */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-[#0b1220] mb-4 text-sm">Lead ตามประเภท</h2>
          <div className="space-y-2">
            {Object.entries(byType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{TYPE_LABEL[type] ?? type}</span>
                <span className="text-sm font-semibold text-[#0b1220]">{count}</span>
              </div>
            ))}
            {Object.keys(byType).length === 0 && (
              <p className="text-gray-400 text-sm">ยังไม่มี lead</p>
            )}
          </div>
          <Link href="/admin/leads" className="block mt-4 text-xs text-[#c9a227] hover:underline font-medium">
            ดู Lead ทั้งหมด →
          </Link>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-[#0b1220] mb-4 text-sm">Lead ล่าสุด</h2>
          <div className="space-y-2">
            {leads.slice(0, 5).map((l) => (
              <div key={l.id} className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#0b1220] truncate">{l.name}</p>
                  <p className="text-xs text-gray-400">{TYPE_LABEL[l.type] ?? l.type} · {l.phone}</p>
                </div>
                <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${l.status === "New" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                  {l.status}
                </span>
              </div>
            ))}
            {leads.length === 0 && <p className="text-gray-400 text-sm">ยังไม่มี lead</p>}
          </div>
          <Link href="/admin/leads" className="block mt-4 text-xs text-[#c9a227] hover:underline font-medium">
            ดูทั้งหมด →
          </Link>
        </div>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/leads" className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-[#0b1220] hover:border-[#c9a227] transition shadow-sm">
          จัดการ Leads
        </Link>
        {session?.role === "admin" && (
          <Link href="/admin/users" className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-[#0b1220] hover:border-[#c9a227] transition shadow-sm">
            จัดการผู้ใช้
          </Link>
        )}
        <Link href="/" target="_blank" className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-[#0b1220] hover:border-[#c9a227] transition shadow-sm">
          ดูเว็บไซต์
        </Link>
      </div>
    </div>
  );
}
