import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let tick = null;

export const getLenis = () => lenis;

export function startScroll() {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.085 });
  lenis.on("scroll", (e) => {
    ScrollTrigger.update();
    // scroll velocity → CSS var, used for the subtle layer separation in the photo field
    document.documentElement.style.setProperty("--vel", Math.max(-1, Math.min(1, e.velocity / 40)).toFixed(3));
  });
  tick = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function stopScroll() {
  if (!lenis) return;
  gsap.ticker.remove(tick);
  lenis.destroy();
  lenis = null;
  document.documentElement.style.removeProperty("--vel");
}
