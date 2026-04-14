import { NextResponse } from "next/server"

import { getSpotifyState } from "@/features/portfolio/data/spotify"

export async function GET() {
  const state = await getSpotifyState()

  return NextResponse.json({
    hasClientId: !!process.env.SPOTIFY_CLIENT_ID,
    hasClientSecret: !!process.env.SPOTIFY_CLIENT_SECRET,
    hasRefreshToken: !!process.env.SPOTIFY_REFRESH_TOKEN,
    reason: state.reason ?? null,
    track: state.track
      ? {
          isPlaying: state.track.isPlaying,
          title: state.track.title,
          artist: state.track.artist,
          songUrl: state.track.songUrl,
        }
      : null,
  })
}
