import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* Desktop only. Small dot; grows and labels itself over anything with data-cur. */
export default function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const el = ref.current;
    const qx = gsap.quickTo(el, "x", { duration: 0.25, ease: "power3" });
    const qy = gsap.quickTo(el, "y", { duration: 0.25, ease: "power3" });
    const move = (e) => {
      qx(e.clientX);
      qy(e.clientY);
    };
    const over = (e) => {
      const t = e.target.closest?.("[data-cur]");
      el.classList.toggle("on", !!t);
      el.textContent = t ? t.dataset.cur : "";
    };
    addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    return () => {
      removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, []);
  return <div id="cur" ref={ref} aria-hidden="true" />;
}
