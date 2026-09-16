"use client";

import { useInView } from "@/hooks/useInView";
import TypeWriter from "./TypeWriter";

const roles = [
  "Go Developer",
  "Systems Engineer",
  "Cloud Architect",
  "Backend Engineer",
  "Microservices Expert",
];

export default function Hero() {
  const { ref: heroRef, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute top-20 left-1/4 h-72 w-72 animate-float rounded-full bg-gradient-to-br from-violet-100 to-purple-100 opacity-60 blur-3xl" />
      <div
        className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 opacity-60 blur-3xl"
        style={{ animation: "float 4s ease-in-out infinite 1s" }}
      />

      <div ref={heroRef} className="relative z-10 max-w-3xl text-center">
        {/* Keyboard shortcuts hint */}
        <div
          className={`mb-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-gray-200 bg-white/80 px-5 py-2.5 text-sm text-gray-500 shadow-sm backdrop-blur-sm transition-all duration-700 ${
            isInView ? "animate-fade-in-up" : "animate-hidden"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <kbd className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">
              ⌘K
            </kbd>
            <span>navigate</span>
          </span>
          <span className="h-4 w-px bg-gray-300" />
          <span className="flex items-center gap-1.5">
            <kbd className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">
              ⌘J
            </kbd>
            <span>terminal</span>
          </span>
        </div>

        {/* Name */}
        <h1
          className={`mb-6 text-6xl font-bold tracking-tight text-gray-900 sm:text-8xl transition-all duration-700 delay-200 ${
            isInView ? "animate-fade-in-up" : "animate-hidden"
          }`}
        >
          Himanshu
          <span className="gradient-text"> Sharma</span>
        </h1>

        {/* Title */}
        <p
          className={`mb-4 text-xl text-gray-600 sm:text-2xl transition-all duration-700 delay-300 ${
            isInView ? "animate-fade-in-up" : "animate-hidden"
          }`}
        >
          I&apos;m a{" "}
          <span className="font-semibold text-gray-900">
            <TypeWriter texts={roles} />
          </span>
        </p>

        {/* Description */}
        <p
          className={`mb-10 text-lg leading-relaxed text-gray-500 transition-all duration-700 delay-400 ${
            isInView ? "animate-fade-in-up" : "animate-hidden"
          }`}
        >
          Building Go microservices, event-driven systems, and cloud
          infrastructure at{" "}
          <span className="font-medium text-gray-900">ZopSmart</span>.
        </p>

        {/* CTAs */}
        <div
          className={`mb-12 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-500 ${
            isInView ? "animate-fade-in-up" : "animate-hidden"
          }`}
        >
          <a
            href="#projects"
            className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-gray-900/20 transition-all hover:bg-gray-800 hover:shadow-xl"
            data-cursor="Explore"
          >
            View my work
            <span aria-hidden="true">↓</span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:text-gray-900 hover:shadow-md"
            data-cursor="Resume"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Résumé
          </a>
        </div>

        {/* Social links */}
        <div
          className={`mt-10 flex items-center justify-center gap-4 transition-all duration-700 delay-700 ${
            isInView ? "animate-fade-in-up" : "animate-hidden"
          }`}
        >
          {[
            {
              href: "https://github.com/s-Himansh",
              label: "GitHub",
              icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              ),
            },
            {
              href: "https://linkedin.com/in/himanshu1966",
              label: "LinkedIn",
              icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ),
            },
            {
              href: "mailto:sharma1966himanshu@gmail.com",
              label: "Email",
              icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              href: "tel:+916280317558",
              label: "Phone",
              icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              ),
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="magnetic-btn flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-gray-300 hover:text-gray-900 hover:shadow-md"
              aria-label={social.label}
              data-cursor={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-28 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${
          isInView ? "animate-fade-in-up" : "animate-hidden"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="h-10 w-6 rounded-full border-2 border-gray-300 p-1">
            <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
