import * as React from "react"
import { asyncComponent } from "lib/async-component"
import SomeComponent from "./SomeComponent"

console.log("StaticComponent")

const AsyncSomeComponent = asyncComponent({
  loader: () =>
    import(/* webpackChunkName: "2SomeComponent" */ "components/SomeComponent").catch(
      err => {
        return console.log("why", err) as never
      }
    ),
  chunkFilename: "SomeComponent",
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
