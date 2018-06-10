import * as React from "react"
import { hydrate } from "react-dom"
import App from "../pages/index"
import { preloadReady, extractModules, preloadAll } from "async-component"
import { BrowserRouter } from "react-router-dom"

preloadReady().then(() => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("app")
  )
})
