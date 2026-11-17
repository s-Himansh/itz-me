import ShardTag from "./ShardTag";

const experiences = [
  {
    role: "Software Development Engineer",
    period: "Aug 2025 to now",
    points: [
      "Built a bidirectional sync engine in Go that reconciles regulatory compliance rules with product catalogs. It processes 40,000+ items a day with zero data loss.",
      "Designed a generic partitioned worker pool that routes items to goroutines with FNV-1a hashing. No race conditions, and parallel processing is 30% more efficient.",
      "Kept data consistent with ACID transactions and published change events to Azure Event Hubs, cutting downstream POS update latency by 40%.",
      "Wrote Terraform modules for Azure resources (Event Hubs, Blob Containers). Environment setup is now standard across 15+ services, and deployment time dropped 40%.",
      "Own 5+ production repositories across several business domains, from design through deployment.",
    ],
  },
  {
    role: "Software Development Engineer Intern",
    period: "Aug 2024 to Jul 2025",
    points: [
      "Built 10+ production Go microservices from scratch, with REST and gRPC APIs.",
      "Ran message-based integrations: Event Hubs publishers streaming entity updates to 5+ downstream systems, 2M+ messages a day at 99.9% uptime.",
      "Added Prometheus metrics and Grafana dashboards for publish rates and latency, cutting incident response time by 25%.",
      "Deployed 20+ microservices on Kubernetes with Helm charts and ArgoCD GitOps pipelines, cutting release cycle time by 50%.",
      "Built Linux-based SFTP services that deliver 10K+ item records a day to external partners with zero data loss.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="pt-24">
      <h2 className="mb-2 font-heading text-5xl font-extrabold sm:text-6xl">Where I&apos;ve worked</h2>
      <p className="mb-10 text-xl font-semibold">ZopSmart Technology, Bengaluru</p>
      <div className="grid gap-8 lg:grid-cols-2">
        {experiences.map((e) => (
          <article key={e.role} data-shard-key={e.role} className="box relative">
            <ShardTag k={e.role} />
            <h3 className="font-heading text-2xl font-extrabold">{e.role}</h3>
            <p className="mb-5 font-bold text-ultra">{e.period}</p>
            <ul className="list-disc space-y-3 pl-5 text-graphite marker:text-ink">
              {e.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
