import { createContext } from "react"
import * as DnD from "dnd/types"

const { Consumer, Provider } = createContext({} as DnD.Context)

export { Consumer, Provider }
