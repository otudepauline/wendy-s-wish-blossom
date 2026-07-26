import { useEffect, useMemo, useState } from "react";

function getCharDelay(char: string, speed: number) {
  const jitter = Math.floor(Math.random() * 8) - 4;

  if (char === ",") return Math.max(40, 120 + jitter);
  if (char === ".") return Math.max(80, 220 + jitter);
  if (char === "?" || char === "!") return Math.max(80, 220 + jitter);
  if (char === " ") return Math.max(18, speed + 12 + jitter);
  return Math.max(18, speed + jitter);
}

function getSegmentEndDelay(text: string) {
  if (text.endsWith("...")) return 260;
  if (text.endsWith(".") || text.endsWith("?") || text.endsWith("!")) return 260;
  if (text.endsWith(",")) return 120;
  return 0;
}

export function Typewriter({
  segments,
  speed = 34,
  paragraphDelay = 300,
  startDelay = 140,
  className,
  lineClassName,
  onDone,
}: {
  segments: string[];
  speed?: number;
  paragraphDelay?: number;
  startDelay?: number;
  className?: string;
  lineClassName?: string;
  onDone?: () => void;
}) {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const segmentKey = useMemo(() => segments.join("\n"), [segments]);

  useEffect(() => {
    setTypedLines([]);
    setCurrentLine("");
    setSegmentIndex(0);
    setCharIndex(0);
    setFinished(false);
  }, [segmentKey]);

  useEffect(() => {
    if (finished) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (segmentIndex >= segments.length) {
      timeout = setTimeout(() => {
        setFinished(true);
        onDone?.();
      }, 500);
      return () => clearTimeout(timeout);
    }

    const segment = segments[segmentIndex] ?? "";

    if (charIndex < segment.length) {
      const char = segment[charIndex];
      const delay =
        segmentIndex === 0 && charIndex === 0 && typedLines.length === 0
          ? startDelay
          : getCharDelay(char, speed);

      timeout = setTimeout(() => {
        setCurrentLine((current) => current + char);
        setCharIndex((index) => index + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }

    const extraPause = getSegmentEndDelay(segment);
    timeout = setTimeout(() => {
      setTypedLines((lines) => [...lines, segment]);
      setCurrentLine("");
      setCharIndex(0);
      setSegmentIndex((index) => index + 1);
    }, paragraphDelay + extraPause);

    return () => clearTimeout(timeout);
  }, [segments, segmentIndex, charIndex, typedLines.length, finished, paragraphDelay, speed, startDelay, onDone]);

  return (
    <div className={`space-y-5 ${className ?? ""}`}>
      {typedLines.map((line, index) => (
        <p key={`${index}-${line}`} className={lineClassName}>
          {line}
        </p>
      ))}
      {segmentIndex < segments.length && (
        <p className={lineClassName}>
          {currentLine}
          <span className="ml-0.5 inline-block w-px animate-pulse align-middle">|</span>
        </p>
      )}
    </div>
  );
}
