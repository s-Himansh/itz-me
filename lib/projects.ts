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
      "High-performance, partitioned sliding-window LRU cache in Go with real-time WebSocket dashboard. Features 16-shard concurrent access via FNV-1a hashing, Prometheus metrics, REST API, Next.js frontend with live shard visualization, hit rate chart, and interactive key/value management.",
    tech: ["Go", "Next.js", "WebSocket", "Docker", "Prometheus"],
    github: "https://github.com/s-Himansh/shared-lru-cache",
    demo: "https://lru-cache-dashboard.vercel.app",
  },
  {
    title: "Partitioned API Throttler",
    description:
      "High-throughput, partitioned sliding-window rate limiter with admin dashboard. Features IP whitelist/blacklist, request logging, adaptive throttling based on latency, Prometheus alerting rules, real-time WebSocket metrics streaming, and partition heatmap visualization.",
    tech: ["Go", "Next.js", "WebSocket", "Prometheus", "Docker"],
    github: "https://github.com/s-Himansh/partitioned-api-throttler",
    demo: "https://throttler-dashboard.vercel.app",
  },
  {
    title: "DAG Pipeline Orchestrator",
    description:
      "Production-grade DAG task orchestrator with shell executor, YAML pipeline parsing, real-time log streaming via WebSocket, and a Next.js dashboard. Deployed with Docker on Render (backend) and Vercel (frontend).",
    tech: ["Go", "Next.js", "SQLite", "WebSocket", "Docker"],
    github: "https://github.com/s-Himansh/DAG",
    demo: "https://dag-pipeline-theta.vercel.app",
  },
  {
    title: "Makarov Chain Reaction",
    description:
      "Full-stack nuclear fission simulator with Go backend and Next.js frontend. Monte Carlo neutron transport simulation with RNG fix, CLI flags, export, sphere geometry, HTTP API, CORS, Docker, and 13 unit tests. Real-time visualization of chain reaction dynamics.",
    tech: ["Go", "Next.js", "Simulation", "Docker"],
    github: "https://github.com/s-Himansh/MAKAROV-CHAIN-REACTION",
    demo: "https://makarov-sim.vercel.app",
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
