import type { ComponentProps } from "react"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-top mx-auto border-x border-line py-4 md:max-w-3xl">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 border border-line bg-background px-4 py-2">
            <a
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="https://github.com/ansh433"
              target="_blank"
              rel="noopener"
            >
              <Icons.github className="size-4" />
              <span className="sr-only">GitHub</span>
            </a>

            <Separator />

            <a
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="https://www.linkedin.com/in/ansh-verma-491842378"
              target="_blank"
              rel="noopener"
            >
              <Icons.linkedin className="size-4" />
              <span className="sr-only">LinkedIn</span>
            </a>

            <Separator />

            <a
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="https://x.com/ansh433v"
              target="_blank"
              rel="noopener"
            >
              <Icons.x className="size-4" />
              <span className="sr-only">X</span>
            </a>
          </div>
        </div>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-16 sm:h-2" />
      </div>
    </footer>
  )
}

function Separator({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex h-4 w-px bg-line", className)} {...props} />
}
