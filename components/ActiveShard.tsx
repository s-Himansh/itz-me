"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { SHARDS, shardOf } from "@/lib/fnv";

const SECTIONS = ["home", "projects", "experience", "about", "contact"];
const STORE = "shard-map-hidden";

// localStorage as an external store; the server (and a blocked store) both read as "visible".
let memHidden = false; // used when storage is blocked
const listeners = new Set<() => void>();
const subscribeHidden = (cb: () => void) => {
  listeners.add(cb);
  return () => void listeners.delete(cb);
};
const getHidden = () => {
  try {
    return localStorage.getItem(STORE) === "1";
  } catch {
    return memHidden;
  }
};
const getServerHidden = () => false;

// Floating map: lights the shard of the section being read, or of the project/job/contact line being hovered.
export default function ActiveShard() {
  const [section, setSection] = useState("home");
  const [hover, setHover] = useState<string | null>(null);
  const hidden = useSyncExternalStore(subscribeHidden, getHidden, getServerHidden);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    const over = (e: PointerEvent) =>
      setHover((e.target as Element).closest?.("[data-shard-key]")?.getAttribute("data-shard-key") ?? null);
    document.addEventListener("pointerover", over);
    return () => {
      io.disconnect();
      document.removeEventListener("pointerover", over);
    };
  }, []);

  const toggle = () => {
    memHidden = !hidden;
    try {
      localStorage.setItem(STORE, hidden ? "0" : "1");
    } catch {
      // Not persisted; the in-memory flag still applies for this visit.
    }
    listeners.forEach((cb) => cb());
  };

  const shard = shardOf(hover ?? section);

  return (
    <div className="fixed bottom-5 right-5 z-40 hidden md:block">
      {hidden ? (
        <button
          type="button"
          onClick={toggle}
          aria-expanded="false"
          className="box !p-0 cursor-pointer px-3 py-1.5 text-sm font-bold"
        >
          Show map
        </button>
      ) : (
        <div className="w-36 border-2 border-ink bg-white p-2 shadow-[4px_4px_0_#111]">
          <div aria-hidden="true" className="pointer-events-none grid grid-cols-4 gap-1">
            {Array.from({ length: SHARDS }, (_, i) => (
              <div
                key={i}
                className={`aspect-square border border-ink transition-colors duration-200 ${i === shard ? "bg-ultra" : "bg-white"}`}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between gap-2 text-xs font-semibold">
            <span aria-hidden="true" className="truncate">{hover ? `${hover} → ${shard}` : `shard ${shard}`}</span>
            <button type="button" onClick={toggle} aria-expanded="true" className="cursor-pointer underline">
              Hide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
