import * as React from "react"
import * as DnD from "./types/DnD"
import * as Action from "./types/Action"
import { Provider } from "./context"

export default class DnDProvider extends React.Component<{}, DnD.Context> {
  constructor(props: {}) {
    super(props)

    this.state = {
      data: null,
      type: null,
      isDragging: false,
      pointer: {
        x: 0,
        y: 0,
      },
      dispatch: this.dispatch,
      domNode: null,
    }
  }

  pointerUpHandler = () => {
    this.dispatch({
      type: Action.Type.DragEnd,
    })
  }

  pointerMoveHandler = (e: PointerEvent) => {
    this.dispatch({
      type: Action.Type.Move,
      payload: {
        x: e.clientX,
        y: e.clientY,
      },
    })
  }

  componentDidMount() {
    document.addEventListener("pointerup", this.pointerUpHandler)
    document.addEventListener("pointermove", this.pointerMoveHandler)
  }

  componentWillUnmount() {
    document.removeEventListener("pointerup", this.pointerUpHandler)
    document.removeEventListener("pointermove", this.pointerMoveHandler)
  }

  dispatch = (action: Action.Action): void => {
    this.setState(state => this.reducer(state, action))
  }

  reducer(state: DnD.Context, action: Action.Action): DnD.Context {
    switch (action.type) {
      case Action.Type.DragEnd: {
        return {
          ...state,
          isDragging: false,
          data: null,
          type: null,
          domNode: null,
        }
      }
      case Action.Type.DragStart: {
        return {
          ...state,
          isDragging: true,
          data: action.payload.data,
          type: action.payload.type,
          domNode: action.payload.domNode || null,
          pointer: {
            x: action.payload.pointer.x,
            y: action.payload.pointer.y,
          },
        }
      }
      case Action.Type.Move: {
        return {
          ...state,
          pointer: action.payload,
        }
      }
      case Action.Type.Drop: {
        return {
          ...state,
        }
      }
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
