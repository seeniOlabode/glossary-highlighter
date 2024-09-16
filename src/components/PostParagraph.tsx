import React, { useState } from "react";

import "./PostParagraph.css";

import { motion, AnimatePresence } from "framer-motion";

type Glossary = {
  [key: string]: string;
};

type PostParagraphProps = {
  children: React.ReactNode;
  glossary: Glossary;
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
  lookUpWord: string
) => {
  let wordsToInitialize = wordsInOrderOfAppearance(Object.keys(glossary), text);
  const elements: JSX.Element[] = [];
  let lastIndex = 0; // Keeps track of the position in the original text

  // Loop through each glossary word
  wordsToInitialize.forEach((word) => {
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
        key={`word-${match.index}-look-up`}
        className="glossary-word"
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

export function PostParagraph({ children, glossary }: PostParagraphProps) {
  const [lookUpText, setLookUpText] = useState("");
  const [lookUpWord, setLookUpWord] = useState("");
  const [showLookUp, setShowLookUp] = useState(false);

  function onLookUp(e: React.MouseEvent<HTMLButtonElement>) {
    const word = e.currentTarget.dataset["word"]; // Correct access to dataset

    if (word) {
      setLookUpWord(() => word);
      setLookUpText(() => glossary[word]);
      setShowLookUp((showLookUp) => !showLookUp);
    }
  }
  // Ensure children is treated as a string
  const text = typeof children === "string" ? children : "";

  return (
    <p className={`post-paragraph relative ${showLookUp ? "look-up" : ""}`}>
      <span className="readable-content">
        {RenderReadableText(text, glossary, onLookUp, lookUpWord)}
      </span>
      <AnimatePresence initial={false}>
        {showLookUp ? (
          <motion.div
            className="glossary-lookup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={"glossary-lookup" + showLookUp}
          >
            {RenderLookUpText(text, lookUpText, lookUpWord, onLookUp)}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </p>
  );
}
