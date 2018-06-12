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

export type Context = {
  isDragging: boolean
  type: Type | null
  data: object | null
  dispatch: (action: Action.Action) => void
  pointer: Pointer
}
