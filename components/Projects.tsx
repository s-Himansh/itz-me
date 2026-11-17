import { projects } from "@/lib/projects";
import ShardTag from "./ShardTag";

export default function Projects() {
  return (
    <section id="projects" className="pt-24">
      <h2 className="mb-10 font-heading text-5xl font-extrabold sm:text-6xl">Things I&apos;ve built</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <article key={p.title} data-shard-key={p.title} className={`box relative flex flex-col justify-between gap-8 ${i === 0 ? "md:col-span-2" : ""}`}>
            <ShardTag k={p.title} />
            <div>
              <h3 className="mb-3 font-heading text-2xl font-bold sm:text-3xl">
                {p.title}
              </h3>
              <p className="max-w-3xl text-graphite">{p.description}</p>
            </div>
            <div>
              <ul className="mb-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li key={t} className="border border-ink px-2 py-0.5 text-sm font-semibold">{t}</li>
                ))}
              </ul>
              <div className="flex gap-6 font-bold">
                {p.demo && (
                  <a className="link" href={p.demo} target="_blank" rel="noopener noreferrer">
                    {p.title === "Cairn" ? "Download" : "Live demo"}
                  </a>
                )}
                <a className="link" href={p.github} target="_blank" rel="noopener noreferrer">Source code</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
