import * as React from "react"
import { asyncComponent } from "lib/async-component"

console.log("SomeComponent")

const SecondComponent = asyncComponent({
  loader: () =>
    import(/* webpackChunkName: "SecondComponent" */ "./SecondComponent"),
  chunkFilename: "SecondComponent",
})

export default class SomeComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>SomeComponent Edited</h1>
        <div>{this.props.children}</div>
        <SecondComponent />
      </div>
    )
  }
}
