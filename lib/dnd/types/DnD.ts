import * as Action from "./Action"

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

type DragInfo =
  | {
      domNode: Element
      offsetX: number
      offsetY: number
      width: number
      height: number
    }
  | {
      domNode: null
    }

export type Context =
  | {
      isDragging: false
      type: null
      data: null
      dragInfo: null
      dispatch: (action: Action.Action) => void
      pointer: Pointer
    }
  | {
      isDragging: true
      type: Type | null
      data: object | null
      dragInfo: DragInfo
      dispatch: (action: Action.Action) => void
      pointer: Pointer
    }
