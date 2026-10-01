import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useExp } from "../context";
import useReducedMotion from "../hooks/useReducedMotion";
import { leak } from "../lib/fx";

/* Prologue: darkness, grain, small type, slow pacing. ENTER opens the world with a circular mask. */
export default function Intro({ onEnter, onDone }) {
  const { content } = useExp();
  const { lines, nameLine } = content.opening;
  const { introImage, introVideo } = content.assets;
  const root = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ps = gsap.utils.toArray("#il p");
      const tl = gsap.timeline({ delay: 0.8 });
      ps.forEach((p, i) => {
        const last = i === ps.length - 1;
        tl.fromTo(p, { opacity: 0, y: 14, filter: "blur(8px)" }, { opacity: last ? 0.9 : 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power2.out" });
        if (!last) tl.to(p, { opacity: 0, filter: "blur(6px)", duration: 0.9, ease: "power1.in" }, i === nameLine ? "+=1.1" : "+=0.7");
      });
      tl.to("#enter", { opacity: 1, duration: 1.4 }, "-=0.4");
      if (reduced) tl.progress(1);
      if (introImage || introVideo) gsap.to("#ibg", { opacity: 0.55, duration: 4, delay: 0.2 });
    }, root);
    return () => ctx.revert();
  }, []);

  const enter = () => {
    onEnter();
    leak();
    gsap
      .timeline({ onComplete: onDone })
      .to(["#il p", "#enter"], { opacity: 0, duration: 0.5 })
      .to(root.current, { clipPath: "circle(0% at 50% 50%)", duration: reduced ? 0.01 : 1.8, ease: "power3.inOut" }, 0.2);
  };

  return (
    <div id="intro" ref={root} role="dialog" aria-label="Introduction">
      <div id="ibg">
        {introVideo ? <video src={introVideo} autoPlay muted loop playsInline /> : introImage ? <img src={introImage} alt="" /> : null}
      </div>
      <div id="il">
        {lines.map((t, i) => (
          <p key={i} className={i === nameLine ? "name" : ""}>
            {t}
          </p>
        ))}
      </div>
      <button id="enter" onClick={enter} data-cur="ENTER">
        ENTER
      </button>
    </div>
  );
}
