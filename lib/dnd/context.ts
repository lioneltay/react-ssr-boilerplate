import { createContext } from "react"
import { DnD } from "./types"

const { Consumer, Provider } = createContext({} as DnD.Context)

export { Consumer, Provider }
