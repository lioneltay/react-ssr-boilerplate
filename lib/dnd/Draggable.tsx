import * as React from "react"
import * as DnD from "./types/DnD"
import * as Drag from "./types/Drag"
import * as Action from "./types/Action"
import { Consumer } from "./context"
import { getReaderChildProps } from "./Reader"

const noop = () => {}

export default class Draggable extends React.Component<Drag.Props, Drag.State> {
  domNode: Element | null = null

  domRef = (el: Element) => {
    this.domNode = el
  }

  state = {
    isDragging: false,
  }

  dispatch = (action: Drag.Action) => {
    this.setState(state => this.reducer(state, action))
  }

  reducer = (state: Drag.State, action: Drag.Action): Drag.State => {
    switch (action.type) {
      case Drag.ActionType.DragStart: {
        return {
          ...state,
          isDragging: true,
        }
      }
      case Drag.ActionType.DragEnd: {
        return {
          ...state,
          isDragging: false,
        }
      }
    }
  }

  pointerUpHandler = () => {
    this.dispatch({ type: Drag.ActionType.DragEnd })
  }

  componentDidMount() {
    document.addEventListener("pointerup", this.pointerUpHandler)
  }

  componentWillUnmount() {
    document.removeEventListener("pointerup", this.pointerUpHandler)
  }

  makePropsFactory(context: DnD.Context) {
    return (inputProps: Partial<Drag.MakePropsInput>) => {
      const onPointerDown = inputProps.onPointerDown || noop

      return {
        onPointerDown: (e: PointerEvent) => {
          onPointerDown(e)
          console.log("Draggable: onPointerDown")
          console.log("domRef", this.domNode)
          this.dispatch({ type: Drag.ActionType.DragStart })

          context.dispatch({
            type: Action.Type.DragStart,
            payload: {
              data: this.props.data,
              type: this.props.type,
              domNode: this.domNode,
              pointer: {
                x: e.clientX,
                y: e.clientY,
              },
            },
          })
        },
      }
    }
  }

  getChildProps = (context: DnD.Context): Drag.ChildProps => {
    return {
      ...getReaderChildProps(context),
      makeProps: this.makePropsFactory(context),
      isDragging: this.state.isDragging,
      domRef: this.domRef,
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
