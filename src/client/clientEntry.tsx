import * as React from "react"
import { hydrate } from "react-dom"
import App from "../pages/index"
import { preloadReady, extractChunks, preloadAll } from "lib/async-component"
import { BrowserRouter } from "react-router-dom"

preloadReady().then(() => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("app")
  )
})
