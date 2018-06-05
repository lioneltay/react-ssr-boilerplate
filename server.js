const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotServerMiddleware = require("webpack-hot-server-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const config = require("./webpack.config.js")
const app = express()

const compiler = webpack(config)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/",
    noInfo: true,
  })
)

app.use(
  webpackHotMiddleware(
    compiler.compilers.find(compiler => compiler.name === "client")
  )
)

app.use(
  webpackHotServerMiddleware(compiler, {
    serverRendererOptions: {
      foo: "Bar",
    },
  })
)

app.listen(6060, () => {
  console.log("Server started: http://localhost:6060/")
})
