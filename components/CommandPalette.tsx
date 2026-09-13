"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Command {
  id: string;
  label: string;
  description: string;
  shortcut: string;
  section: string | null;
  icon: React.ReactNode;
  category: "navigation" | "links" | "actions";
}

const commands: Command[] = [
  {
    id: "home",
    label: "Home",
    description: "Go to homepage",
    shortcut: "⌘H",
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
    label: "About",
    description: "Learn about me",
    shortcut: "⌘A",
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
    description: "View my work",
    shortcut: "⌘P",
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
    description: "View my journey",
    shortcut: "⌘E",
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
    description: "Get in touch",
    shortcut: "⌘C",
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
    description: "Interactive terminal to explore",
    shortcut: "⌘T",
    section: null,
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    category: "navigation",
  },
  {
    id: "learning",
    label: "Currently Learning",
    description: "What I'm exploring now",
    shortcut: "⌘L",
    section: "learning",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    category: "navigation",
  },
  {
    id: "resume",
    label: "Download Resume",
    description: "Get my PDF resume",
    shortcut: "⌘D",
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
    label: "GitHub Profile",
    description: "View my repositories",
    shortcut: "⌘G",
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
    label: "LinkedIn Profile",
    description: "Connect with me",
    shortcut: "⌘L",
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

  let globalIndex = 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isClosing ? "bg-black/0 backdrop-blur-0" : "bg-black/40 backdrop-blur-md"
        }`}
        onClick={() => {
          setIsClosing(true);
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 150);
        }}
      />

      {/* Palette */}
      <div
        className={`relative w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-2xl shadow-black/20 transition-all duration-300 ${
          isClosing
            ? "scale-95 opacity-0 translate-y-4"
            : "scale-100 opacity-100 translate-y-0"
        }`}
      >
        {/* Glow effect */}
        <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-400/30 blur-3xl" />

        {/* Search input */}
        <div className="relative flex items-center gap-3 border-b border-gray-100 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
          />
          <kbd className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-500 transition-colors group-hover:bg-gray-100">
            ESC
          </kbd>
        </div>

        {/* Commands list */}
        <div ref={listRef} className="max-h-[400px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500">No results found</p>
              <p className="mt-1 text-xs text-gray-400">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Navigation */}
              {groupedCommands.navigation.length > 0 && (
                <div>
                  <div className="px-3 py-2">
                    <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                      Navigate
                    </span>
                  </div>
                  {groupedCommands.navigation.map((cmd) => {
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
              )}

              {/* Actions */}
              {groupedCommands.actions.length > 0 && (
                <div>
                  <div className="px-3 py-2">
                    <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                      Actions
                    </span>
                  </div>
                  {groupedCommands.actions.map((cmd) => {
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
              )}

              {/* Links */}
              {groupedCommands.links.length > 0 && (
                <div>
                  <div className="px-3 py-2">
                    <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                      Links
                    </span>
                  </div>
                  {groupedCommands.links.map((cmd) => {
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
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3">
          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium">↑</kbd>
              <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium">↓</kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium">↵</kbd>
              <span>select</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium">esc</kbd>
              <span>close</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            <span>Powered by</span>
            <span className="font-medium text-gray-600">⌘K</span>
          </div>
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
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
        isSelected
          ? "bg-gradient-to-r from-violet-50 to-purple-50 text-gray-900"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
          isSelected
            ? "bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-md shadow-violet-500/30"
            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
        }`}
      >
        {cmd.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900">{cmd.label}</div>
        <div className="text-xs text-gray-400 truncate">{cmd.description}</div>
      </div>
      <kbd
        className={`rounded-lg border px-2 py-1 text-[10px] font-medium transition-colors ${
          isSelected
            ? "border-violet-200 bg-violet-100 text-violet-600"
            : "border-gray-200 bg-gray-50 text-gray-400"
        }`}
      >
        {cmd.shortcut}
      </kbd>
    </button>
  );
}
