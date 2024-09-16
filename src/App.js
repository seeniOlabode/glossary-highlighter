import React from "react";

import "./App.css";

import { PostParagraph } from "./components/PostParagraph";

const glossary = {
  kitschy:
    "art, decorations, or design considered by many people to be ugly, without style, or false, but enjoyed by other people, often because they are funny.",
  maximalism:
    "belonging or relating to a style in art and design that uses the largest range of materials and colours possible, and very complicated shapes or forms.",
  aesthetic: "concerned with beauty or the appreciation of beauty",
};

function App() {
  return (
    <div className="app w-screen text-foreground max-w-2xl mx-auto p-6">
      <header>
        <h1 className="post-heading">Contrasting Aesthetics</h1>
        <span className="post-date">January 2024</span>
      </header>

      <main className="post-body">
        <PostParagraph glossary={glossary}>
          Much of the art I appreciate in museums can be bucketed into
          aesthetics like typographic, medieval, or patterned. The boundaries
          feel clearly defined because we can assign names to them. I have been
          increasingly more stimulated by aesthetic intersections—unexpected
          displays of art that tastefully reject the notion of a clean,
          singularly defined style, yet bridges many. For my taste, often this
          ends up in opposition to minimalism, yet does not chaotically lean
          into kitschy or maximalism. There is authoring intent, purpose, and a
          sense of iteration felt throughout, not seemingly arbitrary excess for
          the sake of creative provocation. I believe there's something
          fascinating in art and design that treats my attention with care and
          instills curiosity.
        </PostParagraph>

        <PostParagraph glossary={glossary}>
          Akin to excess—absence, or minimalism, and the idea of “clean design”
          can sometimes make me not think or feel anything special when
          interfacing with said art, software, or device. It often fails to
          surprise or force a moment of pause to ponder—why does this feel
          great? Rightfully so, I do not need to be intellectually stimulated
          when making breakfast—it is conveniently acceptable for the design of
          the toaster not to be influenced by contrasting aesthetics.
        </PostParagraph>
      </main>
    </div>
  );
}

export default App;
