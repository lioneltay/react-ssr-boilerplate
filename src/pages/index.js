import * as React from "react"
import { hot } from "react-hot-loader"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0,
    }
  }

  render() {
    return (
      <div>
        <h1>Cool Awesome! {this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    )
  }
}

export default hot(module)(App)
