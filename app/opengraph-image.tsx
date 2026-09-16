import { ImageResponse } from "next/og";

export const alt = "Himanshu Sharma — Software Development Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #fafafa 0%, #f5f3ff 55%, #ede9fe 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top badge */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 28px",
              borderRadius: 999,
              border: "1px solid #ddd6fe",
              background: "#ffffff",
              color: "#6d28d9",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: "#8b5cf6",
                display: "flex",
              }}
            />
            <div style={{ display: "flex" }}>s-Himansh</div>
          </div>
        </div>

        {/* Middle content */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: "#111827",
              letterSpacing: -2,
            }}
          >
            Himanshu Sharma
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              fontSize: 36,
              fontWeight: 600,
              color: "#7c3aed",
            }}
          >
            Software Development Engineer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 27,
              color: "#4b5563",
            }}
          >
            Go microservices · Event-driven systems · Cloud infrastructure
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6b7280",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>ZopSmart Technology</div>
          <div style={{ display: "flex" }}>itz-me-eight.vercel.app</div>
        </div>
      </div>
    ),
    size
  );
}
