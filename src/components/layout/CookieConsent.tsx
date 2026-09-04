"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "maporn-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reads a browser-only external system (localStorage); cannot be resolved during render.
    let hasConsent = false;
    try {
      hasConsent = Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      hasConsent = false;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(!hasConsent);
  }, []);

  function accept(value: "all" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] lg:pb-0 pb-16">
      <div className="container-page pb-4">
        <div className="card-elevated bg-white shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-xs sm:text-sm text-brand-slate leading-relaxed flex-1">
            เว็บไซต์นี้ใช้คุกกี้เพื่อมอบประสบการณ์การใช้งานที่ดียิ่งขึ้น และเพื่อวิเคราะห์การเข้าใช้งานเว็บไซต์
            ตาม{" "}
            <Link href="/pdpa" className="underline text-brand-navy font-medium">
              นโยบาย PDPA
            </Link>{" "}
            และ{" "}
            <Link href="/privacy-policy" className="underline text-brand-navy font-medium">
              นโยบายความเป็นส่วนตัว
            </Link>{" "}
            ของเรา
          </p>
          <div className="flex gap-2 shrink-0 w-full sm:w-auto">
            <button onClick={() => accept("essential")} className="btn-outline text-xs flex-1 sm:flex-none">
              เฉพาะที่จำเป็น
            </button>
            <button onClick={() => accept("all")} className="btn-red text-xs flex-1 sm:flex-none">
              ยอมรับทั้งหมด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
