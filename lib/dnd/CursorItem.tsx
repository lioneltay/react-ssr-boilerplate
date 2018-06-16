import * as React from "react"

import { Consumer } from "./context"

import styled from "styled-components"

const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  background: green;
`

export default class CursorItem extends React.Component {
  render() {
    return (
      <Consumer>
        {({
          pointer: { x, y },
          dragElement: { isDragging, offsetX, offsetY, domNode },
        }) => {
          if (!domNode) {
            return null
          }

          const box = domNode.getBoundingClientRect()

          return (
            <Box
              style={{
                width: box.width,
                height: box.height,
                transform: `translate(${x}px, ${y}px)`,
              }}
            />
          )
        }}
      </Consumer>
    )
  }
}
