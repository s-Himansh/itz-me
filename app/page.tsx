import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import CommandPalette from "@/components/CommandPalette";
import TerminalModal from "@/components/TerminalModal";
import ActiveShard from "@/components/ActiveShard";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <CommandPalette />
      <TerminalModal />
      <ActiveShard />
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <Projects />
          <Experience />
          <About />
          <Contact />
        </div>
      </main>
    </>
  );
}
