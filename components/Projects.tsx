"use client";

import { useInView } from "@/hooks/useInView";
import { projects } from "@/lib/projects";
import TiltCard from "./TiltCard";

export default function Projects() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.1 });
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.05 });

  return (
    <section id="projects" className="relative bg-gray-50/50 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-700 ${
            headerInView ? "animate-fade-in-up" : "animate-hidden"
          }`}
        >
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600 uppercase">
            Projects
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Featured work</h2>
        </div>

        {/* Project grid */}
        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`transition-all duration-700 ${
                gridInView ? "animate-fade-in-up" : "animate-hidden"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TiltCard>
                <div className="card-hover group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm h-full">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 transition-all duration-300 group-hover:from-violet-100 group-hover:to-purple-100 group-hover:scale-110">
                      <svg
                        className="h-6 w-6 text-violet-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-all duration-300 hover:bg-gray-100 hover:text-gray-700 hover:scale-110"
                        aria-label="GitHub"
                        data-cursor="Code"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-all duration-300 hover:bg-gray-100 hover:text-gray-700 hover:scale-110"
                          aria-label="Live Demo"
                          data-cursor="Visit"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-violet-600">
                    {project.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600 transition-colors group-hover:bg-violet-50 group-hover:text-violet-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
