import { useState } from "react";

const breakpoints = [
  {
    name: "mini",
    width: 475,
  },
  {
    name: "small",
    width: 768,
  },
  {
    name: "medium",
    width: 1024,
  },
  {
    name: "large",
    width: 1440,
  },
];

export function BreakpointPicker({ onBreakPoint, selectedBreakpoint }) {
  const [hoveredBreakpoint, setHoveredBreakpoint] = useState("");

  function onHoverBreakpoint(
    { name = "", width = "" } = { name: "", width: "" }
  ) {
    setHoveredBreakpoint(() => `${name} ${width ? `- ${width}px` : ""}`);
  }

  function chooseBreakpoint(width) {
    onBreakPoint(width);
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 h-5 border-b border-solid border-border-tint flex justify-center bg-dark z-10"
      onMouseOut={() => onHoverBreakpoint()}
    >
      {breakpoints.map((breakpoint, i) => {
        return (
          <button
            onMouseEnter={() => onHoverBreakpoint(breakpoint)}
            className={`border-x border-solid border-border-tint mx-auto absolute top-0 border-y-0 hover:bg-shiny-background bottom-0`}
            style={{ width: breakpoint.width, zIndex: 10 - i }}
            onClick={() => chooseBreakpoint(breakpoint.width)}
          ></button>
        );
      })}

      <button
        onMouseEnter={() =>
          onHoverBreakpoint({ name: "Extra Large", width: "full" })
        }
        className={`border-x-0 border-solid border-border-tint mx-auto absolute top-0 border-y-0 hover:bg-shiny-background bottom-0 left-0 right-0 z-0`}
        onClick={() => chooseBreakpoint(3000)}
      ></button>

      <div className="absolute inset-0 flex justify-center items-center z-20 text-xs pointer-events-none capitalize font-medium">
        {hoveredBreakpoint}
      </div>
    </div>
  );
}
