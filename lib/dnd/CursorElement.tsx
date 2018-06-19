import * as React from "react"
import * as DnD from "dnd/types"

import { Consumer } from "./context"

import styled from "styled-components"

const Box = styled.div`
  position: fixed;
  border: 1px solid grey;
  pointer-events: none;
`

interface CursorItemProps {
  children: (context: DnD.ActiveContext) => React.ReactElement<any>
}

export default class CursorItem extends React.Component<CursorItemProps> {
  render() {
    return (
      <Consumer>
        {context => {
          if (!context.isDragging) {
            context
            return null
          }

          const { dragInfo } = context

          if (!dragInfo.domRefAttached) {
            return <div>No Drag Info domNode</div>
          }

          return (
            <Box
              style={{
                width: dragInfo.width,
                height: dragInfo.height,
                top: dragInfo.offsetY,
                left: dragInfo.offsetX,
                transform: `translate(${context.pointer.x}px, ${
                  context.pointer.y
                }px)`,
              }}
            >
              {this.props.children(context)}
            </Box>
          )
        }}
      </Consumer>
    )
  }
}
