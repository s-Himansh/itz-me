import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itz-me-eight.vercel.app"),
  title: "Himanshu Sharma — Software Development Engineer",
  description:
    "Software Development Engineer at ZopSmart. Building Go microservices, event-driven systems, and cloud infrastructure.",
  keywords: [
    "Himanshu Sharma",
    "Software Engineer",
    "Go Developer",
    "Backend Engineer",
    "Microservices",
    "Kubernetes",
    "ZopSmart",
  ],
  authors: [{ name: "Himanshu Sharma", url: "https://github.com/s-Himansh" }],
  creator: "Himanshu Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itz-me-eight.vercel.app",
    siteName: "Himanshu Sharma — Portfolio",
    title: "Himanshu Sharma — Software Development Engineer",
    description:
      "Software Development Engineer at ZopSmart. Building Go microservices, event-driven systems, and cloud infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Sharma — Software Development Engineer",
    description:
      "Software Development Engineer at ZopSmart. Building Go microservices, event-driven systems, and cloud infrastructure.",
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
  worksFor: { "@type": "Organization", name: "ZopSmart Technology" },
  url: "https://itz-me-eight.vercel.app",
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-full focus:bg-gray-900 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
