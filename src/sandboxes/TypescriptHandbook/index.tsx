import * as React from "react"

export default class Handbook extends React.Component {
  render() {
    return (
      <div>
        <h1>Handbook</h1>
      </div>
    )
  }
}

interface Person {
  name: string
  email: string
  5: number
}



type MyPartial<T> = { readonly [K in keyof T]?: T[K] }

type PartialPerson = MyPartial<Person>

type Key = keyof Person

type Cow = Extract<Person, string>

type ExtractPerson = Extract<Person, "email">

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type PP = Omit<Person, 'email'>

type Test = Exclude<"hello" | "there", "hello">

const ep: ExtractPerson = {
  name: "bob",
  email: "bob@gmail.com",
  5: 5,
}

const person: Person = {
  name: 'bob',
  email: 'bob@gmail.com',
  5: 5,
}

