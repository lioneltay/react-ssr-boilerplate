import * as DnD from "./DnD"
import * as Read from "./Read"

export interface Props {
  children: (data: ChildProps) => React.ReactElement<any>
  type: DnD.Type
  onDrop?: (
    data: { dragData: DnD.Data; dragType: DnD.Type }
  ) => DnD.DropData | null | void
  onDragEnter?: (data: Read.ChildProps) => void
  onDragLeave?: (data: Read.ChildProps) => void
  onDragOver?: (data: Read.ChildProps) => boolean
  canDrop?: (data: Read.ChildProps) => boolean
}

export interface ChildProps extends Read.ChildProps {
  isOver: boolean
  canDrop: boolean
  domRef: (el: Element) => void
}
