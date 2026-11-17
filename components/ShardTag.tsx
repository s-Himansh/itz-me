import { shardOf } from "@/lib/fnv";

// Corner label for a .box; the parent needs `relative`.
export default function ShardTag({ k }: { k: string }) {
  return <span className="absolute right-4 top-3 text-xs font-semibold text-graphite">shard {shardOf(k)}</span>;
}
