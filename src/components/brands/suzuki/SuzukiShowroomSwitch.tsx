"use client";

import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import SuzukiFronxShowroom from "@/components/brands/suzuki/SuzukiFronxShowroom";
import SuzukiJimnyShowroom from "@/components/brands/suzuki/SuzukiJimnyShowroom";

type View = "fronx" | "jimny";

const MODEL: Record<View, { label: string; sub: string; sweep: string; glow: string }> = {
  fronx: {
    label: "FRONX",
    sub: "Mild Hybrid",
    sweep: "linear-gradient(120deg,#0d1520 0%,#0d2a4a 45%,#1B6EC8 100%)",
    glow: "#1B6EC8",
  },
  jimny: {
    label: "JIMNY",
    sub: "ALLGRIP PRO 4WD",
    sweep: "linear-gradient(120deg,#0a1208 0%,#162a10 45%,#3A7D44 100%)",
    glow: "#3A7D44",
  },
};

const ease = [0.16, 1, 0.3, 1] as const;
const safe = (p: Promise<unknown>, ms: number) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]);

export default function SuzukiShowroomSwitch() {
  const [view, setView] = useState<View>("fronx");
  const [target, setTarget] = useState<View>("fronx");
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
    <div>
      <div className="sticky top-[4.5rem] z-[60] flex justify-center px-3 pt-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/15 bg-black/55 p-1.5 sm:pl-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <motion.span animate={{ rotate: spin }} transition={{ duration: 0.6, ease }} className="hidden text-white/60 sm:inline-flex" aria-hidden="true">
            <ArrowLeftRight className="h-4 w-4" />
          </motion.span>
          <div className="relative flex rounded-full bg-white/[0.06] p-1" role="tablist" aria-label="สลับรุ่น Suzuki Fronx / Jimny">
            {(Object.keys(MODEL) as View[]).map((v) => {
              const active = target === v;
              return (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchTo(v)}
                  className={`relative z-10 min-w-[72px] rounded-full px-3 py-2 text-xs font-extrabold uppercase tracking-[0.1em] transition-colors duration-300 sm:min-w-[96px] sm:px-4 sm:tracking-[0.14em] sm:text-sm ${
                    active ? "text-[#101114]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="suzuki-thumb"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ backgroundColor: "#fff", boxShadow: `0 0 24px ${MODEL[v].glow}99` }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="hidden sm:inline">{MODEL[v].label}</span>
                  <span className="sm:hidden">{MODEL[v].label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div key={view} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        {view === "fronx" ? <SuzukiFronxShowroom /> : <SuzukiJimnyShowroom />}
      </motion.div>

      <motion.div
        initial={{ x: "-100%" }}
        animate={controls}
        className="pointer-events-none fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4"
        style={{ background: MODEL[target].sweep }}
        aria-hidden="true"
      >
        <span className="flex h-24 items-center rounded-2xl bg-white px-10 shadow-2xl sm:h-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logos/suzuki.svg" alt="" className="h-9 w-auto sm:h-11" />
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
