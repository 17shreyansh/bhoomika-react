import { useRef } from "react";
import { gsap } from "gsap";
import { useExp } from "../context";

/* A photograph as a physical print. `drag` lets it be nudged on desktop; it springs back gently. */
export default function Photo({ m, n, cls = "", note = "", drag = false }) {
  const { openPhoto } = useExp();
  const ref = useRef(null);
  const moved = useRef(false);

  const open = () => {
    if (!moved.current) openPhoto(m, ref.current);
  };

  const down = (e) => {
    if (!drag || e.pointerType === "touch") return;
    const fr = ref.current.querySelector(".fr");
    const sx = e.clientX;
    const sy = e.clientY;
    moved.current = false;
    const mv = (ev) => {
      const dx = ev.clientX - sx;
      const dy = ev.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 6) moved.current = true;
      gsap.set(fr, { x: dx * 0.6, y: dy * 0.6, rotation: dx * 0.02 });
    };
    const up = () => {
      removeEventListener("pointermove", mv);
      removeEventListener("pointerup", up);
      gsap.to(fr, { x: 0, y: 0, rotation: 0, duration: 1.4, ease: "elastic.out(1,0.9)" });
      setTimeout(() => (moved.current = false), 60);
    };
    addEventListener("pointermove", mv);
    addEventListener("pointerup", up);
  };

  return (
    <figure
      ref={ref}
      className={`ph ${cls}`}
      tabIndex={0}
      role="button"
      aria-label={`Open photograph ${n}`}
      data-cur="VIEW"
      onClick={open}
      onPointerDown={down}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className="fr">
        <div className="im">
          {m.image ? (
            m.image.endsWith('.mp4') ? (
              <video src={m.image} autoPlay loop muted playsInline style={{ "--fp": m.fp, objectFit: m.fit || "cover" }} />
            ) : (
              <img src={m.image} alt={m.caption || `Memory ${n}`} loading="lazy" style={{ "--fp": m.fp, objectFit: m.fit || "cover" }} />
            )
          ) : (
            <div className="blank">
              PHOTO {String(n).padStart(2, "0")}
              <br />
              add image in data/bhoomika.js
            </div>
          )}
        </div>
        <div className="cap">{m.caption}</div>
      </div>
      {note && <span className="note">{note}</span>}
    </figure>
  );
}
