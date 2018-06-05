import * as React from "react"
import { hot } from "react-hot-loader"

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
        <h1>This Is Awesome! {this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    )
  }
}

export default hot(module)(App)
