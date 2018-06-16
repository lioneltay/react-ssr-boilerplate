import * as DnD from "./DnD"
import * as Read from "./Read"

export interface Props {
  children: (data: ChildProps) => React.ReactElement<any>
  type: DnD.Type
  data: DnD.Data
}

export interface State {
  isDragging: boolean
}

export interface ChildProps extends Read.ChildProps {
  // Whether the Draggable is being dragged
  isDragging: boolean
  makeProps: (handlers: Partial<MakePropsInput>) => MakePropsInput
  domRef: (el: Element) => void
}

export interface MakePropsInput {
  onPointerDown(e: React.SyntheticEvent): void
}

export enum ActionType {
  DragStart,
  DragEnd,
}

export type Action = DragStartAction | DragEndAction

interface DragStartAction {
  type: ActionType.DragStart
}

interface DragEndAction {
  type: ActionType.DragEnd
}
