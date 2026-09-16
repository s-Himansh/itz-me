import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute top-1/3 left-1/4 h-72 w-72 animate-float rounded-full bg-gradient-to-br from-violet-100 to-purple-100 opacity-60 blur-3xl" />

      <div className="relative z-10 animate-fade-in-up">
        <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600 uppercase">
          404
        </p>
        <h1 className="mb-4 text-6xl font-bold tracking-tight text-gray-900">
          Page not found
        </h1>
        <p className="mb-10 text-lg text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-gray-900/20 transition-all hover:bg-gray-800 hover:shadow-xl"
        >
          Back home
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
