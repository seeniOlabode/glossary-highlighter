import React, { useEffect, useRef, useState } from "react";

import "./PostParagraph.css";

import { motion, AnimatePresence } from "framer-motion";

type Glossary = {
  [key: string]: string;
};

type PostParagraphProps = {
  children: React.ReactNode;
  glossary: Glossary;
  initializeWord: (word: string) => boolean;
  index: number;
};

type WordClickHandler = (word: React.MouseEvent<HTMLButtonElement>) => void;

function wordsInOrderOfAppearance(wordsToInitialize: string[], text: string) {
  const orderedWords = new Array(wordsToInitialize.length);

  wordsToInitialize.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "i"); // Match only the first occurrence of each word
    const match = regex.exec(text); // Find the first match for the word
    if (match !== null) {
      orderedWords[match["index"]] = match[0];
    }
  });

  return orderedWords;
}

const RenderReadableText = (
  text: string,
  glossary: Glossary,
  onClick: WordClickHandler,
  lookUpWord: string,
  initializeWord: (word: string) => boolean
) => {
  let wordsToInitialize = wordsInOrderOfAppearance(Object.keys(glossary), text);
  const elements: JSX.Element[] = [];
  let lastIndex = 0; // Keeps track of the position in the original text

  // Loop through each glossary word
  wordsToInitialize.forEach((word) => {
    if (initializeWord(word)) {
      const regex = new RegExp(`\\b${word}\\b`, "i"); // Match only the first occurrence of each word
      const match = regex.exec(text); // Find the first match for the word

      if (match !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          elements.push(
            <span key={`text-${lastIndex}`} className="readable-child">
              {text.substring(lastIndex, match.index)}
            </span>
          );
        }

        // Add the button for the matched word
        elements.push(
          <button
            data-role="button"
            key={`word-${match.index}`}
            className={`glossary-word ${
              lookUpWord === match[0] ? "" : "readable-child"
            }`}
            data-word={match[0]}
            onClick={onClick}
          >
            {match[0]}
          </button>
        );

        // Update lastIndex to just after the matched word
        lastIndex = match.index + match[0].length;
        // initializedWords[word] = true;
      }
    }
  });

  // Add any remaining text after the last matched word
  if (lastIndex < text.length) {
    elements.push(
      <span className="readable-child" key={`text-${lastIndex}`}>
        {text.substring(lastIndex)}
      </span>
    );
  }

  return elements;
};

const RenderLookUpText = (
  text: string,
  lookUpText: string,
  word: string,
  onClick: WordClickHandler
) => {
  const regex = new RegExp(`\\b${word}\\b`, "gi");
  const elements: JSX.Element[] = [];

  const match = regex.exec(text);

  if (match !== null) {
    elements.push(
      <span className="filler-text" key={`text-${word}-look-up`}>
        {text.substring(0, match.index)}
      </span>
    );

    elements.push(
      <button
        data-role="button"
        key={`word-${match.index}-look-up`}
        className="glossary-word look-up-button"
        data-word={match[0]}
        onClick={onClick}
      >
        {word}
      </button>
    );

    elements.push(
      <span className="glossary-lookup-content" key="look-up-content">
        {" "}
        <span
          className="lookup-content__letter dash"
          style={{ animationDelay: `0.02s` }}
        >
          -
        </span>{" "}
        {lookUpText.split("").map((char, i) => {
          return (
            <span
              style={{ animationDelay: `${(i + 2) * 0.02}s` }}
              className="lookup-content__letter"
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  }

  return elements;
};

export function PostParagraph({
  children,
  glossary,
  initializeWord,
  index,
}: PostParagraphProps) {
  const [lookUpText, setLookUpText] = useState("");
  const [lookUpWord, setLookUpWord] = useState("");
  const [showLookUp, setShowLookUp] = useState(false);
  const lookupRef = useRef<HTMLDivElement | null>(null);

  function toggleLookUp(word: string) {
    setLookUpWord(() => word);
    setLookUpText(() => glossary[word]);
    setShowLookUp((showLookUp) => !showLookUp);
  }

  function onLookUp(e: React.MouseEvent<HTMLButtonElement>) {
    const word = e.currentTarget.dataset["word"]; // Correct access to dataset

    if (word) {
      toggleLookUp(word);
    }
  }

  function onClickGlossaryLookup(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement; // Assert the type to HTMLElement

    if (target.id === "glossary-lookup") {
      toggleLookUp("");
    } else if (Array.from(target.classList).includes("filler-text")) {
      toggleLookUp("");
    }
  }

  // useEffect(() => {
  //   if (showLookUp && lookupRef.current) {
  //     lookupRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  //   }
  // });

  // Ensure children is treated as a string
  const text = typeof children === "string" ? children : "";

  return (
    <p
      style={{ animationDelay: `${index * 0.2 + 0.2 + 0.5}s` }}
      className={`post-paragraph relative ${showLookUp ? "look-up" : ""}`}
    >
      <div className="readable-content">
        {RenderReadableText(
          text,
          glossary,
          onLookUp,
          lookUpWord,
          initializeWord
        )}
      </div>
      <AnimatePresence initial={false}>
        {showLookUp ? (
          <motion.div
            className="glossary-lookup z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={"glossary-lookup" + showLookUp}
            id="glossary-lookup"
            onClick={onClickGlossaryLookup}
            ref={lookupRef}
          >
            {RenderLookUpText(text, lookUpText, lookUpWord, onLookUp)}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <span className="filler-text">{text}</span>
    </p>
  );
}
