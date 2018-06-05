import * as React from "react"
import { hydrate } from "react-dom"
import App from "../pages/index"
import { preloadAll } from "lib/async-component"

preloadAll().then(() => {
  hydrate(React.createElement(App), document.getElementById("app"))
})
