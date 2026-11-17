"use client";

import { useSyncExternalStore } from "react";

const TZ = "Asia/Kolkata";
const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "numeric", minute: "numeric", second: "numeric", hour12: false });

// Whole seconds since the epoch; stable between ticks so React only re-renders once a second.
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};
const getSecond = () => Math.floor(Date.now() / 1000);
// The server can't know the visitor's current second, so it renders the face without hands.
const getServerSecond = () => null;

function parts(second: number) {
  const p = Object.fromEntries(fmt.formatToParts(new Date(second * 1000)).map((x) => [x.type, Number(x.value)]));
  return { h: p.hour % 24, m: p.minute, s: p.second };
}

export default function Clock() {
  const second = useSyncExternalStore(subscribe, getSecond, getServerSecond);
  const t = second === null ? null : parts(second);

  const hand = (deg: number, len: number, width: number, cls: string) => (
    <line x1="50" y1="50" x2="50" y2={50 - len} strokeWidth={width} strokeLinecap="square" className={cls} transform={`rotate(${deg} 50 50)`} />
  );

  const label = t ? `${String(t.h).padStart(2, "0")}:${String(t.m).padStart(2, "0")}` : "";

  return (
    <figure>
      <svg viewBox="0 0 100 100" role="img" aria-label={t ? `Clock showing ${label} India time` : "Clock"} className="h-44 w-44">
        <circle cx="50" cy="50" r="47" fill="#fff" stroke="#111" strokeWidth="3" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="50" y1="8" x2="50" y2={i % 3 === 0 ? 15 : 12} stroke="#111" strokeWidth={i % 3 === 0 ? 3 : 1.5} transform={`rotate(${i * 30} 50 50)`} />
        ))}
        {t && (
          <>
            {hand(((t.h % 12) + t.m / 60) * 30, 26, 4, "stroke-ink")}
            {hand((t.m + t.s / 60) * 6, 38, 3, "stroke-ink")}
            {hand(t.s * 6, 40, 1.5, "stroke-ultra")}
          </>
        )}
        <circle cx="50" cy="50" r="3" fill="#111" />
      </svg>
    </figure>
  );
}
