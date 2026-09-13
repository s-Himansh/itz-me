"use client";

import { useInView } from "@/hooks/useInView";

const skills = {
  "Languages & Frameworks": ["Go", "Gin", "Gofr", "Java", "SQL"],
  "Cloud & Infrastructure": [
    "Azure",
    "Kubernetes",
    "Docker",
    "Terraform",
    "AWS",
    "Linux",
  ],
  "Datastores & Tooling": [
    "MySQL",
    "Cassandra",
    "MongoDB",
    "GitHub Actions",
    "Prometheus",
    "Grafana",
    "Git",
  ],
  Concepts: [
    "Microservices",
    "Event-Driven Architecture",
    "Concurrency",
    "Data Partitioning",
    "REST APIs",
    "ACID Transactions",
  ],
};

export default function About() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const { ref: imageRef, isInView: imageInView } = useInView({ threshold: 0.2 });
  const { ref: contentRef, isInView: contentInView } = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div
          ref={sectionRef}
          className={`mb-20 text-center transition-all duration-700 ${
            isInView ? "animate-fade-in-up" : "animate-hidden"
          }`}
        >
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600 uppercase">
            About
          </p>
          <h2 className="text-4xl font-bold text-gray-900">A bit about me</h2>
        </div>

        <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
          {/* Photo */}
          <div
            ref={imageRef}
            className={`flex items-start justify-center transition-all duration-700 delay-200 ${
              imageInView ? "animate-fade-in-left" : "animate-hidden"
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-200 to-purple-200 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60" />
              <div className="relative h-56 w-56 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl transition-transform duration-500 group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-gray-400">
                  HS
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className={`transition-all duration-700 delay-300 ${
              contentInView ? "animate-fade-in-right" : "animate-hidden"
            }`}
          >
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              Software Development Engineer at{" "}
              <span className="font-semibold text-gray-900">ZopSmart</span>,
              focused on backend systems and cloud infrastructure. I work
              primarily with{" "}
              <span className="font-medium text-gray-900">
                Go
              </span>{" "}
              for building high-performance services and{" "}
              <span className="font-medium text-gray-900">
                JavaScript
              </span>{" "}
              for full-stack development.
            </p>
            <p className="mb-10 text-lg leading-relaxed text-gray-600">
              Comfortable across the stack—from{" "}
              <span className="font-medium text-gray-900">
                designing microservices
              </span>{" "}
              to{" "}
              <span className="font-medium text-gray-900">
                deploying on Kubernetes
              </span>
              . I believe in writing code that&apos;s simple, maintainable,
              and built to last.
            </p>

            <div className="space-y-6">
              {Object.entries(skills).map(([category, items], catIndex) => (
                <div
                  key={category}
                  className={`transition-all duration-500 ${
                    contentInView
                      ? "animate-fade-in-up"
                      : "animate-hidden"
                  }`}
                  style={{ animationDelay: `${400 + catIndex * 100}ms` }}
                >
                  <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <span
                        key={skill}
                        className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-all duration-300 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 hover:shadow-md cursor-default"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
