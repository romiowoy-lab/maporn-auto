"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { company } from "@/lib/data/company";

const FOOTER_COLUMNS = [
  {
    title: "รถยนต์",
    links: [
      { href: "/cars", label: "รถยนต์ทั้งหมด" },
      { href: "/brands", label: "แบรนด์รถยนต์" },
      { href: "/promotions", label: "โปรโมชั่น" },
      { href: "/compare", label: "เปรียบเทียบรถยนต์" },
    ],
  },
  {
    title: "บริการ",
    links: [
      { href: "/service", label: "ศูนย์บริการ" },
      { href: "/finance", label: "สินเชื่อรถยนต์" },
      { href: "/test-drive", label: "จองทดลองขับ" },
      { href: "/quotation", label: "ขอใบเสนอราคา" },
    ],
  },
  {
    title: "เกี่ยวกับ Maporn",
    links: [
      { href: "/about", label: "ประวัติบริษัท" },
      { href: "/branches", label: "โชว์รูม / สาขา" },
      { href: "/news", label: "ข่าวสาร" },
      { href: "/photo-credits", label: "เครดิตภาพ" },
    ],
  },
];

const ICONS: Record<string, React.ReactNode> = {
  Facebook: <path d="M14 8.5h2V5.5h-2c-1.93 0-3.5 1.57-3.5 3.5v1.5H8.5v3h2V22h3v-8.5h2.33l.5-3H13.5V9c0-.28.22-.5.5-.5Z" fill="currentColor" />,
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" />
    </>
  ),
  Line: <path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3 0 .7 0 1l-.1 1c0 .3-.2 1.1 1 .6s6.4-3.8 8.8-6.5C22.5 13.7 22 12.4 22 11c0-4.4-4.5-8-10-8Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
};

const SOCIAL_LINKS = [
  { href: company.facebook, label: "Facebook" },
  { href: company.instagram, label: "Instagram" },
  { href: company.youtube, label: "YouTube" },
  { href: `https://line.me/ti/p/${company.line}`, label: "Line" },
];

export default function Footer() {
  const pathname = usePathname();
  // HomePage 2 demo is a strict single-viewport (no-scroll) layout — the
  // real site chrome that adds page height (footer) is intentionally hidden there.
  if (pathname === "/home-2") return null;

  return (
    <footer className="relative overflow-hidden bg-brand-navy text-white pb-24 lg:pb-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/70 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-brand-red/[0.08] blur-[130px]" />
      <div className="container-page relative py-16 sm:py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-14">
        <div className="col-span-2 lg:col-span-1">
          <Image src="/brand/maporn-logo-white.png" alt="Maporn Trading Co., Ltd." width={394} height={112} className="mb-5 h-14 w-auto" />
          <p className="max-w-xs text-sm text-[#94A3B8] leading-relaxed">
            ตัวแทนจำหน่ายรถยนต์อย่างเป็นทางการ 7 แบรนด์ พร้อมบริการครบวงจรทั่วประเทศไทย
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold tracking-wide mb-6 text-white">{col.title}</h3>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-bold tracking-wide mb-6 text-white">ติดต่อ</h3>
          <ul className="space-y-3 text-sm text-[#94A3B8] leading-relaxed">
            <li>{company.hqAddress}</li>
            <li>โทร: {company.phone}</li>
            <li>{company.email}</li>
          </ul>

          <h3 className="text-sm font-bold tracking-wide mb-4 mt-10 text-white">Social Media</h3>
          <ul className="flex items-center gap-3">
            {SOCIAL_LINKS.map((sl) => (
              <li key={sl.label}>
                <a href={sl.href} target="_blank" rel="noreferrer" aria-label={sl.label} title={sl.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#94A3B8] transition-all hover:border-white/60 hover:bg-white/10 hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">{ICONS[sl.label]}</svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
          <p>
            © {new Date().getFullYear()} {company.legalName} เลขผู้เสียภาษี {company.taxId} สงวนลิขสิทธิ์
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              ข้อกำหนดและเงื่อนไข
            </Link>
            <Link href="/pdpa" className="transition-colors hover:text-white">
              PDPA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
