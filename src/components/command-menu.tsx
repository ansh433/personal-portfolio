"use client"

import { useRouter } from "@bprogress/next/app"
import { useCommandState } from "cmdk"
import {
  BoxIcon,
  CornerDownLeftIcon,
  MoonStarIcon,
  RssIcon,
  SunMediumIcon,
  UsersIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import React, { useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { trackEvent } from "@/lib/events"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Kbd, KbdGroup } from "./ui/kbd"
import { Separator } from "./ui/separator"

type CommandLinkItem = {
  title: string
  href: string
  icon?: React.ReactElement
  shortcut?: string
  keywords?: string[]
  openInNewTab?: boolean
}

const MENU_LINKS: CommandLinkItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Icons.search />,
    shortcut: "GH",
  },
  {
    title: "Projects",
    href: "/#projects",
    icon: <BoxIcon />,
    shortcut: "GP",
  },
  {
    title: "Socials",
    href: "/#socials",
    icon: <UsersIcon />,
    shortcut: "GS",
  },
  {
    title: "Blogs",
    href: "/#blog",
    icon: <RssIcon />,
    shortcut: "GB",
  },
]

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = SOCIAL_LINKS.map((item) => ({
  title: item.title,
  href: item.href,
  openInNewTab: true,
}))

type CommandKind = "command" | "page" | "link"

type CommandMetaMap = Map<
  string,
  {
    commandKind: CommandKind
  }
>

export function CommandMenu({
  enabledHotkeys = false,
}: {
  enabledHotkeys?: boolean
}) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  useHotkeys(
    "mod+k, slash",
    (e) => {
      e.preventDefault()

      setOpen((prev) => {
        if (!prev) {
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "keyboard",
            },
          })
        }
        return !prev
      })
    },
    { enabled: enabledHotkeys }
  )

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false)

      if (openInNewTab) {
        window.open(href, "_blank", "noopener")
      } else {
        router.push(href)
      }
    },
    [router]
  )

  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      setOpen(false)
      setTheme(theme)
    },
    [setTheme]
  )

  return (
    <>
      <CommandMenuTrigger
        onClick={() => {
          setOpen(true)
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "click",
            },
          })
        }}
      />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandMenuInput />

        <CommandList className="min-h-80 supports-timeline-scroll:scroll-fade-effect-y">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandLinkGroup
            heading="Menu"
            links={MENU_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandLinkGroup
            heading="Social Links"
            links={SOCIAL_LINK_ITEMS}
            onLinkSelect={handleOpenLink}
          />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={createThemeHandler("light")}>
              <SunMediumIcon />
              Light
            </CommandItem>
            <CommandItem onSelect={createThemeHandler("dark")}>
              <MoonStarIcon />
              Dark
            </CommandItem>
            <CommandItem onSelect={createThemeHandler("system")}>
              <Icons.contrast />
              Auto
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <CommandMenuFooter />
      </CommandDialog>
    </>
  )
}

function CommandMenuTrigger({ ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="command-menu-trigger"
      className="gap-1.5 rounded-full text-muted-foreground shadow-none select-none hover:bg-background hover:text-muted-foreground dark:hover:bg-input/30"
      variant="outline"
      size="sm"
      {...props}
    >
      <Icons.search />

      <span className="font-sans text-sm/4 font-medium sm:hidden">Search...</span>

      <KbdGroup className="hidden sm:in-[.os-macos_&]:flex">
        <Kbd className="w-5 min-w-5">Cmd</Kbd>
        <Kbd className="w-5 min-w-5">K</Kbd>
      </KbdGroup>

      <KbdGroup className="hidden sm:not-[.os-macos_&]:flex">
        <Kbd>Ctrl</Kbd>
        <Kbd className="w-5 min-w-5">K</Kbd>
      </KbdGroup>
    </Button>
  )
}

function CommandMenuInput() {
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    if (searchValue.length >= 2) {
      const timeoutId = setTimeout(() => {
        trackEvent({
          name: "command_menu_search",
          properties: {
            query: searchValue,
            query_length: searchValue.length,
          },
        })
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [searchValue])

  return (
    <CommandInput
      placeholder="Type a command or search..."
      value={searchValue}
      onValueChange={setSearchValue}
    />
  )
}

function CommandLinkGroup({
  heading,
  links,
  onLinkSelect,
}: {
  heading: string
  links: CommandLinkItem[]
  onLinkSelect: (href: string, openInNewTab?: boolean) => void
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const icon = link.icon ?? <React.Fragment />

        return (
          <CommandItem
            key={link.href}
            keywords={link.keywords}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {icon}

            <p className="line-clamp-1">{link.title}</p>

            {link.shortcut && (
              <CommandShortcut className="font-mono tracking-[0.2em] max-sm:hidden">
                {link.shortcut}
              </CommandShortcut>
            )}
          </CommandItem>
        )
      })}
    </CommandGroup>
  )
}

function buildCommandMetaMap() {
  const commandMetaMap: CommandMetaMap = new Map()

  commandMetaMap.set("Light", { commandKind: "command" })
  commandMetaMap.set("Dark", { commandKind: "command" })
  commandMetaMap.set("Auto", { commandKind: "command" })

  SOCIAL_LINK_ITEMS.forEach((item) => {
    commandMetaMap.set(item.title, {
      commandKind: "link",
    })
  })

  return commandMetaMap
}

const COMMAND_META_MAP = buildCommandMetaMap()

const ENTER_ACTION_LABELS: Record<CommandKind, string> = {
  command: "Run Command",
  page: "Go to Page",
  link: "Open Link",
}

function CommandMenuFooter() {
  const selectedCommandKind = useCommandState(
    (state) => COMMAND_META_MAP.get(state.value)?.commandKind ?? "page"
  )

  return (
    <>
      <div className="flex h-10" />

      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 rounded-b-2xl border-t px-4 text-xs font-medium">
        <span className="font-mono text-muted-foreground">ansh</span>

        <div className="flex shrink-0 items-center gap-2 max-sm:hidden">
          <span>{ENTER_ACTION_LABELS[selectedCommandKind]}</span>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
          <Separator
            orientation="vertical"
            className="data-vertical:h-4 data-vertical:self-center"
          />
          <span className="text-muted-foreground">Exit</span>
          <Kbd>Esc</Kbd>
        </div>
      </div>
    </>
  )
}
