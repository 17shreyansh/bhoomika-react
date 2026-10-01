import { useEffect, useState } from "react";
import content from "./data/bhoomika";
import { Ctx } from "./context";
import useAudio from "./hooks/useAudio";
import useReducedMotion from "./hooks/useReducedMotion";
import { startScroll, stopScroll } from "./lib/lenis";
import { Grain, Vignette, Leak, Dust, useAssetVars } from "./components/Atmosphere";
import Cursor from "./components/Cursor";
import Hud from "./components/Hud";
import Intro from "./components/Intro";
import PhotoViewer from "./components/PhotoViewer";
import World from "./components/World";

function Experience() {
  const [started, setStarted] = useState(false); // ENTER pressed
  const [introOpen, setIntroOpen] = useState(true); // intro overlay still mounted
  const [viewer, setViewer] = useState(null);
  const audio = useAudio(content.music.source);
  const reduced = useReducedMotion();
  useAssetVars(content);

  useEffect(() => {
    document.body.classList.toggle("lock", !started);
  }, [started]);

  useEffect(() => {
    if (!started || reduced) return;
    startScroll();
    return stopScroll;
  }, [started, reduced]);

  const openPhoto = (m, el) => setViewer({ m, rect: el.getBoundingClientRect() });
  const enter = () => {
    audio.set(true); // inside the click: satisfies browser autoplay rules
    setStarted(true);
  };

  return (
    <Ctx.Provider value={{ content, audio, openPhoto }}>
      <Grain />
      <Vignette />
      <Leak />
      <Dust />
      <Cursor />
      {started && (
        <>
          <World />
          <Hud />
        </>
      )}
      {introOpen && <Intro onEnter={enter} onDone={() => setIntroOpen(false)} />}
      <PhotoViewer item={viewer} onClose={() => setViewer(null)} />
    </Ctx.Provider>
  );
}

export default function App() {
  return <Experience />;
}
