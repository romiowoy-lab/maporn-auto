"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ParallaxLayer({
  children,
  className = "",
  strength = 16,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [strength]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div ref={layerRef} className="absolute -inset-x-0 -top-[16%] -bottom-[16%]">
        {children}
      </div>
    </div>
  );
}
