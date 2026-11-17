import type { Metadata } from "next";
import { Bricolage_Grotesque, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itz-me-himanshu.pages.dev"),
  title: "Himanshu Sharma — Software Development Engineer",
  description:
    "Software Development Engineer. Building Go microservices, event-driven systems, and cloud infrastructure.",
  keywords: [
    "Himanshu Sharma",
    "Software Engineer",
    "Go Developer",
    "Backend Engineer",
    "Microservices",
    "Kubernetes",
  ],
  authors: [{ name: "Himanshu Sharma", url: "https://github.com/s-Himansh" }],
  creator: "Himanshu Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itz-me-himanshu.pages.dev",
    siteName: "Himanshu Sharma — Portfolio",
    title: "Himanshu Sharma — Software Development Engineer",
    description:
      "Software Development Engineer. Building Go microservices, event-driven systems, and cloud infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Sharma — Software Development Engineer",
    description:
      "Software Development Engineer. Building Go microservices, event-driven systems, and cloud infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Himanshu Sharma",
  jobTitle: "Software Development Engineer",
  url: "https://itz-me-himanshu.pages.dev",
  email: "mailto:sharma1966himanshu@gmail.com",
  sameAs: [
    "https://github.com/s-Himansh",
    "https://linkedin.com/in/himanshu1966",
  ],
  knowsAbout: [
    "Go",
    "Microservices",
    "Kubernetes",
    "Docker",
    "Terraform",
    "Azure",
    "Event-Driven Architecture",
  ],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${schibsted.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink focus:border-2 focus:border-ink"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
