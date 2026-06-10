import { DESIGNS } from "../../data/designs"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "../panel"
import { DesignItem } from "./design-item"

export function Design() {
  return (
    <Panel id="design">
      <PanelHeader>
        <PanelTitle>
          Design
          <PanelTitleSup>({DESIGNS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      {DESIGNS.length > 0 && (
        <PanelContent className="p-0">
          <div className="grid md:grid-cols-2">
            {DESIGNS.map((design, index) => (
              <div
                key={design.id}
                className={
                  index % 2 === 0
                    ? "border-b border-line md:border-r"
                    : "border-b border-line"
                }
              >
                <DesignItem design={design} />
              </div>
            ))}
          </div>
        </PanelContent>
      )}
    </Panel>
  )
}
