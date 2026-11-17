export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-4 sm:px-6 lg:px-10">
        <a
          href="#home"
          aria-label="Himanshu Sharma, back to top"
          className="flex h-9 w-9 items-center justify-center self-center border-2 border-ink bg-white font-heading text-base font-extrabold shadow-[3px_3px_0_#111] transition-transform hover:translate-x-px hover:translate-y-px"
        >
          HS
        </a>
        <nav aria-label="Primary" className="flex gap-4 text-sm font-semibold sm:gap-8">
          <a className="link" href="#projects">Work</a>
          <a className="link" href="#experience">Experience</a>
          <a className="link" href="#about">Stack</a>
          <a className="link" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
