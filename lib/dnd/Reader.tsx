import * as React from "react"
import * as R from "ramda"
import { Consumer } from "./context"
import { DnD } from "./types"

interface ReaderProps {
  children: (partialContext: Partial<DnD.Context>) => React.ReactElement<any>
}

export default class DnDReader extends React.Component<ReaderProps> {
  render() {
    return (
      <Consumer>
        {context =>
          this.props.children(R.pick(["dragData", "dragType"], context))
        }
      </Consumer>
    )
  }
}
