const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotServerMiddleware = require("./build-utils/webpack-hot-server-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const multiConfig = require("./webpack.config.js")
const app = express()

app.use("/public", express.static("./public"))

const compiler = webpack(multiConfig)
const clientConfig = multiConfig.find(config => config.name === "client")
const clientCompiler = compiler.compilers.find(
  compiler => compiler.name === "client"
)

app.use("/build", express.static("./dist"))

const publicPath = clientConfig.output.publicPath
app.use(webpackDevMiddleware(compiler, { logLevel: "error", publicPath }))

app.use(webpackHotMiddleware(clientCompiler))

app.use(webpackHotServerMiddleware(compiler))

// webpackHotServerMiddleware.doItForMePls(app, multiConfig)


app.use("*", (err, req, res) => {
  console.log("error", err)
  res.send(err)
})

app.listen(6060, () => {
  console.log("Server started: http://localhost:6060/")
})
