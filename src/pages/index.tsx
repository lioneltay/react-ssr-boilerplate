import * as React from "react"
import { hot } from "react-hot-loader"
import TypescriptPractice1 from "sandboxes/TypescriptPractice"

interface AppProps {}

interface AppState {
  count: number
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.state = {
      count: 0,
    }
  }

  render() {
    return (
      <div>
        <TypescriptPractice1 />
      </div>
    )
  }
}

export default hot(module)(App)
