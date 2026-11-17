"use client";

import { useCallback, useEffect, useState } from "react";
import { SHARDS, fnv1a, shardOf } from "@/lib/fnv";

const SAMPLE_KEYS = ["himanshu", "Patrick Jane", "Teresa Lisbon", "Kimball Cho", "Wayne Rigsby", "Grace Van Pelt", "Red John", "devops", "cairn"];

export default function ShardRouter() {
  const [key, setKey] = useState(SAMPLE_KEYS[0]);
  const [typed, setTyped] = useState(false);
  const [hits, setHits] = useState<number[]>(() => {
    const h = Array<number>(SHARDS).fill(0);
    h[shardOf(SAMPLE_KEYS[0])] = 1;
    return h;
  });

  const hash = fnv1a(key);
  const shard = hash % SHARDS;

  // Count each routed key once so the grid builds up a load picture.
  const route = useCallback((k: string) => {
    setKey(k);
    if (k) setHits((prev) => prev.map((n, i) => (i === shardOf(k) ? n + 1 : n)));
  }, []);

  // Idle demo: cycle sample keys until the visitor types something.
  useEffect(() => {
    if (typed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % SAMPLE_KEYS.length;
      route(SAMPLE_KEYS[i]);
    }, 1800);
    return () => clearInterval(id);
  }, [typed, route]);

  const max = Math.max(1, ...hits);

  return (
    <div>
      <label htmlFor="route-key" className="mb-2 block text-sm text-graphite">
        Type any key and watch it get routed
      </label>
      <input
        id="route-key"
        value={key}
        onChange={(e) => {
          setTyped(true);
          route(e.target.value);
        }}
        spellCheck={false}
        autoComplete="off"
        className="mb-4 w-full border-0 border-b-2 border-ink bg-transparent pb-2 font-heading text-2xl font-semibold outline-none placeholder:text-graphite/40 focus:border-ultra"
        placeholder="try your own name"
      />
      <p
        role="status"
        aria-live={typed ? "polite" : "off"}
        className="mb-6 min-h-[1.5rem] text-sm text-graphite"
      >
        {key
          ? `FNV-1a gives 0x${hash.toString(16).padStart(8, "0")}, which lands on shard ${shard} of ${SHARDS}.`
          : "Nothing to route yet."}
      </p>

      <ol
        aria-label="16 shards"
        className="grid grid-cols-4 gap-2 sm:gap-3"
      >
        {hits.map((n, i) => {
          const hot = !!key && i === shard;
          return (
            <li
              key={i}
              data-hot={hot}
              className="shard relative flex aspect-square flex-col justify-between border-2 border-ink p-2 text-sm font-semibold sm:p-3"
              style={{
                backgroundColor: hot
                  ? undefined
                  : `rgba(47, 75, 255, ${(n / max) * 0.45})`,
              }}
            >
              <span>{i}</span>
              <span className="self-end text-xs font-normal text-graphite">
                {n > 0 ? `${n} hit${n === 1 ? "" : "s"}` : ""}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-sm text-graphite">
        This is the routing from my Go sharded cache. The darker a shard, the more keys it has caught.
      </p>
    </div>
  );
}
