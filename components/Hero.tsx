import ShardRouter from "./ShardRouter";

export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-10">
      <div className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
        <div>
          <h1 className="font-heading text-[clamp(3.25rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
            Himanshu
            <br />
            Sharma
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-relaxed sm:text-2xl">
            Software Development Engineer. I build the backend parts you never see:
            Go services, event streams and cloud infrastructure. In my spare time I build caches,
            schedulers and rate limiters to see how they break.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 font-bold">
            <a href="#projects" className="box !bg-ink !px-6 !py-3 text-white">See the work</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="box !px-6 !py-3">Read the résumé</a>
          </div>
          <p className="mt-8 text-sm text-graphite">Press ⌘K to jump anywhere, or ⌘J for a terminal.</p>
        </div>

        <div className="box h-fit self-center">
          <ShardRouter />
        </div>
      </div>
    </section>
  );
}
