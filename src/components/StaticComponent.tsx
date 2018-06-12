import * as React from "react"
import { asyncComponent } from "async-component"
import SomeComponent from "./SomeComponent"

const AsyncSomeComponent = asyncComponent({
  loader: () => import("components/SomeComponent"),
})

export default class StaticComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>StaticComponent</h1>
        <SomeComponent />
      </div>
    )
  }
}
