import ShardTag from "./ShardTag";

const skills = {
  Languages: ["Go", "SQL", "Bash"],
  "Frameworks and APIs": ["Gin", "GoFr", "REST APIs", "gRPC", "Microservices"],
  "Cloud and infrastructure": [
    "Azure (Event Hubs, Blob Storage)",
    "AWS",
    "Kubernetes",
    "Docker",
    "Helm",
    "Terraform",
    "Rancher",
    "Linux",
  ],
  "DevOps and observability": [
    "CI/CD",
    "GitOps",
    "GitHub Actions",
    "ArgoCD",
    "Harness",
    "Prometheus",
    "Grafana",
    "Git",
    "Monitoring and alerting",
  ],
  "Datastores and messaging": [
    "MySQL",
    "PostgreSQL",
    "Cassandra",
    "MongoDB",
    "Azure Event Hubs (Kafka-compatible)",
    "Event-driven architecture",
    "SFTP",
  ],
  "Core concepts": [
    "Distributed systems",
    "Concurrency",
    "Data partitioning and sharding",
    "ACID transactions",
    "Caching",
    "Rate limiting",
    "System design",
  ],
};

const learning = [
  ["Distributed systems", "consensus algorithms and fault tolerance"],
  ["System design", "scalable architecture patterns and their trade-offs"],
  ["Cloud native", "serverless architectures and cloud-native patterns"],
  ["Performance", "profiling and tuning high-throughput Go applications"],
];

export default function About() {
  return (
    <section id="about" className="pt-24">
      <h2 className="mb-10 font-heading text-5xl font-extrabold sm:text-6xl">What I work with</h2>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="box relative" data-shard-key="stack">
          <ShardTag k="stack" />
          <p className="max-w-prose text-xl leading-relaxed">
            I&apos;m a Software Development Engineer focused on Go and DevOps: backend
            services, Kubernetes, Terraform and cloud infrastructure. I like code and
            infrastructure that stay simple, easy to maintain and built to last.
          </p>
          <dl className="mt-8 space-y-5">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <dt className="mb-2 font-heading text-lg font-extrabold">{group}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((t) => (
                      <li key={t} className="border border-ink px-2 py-0.5 text-sm font-semibold">{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="learning" data-shard-key="learning" className="box relative">
          <ShardTag k="learning" />
          <h3 className="mb-5 font-heading text-2xl font-extrabold">What I&apos;m learning now</h3>
          <ul className="space-y-4">
            {learning.map(([topic, detail]) => (
              <li key={topic}>
                <p className="font-heading text-lg font-extrabold">{topic}</p>
                <p className="text-graphite">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
