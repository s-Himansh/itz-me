import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import CurrentlyLearning from "@/components/CurrentlyLearning";
import Contact from "@/components/Contact";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import FloatingDock from "@/components/FloatingDock";
import CommandPalette from "@/components/CommandPalette";
import TerminalModal from "@/components/TerminalModal";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ParticleBackground />
      <CommandPalette />
      <TerminalModal />
      <main id="main-content" className="relative z-10 flex-1">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <CurrentlyLearning />
        <Contact />
      </main>
      <FloatingDock />
    </>
  );
}
