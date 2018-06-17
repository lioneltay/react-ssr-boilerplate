import * as React from "react"

import { Draggable, Dropzone, Reader, Provider, CursorElement } from "dnd"

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

const CursorBox = styled.div`
  background-color: blue;
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
          <h1>DnD Playground!!!</h1>

          <CursorElement>
            {() => {
              return (
                <CursorBox style={{ width: 100, height: "100%" }}>
                  CursorElement Rendered
                </CursorBox>
              )
            }}
          </CursorElement>

          <Container>
            <Draggable type="fruit" data={{ name: "Apple" }}>
              {({ makeProps, domRef }) => (
                <Box {...makeProps({})} innerRef={domRef}>
                  <div>Apple</div>
                </Box>
              )}
            </Draggable>

            <Draggable type="fruit" data={{ name: "Orange" }}>
              {({ makeProps, domRef }) => (
                <Box {...makeProps({})} innerRef={domRef}>
                  <div>Orange</div>
                </Box>
              )}
            </Draggable>

            <Draggable type="meat" data={{ name: "Steak" }}>
              {({ makeProps, domRef }) => (
                <Box {...makeProps({})} innerRef={domRef}>
                  <div>Steak</div>
                </Box>
              )}
            </Draggable>

            <Draggable type="meat" data={{ name: "Pork" }}>
              {({ makeProps, domRef }) => (
                <Box {...makeProps({})} innerRef={domRef}>
                  <div>Pork</div>
                </Box>
              )}
            </Draggable>

            <Dropzone
              type="fruit"
              onDragEnter={() => {}}
              onDragLeave={() => {}}
              onDragOver={() => {
                return false
              }}
              onDrop={({ data, type }) => {
                console.log(data, type)
              }}
            >
              {({ isDragging, type, data, isOver, domRef, onPointerUp }) => (
                <DropBox
                  innerRef={domRef}
                  highlighted={isDragging && type === "fruit"}
                  onPointerUp={onPointerUp}
                >
                  Fruit Bag
                </DropBox>
              )}
            </Dropzone>

            <Dropzone
              type="meat"
              onDragEnter={() => {}}
              onDragLeave={() => {}}
              onDragOver={() => {
                return false
              }}
              onDrop={({ data, type }) => {
                console.log(data, type)
              }}
            >
              {({ isDragging, type, data, isOver, domRef, onPointerUp }) => (
                <DropBox
                  innerRef={domRef}
                  highlighted={isDragging && type === "meat"}
                  onPointerUp={onPointerUp}
                >
                  Meat Bag
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

          <div style={{ height: "100vh" }} />
        </div>
      </Provider>
    )
  }
}
