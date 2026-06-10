import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "subgen",
    title: "SubGen",
    period: {
      start: "2025",
    },
    link: "https://subtitle-generator-lemon.vercel.app/",
    liveLink: "https://subtitle-generator-lemon.vercel.app/",
    githubLink: "https://github.com/ansh433/subtitle_generator",
    image: {
      src: "/projects/subgen.webp",
      alt: "SubGen subtitle generation dashboard preview",
    },
    skills: [
      "Node.js",
      "TypeScript",
      "Redis",
      "FFmpeg",
      "AWS",
      "Docker",
      "GitHub Actions",
    ],
    description: `Distributed subtitle-generation platform for large video files with fault-tolerant job processing and automated subtitle rendering.

- Engineered Redis-backed queue processing with crash recovery, checkpointing, and graceful shutdown patterns
- Combined serverless APIs with long-running workers to balance cost and heavy FFmpeg processing
- Built CI/CD workflows for automated deployment and safer production updates
- Added multipart upload support, smarter subtitle segmentation, and reliability testing around failure scenarios`,
  },
  {
    id: "drawly",
    title: "Drawly",
    period: {
      start: "2025",
    },
    link: "https://excali-draw-frontend.vercel.app/",
    liveLink: "https://excali-draw-frontend.vercel.app/",
    githubLink: "https://github.com/ansh433/ExcaliDraw",
    image: {
      src: "/projects/drawly.webp",
      alt: "Drawly collaborative whiteboard preview",
    },
    skills: [
      "TypeScript",
      "Next.js",
      "WebSockets",
      "Prisma",
      "PostgreSQL",
      "Turborepo",
      "Canvas API",
    ],
    description: `Real-time collaborative whiteboard platform focused on low-latency sync, modular architecture, and smooth canvas interactions.

- Structured the app as a Turborepo monorepo with separate frontend, API, and WebSocket services plus shared packages
- Built room-based real-time synchronization for shared drawing data
- Developed a custom canvas engine using the Canvas and Pointer Events APIs for responsive drawing performance
- Implemented coordinate normalization and inverse-matrix style transformations to support seamless panning and zooming`,
  },
  {
    id: "aurelia-private-villas",
    title: "Aurelia Villas",
    period: {
      start: "2025",
    },
    link: "https://aurelia-villas.vercel.app/",
    liveLink: "https://aurelia-villas.vercel.app/",
    githubLink: "https://github.com/ansh433/booking-system",
    image: {
      src: "/projects/booking_system.webp",
      alt: "Aurelia Villas booking platform preview",
    },
    skills: [
      "Next.js",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Clerk",
      "Stripe",
      "Docker",
      "Terraform",
    ],
    description: `Villa booking platform with guest booking, admin operations, atomic availability checks, and webhook-driven Stripe payment confirmation.

- Built full-stack booking flow with Clerk auth, quote generation, Stripe checkout, and booking status tracking
- Implemented PostgreSQL backend with transactional booking creation and immutable stored pricing
- Added admin workflows for properties, pricing overrides, blocked dates, bookings, and revenue metrics
- Optimized guest-facing Next.js frontend with SEO metadata, local image assets, and strong Lighthouse scores`,
  },
  {
    id: "nyaysetu",
    title: "NyaySetu",
    period: {
      start: "2024",
    },
    link: "https://just-fair-seven.vercel.app/",
    liveLink: "https://just-fair-seven.vercel.app/",
    githubLink: "https://github.com/ansh433/JustFair",
    image: {
      src: "/projects/nyaysetu.webp",
      alt: "NyaySetu legal aid platform preview",
    },
    skills: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "RBAC",
      "Cloudinary",
    ],
    description: `Digital legal-aid platform built to make legal workflows more accessible for the public and easier to manage for legal professionals.

- Designed a secure multi-user backend with JWT authentication and role-based access control for user and lawyer flows
- Built advanced search with specialization, fee, and pro bono filters along with pagination
- Integrated Cloudinary to handle legal-document uploads and storage more reliably
- Created APIs for the full legal-aid request lifecycle, from submission to status tracking and assignment`,
  },
]
