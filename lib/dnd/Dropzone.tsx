import * as React from "react"
import * as DnD from "dnd/types"
import { Consumer } from "./context"

interface Point {
  x: number
  y: number
}

interface Rectangle {
  bottom: number
  top: number
  left: number
  right: number
}

const pointInRectangle = (
  { x, y }: Point,
  { bottom, right, left, top }: Rectangle
) => {
  return x >= left && x <= right && y >= top && y <= bottom
}

interface ChildProps {
  isOver: boolean
  canDrop: boolean
  domRef: (el: Element) => void
  onPointerUp: () => void
}

interface Props {
  children: (data: ChildProps) => React.ReactElement<any>
  type: DnD.Type
  onDrop?: (
    data: { data: DnD.Data; type: DnD.Type }
  ) => DnD.DropData | null | void
  onDragEnter?: (data: ChildProps) => void
  onDragLeave?: (data: ChildProps) => void
  onDragOver?: (data: ChildProps) => boolean
  canDrop?: (data: ChildProps) => boolean
}

export default class Dropzone extends React.Component<Props> {
  static defaultProps = {
    canDrop: () => true,
  }

  domNode: Element | null = null

  domRef = (el: Element): void => {
    this.domNode = el
  }

  getChildProps = (context: DnD.Context): ChildProps => {
    return {
      isOver:
        !!this.domNode &&
        pointInRectangle(context.pointer, this.domNode.getBoundingClientRect()),
      canDrop: false,
      domRef: this.domRef,
      onPointerUp: () => {
        if (
          this.props.onDrop &&
          context.isDragging &&
          context.type === this.props.type &&
          this.props.canDrop()
        ) {
          this.props.onDrop({ data: context.data, type: context.type })
        }
        console.log("dropzone: onPointerUp")
      },
    }
  }

  render() {
    return (
      <Consumer>
        {context => this.props.children(this.getChildProps(context))}
      </Consumer>
    )
  }
}
