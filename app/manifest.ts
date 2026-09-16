import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Himanshu Sharma — Software Development Engineer",
    short_name: "Himanshu",
    description:
      "Software Development Engineer at ZopSmart. Building Go microservices, event-driven systems, and cloud infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
