# BHOOMIKA — The Memory Experience (React + Vite)

    npm install
    npm run dev      # develop
    npm run build    # production build in dist/

## Where the personal content goes
Everything lives in `src/data/bhoomika.js` — nothing personal is hard-coded in JSX.

- Photos: put files in `public/photos/` and set `image: "/photos/01.jpg"`. Use `fp: "50% 30%"` to protect faces (focal point).
- Soundtrack: put the file in `public/audio/` and set `music.source: "/audio/track.mp3"`. With no file, a soft ambient pad plays instead.
- Letters: replace `person`, `image`, `message` for the three letters. Words are never altered.
- Optional atmosphere (paper texture, light leak, dust overlay, intro image/video): paths in `assets`. Empty = procedural fallback.

## Structure
- `components/scenes.jsx` — each chapter is a component; all GSAP/ScrollTrigger work is scoped with `gsap.context` and reverted on unmount.
- `lib/lenis.js` — Lenis ⇄ ScrollTrigger sync, scroll velocity → `--vel` CSS variable.
- `hooks/useAudio.js` — soundtrack, fade-in on ENTER, ducking during the silence chapter.
- Reduced motion: pinned scenes fall back to a plain stacked layout.

## Memory slots
0–2 little things · 3–5 photo field · 6 "what stayed" · 7–11 film strip. Final photo: `final.image`.
