"use client";

import { useEffect, useRef, useState } from "react";

export default function OmodaHero() {
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: px * 12, y: py * 8 });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-[#0a0a0b]">
      {/* Real OMODA|JAECOO brand film (already approved as the site's Hero video) — kept
          as-is here, just reused as this page's cinematic Hero background too. */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0) scale(${mounted ? 1.06 : 1.12})`,
          transitionDuration: mounted ? "14s" : "700ms",
        }}
      >
        <video preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          poster="/brand/hero/omoda-jaecoo-more-rain.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/brand/video/omoda-jaecoo-more-rain.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Soft vignette only — no flat gradient wash, keeps the photo's own lighting intact. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,11,0.55)_100%)]" />

      <h1 className="sr-only">OMODA | JAECOO ตัวแทนจำหน่ายอย่างเป็นทางการ — Maporn Autogroup</h1>
    </section>
  );
}
