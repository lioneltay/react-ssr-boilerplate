import * as React from "react"
import { hot } from "react-hot-loader"
import { asyncComponent } from "async-component"
// import SomeComponent from "components/SomeComponent"
// import StaticComponent from "components/StaticComponent"
import { Route, Link, Redirect } from "react-router-dom"

const AsyncAboutPage = asyncComponent({ loader: () => import("./about") })
const AsyncHomePage = asyncComponent({ loader: () => import("./home") })
const AsyncDeniedPage = asyncComponent({ loader: () => import("./denied") })
const AsyncSomeComponent = asyncComponent({
  loader: () => import("components/StaticComponent"),
})
const AsyncStaticComponent = asyncComponent({
  loader: () => import("components/SomeComponent"),
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/forbidden">Forbidden</Link>
        </div>

        <hr />

        <Route path="/home" component={AsyncHomePage} />
        <Route path="/about" component={AsyncAboutPage} />
        <Route path="/denied" component={AsyncDeniedPage} />
        <Route path="/forbidden" render={() => <Redirect to="/denied" />} />

        <hr />

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
