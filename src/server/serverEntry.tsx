import * as React from "react"
import { renderToString } from "react-dom/server"
import { Handler } from "express"
import App from "../pages/index"
import HTML from "./HTML"
import { preloadAll, extractChunks } from "lib/async-component"

export default function serverRenderer({
  clientStats,
  serverStats,
  foo,
}: any): Handler {
  return async (req, res, next) => {
    await preloadAll()

    const html = renderToString(
      <HTML chunkFilenames={extractChunks()}>
        <App />
      </HTML>
    )

    res.send(`
      <!DOCTYPE html>
      ${html}
    `)
  }
}
