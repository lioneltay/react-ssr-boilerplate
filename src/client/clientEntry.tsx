import * as React from "react"
import { hydrate } from "react-dom"
import App from "../pages/index"
import { preloadReady, extractChunks, preloadAll } from "lib/async-component"

preloadAll().then(() => {
  console.log(extractChunks())
  hydrate(React.createElement(App), document.getElementById("app"))
})
