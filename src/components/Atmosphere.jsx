import { useEffect, useMemo } from "react";
import { useExp } from "../context";
import useReducedMotion from "../hooks/useReducedMotion";

export function Grain() {
  return <div id="grain" />;
}
export function Vignette() {
  return <div id="vig" />;
}
export function Leak() {
  return <div id="leak" />;
}

/* Optional generated assets (paper texture / light leak) are applied as CSS variables. */
export function useAssetVars(content) {
  const { paper, leak } = content.assets;
  useEffect(() => {
    const r = document.documentElement.style;
    if (paper) r.setProperty("--tex", `url("${paper}")`);
    if (leak) r.setProperty("--leakimg", `url("${leak}")`);
    return () => {
      r.removeProperty("--tex");
      r.removeProperty("--leakimg");
    };
  }, [paper, leak]);
}

/* Drifting dust: tiny, sparse, procedural — or a supplied overlay image. */
export function Dust() {
  const { content } = useExp();
  const reduced = useReducedMotion();
  const img = content.assets.dust;
  const dots = useMemo(
    () =>
      Array.from({ length: 22 }, () => {
        const z = 1 + Math.random() * 2.2;
        return {
          left: `${Math.random() * 100}%`,
          top: `${60 + Math.random() * 60}vh`,
          width: z,
          height: z,
          opacity: 0.15 + Math.random() * 0.45,
          "--dx": `${(Math.random() - 0.5) * 14}vw`,
          animationDuration: `${40 + Math.random() * 50}s`,
          animationDelay: `-${Math.random() * 60}s`,
        };
      }),
    []
  );
  if (reduced) return null;
  if (img) return <div id="dust" aria-hidden="true" style={{ background: `url("${img}") center/cover`, mixBlendMode: "screen", opacity: 0.35 }} />;
  return (
    <div id="dust" aria-hidden="true" style={{ opacity: 1 }}>
      {dots.map((d, i) => (
        <i key={i} style={d} />
      ))}
    </div>
  );
}
