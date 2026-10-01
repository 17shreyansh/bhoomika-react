import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExp } from "../context";
import useReducedMotion from "../hooks/useReducedMotion";
import Photo from "./Photo";

gsap.registerPlugin(ScrollTrigger);

/* Runs `fn(root)` inside a gsap.context scoped to the section; everything (tweens + ScrollTriggers) is reverted on unmount. */
function useScene(fn) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => fn(ref.current), ref);
    return () => ctx.revert();
  }, [reduced]);
  return ref;
}

const pin = (trigger, end) => gsap.timeline({ scrollTrigger: { trigger, start: "top top", end, pin: true, scrub: 0.8 } });

/* 01 — the invitation: curiosity, not "HAPPY BIRTHDAY" */
export function Invitation({ name }) {
  const ref = useScene((root) => {
    gsap.from(root.querySelector("h1"), { opacity: 0, scale: 1.08, filter: "blur(14px)", duration: 2.4, ease: "power3.out", delay: 0.4 });
    const p = root.querySelector("path");
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(p, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", delay: 2 }); // the one handwritten detail
  });
  return (
    <section ref={ref} className="light ch" data-ch="01">
      <p className="meta">01 &nbsp; the invitation</p>
      <h1 className="big">
        {name},<br />
        <em>come in slowly.</em>
      </h1>
      <svg className="ul" viewBox="0 0 520 24" aria-hidden="true">
        <path d="M4 14 C 90 4, 160 20, 250 12 S 420 6, 516 13" />
      </svg>
    </section>
  );
}

/* 02 — little things: small prints that grow as you arrive */
export function LittleThings({ items, note }) {
  const ref = useScene((root) => {
    gsap.utils.toArray(".ph", root).forEach((p) =>
      gsap.fromTo(p, { scale: 0.35, opacity: 0, y: 60 }, { scale: 1, opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: p, start: "top 95%", end: "top 45%", scrub: 0.6 } })
    );
  });
  return (
    <section ref={ref} className="paper c2" data-ch="02">
      <p className="meta">02 &nbsp; the little things</p>
      <div className="row">
        <Photo m={items[0]} n={1} note={note} />
        <Photo m={items[1]} n={2} />
        <Photo m={items[2]} n={3} cls="land" />
      </div>
    </section>
  );
}

