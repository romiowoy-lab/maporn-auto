import { readLeads } from "@/lib/leads";
import { Lead } from "@/lib/types";

const TYPE_LABEL: Record<string, string> = {
  "test-drive": "ทดลองขับ",
  contact: "ติดต่อ",
  quotation: "ใบเสนอราคา",
  service: "บริการ",
  inquiry: "สอบถาม",
};

const STATUS_STYLE: Record<string, string> = {
  New: "bg-amber-50 text-amber-700",
  Contacted: "bg-blue-50 text-blue-700",
  Interested: "bg-indigo-50 text-indigo-700",
  Negotiating: "bg-purple-50 text-purple-700",
  Booked: "bg-green-50 text-green-700",
  Sold: "bg-green-100 text-green-800",
  Lost: "bg-gray-100 text-gray-500",
};

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("th-TH", { day: "2-digit", month: "short", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export default function LeadsPage() {
  const leads = readLeads();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#0b1220]">Lead ทั้งหมด</h1>
          <p className="text-gray-400 text-sm mt-0.5">รายการติดต่อและคำขอจากลูกค้า ({leads.length} รายการ)</p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
          ยังไม่มี lead
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">วันที่</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500">ชื่อ</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">เบอร์โทร</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">ประเภท</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500">แบรนด์/รุ่น</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((l: Lead) => (
                  <tr key={l.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{fmt(l.createdAt)}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#0b1220]">{l.name}</p>
                      {l.email && <p className="text-xs text-gray-400">{l.email}</p>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap font-mono text-xs">{l.phone}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {TYPE_LABEL[l.type] ?? l.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {[l.brand, l.model].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${STATUS_STYLE[l.status] ?? "bg-gray-100 text-gray-500"}`}>
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
