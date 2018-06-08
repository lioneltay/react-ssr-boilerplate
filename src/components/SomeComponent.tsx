import * as React from "react"
import { asyncComponent } from "lib/async-component"

const SecondComponent = asyncComponent({
  loader: () => import("./SecondComponent"),
})

export default class SomeComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>SomeComponent</h1>
        <div>{this.props.children}</div>
        <SecondComponent />
      </div>
    )
  }
}
