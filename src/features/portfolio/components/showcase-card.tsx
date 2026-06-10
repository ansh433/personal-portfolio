import { ArrowUpRightIcon, EyeIcon } from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"

import {
  Collapsible,
  CollapsibleChevronDownIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import { Icons } from "@/components/icons"
import { Tag } from "@/components/ui/tag"
import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { addQueryParams } from "@/utils/url"

type ShowcaseCardItem = {
  title: string
  link: string
  liveLink?: string
  githubLink?: string
  demoRecordingLink?: string
  skills: string[]
  description?: string
  image?: {
    src: string
    alt?: string
    objectPosition?: string
  }
}

export function ShowcaseCard({
  className,
  item,
}: {
  className?: string
  item: ShowcaseCardItem
}) {
  const primaryLink = item.liveLink || item.githubLink || item.link
  const { summary, details } = splitDescription(item.description)
  const hasDetails = Boolean(details || item.skills.length)
  const actions = getActions(item)

  return (
    <Collapsible className={cn("h-full", className)} defaultOpen={false}>
      <article className="flex h-full flex-col p-4 font-mono">
        <a
          className="group/image relative block aspect-video overflow-hidden rounded-lg border border-line bg-muted"
          href={addQueryParams(primaryLink, UTM_PARAMS)}
          target="_blank"
          rel="noopener"
          aria-label={`Open ${item.title}`}
        >
          {item.image ? (
            <ShowcasePreviewImage image={item.image} title={item.title} />
          ) : (
            <div className="flex size-full items-center justify-center bg-accent text-sm font-medium text-muted-foreground">
              {item.title}
            </div>
          )}
        </a>

        <div className="mt-3 flex items-center gap-2">
          <a
            className="group/link flex min-w-0 flex-1 items-center gap-1.5 text-left leading-snug font-medium hover:text-foreground"
            href={addQueryParams(primaryLink, UTM_PARAMS)}
            target="_blank"
            rel="noopener"
          >
            <span className="truncate">{item.title}</span>
            <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover/link:text-foreground" />
          </a>

          <div className="flex shrink-0 items-center gap-1">
            {actions.map((action) => (
              <a
                key={action.label}
                className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                href={addQueryParams(action.href, UTM_PARAMS)}
                target="_blank"
                rel="noopener"
                title={action.label}
                aria-label={`${action.label}: ${item.title}`}
              >
                {action.icon}
              </a>
            ))}

            {hasDetails && (
              <CollapsibleTrigger
                render={
                  <button
                    className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    type="button"
                    aria-label={`Toggle ${item.title} details`}
                  >
                    <CollapsibleChevronDownIcon className="size-4" />
                  </button>
                }
              />
            )}
          </div>
        </div>

        {summary && (
          <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground md:text-base md:leading-7">
            {summary}
          </p>
        )}

        {hasDetails && (
          <CollapsibleContent className="overflow-hidden">
            <ShowcaseDetails details={details} skills={item.skills} />
          </CollapsibleContent>
        )}
      </article>
    </Collapsible>
  )
}

function ShowcasePreviewImage({
  image,
  title,
}: {
  image: NonNullable<ShowcaseCardItem["image"]>
  title: string
}) {
  return (
    <>
      <Image
        src={image.src}
        alt=""
        fill
        sizes="(min-width: 768px) 352px, calc(100vw - 2rem)"
        className="scale-110 object-cover opacity-75 blur-xl saturate-125 transition-transform duration-300 group-hover/image:scale-[1.13]"
        style={{ objectPosition: image.objectPosition }}
        unoptimized
        aria-hidden
      />

      <div className="absolute inset-0 bg-background/15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.28),transparent_28%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.14))]" />

      <Image
        src={image.src}
        alt={image.alt ?? `${title} preview`}
        fill
        sizes="(min-width: 768px) 312px, calc(100vw - 4rem)"
        className="object-contain p-[3%] drop-shadow-[0_16px_22px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover/image:scale-[1.02]"
        style={{ objectPosition: image.objectPosition }}
        unoptimized
      />
    </>
  )
}

function ShowcaseDetails({
  details,
  skills,
}: {
  details: string
  skills: string[]
}) {
  return (
    <div className="pt-4">
      {details && (
        <div className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
          {details}
        </div>
      )}

      {skills.length > 0 && (
        <ul className={cn("flex flex-wrap gap-1.5", details ? "mt-4" : "mt-0")}>
          {skills.map((skill) => (
            <li key={skill} className="flex">
              <Tag>{skill}</Tag>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function getActions(item: ShowcaseCardItem) {
  return [
    item.githubLink && {
      href: item.githubLink,
      label: "GitHub",
      icon: <Icons.github className="size-4" />,
    },
    item.demoRecordingLink && {
      href: item.demoRecordingLink,
      label: "Demo recording",
      icon: <EyeIcon className="size-4" />,
    },
  ].filter(Boolean) as {
    href: string
    label: string
    icon: ReactNode
  }[]
}

function splitDescription(description?: string) {
  if (!description) {
    return {
      summary: "",
      details: "",
    }
  }

  const [summary = "", ...details] = description.trim().split(/\n\s*\n/)

  return {
    summary: summary.trim(),
    details: details.join("\n\n").trim(),
  }
}
