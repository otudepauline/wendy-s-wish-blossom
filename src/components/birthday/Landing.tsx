import { useEffect, useState } from "react";

const TITLES = [
  "❤️ Daughter",
  "🌸 Sister",
  "🤍 Friend",
  "📚 Future Accountant",
  "💼 Future Financial Leader",
  "✨ Woman Becoming",
  "🌍 Dream Chaser",
];

export function Landing({ onOpen }: { onOpen: () => void }) {
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TITLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-16">
      <div
        className={`glass-card w-full max-w-md rounded-4xl px-7 pt-14 pb-10 text-center ${
          leaving ? "animate-soft-out" : "animate-soft-in"
        }`}
      >
        <div className="relative mx-auto mb-7 h-28 w-28">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/25 p-1.5 animate-glow-pulse">
            <div className="flex h-full w-full items-center justify-center rounded-full border border-cream/60 bg-[image:var(--gradient-primary)]">
              <span className="font-display text-3xl tracking-[0.12em] text-primary-foreground">
                WW
              </span>
            </div>
          </div>
          <span className="absolute -right-1 top-2 animate-twinkle text-gold">✦</span>
          <span
            className="absolute -left-2 bottom-4 animate-twinkle text-gold text-sm"
            style={{ animationDelay: "1.2s" }}
          >
            ✦
          </span>
        </div>

        <h1 className="font-display text-4xl text-foreground">Wendy Winnie</h1>

        <span className="mt-3 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs tracking-[0.18em] text-primary uppercase">
          #Nyasuba
        </span>

        <div className="mt-7 flex h-10 items-center justify-center">
          {TITLES.map((t, idx) => (
            <span
              key={t}
              className={`absolute rounded-full border border-rose/70 bg-cream/70 px-5 py-2 text-sm text-foreground transition-all duration-700 ${
                idx === i ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() => {
            setLeaving(true);
            setTimeout(onOpen, 700);
          }}
          className="gift-button mt-10 w-full rounded-full px-8 py-4 text-base font-medium tracking-wide"
        >
          Open My Birthday Gift
        </button>

        <p className="mt-6 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Made with love · For your day
        </p>
      </div>
    </div>
  );
}
