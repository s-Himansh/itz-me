"use client";

import { useInView } from "@/hooks/useInView";

const experiences = [
  {
    role: "Software Development Engineer",
    company: "ZopSmart Technology",
    period: "Aug 2025 — Present",
    description:
      "Architected a continuous, bidirectional Go-based sync engine to reconcile regulatory compliance rules with product catalogs, processing 40,000+ items daily. Designed a reusable partitioned worker pool using FNV-1a hashing, improving parallel processing efficiency by 30%. Maintained code ownership across 5+ repositories with Terraform modules for Azure infrastructure.",
    gradient: "from-violet-500 to-purple-500",
    bgColor: "from-violet-50 to-purple-50",
  },
  {
    role: "Software Development Engineer Intern",
    company: "ZopSmart Technology",
    period: "Aug 2024 — Jul 2025",
    description:
      "Developed 10+ Go-based microservices from scratch. Built real-time publishers using Azure Event Hubs streaming to 5+ downstream systems. Instrumented with Prometheus and Grafana dashboards, reducing incident response time by 25%. Orchestrated microservices on Kubernetes and built Linux-based SFTP services.",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
  },
];

export default function Experience() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.1 });

  return (
    <section id="experience" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-700 ${
            headerInView ? "animate-fade-in-up" : "animate-hidden"
          }`}
        >
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600 uppercase">
            Experience
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            Where I&apos;ve worked
          </h2>
        </div>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <ExperienceItem key={exp.role} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`group relative border-l-2 border-gray-200 pl-8 pb-14 last:pb-0 transition-all duration-700 ${
        isInView ? "animate-fade-in-left" : "animate-hidden"
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute -left-[7px] top-1">
        <div
          className={`h-4 w-4 rounded-full bg-gradient-to-br ${exp.gradient} shadow-md transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg`}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 group-hover:shadow-lg group-hover:border-gray-200">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-violet-600">
              {exp.role}
            </h3>
            <div className="flex items-center gap-2">
              <div
                className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${exp.gradient}`}
              />
              <p className="text-sm font-medium text-violet-600">
                {exp.company}
              </p>
            </div>
          </div>
          <span className="text-sm text-gray-400">{exp.period}</span>
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          {exp.description}
        </p>
      </div>
    </div>
  );
}
