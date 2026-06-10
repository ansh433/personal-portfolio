import type { Design } from "../../types/designs"
import { ShowcaseCard } from "../showcase-card"

export function DesignItem({
  className,
  design,
}: {
  className?: string
  design: Design
}) {
  return <ShowcaseCard className={className} item={design} />
}
