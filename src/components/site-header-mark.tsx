"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function SiteHeaderMark() {
  const pathname = usePathname()
  const isHome = ["/", "/index"].includes(pathname)

  return (
    <Link
      href="/"
      aria-label="Home"
      className={cn(
        "flex h-8 items-center border border-dashed border-line px-3 font-mono text-sm font-semibold lowercase transition-colors hover:bg-accent",
        isHome && "bg-accent/40"
      )}
    >
      ansh
    </Link>
  )
}
