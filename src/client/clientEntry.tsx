import * as React from "react"
import { hydrate } from "react-dom"
import App from "../pages/index"
import { preloadReady } from "lib/async-component"

preloadReady().then(() => {
  hydrate(React.createElement(App), document.getElementById("app"))
})
