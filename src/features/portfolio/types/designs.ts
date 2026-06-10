export type Design = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string
  title: string
  /** Public URL for the design page, case study, prototype, or live surface. */
  link: string
  /** Optional live/deployed URL. */
  liveLink?: string
  /** Optional source repository URL. */
  githubLink?: string
  /** Optional demo recording URL. */
  demoRecordingLink?: string
  /** Tags/tools for chips or filtering. */
  skills: string[]
  /** Optional rich description. First paragraph is always visible. */
  description?: string
  /** Design preview image. */
  image?: {
    src: string
    alt?: string
    objectPosition?: string
  }
}
