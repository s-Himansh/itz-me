import Clock from "./Clock";
import ShardTag from "./ShardTag";

const fields = [
  ["email", "sharma1966himanshu@gmail.com", "mailto:sharma1966himanshu@gmail.com"],
  ["github", "github.com/s-Himansh", "https://github.com/s-Himansh"],
  ["linkedin", "linkedin.com/in/himanshu1966", "https://linkedin.com/in/himanshu1966"],
  ["phone", "+91 62803 17558", "tel:+916280317558"],
  ["resume", "resume.pdf", "/resume.pdf"],
] as const;

export default function Contact() {
  return (
    <section id="contact" className="pb-28 pt-24">
      <h2 className="mb-10 font-heading text-5xl font-extrabold sm:text-6xl">Contact</h2>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div className="space-y-8">
          <p className="max-w-md text-xl leading-relaxed">
            Reach me by email or phone, or find me on GitHub and LinkedIn. Clock&apos;s ticking.
          </p>
          <div className="box w-fit !p-4">
            <Clock />
          </div>
        </div>

        <div className="box relative font-mono text-base sm:text-lg" data-shard-key="contact">
          <ShardTag k="contact" />
          <p className="text-graphite">GET /himanshu</p>
          <ul className="my-4 space-y-2">
            {fields.map(([name, text, href]) => (
              <li key={name} data-shard-key={name} className="flex flex-col sm:flex-row sm:gap-4">
                <span className="w-24 shrink-0 text-graphite">{name}:</span>
                <a
                  className="link break-all font-semibold"
                  href={href}
                  {...(href.startsWith("http") || href.endsWith(".pdf") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-bold text-ultra">200 OK</p>
        </div>
      </div>
    </section>
  );
}
