import { FULLSTACK_PROJECTS } from "../../data/fullstack"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "../panel"
import { ProjectItem } from "./project-item"

export function Fullstack() {
  return (
    <Panel id="fullstack">
      <PanelHeader>
        <PanelTitle>
          Fullstack
          <PanelTitleSup>({FULLSTACK_PROJECTS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        <div className="grid md:grid-cols-2">
          {FULLSTACK_PROJECTS.map((project, index) => (
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
