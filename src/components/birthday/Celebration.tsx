import { useState } from "react";

const CANDLES = [0, 1, 2, 3, 4];

export function Celebration({ onDone }: { onDone: () => void }) {
  const [lit, setLit] = useState<number>(0);
  const [wished, setWished] = useState(false);
  const allLit = lit >= CANDLES.length;

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center">
      {allLit && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute top-0 text-sm"
              style={{
                left: `${(i * 37) % 100}%`,
                color: i % 3 === 0 ? "var(--gold)" : "var(--primary)",
                ["--drift-x" as string]: `${((i % 5) - 2) * 40}px`,
                animation: `drift-down ${6 + (i % 5)}s linear ${(i % 7) * 0.4}s infinite`,
              }}
            >
              {i % 2 ? "❃" : "▪"}
            </span>
          ))}
        </div>
      )}

      <h2 className="font-display text-4xl leading-tight sm:text-5xl">
        Today
        <br />
        the world celebrates
        <br />
        <span className="text-primary">YOU.</span>
      </h2>

      {/* Cake */}
      <div className="relative mt-14 w-full max-w-xs animate-float-soft">
        <div className="mx-auto flex w-fit items-end gap-3">
          {CANDLES.map((c) => (
            <div key={c} className="flex flex-col items-center">
              <span
                className={`mb-1 h-4 w-2.5 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] transition-opacity duration-500 ${
                  c < lit ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "radial-gradient(circle at 50% 70%, var(--cream), var(--gold) 55%, color-mix(in oklab, var(--primary) 70%, transparent))",
                  boxShadow: "0 0 18px color-mix(in oklab, var(--gold) 85%, transparent)",
                  animation: c < lit ? "flame-flicker 1.4s ease-in-out infinite" : undefined,
                }}
              />

              <div
                className={`h-8 w-1.5 rounded-full ${
                  c < lit ? "bg-gold-gradient" : "bg-rose"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="mt-1 rounded-t-3xl bg-[image:var(--gradient-primary)] px-6 pb-1 pt-4 shadow-card">
          <div className="h-3 rounded-full bg-cream/70" />
        </div>
        <div className="bg-accent px-6 py-6 shadow-soft">
          <div className="h-2 rounded-full bg-gold-gradient" />
        </div>
        <div className="rounded-b-4xl bg-secondary px-6 py-8 shadow-card">
          <div className="h-2 rounded-full bg-gold-gradient" />
        </div>
      </div>

      {!allLit && (
        <button
          onClick={() => setLit((l) => Math.min(l + 1, CANDLES.length))}
          className="gift-button mt-12 rounded-full px-10 py-4 text-base"
        >
          Light the Candles
        </button>
      )}

      {allLit && !wished && (
        <div className="mt-12 animate-soft-in">
          <p className="font-display text-2xl leading-relaxed">
            Close your eyes.
            <br />
            Take a deep breath.
            <br />
            Make a wish.
          </p>
          <button
            onClick={() => setWished(true)}
            className="gift-button mt-8 rounded-full px-10 py-4 text-base"
          >
            Make My Wish ✨
          </button>
        </div>
      )}

      {wished && (
        <div className="mt-12 animate-soft-in">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-dvh overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="absolute bottom-10 text-gold"
                style={{
                  left: `${8 + i * 6.5}%`,
                  animation: `shoot-star ${2.4 + (i % 4) * 0.5}s ease-in ${i * 0.18}s infinite`,
                }}
              >
                ✦
              </span>
            ))}
          </div>
          <p className="relative font-display text-2xl">Your wish is on its way.</p>
          <button onClick={onDone} className="gift-button relative mt-8 rounded-full px-10 py-3.5 text-sm">
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
