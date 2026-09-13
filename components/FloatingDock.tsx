"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "about", label: "About", icon: UserIcon },
  { id: "projects", label: "Projects", icon: CodeIcon },
  { id: "experience", label: "Experience", icon: BriefcaseIcon },
  { id: "contact", label: "Contact", icon: MailIcon },
];

export default function FloatingDock() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const sectionIds = ["contact", "experience", "projects", "about", "home"];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      {/* Tooltip */}
      <div
        className={`absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-all duration-200 ${
          hoveredItem ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {sections.find((s) => s.id === hoveredItem)?.label}
        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900" />
      </div>

      {/* Dock */}
      <div className="flex items-end gap-2 rounded-2xl border border-gray-200/80 bg-white/90 px-3 py-2.5 shadow-xl shadow-black/10 backdrop-blur-xl">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const isHovered = hoveredItem === section.id;
          const Icon = section.icon;

          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              onMouseEnter={() => setHoveredItem(section.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-900/30"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              } ${isHovered && !isActive ? "scale-110 -translate-y-1" : ""}`}
              aria-label={section.label}
            >
              <Icon className="h-5 w-5" />
              {isActive && (
                <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-white" />
              )}
            </button>
          );
        })}

        {/* Divider */}
        <div className="mx-1 h-8 w-px bg-gray-200" />

        {/* Resume button */}
        <a
          href="/resume.pdf"
          target="_blank"
          onMouseEnter={() => setHoveredItem("resume")}
          onMouseLeave={() => setHoveredItem(null)}
          className="group flex h-12 w-12 items-center justify-center rounded-xl text-gray-500 transition-all duration-300 hover:bg-violet-50 hover:text-violet-600 hover:scale-110 hover:-translate-y-1"
          aria-label="Resume"
        >
          <DownloadIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}
