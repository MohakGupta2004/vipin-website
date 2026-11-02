import { ImageResponse } from "next/og"

export const alt = "Vipin Garg: live Canadian finance exam prep"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Brand tokens are inlined: ImageResponse cannot read CSS variables.
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
          background: "#102a42",
          color: "#ffffff",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 600, color: "#a9c4d2" }}>Vipin Garg</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 980 }}>
            Canadian finance exam prep, taught live.
          </div>
          <div style={{ fontSize: 34, color: "#a9c4d2" }}>IFC · CSC · CIRE · RSE · LLQP</div>
        </div>
        <div style={{ display: "flex", height: 8, width: 160, background: "#2463eb" }} />
      </div>
    ),
    { ...size }
  )
}
