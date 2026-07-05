import { ImageResponse } from "next/og";

export const alt =
  "Mohamed Shahin M — Full-Stack Developer & Dynamics 365 CRM";
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
          padding: "72px",
          background:
            "radial-gradient(70% 90% at 80% 0%, rgba(22,163,74,0.2), transparent 60%), #f9f8f6",
          color: "#1a1a1a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#fff",
              background: "#16a34a",
            }}
          >
            MS
          </div>
          <div style={{ fontSize: 26, color: "#6b7280" }}>
            Available for freelance work
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#16a34a", marginBottom: 8 }}>
            Freelance Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Mohamed Shahin M
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#6b7280",
              marginTop: 20,
              maxWidth: 900,
            }}
          >
            Dynamics 365 CRM · Full-Stack Web & Mobile
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Dynamics 365", "Power Platform", "Azure Functions", "Flutter"].map(
            (t) => (
              <div
                key={t}
                style={{
                  fontSize: 24,
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.12)",
                  color: "#4b5563",
                }}
              >
                {t}
              </div>
            )
          )}
        </div>
      </div>
    ),
    size
  );
}
