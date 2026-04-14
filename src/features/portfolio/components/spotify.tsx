import { ArrowUpRightIcon } from "lucide-react"
import { unstable_noStore as noStore } from "next/cache"
import Image from "next/image"

import { getSpotifyState, SPOTIFY } from "../data/spotify"
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

const BARS = [0.42, 0.78, 0.58, 0.9, 0.35]

function SpotifyGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="size-4"
      fill="currentColor"
    >
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0Zm5.504 17.288a.748.748 0 0 1-1.03.25c-2.822-1.724-6.37-2.114-10.548-1.161a.75.75 0 1 1-.333-1.462c4.571-1.044 8.49-.602 11.663 1.336a.75.75 0 0 1 .248 1.037Zm1.47-3.271a.935.935 0 0 1-1.286.312c-3.23-1.986-8.154-2.562-11.977-1.402a.938.938 0 0 1-.545-1.794c4.366-1.324 9.8-.68 13.502 1.597a.937.937 0 0 1 .306 1.287Zm.126-3.407C15.223 8.31 8.815 8.1 5.114 9.224a1.125 1.125 0 1 1-.656-2.152c4.248-1.289 11.311-1.04 15.819 1.638a1.125 1.125 0 1 1-1.177 1.9Z" />
    </svg>
  )
}

export async function Spotify() {
  noStore()
  const { track, reason } = await getSpotifyState()
  const isPlaying = !!track?.isPlaying
  const trackStatusLabel = track ? (isPlaying ? "Now playing" : "Last played") : null
  const primaryLabel = track ? track.title : "Currently not playing"
  const secondaryLabel = track ? track.artist : null

  return (
    <Panel id="spotify">
      <PanelHeader>
        <PanelTitle>Spotify</PanelTitle>
      </PanelHeader>

      <PanelContent className="relative overflow-hidden">
        <div
          className={
            isPlaying
              ? "pointer-events-none absolute inset-0 opacity-90"
              : "pointer-events-none absolute inset-0 opacity-70"
          }
        >
          <div
            className={
              isPlaying
                ? "absolute inset-0 bg-[radial-gradient(circle_at_12%_45%,color-mix(in_oklab,var(--color-success)_18%,transparent),transparent_18%),radial-gradient(circle_at_38%_70%,color-mix(in_oklab,var(--color-info)_16%,transparent),transparent_22%),radial-gradient(circle_at_78%_30%,color-mix(in_oklab,var(--color-link)_14%,transparent),transparent_24%)]"
                : "absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,color-mix(in_oklab,var(--color-line)_65%,transparent),transparent_20%)]"
            }
          />
          <div
            className={
              isPlaying
                ? "absolute inset-0 bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[14px_14px] [--pattern-foreground:color-mix(in_oklab,var(--color-info)_22%,var(--color-line))]"
                : "absolute inset-0 bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[14px_14px] [--pattern-foreground:var(--color-line)]/70"
            }
          />
        </div>

        <div className="relative flex items-center justify-start gap-4">
          <div className="flex min-h-12 min-w-14 items-center justify-center rounded-2xl border border-line bg-background/85 px-4 py-3 backdrop-blur-sm">
            {isPlaying ? (
              <div className="flex items-end gap-1">
                {BARS.map((height, index) => (
                  <span
                    key={index}
                    className="w-1 rounded-full bg-success animate-[spotify-bounce_1.1s_ease-in-out_infinite]"
                    style={{
                      height: `${height * 26}px`,
                      animationDelay: `${index * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <SpotifyGlyph />
              </div>
            )}
          </div>

          <a
            className="group flex min-w-0 flex-1 items-center justify-end gap-3"
            href={track?.songUrl || SPOTIFY.profileUrl}
            target="_blank"
            rel="noopener"
          >
            <div className="min-w-0 text-right">
              {trackStatusLabel && (
                <p className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {trackStatusLabel}
                </p>
              )}
              <p className="truncate text-sm font-medium">
                {primaryLabel}
              </p>
              {secondaryLabel && (
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {secondaryLabel}
                </p>
              )}
            </div>

            {track?.albumArtUrl ? (
              <Image
                src={track.albumArtUrl}
                alt={track.title}
                width={52}
                height={52}
                className="size-13 rounded-md border border-line object-cover"
                unoptimized
              />
            ) : null}

            <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
          </a>
        </div>
      </PanelContent>
    </Panel>
  )
}
