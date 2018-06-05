import * as React from "react"
import { hydrate } from "react-dom"
import App from "../pages/index"

hydrate(React.createElement(App), document.getElementById("app"))
