import * as React from "react"
import * as R from "ramda"
import { Consumer } from "./context"
import * as DnD from "dnd/types"

interface Props {
  children: (data: ChildProps) => React.ReactElement<any>
}

export interface ChildProps {
  isDragging: boolean
  type: DnD.Type | null
  data: DnD.Data | null
  pointer: DnD.Pointer
  domNode: Element | null
}

export const getReaderChildProps = ({
  data,
  type,
  isDragging,
  pointer,
  domNode,
}: DnD.Context): ChildProps => {
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
