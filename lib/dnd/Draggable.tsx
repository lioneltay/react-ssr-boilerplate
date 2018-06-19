import * as React from "react"
import * as DnD from "dnd/types"
import * as Action from "./types/Action"
import { Consumer } from "./context"

const noop = () => {}

interface Props {
  children: (data: ChildProps) => React.ReactElement<any>
  type: DnD.Type
  data: DnD.Data
}

interface ChildProps {
  isDragging: boolean
  onPointerDown: (e: PointerEvent) => void
  domRef: (el: Element) => void
}

enum ActionType {
  DragStart,
  DragEnd,
}

type Action = DragStartAction | DragEndAction

interface DragStartAction {
  type: ActionType.DragStart
}

interface DragEndAction {
  type: ActionType.DragEnd
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.DragStart: {
      return {
        ...state,
        isDragging: true,
      }
    }
    case ActionType.DragEnd: {
      return {
        ...state,
        isDragging: false,
      }
    }
  }
}

const initialState = {
  isDragging: false,
}

type State = Readonly<typeof initialState>

export default class Draggable extends React.Component<Props, State> {
  state: State = initialState
  domNode: Element | null = null

  domRef = (el: Element) => {
    this.domNode = el
  }

  dispatch = (action: Action) => this.setState(state => reducer(state, action))

  pointerUpHandler = () => this.dispatch({ type: ActionType.DragEnd })

  componentDidMount() {
    document.addEventListener("pointerup", this.pointerUpHandler)
  }

  componentWillUnmount() {
    document.removeEventListener("pointerup", this.pointerUpHandler)
  }

  getChildProps = (context: DnD.Context): ChildProps => {
    return {
      onPointerDown: (e: PointerEvent) => {
        this.dispatch({ type: ActionType.DragStart })

        const { clientX, clientY } = e

        const box =
          e.currentTarget instanceof Element
            ? e.currentTarget.getBoundingClientRect()
            : { top: 0, left: 0 }

        context.dispatch({
          type: Action.Type.DragStart,
          payload: {
            data: this.props.data,
            type: this.props.type,
            domNode: this.domNode,
            pointer: {
              x: e.clientX,
              y: e.clientY,
              offsetX: box.left - clientX,
              offsetY: box.top - clientY,
            },
          },
        })
      },
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
