/*
  The ONLY place personal material lives.
  Nothing here is invented: every empty string is a placeholder waiting for real content.
  Put photos in /public/photos and reference them as "/photos/01.jpg".
  Put the soundtrack in /public/audio and set music.source to "/audio/track.mp3".
*/
const blank = () => ({ image: "", caption: "", date: "", location: "", fp: "50% 35%" });

export default {
  name: "Bhoomika",

  // Prologue lines. nameLine = index of the line that is her name (rendered large).
  opening: {
    lines: ["Some memories…", "…never really leave.", "Some people…", "…make them worth keeping.", "Bhoomika.", "This is for you."],
    nameLine: 4,
  },

  // 12 slots: 0-2 little things · 3-5 photo field · 6 "what stayed" · 7-11 film strip
  memories: Array.from({ length: 12 }, blank),
  hoverNote: "[a tiny note]", // appears when hovering the first small print

  statements: ["[A line about one memory.]", "[A line about another.]", "[A line about what changed.]"],
  silence: "[One sentence that deserves the music to go quiet.]",
  stayed: ["[What stayed, first.]", "[What stayed, second.]", "[What stayed, last.]"],

  letters: [
    { person: "[Name 01]", image: "", fp: "50% 35%", message: "[Message from the first person goes here. Sentences reveal one by one as the reader scrolls.]" },
    { person: "[Name 02]", image: "", fp: "50% 35%", message: "[Message from the second person goes here.]" },
    { person: "[Name 03]", image: "", fp: "50% 35%", message: "[Message from the third person goes here. This one is the longest, slowest reading area.]" },
  ],

  forName: "[Your own birthday message goes here.]",

  final: { title: "Happy Birthday", image: "", fp: "50% 35%", secret: "[A hidden note, shown after holding the mark.]" },

  music: { source: "", title: "SOUND" },

  // Optional atmosphere (generate anywhere, e.g. Higgsfield, drop into /public). Empty = procedural fallback.
  assets: { introImage: "", introVideo: "", paper: "", leak: "", dust: "" },
};
