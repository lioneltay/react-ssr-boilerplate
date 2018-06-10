import * as React from "react"
import { DnD } from "./types"
import { Provider } from "./context"

export default class DnDProvider extends React.Component<{}, DnD.Context> {
  constructor(props: {}) {
    super(props)

    this.state = {
      dragData: null,
      dragType: null,
      isDragging: false,
      beginDrag: this.beginDrag,
      endDrag: this.endDrag,
      handleMove: this.handleMove,
    }
  }

  componentDidMount() {
    document.addEventListener("pointerup", this.endDrag)
  }

  componentWillUnmount() {
    document.removeEventListener("pointerup", this.endDrag)
  }

  beginDrag = ({
    dragData,
    dragType,
  }: {
    dragData: object
    dragType: DnD.Type
  }) => {
    this.setState({ dragData, dragType, isDragging: true })
  }

  endDrag = () => {
    this.setState({ dragData: null, dragType: null, isDragging: false })
  }

  handleMove = () => {}

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
