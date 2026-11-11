"use client"

import { TypeIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "sonner"

import { copyText } from "@/utils/copy"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-fit">
        <ContextMenuItem
          onClick={() => {
            const color = resolvedTheme === "light" ? "#000" : "#fff"
            copyText(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><text x="4" y="46" fill="${color}" font-family="monospace" font-size="40" font-weight="600">AV</text></svg>`
            )
            toast.success("Monogram as SVG copied")
          }}
        >
          <TypeIcon />
          Copy Monogram as SVG
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
