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
    lines: [
      "I was thinking about how much time has passed...",
      "...from our school days till now.",
      "Distance happened. Plans failed.",
      "But some bonds never change.",
      "Bhoomika.",
      "This is for you."
    ],
    nameLine: 4,
  },

  // 12 slots: 0-2 little things · 3-5 photo field · 6 "what stayed" · 7-11 film strip
  memories: Array.from({ length: 12 }, blank),
  hoverNote: "I still remember this.", 

  statements: [
    "I remember how we slowly became so close back in 11th and 12th.",
    "I remember all those cancelled plans and repeat-telecast problems.",
    "But mostly, we just remember that you've always been there."
  ],
  
  silence: "Sometimes we get busy dealing with our own lives... But honestly, nothing really changes.",
  
  stayed: [
    "The genuine sweetness stayed.",
    "The late night advice stayed.",
    "The fact that there's only one Bika stayed."
  ],

  letters: [
    { person: "Shreyansh", image: "", fp: "50% 35%", message: "Happiest Birthday Bika! ✨ It's crazy to look back and see how much we've all grown since school. Even with distance, busy schedules, and plans that fail more often than they succeed, you've always been the one constant we can rely on. Thank you for always listening to our endless drama, giving the best advice, and never making any of us feel alone. Have the absolute best day ever, you deserve everything good that comes your way! 🤍" },
    { person: "Khushi", image: "", fp: "50% 35%", message: "Happiest Birthday bhumika! 🥹💗🎂 So starting from as usual ki hum etna late kyu mile 11th class mein or vo bhi Kanishka ke through aur pata hi nahi chala kab ek random baat se itni achhi dosti mein badal gaya. 🫶🏻 School m woh saare din tumhare saath rehna, saath hasna, choti-choti baatein share karna—honestly, sab kuch bohot special tha. ❤️ Tum since day one itni sweet, kind-hearted aur genuine rahi ho mere saath, and I’m genuinely grateful ki school ne mujhe tum jaisi dost di. 🥺💗 Bas 12th ke exams ke baad life ne thoda plot twist de diya. 😭 Distance aa gaya, milna almost impossible ho gaya, aur hum dono ka favourite dialogue ban gaya—'Tum busy thi kya?' 'Haan yaar, plan bana tha but successful nahi ho paya'. 😂😭 Plans humare NASA mission se bhi zyada complicated ho gaye hain. 💀 But honestly, distance aur busy schedules ke baad bhi kuch friendships ki value same rehti hai, and ours is definitely one of them. 🫂 I really hope hum jaldi milenge, proper catch-up karenge aur phir complain karenge ki 'yaar itne time baad mile aur time itni jaldi khatam ho gaya.' 😂❤️ I hope this year brings you everything you deserve—lots of happiness, peace, success, good people and countless reasons to smile. Keep being the same sweet, kind-hearted person you’ve always been. 💗 Happy Birthday once again bbg! 🥹🎀 Miss you and lots of love. ❤️🫶🏻" },
    { person: "Krishna", image: "", fp: "50% 35%", message: "Happiest Birthday, Bikaaa! ♥️❣️🎂✨ First of all, I just want to thank you for being there for me all these years. 🥹❤️ It’s honestly crazy to think how many years it has been since we first met, from our school days till now. And even after all the little fights and misunderstandings we’ve had, you have never really made me feel alone or unwanted. You’ve always handled things with your sweetness and somehow made everything feel okay. 🫶🏻 I still remember the day we first met and how, especially during APSA, we slowly became so close in 11th, and then even more in 12th. Those memories will always have a special place in my heart. 🥹💗 I honestly don’t know what the future holds or how things will be later, but I know one thing for sure — I never want this friendship and this bond to ever become distant or disappear. 🫂❤️ Sometimes you might doubt whether we’re still as close or whether we’re just being formal with each other, but honestly, that’s never the case. Sometimes we just get busy dealing with our own lives and things, and that’s all. Otherwise, nothing really changes. And I feel like our bond has become strong enough now that we don’t always need constant validation or reassurance to know that we’re still there for each other. 🫶🏻✨ Because no matter how many people there are, there can only be one Bika. 😭😂❤️ And I can never forget how many times you helped me when we were in 12th. You listened to the same one problem of mine literally COUNTLESS times 🥲🥲🫠 — full-on repeat telecast — and somehow you still gave me advice every single time, and that too at a PRO level. 😂😭❤️ Honestly, thank you for having the patience to listen to me again and again. At the end of the day, I just want this bond to stay the way it is. ❤️🫂 And I’m genuinely sorry if, at any point in the past, I ignored something you said, made you feel bad, or unintentionally hurt you. I never meant to. 🥺 And one more thing — if something ever bothers you or if you ever feel like something is different, please just tell me directly. You never need to stay quiet about anything. You can always ask me or confirm anything with me. Don’t ever feel like you have to overthink my actions or wonder if I’m just pretending. You can always be completely honest with me. 🤍 No matter how busy life gets or how much things change, I’ll always value what we have. 🫶🏻✨ And once again… Happieeeest Birthday, Bikaaa! ♥️❣️🎂🥳 I hope this year brings you lots of happiness, peace, beautiful memories and everything you deserve. 💗✨ Stay the same sweet Bika foreverrr! 🫂😂❤️" },
  ],

  forName: "We hope you know how deeply you are loved. Not just today, but every day.",

  final: { 
    title: "Happy Birthday", 
    image: "", 
    fp: "50% 35%", 
    secret: "P.S. We still need to make that NASA-level plan work." 
  },

  music: { source: "", title: "SOUNDTRACK" },

  // Optional atmosphere (generate anywhere, e.g. Higgsfield, drop into /public). Empty = procedural fallback.
  assets: { introImage: "", introVideo: "", paper: "", leak: "", dust: "" },
};

