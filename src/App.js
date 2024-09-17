import { useState } from "react";
import "./App.css";

import { AnimatePresence, motion } from "framer-motion";

import { PostParagraph } from "./components/PostParagraph";
import { BreakpointPicker } from "./components/BreakpointPicker";
import useMeasure from "react-use-measure";

function getStoredBreakpoint() {
  return JSON.parse(localStorage.getItem("breakpoint")) || 768;
}

function storeBreakpoint(breakpoint) {
  localStorage.setItem("breakpoint", JSON.stringify(breakpoint));
}

const glossary = {
  kitschy:
    "art, decorations, or design considered by many people to be ugly, without style, or false, but enjoyed by other people, often because they are funny.",
  superposition:
    "a principle in quantum mechanics where particles can exist in multiple states (e.g., position or energy) at the same time, until measured or observed.",
  entanglement:
    "a quantum phenomenon where two or more particles become linked and the state of one immediately affects the state of the other, even across vast distances.",
  recursion:
    "in computer science, recursion is when a function calls itself within its own code, often used to solve problems by breaking them down into simpler, smaller versions of the same problem.",
  interfacing:
    "a moderately stiff material, especially buckram, typically used between two layers of fabric in collars and facings.",
  boundaries:
    "the boundary between art and advertising: dividing line, divide, division, borderline, demarcation line, line of demarcation, cutoff point, threshold.",
  intertwined:
    "a wreath of laurel, intertwined with daffodils: entwine, interweave, interlace, interthread, interwind, intertwist, twist, coil, twirl, ravel, lace, braid, plait, knit; rare convolute.",
};

const paragraphs = [
  `Much of the art I appreciate in museums can be bucketed into
                aesthetics like typographic, medieval, or patterned. The
                boundaries feel clearly defined because we can assign names to
                them. I have been increasingly more stimulated by aesthetic
                intersections—unexpected displays of art that tastefully reject
                the notion of a clean, singularly defined style, yet bridges
                many. For my taste, often this ends up in opposition to
                minimalism, yet does not chaotically lean into kitschy or
                maximalism. There is authoring intent, purpose, and a sense of
                iteration felt throughout, not seemingly arbitrary excess for
                the sake of creative provocation. I believe there's something
                fascinating in art and design that treats my attention with care
                and instills curiosity.`,
  `Akin to excess—absence, or minimalism, and the idea of “clean
                design” can sometimes make me not think or feel anything special
                when interfacing with said art, software, or device. It often
                fails to surprise or force a moment of pause to ponder—why does
                this feel great? Rightfully so, I do not need to be
                intellectually stimulated when making breakfast—it is
                conveniently acceptable for the design of the toaster not to be
                influenced by contrasting aesthetics.`,
  `In quantum mechanics, the phenomenon of superposition allows
                particles to exist in multiple states simultaneously, a concept
                that fundamentally challenges our classical understanding of
                reality. This principle is deeply intertwined with entanglement,
                where particles remain connected such that the state of one
                instantly influences the other, no matter the distance between
                them. Additionally, in computer science, recursion refers to a
                process in which a function calls itself, enabling solutions to
                complex problems through iterative self-reference.`,
];

function App() {
  const [initializedWords, setInitializedWords] = useState({});
  const [breakpoint, setBreakpoint] = useState(getStoredBreakpoint());

  function onBreakPoint(width) {
    setBreakpoint(() => width);
    storeBreakpoint(width);
  }
  // This function will track initialized words
  const initializeWord = (word) => {
    return true;
    if (!initializedWords[word]) {
      setInitializedWords((prev) => ({
        ...prev,
        [word]: true,
      }));
      return true; // Word initialized for the first time
    }
    return false; // Word already initialized
  };

  return (
    <>
      <BreakpointPicker onBreakPoint={onBreakPoint} />
      <AnimatePresence initial={false}>
        <motion.div
          className="app w-screen text-foreground mx-auto p-6"
          transition={{ type: "tween", bounce: 0 }}
          animate={{ width: breakpoint }}
        >
          <div
            layout
            className="content-wrapper"
            style={{ "--p-width": `${breakpoint}px` }}
          >
            <header>
              <h1 layout className="post-heading">
                Contrasting Aesthetics
              </h1>
              <span layout className="post-date">
                January 2024
              </span>
            </header>

            <main className="post-body">
              {paragraphs.map((paragraph, i) => {
                return (
                  <PostParagraph
                    glossary={glossary}
                    initializeWord={initializeWord}
                    index={i}
                    key={paragraph}
                  >
                    {paragraph}
                  </PostParagraph>
                );
              })}
            </main>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
