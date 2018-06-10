import * as React from "react"
import { DnD } from "./types"
import { Consumer } from "./context"

interface DraggableProps {
  context: DnD.Context
  type: DnD.Type
  data: { [key: string]: any }
  children: (data: DraggableBag) => React.ReactElement<any>
}

interface MakePropsInput {
  onPointerDown(e: React.SyntheticEvent): void
  onPointerMove(e: React.SyntheticEvent): void
}

interface DraggableBag {
  makeProps: (handlers: Partial<MakePropsInput>) => MakePropsInput
}

const noop = () => {}

class Draggable extends React.Component<DraggableProps> {
  makeProps = (inputProps: Partial<MakePropsInput>) => {
    const onPointerDown = inputProps.onPointerDown || noop
    const onPointerMove = inputProps.onPointerMove || noop

    return {
      onPointerDown: (e: React.SyntheticEvent) => {
        onPointerDown(e)
        console.log("Draggable: onPointerDown")
        this.props.context.beginDrag({
          dragData: this.props.data,
          dragType: this.props.type,
        })
      },
      onPointerMove: (e: React.SyntheticEvent) => {
        onPointerMove(e)
        console.log("Draggable: onPointerMove")
      },
    }
  }

  render() {
    return this.props.children({
      makeProps: this.makeProps,
    })
  }
}

export default (props: DraggableProps) => (
  <Consumer>{context => <Draggable {...props} context={context} />}</Consumer>
)
