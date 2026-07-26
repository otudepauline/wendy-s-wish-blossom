import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Atmosphere } from "@/components/birthday/Atmosphere";
import { Landing } from "@/components/birthday/Landing";
import { PassageScene } from "@/components/birthday/PassageScene";
import { ChapterTwo, ChapterThree } from "@/components/birthday/Chapters";
import { Celebration } from "@/components/birthday/Celebration";
import { Letter } from "@/components/birthday/Letter";
import { Finale } from "@/components/birthday/Finale";

const TITLE = "Wendy's Birthday Experience";
const DESCRIPTION =
  "A gentle, interactive birthday gift for Wendy Winnie — a story of friendship, wishes and warm words to celebrate her day.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PROLOGUE = [
  ["Some friendships...", "don't disappear.", "They simply become quieter.", "Yet somehow...", "they continue to matter."],
  ["This...", "is one of those friendships."],
];

const CHAPTER_ONE = [
  [
    "We met during one chapter of life...",
    "high school.",
    "Back then, none of us knew where life would eventually take us.",
    "Yet somehow, among hundreds of people...",
    "our paths crossed.",
  ],
  [
    "There were conversations.",
    "Laughter.",
    "School pressure.",
    "Ordinary days.",
    "The kind of moments that quietly become unforgettable memories.",
  ],
  ["Then we finished high school.", "Life did what it always does.", "It scattered everyone towards different dreams."],
  ["Different environments.", "Different responsibilities.", "Different versions of ourselves."],
  ["We don't talk every day anymore.", "Not because the friendship disappeared.", "But because life became bigger.", "Busier.", "Different."],
  [
    "Yet whenever you checked in...",
    "it reminded me",
    "that genuine friendships don't always need constant conversations",
    "to remain genuine.",
  ],
];

type Stage =
  | "landing"
  | "prologue"
  | "chapter1"
  | "chapter2"
  | "chapter3"
  | "celebration"
  | "letter"
  | "finale";

const NIGHT: Stage[] = ["prologue", "finale"];

function Index() {
  const [stage, setStage] = useState<Stage>("landing");
  const [nextStage, setNextStage] = useState<Stage | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  useEffect(() => {
    if (!isExiting || nextStage === null) return;
    const id = setTimeout(() => {
      setStage(nextStage);
      setNextStage(null);
      setIsExiting(false);
    }, 700);
    return () => clearTimeout(id);
  }, [isExiting, nextStage]);

  const night = NIGHT.includes(stage);

  const goTo = (destination: Stage) => {
    if (destination === stage) return;
    setNextStage(destination);
    setIsExiting(true);
  };

  return (
    <main
      className={`relative min-h-dvh overflow-hidden transition-colors duration-1000 ${
        night ? "night-gradient" : "page-gradient"
      }`}
    >
      <Atmosphere
        mode={night ? "stars" : stage === "celebration" ? "balloons" : "petals"}
      />

      <div className={`relative ${isExiting ? "animate-soft-out" : "animate-soft-in"}`}>
        {stage === "landing" && <Landing onOpen={() => goTo("prologue")} />}

        {stage === "prologue" && (
          <PassageScene tone="night" passages={PROLOGUE} onDone={() => goTo("chapter1")} />
        )}

        {stage === "chapter1" && (
          <PassageScene
            title="Chapter One"
            subtitle="The Beginning"
            passages={CHAPTER_ONE}
            onDone={() => goTo("chapter2")}
          />
        )}

        {stage === "chapter2" && <ChapterTwo onDone={() => goTo("chapter3")} />}
        {stage === "chapter3" && <ChapterThree onDone={() => goTo("celebration")} />}
        {stage === "celebration" && <Celebration onDone={() => goTo("letter")} />}
        {stage === "letter" && <Letter onDone={() => goTo("finale")} />}
        {stage === "finale" && <Finale />}
      </div>
    </main>
  );
}
