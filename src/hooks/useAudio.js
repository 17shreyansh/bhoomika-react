import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/*
  Soundtrack controller.
  - With `source`: loops the file, fades in on ENTER, ducks during the silence chapter.
  - Without `source`: a soft Web Audio pad stands in so the experience is never mute while you build.
*/
export default function useAudio(source) {
  const el = useRef(null);
  const pad = useRef(null);
  const on = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!source) return;
    const a = new Audio(source);
    a.loop = true;
    a.volume = 0;
    el.current = a;
    return () => {
      gsap.killTweensOf(a);
      a.pause();
      el.current = null;
    };
  }, [source]);

  useEffect(
    () => () => {
      pad.current?.c.close().catch(() => {});
      pad.current = null;
    },
    []
  );

  const ensurePad = () => {
    if (pad.current) return pad.current;
    const AC = window.AudioContext || window.webkitAudioContext;
    const c = new AC();
    const g = c.createGain();
    const f = c.createBiquadFilter();
    g.gain.value = 0;
    f.type = "lowpass";
    f.frequency.value = 700;
    [110, 164.81, 220, 277.18].forEach((hz, i) => {
      const o = c.createOscillator();
      const og = c.createGain();
      o.type = i % 2 ? "triangle" : "sine";
      o.frequency.value = hz;
      og.gain.value = 0.05 / (i + 1);
      const l = c.createOscillator();
      const lg = c.createGain();
      l.frequency.value = 0.05 + i * 0.03;
      lg.gain.value = 0.02;
      l.connect(lg);
      lg.connect(og.gain);
      l.start();
      o.connect(og);
      og.connect(f);
      o.start();
    });
    f.connect(g);
    g.connect(c.destination);
    return (pad.current = { c, g });
  };

  const ramp = (v, t) => {
    const p = ensurePad();
    p.c.resume();
    const now = p.c.currentTime;
    p.g.gain.cancelScheduledValues(now);
    p.g.gain.setValueAtTime(p.g.gain.value, now);
    p.g.gain.linearRampToValueAtTime(v, now + t);
  };

  const set = useCallback(
    (next) => {
      on.current = next;
      setPlaying(next);
      if (source) {
        const a = el.current;
        if (!a) return;
        gsap.killTweensOf(a);
        if (next) {
          a.play().catch(() => {});
          gsap.to(a, { volume: 0.7, duration: 4 });
        } else {
          gsap.to(a, { volume: 0, duration: 1.2, onComplete: () => a.pause() });
        }
      } else {
        try { ramp(next ? 0.5 : 0, next ? 5 : 1.5); } catch { /* audio unavailable */ }
      }
    },
    [source]
  );

  const duck = useCallback(
    (d) => {
      if (!on.current) return;
      if (source) el.current && gsap.to(el.current, { volume: d ? 0.1 : 0.7, duration: 2 });
      else { try { ramp(d ? 0.08 : 0.5, 2); } catch { /* audio unavailable */ } }
    },
    [source]
  );

  const toggle = useCallback(() => set(!on.current), [set]);

  return { playing, set, toggle, duck };
}
