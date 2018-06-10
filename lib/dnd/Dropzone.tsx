import * as React from "react"
import { DnD } from "./types"
import { Consumer } from "./context"

interface DropzoneProps {
  type: DnD.Type
  children: (context: any) => React.ReactElement<any>
}

export default class Dropzone extends React.Component<DropzoneProps> {
  render() {
    return <Consumer>{context => this.props.children(context)}</Consumer>
  }
}
