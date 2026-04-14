"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

import type { TechStack } from "../types/tech-stack"

function getInitials(title: string) {
  const parts = title.split(/[\s./+-]+/).filter(Boolean)
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase())
  return initials.join("") || title.slice(0, 2).toUpperCase()
}

export function TechStackItem({ tech }: { tech: TechStack }) {
  const [hasError, setHasError] = useState(false)

  const lightSrc = `/tech-stack-icons/${tech.key}-light.svg`
  const darkSrc = `/tech-stack-icons/${tech.key}-dark.svg`
  const defaultSrc = `/tech-stack-icons/${tech.key}.svg`

  return (
    <div
      className={cn(
        "flex size-8 items-center justify-center overflow-hidden rounded-md border border-line bg-background text-[10px] font-mono font-semibold text-muted-foreground ring-1 ring-transparent transition-colors group-hover:bg-accent group-hover:text-foreground",
        hasError && "px-1"
      )}
    >
      {hasError ? (
        <span>{getInitials(tech.title)}</span>
      ) : tech.theme ? (
        <>
          <img
            src={lightSrc}
            alt={`${tech.title} light icon`}
            className="hidden size-8 [html.light_&]:block"
            onError={() => setHasError(true)}
          />
          <img
            src={darkSrc}
            alt={`${tech.title} dark icon`}
            className="hidden size-8 [html.dark_&]:block"
            onError={() => setHasError(true)}
          />
        </>
      ) : (
        <img
          src={defaultSrc}
          alt={`${tech.title} icon`}
          className="size-8"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}
