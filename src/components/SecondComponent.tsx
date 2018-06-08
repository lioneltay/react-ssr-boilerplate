import * as React from "react"
import { asyncComponent } from "lib/async-component"

const ThirdComponent = asyncComponent({
  loader: () => import("./ThirdComponent"),
})

export default class SecondComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>SecondComponent</h1>
        <ThirdComponent />
      </div>
    )
  }
}
