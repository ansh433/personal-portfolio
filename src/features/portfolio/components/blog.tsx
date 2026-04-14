import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

export function Blog() {
  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>Blogs</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <p className="text-sm text-muted-foreground">Writing as I learn.</p>
      </PanelContent>
    </Panel>
  )
}
