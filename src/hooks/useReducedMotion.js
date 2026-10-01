import { useEffect, useState } from "react";

const Q = "(prefers-reduced-motion: reduce)";

export default function useReducedMotion() {
  const [reduced, set] = useState(() => matchMedia(Q).matches);
  useEffect(() => {
    const m = matchMedia(Q);
    const f = () => set(m.matches);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return reduced;
}
