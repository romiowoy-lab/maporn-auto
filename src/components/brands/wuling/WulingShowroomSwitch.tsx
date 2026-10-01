"use client";

import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import WulingShowroom from "@/components/brands/wuling/WulingShowroom";
import WulingPortaShowroom from "@/components/brands/wuling/WulingPortaShowroom";

type View = "darion" | "porta";

const MODEL: Record<View, { label: string; sub: string; sweep: string; glow: string }> = {
  darion: {
    label: "DARION EV",
    sub: "Starlight · 7 Seats MPV",
    sweep: "linear-gradient(120deg,#0d0c09 0%,#1f1a10 45%,#D8BFA0 100%)",
    glow: "#D8BFA0",
  },
  porta: {
    label: "PORTA EV",
    sub: "Electric Commercial Van",
    sweep: "linear-gradient(120deg,#070d14 0%,#0a1c2e 45%,#5B9BD5 100%)",
    glow: "#5B9BD5",
  },
};

const ease = [0.16, 1, 0.3, 1] as const;
const safe = (p: Promise<unknown>, ms: number) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]);

export default function WulingShowroomSwitch() {
  const [view, setView] = useState<View>("darion");
  const [target, setTarget] = useState<View>("darion");
  const [busy, setBusy] = useState(false);
  const [spin, setSpin] = useState(0);
  const controls = useAnimationControls();

  async function switchTo(next: View) {
    if (next === view || busy) return;
    setBusy(true);
    setTarget(next);
    setSpin((s) => s + 180);
    await safe(controls.start({ x: "0%", transition: { duration: 0.5, ease } }), 900);
    setView(next);
    window.scrollTo({ top: 0 });
    await new Promise((r) => setTimeout(r, 120));
    await safe(controls.start({ x: "100%", transition: { duration: 0.5, ease } }), 900);
    controls.set({ x: "-100%" });
    setBusy(false);
  }

  return (
    <div className="bg-[#101114]">
      {/* Tab pill */}
      <div className="sticky top-[4.5rem] z-[60] flex justify-center px-3 pt-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/15 bg-black/55 p-1.5 sm:pl-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <motion.span animate={{ rotate: spin }} transition={{ duration: 0.6, ease }} className="hidden text-white/60 sm:inline-flex" aria-hidden="true">
            <ArrowLeftRight className="h-4 w-4" />
          </motion.span>
          <div className="relative flex rounded-full bg-white/[0.06] p-1" role="tablist" aria-label="สลับรุ่น Wuling Darion EV / Porta EV">
            {(Object.keys(MODEL) as View[]).map((v) => {
              const active = target === v;
              return (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchTo(v)}
                  className={`relative z-10 min-w-[80px] rounded-full px-3 py-2 text-xs font-extrabold uppercase tracking-[0.08em] transition-colors duration-300 sm:min-w-[110px] sm:px-4 sm:tracking-[0.12em] sm:text-sm ${
                    active ? "text-[#101114]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="wuling-thumb"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ backgroundColor: "#fff", boxShadow: `0 0 24px ${MODEL[v].glow}99` }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  {MODEL[v].label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Showroom content */}
      <motion.div key={view} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        {view === "darion" ? <WulingShowroom /> : <WulingPortaShowroom />}
      </motion.div>

      {/* Full-screen wipe overlay */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={controls}
        className="pointer-events-none fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4"
        style={{ background: MODEL[target].sweep }}
        aria-hidden="true"
      >
        <span className="flex h-24 items-center rounded-2xl bg-white px-10 shadow-2xl sm:h-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logos/wuling.png" alt="" className="h-9 w-auto sm:h-11" />
        </span>
        <span className="text-2xl font-extrabold uppercase tracking-[0.2em] text-white sm:text-4xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
          {MODEL[target].label}
        </span>
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
          {MODEL[target].sub}
        </span>
      </motion.div>
    </div>
  );
}
