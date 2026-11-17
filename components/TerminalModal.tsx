"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { projects } from "@/lib/projects";

interface TerminalLine {
  type: "input" | "output" | "error" | "ascii";
  content: string;
}

const asciiArt = `
 ██╗  ██╗███████╗
 ██║  ██║██╔════╝
 ███████║███████╗
 ██╔══██║╚════██║
 ██║  ██║███████║
 ╚═╝  ╚═╝╚══════╝`;

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
    { type: "output", content: "  Tip: arrow keys for history, Tab to complete a command" },
  ],

  whoami: () => [
    { type: "output", content: "Himanshu Sharma" },
    { type: "output", content: "Software Development Engineer" },
    { type: "output", content: "" },
    { type: "output", content: "Go and DevOps: backend services, Kubernetes, Terraform and cloud infrastructure." },
    { type: "output", content: "" },
    { type: "output", content: "I enjoy solving complex problems in distributed systems and writing code that scales." },
  ],

  skills: () => [
    { type: "output", content: "Languages:      Go, SQL, Bash" },
    { type: "output", content: "Frameworks:     Gin, GoFr, REST, gRPC" },
    { type: "output", content: "Cloud:          Azure, AWS, Kubernetes, Docker, Helm, Terraform, Rancher, Linux" },
    { type: "output", content: "DevOps:         CI/CD, GitOps, GitHub Actions, ArgoCD, Harness, Prometheus, Grafana" },
    { type: "output", content: "Data:           MySQL, PostgreSQL, Cassandra, MongoDB, Azure Event Hubs, SFTP" },
    { type: "output", content: "Concepts:       Distributed systems, concurrency, sharding, ACID, caching, rate limiting" },
  ],

  experience: () => [
    { type: "output", content: "Software Development Engineer, ZopSmart Technology" },
    { type: "output", content: "  Aug 2025 - Present" },
    { type: "output", content: "  Go sync engine, partitioned worker pools, Terraform on Azure" },
    { type: "output", content: "" },
    { type: "output", content: "Software Development Engineer Intern, ZopSmart Technology" },
    { type: "output", content: "  Aug 2024 - Jul 2025" },
    { type: "output", content: "  10+ Go microservices, Event Hubs, Kubernetes with Helm and ArgoCD, SFTP" },
  ],

  projects: () => [
    ...projects.map((p, i) => ({
      type: "output" as const,
      content: `  ${i + 1}. ${p.title.padEnd(28)} ${p.tech.slice(0, 3).join(", ")}`,
    })),
    { type: "output", content: "" },
    { type: "output", content: "  github.com/s-Himansh" },
  ],

  education: () => [
    { type: "output", content: "Bachelor of Engineering in Computer Science" },
    { type: "output", content: "Chitkara University, Punjab, India" },
    { type: "output", content: "2021 — 2025 | CGPA: 9.1/10" },
  ],

  contact: () => [
    { type: "output", content: "Contact" },
    { type: "output", content: "" },
    { type: "output", content: "  Email:    sharma1966himanshu@gmail.com" },
    { type: "output", content: "  GitHub:   github.com/s-Himansh" },
    { type: "output", content: "  LinkedIn: linkedin.com/in/himanshu1966" },
    { type: "output", content: "  Phone:    +91 62803 17558" },
  ],

  banner: () => [{ type: "ascii", content: asciiArt }],

  hello: () => [
    { type: "output", content: "Hey there. Welcome to my portfolio." },
    { type: "output", content: "Type 'help' to see what you can do here." },
  ],

  clear: () => [],

  ls: () => [{ type: "output", content: "projects/  experience/  stack/  contact/" }],

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
      { type: "output", content: "  $ whoami    : who I am" },
      { type: "output", content: "  $ skills    : my tech stack" },
      { type: "output", content: "  $ projects  : things I've built" },
      { type: "output", content: "  $ banner    : show ASCII art" },
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
      newLines.push({ type: "output", content: "Hey there. Welcome to my portfolio." });
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
      <div className="absolute inset-0 bg-ink/50" onClick={() => setIsOpen(false)} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        className="animate-scale-in relative w-full max-w-3xl border-2 border-ink bg-white shadow-[6px_6px_0_#111]"
      >
        <div className="flex items-center justify-between border-b-2 border-ink px-4 py-2.5">
          <span className="text-sm font-bold">himanshu@portfolio</span>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-graphite">⌘J to toggle</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer border-2 border-ink px-2 py-0.5 font-bold hover:bg-ink hover:text-white"
            >
              Close
            </button>
          </div>
        </div>

        <div
          ref={terminalRef}
          className="h-96 overflow-y-auto bg-ink p-4 font-mono text-sm text-white"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap leading-relaxed">
              {line.type === "input" && <span className="text-[#8f9bff]">{line.content}</span>}
              {line.type === "output" && <span className="text-white/90">{line.content}</span>}
              {line.type === "error" && <span className="text-amber">{line.content}</span>}
              {line.type === "ascii" && (
                <pre className="text-xs leading-tight text-[#8f9bff]">{line.content}</pre>
              )}
            </div>
          ))}

          <div className="flex items-center gap-2">
            <span className="text-[#8f9bff]">$</span>
            <input
              ref={inputRef}
              type="text"
              aria-label="Terminal input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
              placeholder="Type 'help' to get started..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
