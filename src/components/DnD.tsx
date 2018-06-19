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

const initialState = {
  total: 0,
}

type State = Readonly<typeof initialState>

const Item = ({ type, data }) => (
  <Draggable type={type} data={data}>
    {({ onPointerDown, domRef, isDragging }) => (
      <Box onPointerDown={onPointerDown} innerRef={domRef}>
        <div>{data.name}</div>
        <div>{isDragging ? "Dragging" : "Not Dragging"}</div>
      </Box>
    )}
  </Draggable>
)

const Basket = ({ type, onDrop }) => (
  <Dropzone type={type} onDrop={onDrop}>
    {({ isDragging, type: dragType, domRef, onPointerUp }) => (
      <DropBox
        innerRef={domRef}
        highlighted={isDragging && dragType === type}
        onPointerUp={onPointerUp}
      >
        {type} Bag
      </DropBox>
    )}
  </Dropzone>
)

export default class DnD extends React.Component<{}, State> {
  readonly state: State = initialState

  render() {
    return (
      <Provider>
        <div>
          <h1>DnD Playground!!!</h1>

          <div>Total: {this.state.total}</div>

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
            <Item type="fruit" data={{ name: "Apple", price: 1 }} />
            <Item type="meat" data={{ name: "Steak", price: 3 }} />

            <Basket
              type="fruit"
              onDrop={({ data, type }) => {
                console.log(data, type)
                this.setState(state => ({ total: state.total + data.price }))
              }}
            />

            <Basket
              type="meat"
              onDrop={({ data, type }) => {
                console.log(data, type)
                this.setState(state => ({ total: state.total + data.price }))
              }}
            />
          </Container>

          <div style={{ height: "100vh" }} />
        </div>
      </Provider>
    )
  }
}
