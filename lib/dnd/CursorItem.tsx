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
        {(context) => {
          if (!context.isDragging) {
            context
            return null
          }

          context
          return null

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
