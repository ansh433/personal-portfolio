import type { Project } from "../../types/projects"
import { ShowcaseCard } from "../showcase-card"

export function ProjectItem({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
  return <ShowcaseCard className={className} item={project} />
}
