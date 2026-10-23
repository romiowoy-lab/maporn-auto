"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

// Counts up once in view. A null value renders an honest "—" instead of an invented number.
export default function Stat({
  value,
  unit,
  label,
  note,
  size = "lg",
  decimals,
}: {
  value: number | null;
  unit?: string;
  label: string;
  note?: string | null;
  size?: "lg" | "md";
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Vertical-only margin: a horizontal inset would never "see" numbers near the screen edge
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(value === null ? "—" : "0");

  useEffect(() => {
    if (value === null || !inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const d = decimals ?? (Number.isInteger(value) ? 0 : 1);
        setDisplay(d === 0 ? Math.round(v).toLocaleString("en-US") : v.toFixed(d));
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <div>
      <p className={`font-extralight tracking-tight text-white ${size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>
        <span ref={ref}>{display}</span>
        {value !== null && unit && <span className="ml-1 text-base sm:text-lg text-white/60">{unit}</span>}
      </p>
      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">{label}</p>
      {value === null ? (
        <p className="mt-0.5 text-[10px] text-white/30">รอข้อมูลจริง</p>
      ) : (
        note && <p className="mt-0.5 text-[10px] text-white/30">{note}</p>
      )}
    </div>
  );
}
