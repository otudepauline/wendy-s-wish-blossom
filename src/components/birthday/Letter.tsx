import { useEffect, useState } from "react";
import { Typewriter } from "./Typewriter";

const PARAGRAPHS = [
  "Happy Birthday.",
  "Life has taken us into different places, and while we may not talk as often as we once did, that has never changed how much I appreciate you.",
  "You're one of those people I genuinely value, even if I don't always say it. Thank you for every time you've checked in, for your kindness, and for being part of a chapter of my life I'll always be grateful for.",
  "As you continue your journey in accounting and chase the future you're building, I hope you never lose the warmth, resilience, and heart that make you who you are.",
  "May this new year bring peace when life feels overwhelming, courage when opportunities appear, and joy in the little moments that often become the biggest memories.",
  "Keep growing.",
  "Keep smiling.",
  "Keep believing in yourself.",
  "The best chapters of your story are still ahead.",
  "Happy Birthday, Wendy.",
];

export function Letter({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-5 py-20">
      {!open && (
        <div className="animate-float-soft text-center">
          <div className="mx-auto w-52 rounded-2xl bg-[image:var(--gradient-primary)] p-10 shadow-card">
            <div className="h-16 rounded-lg bg-cream/80" />
          </div>
          <p className="mt-6 text-sm tracking-[0.24em] text-muted-foreground uppercase">
            A letter for you
          </p>
        </div>
      )}

      {open && (
        <div className="glass-card w-full max-w-xl animate-soft-in rounded-4xl px-7 py-12 sm:px-12">
          <div className="mx-auto mb-8 h-px w-16 bg-gold" />
          <p className="font-hand text-3xl text-primary">Dear Wendy,</p>
          <div className="mt-6">
            <Typewriter
              segments={PARAGRAPHS}
              speed={34}
              paragraphDelay={340}
              onDone={() => setTypingDone(true)}
              className="space-y-5"
              lineClassName="font-hand text-2xl leading-snug text-foreground"
            />
          </div>
          {typingDone && (
            <>
              <p className="mt-10 font-hand text-2xl text-muted-foreground">With appreciation,</p>
              <p className="font-hand text-3xl text-primary">Pauline</p>
              <div className="mx-auto mt-10 h-px w-16 bg-gold" />

              <div className="mt-10 text-center">
                <button onClick={onDone} className="gift-button rounded-full px-10 py-3.5 text-sm">
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
