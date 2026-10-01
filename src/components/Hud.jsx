import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useExp } from "../context";

/* Thin progress line + chapter number + the music control. No navigation, no footer. */
export default function Hud() {
  const { audio, content } = useExp();
  const [ch, setCh] = useState("01");
  const bar = useRef(null);

  useEffect(() => {
    gsap.to(["#prog", "#music"], { opacity: 0.9, duration: 1.5, delay: 1.4 });
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - innerHeight || 1;
      if (bar.current) bar.current.style.transform = `scaleY(${Math.min(1, scrollY / max)})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCh(e.target.dataset.ch)),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    document.querySelectorAll("section[data-ch]").forEach((s) => io.observe(s));
    return () => {
      removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div id="prog" aria-hidden="true">
        <span>{ch}</span>
        <i>
          <b ref={bar} />
        </i>
      </div>
      <button id="music" className={audio.playing ? "play" : ""} onClick={audio.toggle} aria-label="Toggle music" aria-pressed={audio.playing} data-cur="SOUND">
        <span className="bars" aria-hidden="true">
          <s />
          <s />
          <s />
        </span>
        <span>{content.music.title || "SOUND"}</span>
      </button>
    </>
  );
}
