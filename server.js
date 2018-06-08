const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotServerMiddleware = require("webpack-hot-server-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const config = require("./webpack.config.js")
const app = express()

const compiler = webpack(config)
const clientConfig = config.find(config => config.name === "client")

app.use(
  webpackDevMiddleware(compiler, {
    // noInfo: true,
  })
)

app.use(
  webpackHotMiddleware(
    compiler.compilers.find(compiler => compiler.name === "client")
  )
)

app.use(webpackHotServerMiddleware(compiler))

app.use("*", (err, req, res, next) => {
  console.log("error", err)
  res.send(err)
})

app.listen(6060, () => {
  console.log("Server started: http://localhost:6060/")
})
