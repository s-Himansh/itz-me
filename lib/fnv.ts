// Same hash the Go partitioned worker pool uses: FNV-1a, 32-bit.
export function fnv1a(key: string): number {
  let h = 0x811c9dc5;
  for (const b of new TextEncoder().encode(key)) {
    h ^= b;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

export const SHARDS = 16;
export const shardOf = (key: string) => fnv1a(key) % SHARDS;
