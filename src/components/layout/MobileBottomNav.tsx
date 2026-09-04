import Link from "next/link";
import { company } from "@/lib/data/company";

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-brand-navy pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={`tel:${company.salesPhone}`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-white text-xs font-semibold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path
              d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4c0 1-1 2-2 2C9.5 21 3 14.5 3 7c0-1 1-2 2-2Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          โทร
        </a>
        <a
          href={`https://line.me/ti/p/${company.line}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-white text-xs font-semibold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path
              d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3 0 .7 0 1l-.1 1c0 .3-.2 1.1 1 .6s6.4-3.8 8.8-6.5C22.5 13.7 22 12.4 22 11c0-4.4-4.5-8-10-8Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Line
        </a>
        <Link
          href="/test-drive"
          className="flex flex-col items-center justify-center gap-1 py-3 text-white text-xs font-bold bg-brand-red"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path
              d="M4 16h16M5 16l1.5-5.5A2 2 0 0 1 8.4 9h7.2a2 2 0 0 1 1.9 1.5L19 16M6 16v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3M18 16v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          ทดลองขับ
        </Link>
      </div>
    </div>
  );
}
