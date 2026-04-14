import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json({
    cwd: process.cwd(),
    nodeEnv: process.env.NODE_ENV ?? null,
    hasSpotifyClientId: !!process.env.SPOTIFY_CLIENT_ID,
    hasSpotifyClientSecret: !!process.env.SPOTIFY_CLIENT_SECRET,
    hasSpotifyRefreshToken: !!process.env.SPOTIFY_REFRESH_TOKEN,
    testEnvHello: process.env.TEST_ENV_HELLO ?? null,
    matchingEnvKeys: Object.keys(process.env)
      .filter(
        (key) => key.includes("SPOTIFY") || key === "TEST_ENV_HELLO"
      )
      .sort(),
  })
}
