import * as React from "react"
import * as DnD from "./types/DnD"
import * as Read from "./types/Read"
import * as Drop from "./types/Drop"
import { Consumer } from "./context"
import { getReaderChildProps } from "./Reader"

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

export default class Dropzone extends React.Component<Drop.Props> {
  domNode: Element | null = null

  domRef = (el: Element): void => {
    this.domNode = el
  }

  getChildProps = (context: DnD.Context): Drop.ChildProps => {
    return {
      ...getReaderChildProps(context),
      isOver:
        !!this.domNode &&
        pointInRectangle(context.pointer, this.domNode.getBoundingClientRect()),
      canDrop: false,
      domRef: this.domRef,
      onPointerUp: () => {
        console.log('dropzone: onPointerUp')
      }
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
