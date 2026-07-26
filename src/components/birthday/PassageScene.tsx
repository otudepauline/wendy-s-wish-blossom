import { useEffect, useState } from "react";
import { Typewriter } from "./Typewriter";

export type Passage = string[];

export function PassageScene({
  title,
  subtitle,
  passages,
  onDone,
  tone = "light",
}: {
  title?: string;
  subtitle?: string;
  passages: Passage[];
  onDone: () => void;
  tone?: "light" | "night";
}) {
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
  }, [step, passages]);

  const lines = passages[step] ?? [];
  const last = step === passages.length - 1;

  const textColor = tone === "night" ? "text-night-foreground" : "text-foreground";

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center">
      {title && (
        <p
          className={`mb-2 text-xs tracking-[0.36em] uppercase ${
            tone === "night" ? "text-gold" : "text-primary"
          }`}
        >
          {title}
        </p>
      )}
      {subtitle && (
        <h2 className={`mb-10 font-display text-3xl sm:text-4xl ${textColor}`}>{subtitle}</h2>
      )}

      <div className="max-w-lg">
        <Typewriter
          segments={lines}
          speed={34}
          paragraphDelay={300}
          onDone={() => setReady(true)}
          className="space-y-5"
          lineClassName={`font-display text-xl leading-relaxed sm:text-2xl ${textColor}`}
        />
      </div>

      <button
        onClick={() => (last ? onDone() : setStep((s) => s + 1))}
        className={`gift-button mt-12 rounded-full px-10 py-3.5 text-sm tracking-wide transition-opacity duration-500 ${
          ready ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
