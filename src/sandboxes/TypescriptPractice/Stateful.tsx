import * as React from "react"
import { withDefaultProps } from "./withDefaultProps"

const initialState = {
  count: 0,
  mounted: false,
}

type State = Readonly<typeof initialState>

interface DefaultButtonProps {
  color: string
}

type ButtonProps = DefaultButtonProps & {
  onClick: (ev: React.MouseEvent<HTMLElement>) => void
  label: string
  color?: string
}

const Button: React.SFC<ButtonProps> = ({ onClick, label, color }) => (
  <button style={{ color }} onClick={onClick}>
    {label}: {color.toUpperCase()}
  </button>
)

// const ButtonWithDefaults = withDefaultProps({ color: "red", nugget: 3 }, Button)
const ButtonWithDefaults = withDefaultProps({ nugget: 3, color: "red" }, Button)

export default class Stateful extends React.Component {
  render() {
    return (
      <div>
        <h1>Stateful</h1>

        <Button label="Hello There" onClick={() => console.log("hello")} />
        <ButtonWithDefaults
          label="Woot it works!"
          onClick={() => console.log("hello")}
        />
      </div>
    )
  }
}
