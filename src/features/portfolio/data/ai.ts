import type { Project } from "../types/projects"

export const AI_PROJECTS: Project[] = [
  {
    id: "siteintel",
    title: "SiteIntel",
    period: {
      start: "2026",
    },
    link: "",
    image: {
      src: "/projects/seo_agent.webp",
      alt: "SiteIntel SEO and AI discoverability audit platform preview",
    },
    skills: ["Python", "FastAPI", "LangGraph", "React", "TypeScript"],
    description: `Technical SEO and AI discoverability audit platform for evidence-backed website analysis and remediation guidance.

- Built bounded LangGraph workflows for crawlability, metadata, performance, and AI discoverability audits
- Combined deterministic SEO checks with Gemini-assisted analysis and confidence-based evaluations
- Developed FastAPI services with safe URL validation, sitemap discovery, and PageSpeed integration`,
  },
  {
    id: "cogent",
    title: "Cogent",
    period: {
      start: "2026",
    },
    link: "",
    image: {
      src: "/projects/cogent.webp",
      alt: "Cogent AI coding agent runtime preview",
    },
    skills: ["Python", "Anthropic", "Gemini", "Groq", "Textual", "Pytest"],
    description: `An AI coding harness for your terminal, similar to Claude Code, with provider flexibility, approval-gated tools, and resumable coding sessions.

- Lets language models explore repositories, answer questions, and help implement code changes
- Supports Anthropic, Gemini, and Groq through a shared provider interface
- Provides safe tools for reading files, searching code, running commands, and working with Git
- Includes approval prompts, resumable sessions, context compaction, and a full-screen terminal UI`,
  },
]
