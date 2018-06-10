export namespace DnD {
  export interface Context {
    isDragging: boolean
    dragType: Type | null
    dragData: { [key: string]: any } | null
    beginDrag: (data: { dragData: object, dragType: Type }) => void
    endDrag: () => void
    handleMove: () => void
  }

  export type Type = string | number | (string | number)[]
}
