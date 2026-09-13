"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface TerminalLine {
  type: "input" | "output" | "error" | "ascii";
  content: string;
}

const asciiArt = `
 ██╗  ██╗██╗███████╗███████╗ ██████╗
 ██║  ██║██║██╔════╝██╔════╝██╔════╝
 ███████║██║███████╗█████╗  ██║     
 ██╔══██║██║╚════██║██╔══╝  ██║     
 ██║  ██║██║███████║███████╗╚██████╗
 ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝ ╚═════╝`;

const commands: Record<string, () => TerminalLine[]> = {
  help: () => [
    { type: "output", content: "Available commands:" },
    { type: "output", content: "" },
    { type: "output", content: "  Basic Commands:" },
    { type: "output", content: "    whoami       - About me" },
    { type: "output", content: "    skills       - Technical skills" },
    { type: "output", content: "    experience   - Work experience" },
    { type: "output", content: "    projects     - Featured projects" },
    { type: "output", content: "    education    - Education background" },
    { type: "output", content: "    contact      - Get in touch" },
    { type: "output", content: "" },
    { type: "output", content: "  Fun Commands:" },
    { type: "output", content: "    banner       - Show ASCII art" },
    { type: "output", content: "    hello        - Say hello" },
    { type: "output", content: "    date         - Current date & time" },
    { type: "output", content: "    uname        - System info" },
    { type: "output", content: "" },
    { type: "output", content: "  System Commands:" },
    { type: "output", content: "    clear        - Clear terminal" },
    { type: "output", content: "    ls           - List sections" },
    { type: "output", content: "    pwd          - Current directory" },
    { type: "output", content: "" },
    { type: "output", content: "  Tip: Use ↑↓ arrows for history, Tab for autocomplete" },
  ],

  whoami: () => [
    { type: "output", content: "Himanshu Sharma" },
    { type: "output", content: "Software Development Engineer @ ZopSmart" },
    { type: "output", content: "" },
    { type: "output", content: "Building Go microservices, event-driven systems, and cloud infrastructure." },
    { type: "output", content: "" },
    { type: "output", content: "I enjoy solving complex problems in distributed systems and writing code that scales." },
  ],

  skills: () => [
    { type: "output", content: "Languages & Frameworks:" },
    { type: "output", content: "  Go (Gin, Gofr), Java, SQL, JavaScript, TypeScript" },
    { type: "output", content: "" },
    { type: "output", content: "Cloud & Infrastructure:" },
    { type: "output", content: "  Azure, Kubernetes, Docker, Terraform, AWS, Linux" },
    { type: "output", content: "" },
    { type: "output", content: "Datastores & Tooling:" },
    { type: "output", content: "  MySQL, Cassandra, MongoDB, Prometheus, Grafana, GitHub Actions" },
    { type: "output", content: "" },
    { type: "output", content: "Concepts:" },
    { type: "output", content: "  Microservices, Event-Driven Architecture, Concurrency, REST APIs" },
  ],

  experience: () => [
    { type: "output", content: "┌─────────────────────────────────────────────────────────────────┐" },
    { type: "output", content: "│  Software Development Engineer @ ZopSmart Technology           │" },
    { type: "output", content: "│  Aug 2025 — Present                                             │" },
    { type: "output", content: "│  Go-based sync engine, partitioned worker pools, Azure infra   │" },
    { type: "output", content: "└─────────────────────────────────────────────────────────────────┘" },
    { type: "output", content: "" },
    { type: "output", content: "┌─────────────────────────────────────────────────────────────────┐" },
    { type: "output", content: "│  Software Development Engineer Intern @ ZopSmart Technology    │" },
    { type: "output", content: "│  Aug 2024 — Jul 2025                                            │" },
    { type: "output", content: "│  10+ Go microservices, Azure Event Hubs, Kubernetes, SFTP      │" },
    { type: "output", content: "└─────────────────────────────────────────────────────────────────┘" },
  ],

  projects: () => [
    { type: "output", content: "Pinned Projects:" },
    { type: "output", content: "" },
    { type: "output", content: "  1. Sharded LRU Cache        - Concurrent cache with FNV-1a hashing" },
    { type: "output", content: "  2. Partitioned API Throttler - Rate limiter with Prometheus metrics" },
    { type: "output", content: "  3. DAG                      - Directed Acyclic Graph implementation" },
    { type: "output", content: "  4. Makarov Chain Reaction   - Markov Chain simulation in Go" },
    { type: "output", content: "  5. Transfer Agent           - Agent-based transfer system" },
    { type: "output", content: "  6. Hospital Management      - Full-stack Java application" },
    { type: "output", content: "" },
    { type: "output", content: "  → github.com/s-Himansh" },
  ],

  education: () => [
    { type: "output", content: "Bachelor of Engineering in Computer Science" },
    { type: "output", content: "Chitkara University, Punjab, India" },
    { type: "output", content: "2021 — 2025 | CGPA: 9.1/10" },
  ],

  contact: () => [
    { type: "output", content: "Let's connect!" },
    { type: "output", content: "" },
    { type: "output", content: "  Email:    sharma1966himanshu@gmail.com" },
    { type: "output", content: "  GitHub:   github.com/s-Himansh" },
    { type: "output", content: "  LinkedIn: linkedin.com/in/himanshu1966" },
    { type: "output", content: "  Phone:    +91 6280317558" },
  ],

  banner: () => [{ type: "ascii", content: asciiArt }],

  hello: () => [
    { type: "output", content: "Hey there! 👋 Welcome to my portfolio." },
    { type: "output", content: "Type 'help' to see what you can do here." },
  ],

  clear: () => [],

  ls: () => [{ type: "output", content: "about/  projects/  experience/  learning/  contact/" }],

  pwd: () => [{ type: "output", content: "/home/himanshu/portfolio" }],

  date: () => [{ type: "output", content: new Date().toString() }],

  uname: () => [{ type: "output", content: "HimanshuOS 1.0.0 (Developer Edition)" }],
};

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const resetTerminal = useCallback(() => {
    setLines([
      { type: "output", content: "Welcome to Himanshu's Terminal" },
      { type: "output", content: 'Type "help" to see available commands.' },
      { type: "output", content: "" },
      { type: "output", content: "Quick start:" },
      { type: "output", content: "  $ whoami    → Learn about me" },
      { type: "output", content: "  $ skills    → See my tech stack" },
      { type: "output", content: "  $ projects  → View my work" },
      { type: "output", content: "  $ banner    → Show ASCII art" },
      { type: "output", content: "" },
    ]);
    setInput("");
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "j") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        if (!isOpen) {
          resetTerminal();
        }
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOpenTerminal = () => {
      setIsOpen(true);
      resetTerminal();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-terminal", handleOpenTerminal);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-terminal", handleOpenTerminal);
    };
  }, [isOpen, resetTerminal]);

  useEffect(() => {
    if (isOpen && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const command = trimmed.split(" ")[0];

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `$ ${cmd}` },
    ];

    if (command === "clear") {
      setLines([]);
    } else if (command === "hello" || command === "hi") {
      newLines.push({ type: "output", content: "Hey there! 👋 Welcome to my portfolio." });
      setLines(newLines);
    } else if (command === "banner" || command === "neofetch") {
      newLines.push({ type: "ascii", content: asciiArt });
      setLines(newLines);
    } else if (commands[command]) {
      const output = commands[command]();
      setLines([...newLines, ...output]);
    } else if (command === "") {
      setLines(newLines);
    } else {
      newLines.push({ type: "error", content: `Command not found: ${command}. Type "help" for available commands.` });
      setLines(newLines);
    }

    if (cmd.trim()) {
      setHistory((prev) => [...prev, cmd]);
    }
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.toLowerCase();
      const match = Object.keys(commands).find((c) => c.startsWith(partial));
      if (match) setInput(match);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Terminal */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-[#1e1e2e] shadow-2xl animate-scale-in">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-gray-700/50 bg-[#181825] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="h-3 w-3 rounded-full bg-[#f38ba8] transition-opacity hover:opacity-80"
              />
              <div className="h-3 w-3 rounded-full bg-[#f9e2af]" />
              <div className="h-3 w-3 rounded-full bg-[#a6e3a1]" />
            </div>
            <span className="ml-4 text-xs font-medium text-gray-400">
              himanshu@portfolio ~ terminal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="rounded border border-gray-700 bg-[#313244] px-2 py-0.5 text-[10px] text-gray-400">
              ⌘J to toggle
            </kbd>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="h-96 overflow-y-auto p-4 font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed">
              {line.type === "input" && <span className="text-[#a6e3a1]">{line.content}</span>}
              {line.type === "output" && <span className="text-[#cdd6f4]">{line.content}</span>}
              {line.type === "error" && <span className="text-[#f38ba8]">{line.content}</span>}
              {line.type === "ascii" && (
                <pre className="text-[10px] leading-tight text-[#cba6f7] sm:text-xs">{line.content}</pre>
              )}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center gap-2">
            <span className="text-[#a6e3a1]">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[#cdd6f4] outline-none placeholder:text-gray-500"
              placeholder="Type 'help' to get started..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
