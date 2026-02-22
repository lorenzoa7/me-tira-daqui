import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const size = parseInt(searchParams.get("size") || "192", 10);

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          background: "#ea580c",
          borderRadius: size * 0.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: size * 0.55, lineHeight: 1 }}>🍻</span>
      </div>
    ),
    { width: size, height: size }
  );
}
