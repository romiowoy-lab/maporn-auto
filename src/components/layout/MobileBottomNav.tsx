"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageCircle } from "lucide-react";
import { company } from "@/lib/data/company";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 8.5h2V5.5h-2c-1.93 0-3.5 1.57-3.5 3.5v1.5H8.5v3H10.5V22h3v-8.5H15.83l.5-3H13.5V9c0-.28.22-.5.5-.5Z" />
    </svg>
  );
}

// Floating round contact buttons, persistent on every page (replaces the old
// full-width bottom CTA bar). TikTok was requested too but there's no real
// TikTok link anywhere in company data, so it's left out rather than faked —
// add it here once a real URL exists.
const ACTIONS = [
  { key: "call", href: `tel:${company.salesPhone}`, label: "โทร", icon: Phone },
  { key: "line", href: `https://line.me/ti/p/${company.line}`, label: "แอดไลน์", icon: MessageCircle },
  { key: "facebook", href: company.facebook, label: "Facebook", icon: FacebookIcon },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname === "/home-2") return null;

  return (
    <div className="fixed right-3 bottom-24 lg:bottom-6 z-40 flex flex-col gap-2">
      {ACTIONS.map((a) => {
        const Icon = a.icon;
        const external = a.href.startsWith("http");
        return (
          <a
            key={a.key}
            href={a.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            aria-label={a.label}
            title={a.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/95 text-brand-red shadow-md transition-all hover:border-brand-red/40 hover:shadow-xl hover:scale-105"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
