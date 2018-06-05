import * as React from "react"

export default class SomeComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>SomeComponent</h1>
        <div>{this.props.children}</div>
      </div>
    )
  }
}
