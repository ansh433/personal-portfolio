import { USER } from "@/features/portfolio/data/user"
import type { NavItem } from "@/types/nav"

export const SITE_INFO = {
  name: USER.displayName,
  url: getSiteUrl(),
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

function getSiteUrl(): string {
  const configuredUrl = process.env.APP_URL?.trim().replace(/\/+$/, "")

  if (configuredUrl && !/localhost|127\.0\.0\.1/.test(configuredUrl)) {
    return configuredUrl
  }

  return "https://www.anshv.xyz"
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Projects",
    href: "/#projects",
  },
  {
    title: "Socials",
    href: "/#socials",
  },
  {
    title: "Blogs",
    href: "/#blog",
  },
]

export const MOBILE_NAV: NavItem[] = MAIN_NAV

export const X_USERNAME = "@ansh433v"
export const GITHUB_USERNAME = "ansh433"
export const SOURCE_CODE_GITHUB_REPO = "ansh433"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/ansh433"

export const SPONSORSHIP_URL = "https://github.com/ansh433"

export const UTM_PARAMS = {
  utm_source: "ansh-portfolio",
}
