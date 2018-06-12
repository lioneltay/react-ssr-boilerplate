import * as DnD from "./DnD"

export interface Props {
  children: (data: ChildProps) => React.ReactElement<any>
}

export interface ChildProps {
  isDragging: boolean
  type: DnD.Type | null
  data: DnD.Data | null
  pointer: DnD.Pointer
}
