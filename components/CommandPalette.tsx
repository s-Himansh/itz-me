"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Command {
  id: string;
  label: string;
  description: string;
  section: string | null;
  icon: React.ReactNode;
  category: "navigation" | "links" | "actions";
}

const commands: Command[] = [
  {
    id: "home",
    label: "Home",
    description: "Back to the top",
    section: "home",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    category: "navigation",
  },
  {
    id: "about",
    label: "Stack",
    description: "Skills and what I'm learning",
    section: "about",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    category: "navigation",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Things I've built",
    section: "projects",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    category: "navigation",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Where I've worked",
    section: "experience",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    category: "navigation",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Email, phone and links",
    section: "contact",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    category: "navigation",
  },
  {
    id: "terminal",
    label: "Terminal",
    description: "Open the terminal",
    section: null,
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    category: "navigation",
  },
  {
    id: "resume",
    label: "Résumé",
    description: "Open the PDF",
    section: null,
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    category: "actions",
  },
  {
    id: "github",
    label: "GitHub",
    description: "My repositories",
    section: null,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    category: "links",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "My profile",
    section: null,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    category: "links",
  },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  const groupedCommands = {
    navigation: filtered.filter((c) => c.category === "navigation"),
    actions: filtered.filter((c) => c.category === "actions"),
    links: filtered.filter((c) => c.category === "links"),
  };

  const executeCommand = useCallback((cmd: Command) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);

      if (cmd.id === "resume") {
        window.open("/resume.pdf", "_blank");
      } else if (cmd.id === "github") {
        window.open("https://github.com/s-Himansh", "_blank");
      } else if (cmd.id === "linkedin") {
        window.open("https://linkedin.com/in/himanshu1966", "_blank");
      } else if (cmd.id === "terminal") {
        window.dispatchEvent(new CustomEvent("open-terminal"));
      } else if (cmd.section) {
        const el = document.getElementById(cmd.section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 150);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          setIsClosing(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 150);
        } else {
          setIsOpen(true);
          setQuery("");
          setSelectedIndex(0);
        }
      }
      if (e.key === "Escape" && isOpen) {
        setIsClosing(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsClosing(false);
        }, 150);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        executeCommand(filtered[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, executeCommand]);

  useEffect(() => {
    if (listRef.current) {
      const activeItem = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const close = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150);
  };

  const groups = [
    ["Navigate", groupedCommands.navigation],
    ["Actions", groupedCommands.actions],
    ["Links", groupedCommands.links],
  ] as const;
  let globalIndex = 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]">
      <div className="absolute inset-0 bg-ink/40" onClick={close} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={`relative w-full max-w-xl border-2 border-ink bg-white shadow-[6px_6px_0_#111] transition-all duration-150 ${
          isClosing ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="flex items-center gap-3 border-b-2 border-ink px-5 py-4">
          <input
            ref={inputRef}
            type="text"
            aria-label="Search commands"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-lg font-semibold text-ink outline-none placeholder:text-graphite/50"
          />
          <kbd className="border-2 border-ink px-2 py-0.5 text-xs font-bold">Esc</kbd>
        </div>

        <div ref={listRef} className="max-h-[400px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-10 text-center text-graphite">No match. Try a different word.</p>
          ) : (
            groups.map(
              ([title, items]) =>
                items.length > 0 && (
                  <div key={title} className="mb-2">
                    <p className="px-3 py-2 text-sm font-bold text-graphite">{title}</p>
                    {items.map((cmd) => {
                      const currentIndex = globalIndex++;
                      return (
                        <CommandItem
                          key={cmd.id}
                          cmd={cmd}
                          isSelected={currentIndex === selectedIndex}
                          index={currentIndex}
                          onHover={() => setSelectedIndex(currentIndex)}
                          onClick={() => executeCommand(cmd)}
                        />
                      );
                    })}
                  </div>
                ),
            )
          )}
        </div>

        <div className="flex items-center gap-5 border-t-2 border-ink px-5 py-3 text-sm text-graphite">
          <span><kbd className="border border-ink px-1.5 font-bold text-ink">↑↓</kbd> move</span>
          <span><kbd className="border border-ink px-1.5 font-bold text-ink">Enter</kbd> open</span>
          <span><kbd className="border border-ink px-1.5 font-bold text-ink">Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

function CommandItem({
  cmd,
  isSelected,
  index,
  onHover,
  onClick,
}: {
  cmd: Command;
  isSelected: boolean;
  index: number;
  onHover: () => void;
  onClick: () => void;
}) {
  return (
    <button
      data-index={index}
      onClick={onClick}
      onMouseEnter={onHover}
      className={`flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left ${
        isSelected ? "bg-ink text-white" : "text-ink"
      }`}
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center border-2 ${isSelected ? "border-white" : "border-ink"}`}>
        {cmd.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold">{cmd.label}</span>
        <span className={`block truncate text-sm ${isSelected ? "text-white/75" : "text-graphite"}`}>{cmd.description}</span>
      </span>
    </button>
  );
}
