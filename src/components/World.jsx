import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExp } from "../context";
import { leak } from "../lib/fx";
import { Invitation, LittleThings, FilmStrip, MemoryField, Statements, VoicesTitle, LetterScene, Silence, Stayed, ForName, Finale } from "./scenes";

gsap.registerPlugin(ScrollTrigger);

/*
  The film, in order. Memory slots: 0-2 little things · 3-5 field · 6 what stayed · 7-11 film strip.
  Light → dark → paper → wine → light → dark → near-black → light → final.
*/
export default function World() {
  const { content: c } = useExp();
  const M = c.memories;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-leak]").forEach((s) => ScrollTrigger.create({ trigger: s, start: "top 70%", once: true, onEnter: leak }));
    });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <main id="world">
      <Invitation name={c.name} />
      <LittleThings items={M.slice(0, 3)} note={c.hoverNote} />
      <FilmStrip items={M.slice(7, 12)} start={7} />
      <MemoryField items={M.slice(3, 6)} start={3} />
      <Statements lines={c.statements} />
      <VoicesTitle />
      {c.letters.map((l, i) => (
        <LetterScene key={i} letter={l} index={i} />
      ))}
      <Silence text={c.silence} />
      <Stayed m={M[6]} lines={c.stayed} n={7} />
      <ForName name={c.name} text={c.forName} />
      <Finale name={c.name} final={c.final} callback={c.opening.lines[1]} n={13} />
    </main>
  );
}
