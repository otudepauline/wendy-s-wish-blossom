import { useEffect, useState } from "react";

export function Typewriter({
  text,
  speed = 42,
  className,
  onDone,
}: {
  text: string;
  speed?: number;
  className?: string;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return (
    <p className={className}>
      {shown}
      <span className="ml-0.5 inline-block w-px animate-pulse align-middle">|</span>
    </p>
  );
}

export function useTypedLines(lines: string[], speed = 34) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setIndex(0);
    setDone(false);
  }, [lines]);

  useEffect(() => {
    if (index >= lines.length) {
      setDone(true);
      return;
    }
    const wait = Math.max(700, lines[index].length * speed);
    const id = setTimeout(() => setIndex((i) => i + 1), wait);
    return () => clearTimeout(id);
  }, [index, lines, speed]);

  return { visible: lines.slice(0, index), done };
}
