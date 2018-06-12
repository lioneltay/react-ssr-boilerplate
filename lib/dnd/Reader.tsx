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
}: DnD.Context): Read.ChildProps => {
  return isDragging
    ? {
        isDragging: true,
        type,
        data,
        pointer,
      }
    : {
        isDragging: false,
        type: null,
        data: null,
        pointer,
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
