import { createContext } from "react"
import * as DnD from "./types/DnD"

const { Consumer, Provider } = createContext({} as DnD.Context)

export { Consumer, Provider }
