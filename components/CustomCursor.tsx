"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";

function useIsMobile() {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(pointer: coarse)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false
  );
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      // Smooth follow for outer cursor
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      requestAnimationFrame(animate);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
        const el = target.closest("[data-cursor]") as HTMLElement;
        if (el) {
          setCursorText(el.dataset.cursor || "");
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[200] flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 ${
          isHovering
            ? "scale-150 border-violet-500 bg-violet-500/10"
            : "border-gray-400/50"
        } ${isClicking ? "scale-90" : ""}`}
        style={{ mixBlendMode: "difference" }}
      >
        {cursorText && (
          <span className="text-[10px] font-semibold text-white">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[201] h-2 w-2 rounded-full bg-violet-500 transition-transform duration-75 ${
          isClicking ? "scale-0" : ""
        }`}
      />
    </>
  );
}
