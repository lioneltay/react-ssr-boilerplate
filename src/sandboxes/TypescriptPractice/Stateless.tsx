import * as React from "react"

interface Props {
  onClick(e: React.MouseEvent<HTMLElement>): void
  children: React.ReactNode
}

const Button: React.SFC<Props> = ({ onClick: handleClick, children }) => (
  <button onClick={handleClick}>{children}</button>
)

export default class StatefulStateless extends React.Component {
  render() {
    return (
      <div>
        <h1>Stateless</h1>

        <Button onClick={() => console.log("cow")}>
          <div>Button Children Here</div>
        </Button>
      </div>
    )
  }
}
