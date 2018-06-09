import * as React from "react"
import { renderToString } from "react-dom/server"
import { Handler } from "express"
import App from "../pages/index"
import HTML from "./HTML"
import { preloadAll, extractChunks } from "lib/async-component"
import { StaticRouter } from "react-router-dom"

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
    const body = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )

    console.log(context)
    if (context.action === "REPLACE" && typeof context.url === "string") {
      return res.redirect(context.url)
    }

    const chunks = extractChunks()

    const html = renderToString(
      <HTML
        chunkFilenames={chunks}
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
