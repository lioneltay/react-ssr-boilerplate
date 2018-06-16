import * as React from "react"
import * as R from "ramda"
import { Consumer } from "./context"
import * as DnD from "./types/DnD"
import * as Read from "./types/Read"

export const getReaderChildProps = ({
  data,
  type,
  isDragging,
  pointer,
  domNode,
}: DnD.Context): Read.ChildProps => {
  return {
    isDragging: true,
    type,
    data,
    pointer,
    domNode,
  }
}

const x = R.pick(["data", "type", "isDragging"])

export default class Reader extends React.Component<Read.Props> {
  render() {
    return (
      <Consumer>
        {context => this.props.children(getReaderChildProps(context))}
      </Consumer>
    )
  }
}
