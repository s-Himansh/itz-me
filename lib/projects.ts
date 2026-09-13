export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: "Sharded LRU Cache",
    description:
      "Highly concurrent, generic in-memory key-value cache in Go with LRU eviction. Partitioned into 16 shards using FNV-1a hashing with sync.RWMutex for concurrent reads and thread-safe evictions.",
    tech: ["Go", "Concurrency", "Data Structures"],
    github: "https://github.com/s-Himansh/shared-lru-cache",
  },
  {
    title: "Partitioned API Throttler",
    description:
      "High-throughput API rate limiter using FNV-1a hashing for partitioned client requests and sliding-window algorithm for per-IP rate limits. Includes custom Prometheus metrics and Docker containerization.",
    tech: ["Go", "Prometheus", "Docker"],
    github: "https://github.com/s-Himansh/partitioned-api-throttler",
  },
  {
    title: "DAG",
    description:
      "Directed Acyclic Graph implementation for dependency resolution and task scheduling. Implements topological sorting and cycle detection algorithms in Go.",
    tech: ["Go", "Data Structures", "Graph Algorithms"],
    github: "https://github.com/s-Himansh/DAG",
  },
  {
    title: "Makarov Chain Reaction",
    description:
      "Markov Chain simulation implementation in Go. Models stochastic processes and state transitions for probability-based systems.",
    tech: ["Go", "Math", "Simulation"],
    github: "https://github.com/s-Himansh/MAKAROV-CHAIN-REACTION",
  },
  {
    title: "Transfer Agent",
    description:
      "Agent-based transfer system built in Go. Handles automated data routing and message passing between distributed components.",
    tech: ["Go", "Distributed Systems"],
    github: "https://github.com/s-Himansh/TRANSFER-AGENT",
  },
  {
    title: "Hospital Management System",
    description:
      "Full-stack hospital management system with patient records, appointment scheduling, and administrative dashboards.",
    tech: ["Java", "Web Development"],
    github: "https://github.com/s-Himansh/H-M-S-Updated",
  },
];
