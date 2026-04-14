export type SpotifyTrack = {
  isPlaying: boolean
  title: string
  artist: string
  songUrl: string
  albumArtUrl?: string
}

export type SpotifyState = {
  track: SpotifyTrack | null
  reason?:
    | "missing_credentials"
    | "token_error"
    | "currently_playing_error"
    | "recently_played_error"
    | "empty"
}

export const SPOTIFY = {
  profileUrl: "https://open.spotify.com/user/31zfwc75z67tkkknwna7x5tahwbm",
}

type SpotifyTokenResponse = {
  access_token: string
}

type SpotifyNowPlayingResponse = {
  is_playing?: boolean
  item?: {
    name: string
    external_urls?: { spotify?: string }
    album?: {
      images?: { url: string }[]
    }
    artists?: { name: string }[]
  } | null
}

type SpotifyRecentResponse = {
  items?: Array<{
    track?: {
      name: string
      external_urls?: { spotify?: string }
      album?: {
        images?: { url: string }[]
      }
      artists?: { name: string }[]
    }
  }>
}

function mapTrack(
  track:
    | SpotifyNowPlayingResponse["item"]
    | SpotifyRecentResponse["items"][number]["track"]
    | null
    | undefined,
  isPlaying: boolean
): SpotifyTrack | null {
  if (!track?.name) return null

  return {
    isPlaying,
    title: track.name,
    artist: track.artists?.map((artist) => artist.name).join(", ") || "",
    songUrl: track.external_urls?.spotify || SPOTIFY.profileUrl,
    albumArtUrl: track.album?.images?.[0]?.url,
  }
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    return { token: null, reason: "missing_credentials" as const }
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    return { token: null, reason: "token_error" as const }
  }

  const data = (await response.json()) as SpotifyTokenResponse
  return { token: data.access_token, reason: null }
}

export async function getSpotifyState(): Promise<SpotifyState> {
  try {
    const { token, reason } = await getAccessToken()

    if (!token) {
      return { track: null, reason: reason ?? "token_error" }
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const nowPlayingResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers,
        cache: "no-store",
      }
    )

    if (nowPlayingResponse.status === 200) {
      const data =
        (await nowPlayingResponse.json()) as SpotifyNowPlayingResponse
      const current = mapTrack(data.item, !!data.is_playing)
      if (current) return { track: current }
    } else if (nowPlayingResponse.status !== 204) {
      return { track: null, reason: "currently_playing_error" }
    }

    const recentResponse = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers,
        cache: "no-store",
      }
    )

    if (!recentResponse.ok) {
      return { track: null, reason: "recently_played_error" }
    }

    const recent = (await recentResponse.json()) as SpotifyRecentResponse
    const track = mapTrack(recent.items?.[0]?.track, false)

    if (!track) {
      return { track: null, reason: "empty" }
    }

    return { track }
  } catch {
    return { track: null, reason: "token_error" }
  }
}
