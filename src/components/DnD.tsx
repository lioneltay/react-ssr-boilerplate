import * as React from "react"

import { Draggable, Dropzone, Reader, Provider, CursorItem } from "dnd"

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
  flex-direction: column;
  cursor: pointer;
`

const DropBox = styled.div`
  border: 1px solid black;
  margin: 15px;
  user-select: none;
  height: 150px;
  width: 150px;
  background-color: ${props => (props.highlighted ? "green" : "yellowgreen")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default class DnD extends React.Component {
  render() {
    return (
      <Provider>
        <div>
          <h1>So fricken fast</h1>

          <CursorItem />

          <Container>
            <Draggable type="Item" data={{ id: 1 }}>
              {({ makeProps, isDragging }) => (
                <Box
                  {...makeProps({
                    onPointerDown: () =>
                      console.log("onPointerDown: cool beans"),
                  })}
                >
                  <div>Item</div>
                  <div>{isDragging ? "Dragging" : "Not Dragging"}</div>
                </Box>
              )}
            </Draggable>

            <Draggable type="NotItem" data={{ id: 2 }}>
              {({ makeProps, isDragging, domRef }) => (
                <Box
                  innerRef={domRef}
                  {...makeProps({
                    onPointerDown: () =>
                      console.log("onPointerDown: cool beans"),
                  })}
                >
                  <div>NotItem</div>
                  <div>{isDragging ? "Dragging" : "Not Dragging"}</div>
                </Box>
              )}
            </Draggable>

            <Dropzone
              type="Item"
              onDrop={({ data, type }) => {
                return null
              }}
            >
              {({ isDragging, data, type, isOver, domRef }) => (
                <DropBox
                  innerRef={domRef}
                  highlighted={isDragging && type === "Item"}
                >
                  <div>Item</div>
                  <pre>{JSON.stringify({ isOver, isDragging }, null, 2)}</pre>
                </DropBox>
              )}
            </Dropzone>

            <Dropzone
              type="Item"
              onDrop={({ data, type }) => {
                return null
              }}
            >
              {({ isDragging, data, type, isOver, domRef }) => (
                <DropBox
                  innerRef={domRef}
                  highlighted={isOver && isDragging && type === "Item"}
                >
                  <div>Item Hover</div>
                  <pre>{JSON.stringify({ isOver, isDragging }, null, 2)}</pre>
                </DropBox>
              )}
            </Dropzone>

            <Dropzone
              type="NotItem"
              onDragEnter={() => {}}
              onDragLeave={() => {}}
              onDragOver={() => {
                return false
              }}
            >
              {({ isDragging, type, data }) => (
                <DropBox highlighted={isDragging && type === "NotItem"}>
                  NotItem
                </DropBox>
              )}
            </Dropzone>

            <Dropzone
              type="NotItem"
              onDragEnter={() => {}}
              onDragLeave={() => {}}
              onDragOver={() => {
                return false
              }}
            >
              {({ isDragging, type, data, isOver, domRef }) => (
                <DropBox
                  innerRef={domRef}
                  highlighted={isOver && isDragging && type === "NotItem"}
                >
                  NotItem Hover
                </DropBox>
              )}
            </Dropzone>
          </Container>

          <Reader>
            {({ isDragging, pointer }) => {
              return (
                <pre>{JSON.stringify({ isDragging, pointer }, null, 2)}</pre>
              )
            }}
          </Reader>
        </div>
      </Provider>
    )
  }
}
