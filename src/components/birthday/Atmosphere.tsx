import { useMemo } from "react";

type Mode = "petals" | "stars" | "balloons";

const PETALS = ["🌸", "✿", "❀", "🌸", "✦"];

function seeded(count: number, salt: number) {
  return Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin((i + 1) * (n + salt)) + 1) / 2);
    return {
      left: r(12.9898) * 100,
      delay: r(78.233) * 14,
      duration: 14 + r(43.11) * 16,
      size: 8 + r(93.7) * 16,
      drift: (r(11.7) - 0.5) * 160,
      opacity: 0.35 + r(7.13) * 0.5,
      glyph: PETALS[Math.floor(r(3.31) * PETALS.length)],
    };
  });
}

export function Atmosphere({ mode = "petals" }: { mode?: Mode }) {
  const petals = useMemo(() => seeded(18, 1), []);
  const sparkles = useMemo(() => seeded(26, 5), []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {sparkles.map((s, i) => (
        <span
          key={`s-${i}`}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${(s.delay / 14) * 100}%`,
            width: mode === "stars" ? s.size / 4 : s.size / 5,
            height: mode === "stars" ? s.size / 4 : s.size / 5,
            background:
              mode === "stars" ? "var(--night-foreground)" : "var(--gold)",
            opacity: s.opacity,
            animationDelay: `${s.delay * 0.4}s`,
          }}
        />
      ))}

      {mode !== "stars" &&
        petals.map((p, i) => (
          <span
            key={`p-${i}`}
            className="absolute top-0 select-none"
            style={{
              left: `${p.left}%`,
              fontSize: p.size,
              color: "var(--rose)",
              opacity: p.opacity,
              ["--drift-x" as string]: `${p.drift}px`,
              animation: `drift-down ${p.duration}s linear ${p.delay}s infinite`,
            }}
          >
            {p.glyph}
          </span>
        ))}

      {mode === "balloons" &&
        petals.slice(0, 10).map((p, i) => (
          <span
            key={`b-${i}`}
            className="absolute bottom-0 select-none"
            style={{
              left: `${(p.left + 7) % 100}%`,
              fontSize: p.size * 1.8,
              opacity: 0.8,
              ["--drift-x" as string]: `${-p.drift}px`,
              animation: `rise-up ${p.duration * 0.9}s linear ${p.delay * 0.6}s infinite`,
            }}
          >
            {i % 2 ? "🎈" : "🎀"}
          </span>
        ))}
    </div>
  );
}
