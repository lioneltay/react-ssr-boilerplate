import * as React from "react"

import { Draggable, Dropzone, Reader, Provider } from "dnd"

import styled from "styled-components"

const Box = styled.div`
  border: 1px solid black;
  margin: 15px;
  user-select: none;
  height: 150px;
  width: 150px;
  background-color: papayawhip;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const DropBox = styled.div`
  border: 1px solid black;
  margin: 15px;
  user-select: none;
  height: 150px;
  width: 150px;
  background-color: yellowgreen;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default class DnD extends React.Component {
  render() {
    return (
      <Provider>
        <div>
          <h1>DnD Playground</h1>

          <Draggable type="Item" data={{ id: "cool beans" }}>
            {({ makeProps }) => (
              <Box
                {...makeProps({
                  onPointerDown: () => console.log("onPointerDown: cool beans"),
                })}
              >
                Draggable
              </Box>
            )}
          </Draggable>

          <Dropzone type="Item">
            {({ name }) => <DropBox>Dropzone: for Item</DropBox>}
          </Dropzone>

          <Dropzone type="NotItem">
            {({ name }) => <DropBox>Dropzone: Not for Item</DropBox>}
          </Dropzone>

          <Reader>
            {context => <pre>{JSON.stringify(context, null, 2)}</pre>}
          </Reader>
        </div>
      </Provider>
    )
  }
}
