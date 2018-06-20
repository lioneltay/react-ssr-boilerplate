import * as React from "react"

import Stateless from "./Stateless"
import Stateful from "./Stateful"

export default class TypescriptPractice1 extends React.Component {
  render() {
    return (
      <div>
        <Stateful />

        <Stateless />
      </div>
    )
  }
}
