import type { Project } from "../types/projects"

export const AI_PROJECTS: Project[] = [
  {
    id: "siteintel",
    title: "SiteIntel",
    period: {
      start: "2026",
    },
    link: "https://seoagent.anshv.xyz/",
    liveLink: "https://seoagent.anshv.xyz/",
    image: {
      src: "/projects/seo_agent.webp",
      alt: "SiteIntel SEO and AI discoverability audit platform preview",
    },
    githubLink: "https://github.com/ansh433/seo_agent",
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
    githubLink: "https://github.com/ansh433/coding_agent",
    image: {
      src: "/projects/cogent.webp",
      alt: "Cogent AI coding agent runtime preview",
    },
    skills: ["Python", "Anthropic", "Gemini", "Groq", "Textual", "Pytest"],
    description: `An AI coding harness for the terminal, similar to Claude Code, with flexible providers and approval-gated tools.

- Lets language models explore repositories, answer questions, and help implement code changes
- Supports Anthropic, Gemini, and Groq through a shared provider interface
- Provides safe tools for reading files, searching code, running commands, and working with Git
- Includes approval prompts, resumable sessions, context compaction, and a full-screen terminal UI`,
  },
  {
    id: "voice-agent",
    title: "Voice Agent",
    period: {
      start: "2026",
    },
    link: "https://mita.anshv.xyz/",
    liveLink: "https://mita.anshv.xyz/",
    githubLink: "https://github.com/ansh433/voice_agent",
    image: {
      src: "/projects/voice.webp",
      alt: "Voice Agent bilingual automotive service desk preview",
    },
    skills: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "LiveKit",
      "Deepgram",
      "Groq",
      "ElevenLabs",
    ],
    description: `Bilingual automotive voice service desk for conversations about vehicle service needs and appointment availability.

- Implemented a LiveKit browser voice agent for English, Hindi, and Hinglish conversations
- Added read-only tools for services, slots, and customer appointment history
- Implemented authenticated FastAPI sessions with PostgreSQL business rules and deterministic test coverage`,
  },
  {
    id: "compass-intelligence",
    title: "Compass Intelligence",
    period: {
      start: "2026",
    },
    link: "https://compass.anshv.xyz/",
    liveLink: "https://compass.anshv.xyz/",
    image: {
      src: "/projects/compass.webp",
      alt: "Compass Intelligence company and competitor research workspace preview",
    },
    skills: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "LangGraph",
      "Tavily",
      "Protobuf",
      "Docker",
    ],
    description: `A source-backed research agent for company and competitor decision dossiers.

- Built bounded workflows for company resolution, competitor discovery, pricing analysis, and report verification
- Combined web research, source retrieval, confidence scoring, and explicit evidence classifications
- Shipped a workspace with persistent dossiers, streamed progress, citations, comparison matrices, and resumable research runs`,
  },
]
