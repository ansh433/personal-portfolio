import { AI_PROJECTS } from "../../data/ai"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "../panel"
import { ProjectItem } from "../fullstack/project-item"

export function AI() {
  return (
    <Panel id="ai">
      <PanelHeader>
        <PanelTitle>
          AI
          <PanelTitleSup>({AI_PROJECTS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        <div className="grid md:grid-cols-2">
          {AI_PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={
                index % 2 === 0
                  ? "border-b border-line md:border-r"
                  : "border-b border-line"
              }
            >
              <ProjectItem project={project} />
            </div>
          ))}
        </div>
      </PanelContent>
    </Panel>
  )
}
