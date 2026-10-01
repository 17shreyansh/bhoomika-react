import { gsap } from "gsap";

// Warm light leak crossing the frame at a chapter seam (700–1500ms, per the brief).
export function leak() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.fromTo(
    "#leak",
    { opacity: 0, xPercent: -60 },
    { opacity: 0.9, xPercent: 60, duration: 1.2, ease: "power1.inOut", onComplete: () => gsap.set("#leak", { opacity: 0 }) }
  );
}
