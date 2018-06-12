import * as React from "react"
import { renderToString } from "react-dom/server"
import { Handler } from "express"
import App from "../pages/index"
import HTML from "./HTML"
import { preloadAll, extractModules } from "async-component"
import { StaticRouter } from "react-router-dom"
import { ServerStyleSheet, StyleSheetManager } from "styled-components"

interface StaticRouterContext {
  action?: "REPLACE"
  location?: object
  url?: string
}

export default function serverRenderer({
  clientStats,
  serverStats,
  foo,
}: any): Handler {
  return async (req, res, next) => {
    await preloadAll()

    const context: StaticRouterContext = {}
    const styleSheet = new ServerStyleSheet()
    const body = renderToString(
      <StyleSheetManager sheet={styleSheet.instance}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </StyleSheetManager>
    )

    if (context.action === "REPLACE" && typeof context.url === "string") {
      return res.redirect(context.url)
    }

    const chunks = extractModules()

    const html = renderToString(
      <HTML
        chunkNames={chunks}
        styledComponentsData={{ styleElements: styleSheet.getStyleElement() }}
        clientStats={clientStats}
        serverStats={serverStats}
        body={body}
      />
    )

    res.send(`
      <!DOCTYPE html>
      ${html}
    `)
  }
}
