import * as DnD from "dnd/types"

export enum Type {
  DragStart,
  DragEnd,
  Move,
  Drop,
}

export interface StartDrag {
  type: Type.DragStart
  payload: {
    data: object
    type: DnD.Type
    domNode?: Element | null
    pointer: {
      x: number
      y: number
      offsetX?: number
      offsetY?: number
    }
  }
}

export interface EndDrag {
  type: Type.DragEnd
}

export interface Move {
  type: Type.Move
  payload: {
    x: number
    y: number
  }
}

export interface Drop {
  type: Type.Drop
}

export type Action = StartDrag | EndDrag | Move | Drop
