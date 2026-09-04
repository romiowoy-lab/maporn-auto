import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/data/company";
import { getBrandGroups } from "@/lib/data/brandGroups";

const footerCols = [
  {
    title: "เกี่ยวกับเรา",
    links: [
      { href: "/about", label: "ประวัติบริษัท" },
      { href: "/brands", label: "แบรนด์รถยนต์" },
      { href: "/news", label: "ข่าวสาร" },
      { href: "/contact", label: "ติดต่อเรา" },
    ],
  },
  {
    title: "ผลิตภัณฑ์และบริการ",
    links: [
      { href: "/cars", label: "รถยนต์ทั้งหมด" },
      { href: "/promotions", label: "โปรโมชั่น" },
      { href: "/finance", label: "สินเชื่อรถยนต์" },
      { href: "/service", label: "ศูนย์บริการ" },
    ],
  },
  {
    title: "สาขาและการติดต่อ",
    links: [
      { href: "/branches", label: "โชว์รูม / สาขาทั้งหมด" },
      { href: "/test-drive", label: "จองทดลองขับ" },
      { href: "/quotation", label: "ขอใบเสนอราคา" },
      { href: "/service/appointment", label: "นัดหมายเข้าศูนย์บริการ" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pb-24 lg:pb-0">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="mb-4 inline-flex rounded-lg bg-white px-3 py-2">
            <Image src="/brand/maporn-logo.png" alt="Maporn Trading Co., Ltd." width={394} height={112} className="h-10 w-auto" />
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ 7 แบรนด์ พร้อมบริการครบวงจรตั้งแต่การเลือกซื้อไปจนถึงบริการหลังการขาย
            ทั่วประเทศไทย
          </p>
          <div className="flex flex-wrap gap-2">
            {getBrandGroups().map((g) => (
              <Link
                key={g.key}
                href={g.href}
                className="text-[11px] font-semibold border border-white/20 rounded-full px-3 py-1 hover:border-brand-red hover:text-brand-red transition-colors"
              >
                {g.name}
              </Link>
            ))}
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title}>
            <h3 className="font-semibold text-sm mb-4 text-white/85">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-semibold text-sm mb-4 text-white/85">ติดต่อสำนักงานใหญ่</h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>{company.hqAddress}</li>
            <li>โทร: {company.phone}</li>
            <li>Email: {company.email}</li>
            <li>Line: {company.line}</li>
            <li>{company.officeHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} {company.legalName} สงวนลิขสิทธิ์
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            <Link href="/privacy-policy" className="hover:text-white">
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link href="/terms" className="hover:text-white">
              ข้อกำหนดและเงื่อนไข
            </Link>
            <Link href="/pdpa" className="hover:text-white">
              PDPA
            </Link>
            <Link href="/photo-credits" className="hover:text-white">
              เครดิตภาพ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
