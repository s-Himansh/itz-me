"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ["about", "projects", "experience", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200/60 bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="line-reveal text-lg font-bold tracking-tight text-gray-900"
          data-cursor="Home"
        >
          s-Himansh
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  isActive
                    ? "text-violet-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                data-cursor={link.label}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-violet-50 transition-colors" />
                )}
              </a>
            );
          })}
          <a
            href="/resume.pdf"
            target="_blank"
            className="magnetic-btn ml-2 rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-gray-900/20 transition-all hover:bg-gray-800 hover:shadow-xl"
            data-cursor="View"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-slide-down border-t border-gray-100 bg-white/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`animate-fade-in-left delay-${(i + 1) * 100} rounded-lg py-3 text-lg text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              className="animate-fade-in-left delay-500 mt-2 rounded-full bg-gray-900 py-3 text-center text-sm font-medium text-white"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
