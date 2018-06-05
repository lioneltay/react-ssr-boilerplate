import * as React from "react"
import { renderToString } from "react-dom/server"
import { Handler } from "express"
import App from "../pages/index"
import HTML from "./HTML"

export default function serverRenderer({
  clientStats,
  serverStats,
  foo,
}: any): Handler {
  return (req, res, next) => {
    const html = renderToString(
      <HTML>
        <App />
      </HTML>
    )

    res.send(`
      <!DOCTYPE html>
      ${html}
    `)
  }
}
