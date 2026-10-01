"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function WulingPortaShowroom() {
  return (
    <div className="bg-[#101114] min-h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="max-w-lg"
      >
        {/* Wuling logo mark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logos/wuling.png" alt="Wuling" className="h-12 w-auto mx-auto mb-8 opacity-80" />

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5B9BD5] mb-4">
          Coming Soon
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white leading-none">
          PORTA EV
        </h1>
        <p className="mt-4 text-base text-white/60">
          รถตู้ไฟฟ้าเพื่อการพาณิชย์ — เร็วๆ นี้ที่ Maporn Autogroup
        </p>

        {/* EV accent line */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#5B9BD5]/40" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#5B9BD5]/60">Wuling Electric Commercial</span>
          <span className="h-px w-12 bg-[#5B9BD5]/40" />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-lg border border-[#5B9BD5]/50 bg-[#5B9BD5]/10 px-7 py-3 text-sm font-semibold text-[#5B9BD5] transition-all hover:bg-[#5B9BD5] hover:text-white"
          >
            สอบถามข้อมูล
          </Link>
          <Link
            href="/test-drive?brand=wuling"
            className="rounded-lg border border-white/20 px-7 py-3 text-sm font-semibold text-white/70 transition-all hover:bg-white hover:text-[#101114]"
          >
            ลงทะเบียนสนใจ
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
