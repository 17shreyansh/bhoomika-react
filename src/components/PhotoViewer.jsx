import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { getLenis } from "../lib/lenis";
import useReducedMotion from "../hooks/useReducedMotion";

/* Fullscreen memory: reveals from the clicked print; closing returns to the exact scroll position. */
export default function PhotoViewer({ item, onClose }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const close = () =>
    gsap.to(ref.current, {
      clipPath: "circle(0% at 50% 50%)",
      duration: reduced ? 0.01 : 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        getLenis()?.start();
        document.body.style.overflow = "";
        onClose();
      },
    });

  useLayoutEffect(() => {
    if (!item) return;
    const el = ref.current;
    const { left, top, width, height } = item.rect;
    const at = `${left + width / 2}px ${top + height / 2}px`;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    gsap.fromTo(el, { clipPath: `circle(0% at ${at})` }, { clipPath: `circle(150% at ${at})`, duration: reduced ? 0.01 : 1.1, ease: "power3.inOut" });
    gsap.fromTo(el.querySelector(".vi"), { scale: 1.06 }, { scale: 1, duration: reduced ? 0.01 : 8, ease: "none" });
    el.querySelector(".x").focus();
    const key = (e) => e.key === "Escape" && close();
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [item]);

  if (!item) return null;
  const { m } = item;
  return (
    <div id="viewer" ref={ref} role="dialog" aria-modal="true" aria-label="Photograph" onClick={(e) => e.target === ref.current && close()}>
      <button className="x" onClick={close} aria-label="Close photograph">
        CLOSE
      </button>
      <div className="vi">
        {m.image ? (
          m.image.endsWith('.mp4') ? (
            <video src={m.image} autoPlay loop muted playsInline controls />
          ) : (
            <img src={m.image} alt={m.caption || "Memory"} />
          )
        ) : (
          <div className="blank">PHOTO — add image in data/bhoomika.js</div>
        )}
      </div>
      <div className="vm">
        <span>{[m.date, m.location].filter(Boolean).join("  ·  ")}</span>
        <span>{m.caption}</span>
      </div>
    </div>
  );
}
