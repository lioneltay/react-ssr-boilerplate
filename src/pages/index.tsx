import * as React from "react"
import { hot } from "react-hot-loader"
import { asyncComponent } from "lib/async-component"
// import SomeComponent from "components/SomeComponent"
// import StaticComponent from "components/StaticComponent"

const AsyncSomeComponent = asyncComponent({
  loader: () =>
    import(/* webpackChunkName: "SomeComponent" */ "components/StaticComponent").catch(
      err => {
        return console.log("why", err) as never
      }
    ),
  chunkName: "SomeComponent",
})

const AsyncStaticComponent = asyncComponent({
  loader: () =>
    import(/* webpackChunkName: "StaticComponent" */ "components/SomeComponent").catch(
      err => {
        return console.log("why", err) as never
      }
    ),
  chunkName: "StaticComponent",
})

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
        <h1>This Is So Awesome! {this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>

        {/* <SomeComponent /> */}
        <AsyncSomeComponent>
          <div>Hello There</div>
        </AsyncSomeComponent>

        <hr />

        {/* <StaticComponent /> */}
      </div>
    )
  }
}

export default hot(module)(App)
