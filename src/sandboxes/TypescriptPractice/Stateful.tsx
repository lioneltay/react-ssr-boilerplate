import * as React from "react"

const initialState = {
  clicksCount: 0,
  bob: "hello",
}

type State = Readonly<typeof initialState>

type KeyOfState = keyof State

// Why are these different?
const doStuff = <K extends keyof State>(state: State, key: K) => state[key]
const doStuff = (state: State, key: KeyOfState) => state[key]

// The type of the result is different depending on the type implementation above!
doStuff({ clicksCount: 5, bob: 'nug' }, "clicksCount")

interface Props {}

const incrementCount = (prevState: State): Partial<State> => ({
  clicksCount: prevState.clicksCount + 1,
})
const decrementCount = (prevState: State, props: Props) => ({
  clicksCount: prevState.clicksCount - 1,
})

export default class Stateful extends React.Component<Props, State> {
  readonly state: State = initialState

  render() {
    return (
      <div>
        <h1>Stateful</h1>

        <button onClick={() => this.setState(incrementCount)}>Increment</button>
        <button onClick={() => this.setState(decrementCount)}>decrement</button>

        <div>Clicks: {this.state.clicksCount}</div>
      </div>
    )
  }
}
