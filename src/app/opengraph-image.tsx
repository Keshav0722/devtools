import { ImageResponse } from "next/og";
import { toolsList } from "@/lib/tools";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "SDRK Dev Tools - free browser-based developer tools";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "#FFFFFF",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "14px",
              background: "#1F6BED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ fontSize: "34px", fontWeight: 700 }}>SDRK Dev Tools</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "72px", lineHeight: 1.05, fontWeight: 800, maxWidth: "920px" }}>
            Free online developer tools that run in your browser
          </div>
          <div style={{ marginTop: "28px", fontSize: "30px", color: "#D1D5DB", maxWidth: "940px" }}>
            JSON formatter, JWT decoder, Regex tester, Base64, SQL, hashes, UUIDs, timestamps, and more.
          </div>
        </div>

        <div style={{ display: "flex", gap: "18px", color: "#F4FF1E", fontSize: "26px", fontWeight: 700 }}>
          <span>{toolsList.length}+ tools</span>
          <span>Private by design</span>
          <span>No login</span>
        </div>
      </div>
    ),
    size
  );
}
