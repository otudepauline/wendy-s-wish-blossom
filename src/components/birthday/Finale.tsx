import { useEffect, useState } from "react";

const LINES = [
  "Some friendships",
  "are not measured",
  "by how often people speak.",
  "They're measured",
  "by how sincerely",
  "people wish each other well.",
  "You'll always be someone",
  "I'm grateful to have known.",
  "Happy Birthday.",
  "Keep shining. ✨",
];

export function Finale() {
  const [heart, setHeart] = useState(false);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const h = setTimeout(() => setHeart(true), 2600);
    const timers = LINES.map((_, i) => setTimeout(() => setVisible(i + 1), 3400 + i * 700));
    return () => {
      clearTimeout(h);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center">
      <div className="relative mb-12 flex h-28 w-28 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
        <span
          className={`absolute font-display text-4xl tracking-[0.14em] text-night-foreground transition-all duration-1000 ${
            heart ? "scale-50 opacity-0" : "opacity-100"
          }`}
        >
          WW
        </span>
        <span
          className={`absolute h-14 w-14 transition-all duration-1000 ${
            heart ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          style={{
            backgroundImage: "var(--gradient-primary)",
            clipPath:
              "path('M28 52 C 6 36, 0 22, 0 15 C 0 6, 7 0, 14 0 C 20 0, 25 4, 28 9 C 31 4, 36 0, 42 0 C 49 0, 56 6, 56 15 C 56 22, 50 36, 28 52 Z')",
            filter: "drop-shadow(0 0 26px color-mix(in oklab, var(--primary) 75%, transparent))",
          }}
        />

      </div>

      <div className="max-w-md space-y-3">
        {LINES.map((l, i) => (
          <p
            key={l}
            className={`font-display text-xl text-night-foreground sm:text-2xl ${
              i < visible ? "animate-soft-in" : "opacity-0"
            }`}
          >
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
