import * as Action from "dnd/types/Action"

export type Type = string | number | (string | number)[]

export interface Data {
  [key: string]: any
}

export type DropData = {
  [key: string]: any
}

export interface Pointer {
  x: number
  y: number
}

export type DragInfo =
  | {
      domRefAttached: true
      domNode: Element
      offsetX: number
      offsetY: number
      width: number
      height: number
    }
  | {
      domRefAttached: false
    }

export interface ActiveContext {
  isDragging: true
  type: Type
  data: object
  dragInfo: DragInfo
  dispatch: (action: Action.Action) => void
  pointer: Pointer
}

export interface InactiveContext {
  isDragging: false
  type: null
  data: null
  dragInfo: null
  dispatch: (action: Action.Action) => void
  pointer: Pointer
}

export type Context = ActiveContext | InactiveContext
