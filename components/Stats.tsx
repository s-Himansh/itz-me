"use client";

import { useInView } from "@/hooks/useInView";
import { useEffect, useState } from "react";

const stats = [
  { label: "Years Experience", value: 2, suffix: "+" },
  { label: "Projects Built", value: 15, suffix: "+" },
  { label: "Microservices Deployed", value: 10, suffix: "+" },
  { label: "Daily Transactions", value: 40, suffix: "K+" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="relative overflow-hidden px-6 py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div
        ref={ref}
        className={`relative mx-auto max-w-5xl transition-all duration-700 ${
          isInView ? "animate-fade-in-up" : "animate-hidden"
        }`}
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-2 text-4xl font-bold text-white md:text-5xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-violet-200">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
