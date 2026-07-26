import { useEffect, useState } from "react";
import { Typewriter } from "./Typewriter";

const CARDS = [
  { icon: "❤️", title: "Daughter", body: "A blessing to your family." },
  { icon: "🌸", title: "Sister", body: "A source of love and support." },
  { icon: "🤍", title: "Friend", body: "The kind of person whose kindness survives distance." },
  { icon: "📚", title: "Future Accountant", body: "Building a future one step at a time." },
  { icon: "✨", title: "Woman Becoming", body: "Growing into someone younger Wendy would admire." },
  { icon: "🌍", title: "Dream Chaser", body: "Still writing her story." },
];

const INTRO_LINES = [
  "These are the qualities I see in you.",
  "Each one is a quiet reminder of how special you are.",
];

export function ChapterTwo({ onDone }: { onDone: () => void }) {
  const [introDone, setIntroDone] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!introDone) return;
    const timers = CARDS.map((_, i) => setTimeout(() => setShown(i + 1), 600 * (i + 1)));
    return () => timers.forEach(clearTimeout);
  }, [introDone]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center">
      <p className="mb-2 text-xs tracking-[0.36em] text-primary uppercase">Chapter Two</p>
      <h2 className="mb-4 font-display text-3xl sm:text-4xl">The Person You're Becoming</h2>

      <div className="mx-auto mb-12 max-w-2xl text-left">
        <Typewriter
          segments={INTRO_LINES}
          speed={34}
          paragraphDelay={300}
          onDone={() => setIntroDone(true)}
          className="space-y-4"
          lineClassName="font-display text-lg leading-relaxed text-muted-foreground"
        />
      </div>

      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {CARDS.map((c, i) => (
          <div
            key={c.title}
            className={`glass-card rounded-3xl px-6 py-7 text-left ${
              i < shown ? "animate-soft-in" : "opacity-0"
            }`}
          >
            <div className="text-2xl">{c.icon}</div>
            <h3 className="mt-3 font-display text-2xl">{c.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onDone}
        className={`gift-button mt-12 rounded-full px-10 py-3.5 text-sm transition-opacity duration-500 ${
          shown >= CARDS.length ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        Continue
      </button>
    </div>
  );
}

const AFFIRMATIONS = [
  "You are enough.",
  "Your dreams matter.",
  "You deserve happiness.",
  "Never underestimate yourself.",
  "You make more of a difference than you realize.",
  "Someone is quietly cheering for you. Always.",
];

const INTRO_LINES_THREE = [
  "Tap each card to open it.",
  "Each one holds a small reminder meant just for you.",
];

export function ChapterThree({ onDone }: { onDone: () => void }) {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [introDone, setIntroDone] = useState(false);
  const all = flipped.length >= AFFIRMATIONS.length;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center">
      <p className="mb-2 text-xs tracking-[0.36em] text-primary uppercase">Chapter Three</p>
      <h2 className="mb-3 font-display text-3xl sm:text-4xl">Things I Hope You Never Forget</h2>

      <div className="mx-auto mb-10 max-w-2xl text-left">
        <Typewriter
          segments={INTRO_LINES_THREE}
          speed={34}
          paragraphDelay={300}
          onDone={() => setIntroDone(true)}
          className="space-y-4"
          lineClassName="font-display text-base leading-relaxed text-muted-foreground"
        />
      </div>

      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AFFIRMATIONS.map((text, i) => {
          const isFlipped = flipped.includes(i);
          return (
            <button
              key={text}
              onClick={() => setFlipped((f) => (f.includes(i) ? f : [...f, i]))}
              className={`h-40 ${introDone ? "" : "opacity-0"} [perspective:1000px] transition-opacity duration-500`}
              aria-label={`Reveal message ${i + 1}`}
            >
              <div
                className="relative h-full w-full flip-3d"
                style={{ transform: isFlipped ? "rotateY(180deg)" : undefined }}
              >
                <div className="glass-card backface-hidden absolute inset-0 flex items-center justify-center rounded-3xl">
                  <span className="text-3xl text-gold">✦</span>
                </div>
                <div
                  className="backface-hidden absolute inset-0 flex items-center justify-center rounded-3xl bg-[image:var(--gradient-primary)] px-5 shadow-card"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <p className="font-display text-xl leading-snug text-primary-foreground">{text}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onDone}
        className={`gift-button mt-12 rounded-full px-10 py-3.5 text-sm transition-opacity duration-500 ${
          all && introDone ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