/* Film strip: pinned, horizontal */
export function FilmStrip({ items, start }) {
  const ref = useScene((root) => {
    const tr = root.querySelector(".track");
    gsap.to(tr, {
      x: () => -(tr.scrollWidth - innerWidth + innerWidth * 0.14),
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: () => "+=" + tr.scrollWidth, pin: true, scrub: 0.8, invalidateOnRefresh: true },
    });
  });
  return (
    <section ref={ref} className="dark strip" data-ch="02" data-leak>
      <div className="pin">
        <p className="meta">fragments</p>
        <div className="track">
          {items.map((m, i) => (
            <Photo key={i} m={m} n={start + i + 1} cls={i % 2 ? "land" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* 03 — the photographs: a controlled scatter with depth, parallax and draggable prints */
export function MemoryField({ items, start }) {
  const ref = useScene((root) => {
    const f = root.querySelector(".field");
    [[".a", -90], [".b", 120], [".c", -40]].forEach(([sel, y]) =>
      gsap.fromTo(root.querySelector(sel), { yPercent: -y / 6, opacity: 0, scale: 0.92 }, { yPercent: y / 6, opacity: 1, scale: 1, ease: "none", scrollTrigger: { trigger: f, start: "top 90%", end: "bottom 20%", scrub: 1 } })
    );
    gsap.to(root.querySelector(".b .fr"), { xPercent: -35, ease: "none", scrollTrigger: { trigger: f, start: "top 20%", end: "bottom 60%", scrub: 1 } });
  });
  return (
    <section ref={ref} className="dark" data-ch="03">
      <div className="field">
        <div className="t">
          <p className="meta">03 &nbsp; the photographs</p>
        </div>
        <Photo m={items[0]} n={start + 1} cls="a" drag />
        <Photo m={items[1]} n={start + 2} cls="b" drag />
        <Photo m={items[2]} n={start + 3} cls="c land" drag />
      </div>
    </section>
  );
}

/* Statements: three lines, one at a time, pinned */
export function Statements({ lines }) {
  const ref = useScene((root) => {
    const st = gsap.utils.toArray(".st", root);
    const tl = pin(root, "+=" + st.length * 90 + "%");
    st.forEach((el) =>
      tl
        .fromTo(el, { opacity: 0, y: 40, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 })
        .to(el, { opacity: 0, y: -40, filter: "blur(10px)", duration: 1 }, ">+.8")
    );
  });
  return (
    <section ref={ref} className="wine stm" data-ch="03">
      <div className="stk">
        {lines.map((t, i) => (
          <p key={i} className="big st">
            {t}
          </p>
        ))}
      </div>
    </section>
  );
}

/* 04 — three voices */
export function VoicesTitle() {
  const ref = useScene((root) => {
    gsap.from(root.querySelector("h2"), { opacity: 0, y: 40, filter: "blur(10px)", duration: 2, ease: "power2.out", scrollTrigger: { trigger: root, start: "top 60%" } });
  });
  return (
    <section ref={ref} className="wine ch" data-ch="04" data-leak>
      <p className="meta">04 &nbsp; three voices</p>
      <h2 className="big">
        The people
        <br />
        <em>who remember.</em>
      </h2>
    </section>
  );
}

const TONES = [
  { sec: "light", cls: "", flip: false },
  { sec: "dark", cls: "flip", flip: true },
  { sec: "paper", cls: "l3", flip: false },
];

export function LetterScene({ letter, index }) {
  const t = TONES[index];
  const sentences = letter.message.split(/(?<=[.!?…])\s+/);
  const ref = useScene((root) => {
    gsap.utils.toArray(".s", root).forEach((s) =>
      gsap.fromTo(s, { opacity: 0.08, filter: "blur(5px)", y: 10 }, { opacity: 1, filter: "blur(0px)", y: 0, ease: "none", scrollTrigger: { trigger: s, start: "top 82%", end: "top 58%", scrub: true } })
    );
    const ph = root.querySelector(".ph");
    gsap.fromTo(ph, { clipPath: "inset(0 0 100% 0)", y: 40 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: ph, start: "top 85%" } });
  });
  return (
    <section ref={ref} className={t.sec} data-ch="04">
      <div className={`letter ${t.cls} l${index + 1}`}>
        <Photo m={{ image: letter.image, caption: letter.person, fp: letter.fp }} n={index + 1} />
        <div>
          <p className="meta">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="who">{letter.person}</h3>
          <p className="read" data-cur="READ">
            {sentences.map((s, i) => (
              <span key={i} className="s">
                {s}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

/* 05 — silence: the music ducks, only words remain */
export function Silence({ text }) {
  const { audio } = useExp();
  const ref = useScene((root) => {
    pin(root, "+=220%").to(gsap.utils.toArray(".w", root), { opacity: 1, stagger: 0.4, duration: 0.6 }).to({}, { duration: 1.4 });
    ScrollTrigger.create({ trigger: root, start: "top 60%", end: "bottom 40%", onToggle: (t) => audio.duck(t.isActive) });
  });
  return (
    <section ref={ref} className="dark sil" data-ch="05" data-leak>
      <p id="silt">
        {text.split(" ").map((w, i) => (
          <span key={i} className="w">
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}

/* What stayed: one photograph, slow settle, three lines over it */
export function Stayed({ m, lines, n }) {
  const ref = useScene((root) => {
    const tl = pin(root, "+=320%");
    tl.fromTo(root.querySelector(".im"), { scale: 1.3 }, { scale: 1, duration: 4.2, ease: "none" }, 0);
    gsap.utils.toArray(".sl p", root).forEach((p, i) =>
      tl.fromTo(p, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, i * 1.3 + 0.3).to(p, { opacity: 0, duration: 0.6 }, i * 1.3 + 1.4)
    );
  });
  return (
    <section ref={ref} className="dark stay" data-ch="05">
      <div className="sp">
        <Photo m={m} n={n} cls="land" />
        <div className="sl">
          {lines.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 06 — for her: everything simpler */
export function ForName({ name, text }) {
  const ref = useScene((root) => {
    gsap.from(root.querySelector(".read"), { opacity: 0, y: 30, filter: "blur(8px)", duration: 2, ease: "power2.out", scrollTrigger: { trigger: root, start: "top 50%" } });
  });
  return (
    <section ref={ref} className="light ch" data-ch="06">
      <p className="meta">06 &nbsp; for {name}</p>
      <p className="read" style={{ fontSize: "clamp(26px,4vw,52px)", maxWidth: "16ch" }}>
        {text}
      </p>
    </section>
  );
}

/* Epilogue — quiet, earned, with a callback to the opening */
export function Finale({ name, final, callback, n }) {
  const secret = useRef(null);
  const timer = useRef(null);
  const ref = useScene((root) => {
    gsap.utils.toArray(".final > *", root).forEach((el) => {
      if (el.id === "secret") return;
      gsap.from(el, { opacity: 0, y: 30, filter: "blur(8px)", duration: 2.2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
  });
  const hold = () => (timer.current = setTimeout(() => gsap.to(secret.current, { opacity: 1, duration: 2 }), 1100));
  const release = () => clearTimeout(timer.current);
  return (
    <section ref={ref} className="dark" data-ch="07">
      <div className="final">
        <p className="back">{callback}</p>
        {final.image && <Photo m={{ image: final.image, caption: "", fp: final.fp }} n={n} />}
        <h2 className="big">{name}.</h2>
        <h2 className="big">
          <em>{final.title}.</em>
        </h2>
        <button id="hold" aria-label="Press and hold" onPointerDown={hold} onPointerUp={release} onPointerLeave={release}>
          ·
        </button>
        <p id="secret" ref={secret}>
          {final.secret}
        </p>
      </div>
    </section>
  );
}
