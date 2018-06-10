const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const requireFromString = require("require-from-string")
const webpack = require("webpack")
const path = require("path")

function memoryRequire(file) {
  const requiredModule = requireFromString(file)

  return typeof requiredModule === "object" && requiredModule.__esModule
    ? requiredModule.default
    : requiredModule
}

function findStats(multiStats, name) {
  return multiStats.stats.filter(
    stats => stats.compilation.name.indexOf(name) === 0
  )
}

function findCompiler(multicompiler, name) {
  return multicompiler.compilers.find(compiler => compiler.name === name)
}

const webpackHotServerMiddleware = (
  multicompiler,
  options = {
    entryChunkName: "main",
  }
) => {
  // const clientCompiler = findCompiler(multicompiler, "client")
  const serverCompiler = findCompiler(multicompiler, "server")

  const filesystem = serverCompiler.outputFileSystem
  let latestMiddleware

  const doneHandler = multiStats => {
    const serverStats = findStats(multiStats, "server")[0].toJson()
    const clientStats = findStats(multiStats, "client")[0].toJson()

    const outputPath = serverStats.outputPath
    const assetsByChunkName = serverStats.assetsByChunkName

    const mainChunk = assetsByChunkName[options.entryChunkName]
    const filename = Array.isArray(mainChunk)
      ? mainChunk.find(filename => /.js$/.test(filename))
      : mainChunk

    const pathname = path.resolve(outputPath, filename)
    const file = filesystem.readFileSync(pathname, "utf8")

    latestMiddleware = memoryRequire(file)({ clientStats, serverStats })
  }

  // Assumes the compiler is already being watched, just hook into the done event
  multicompiler.hooks.done.tap("WebpackHotServerMiddleware", doneHandler)

  return (req, res, next) => {
    latestMiddleware(req, res, next)
  }
}

// A quick way to get started
webpackHotServerMiddleware.doItForMePls = (app, multiConfig) => {
  const compiler = webpack(multiConfig)
  const clientCompiler = compiler.compilers.find(
    compiler => compiler.name === "client"
  )

  app.use(webpackDevMiddleware(compiler))

  app.use(webpackHotMiddleware(clientCompiler))

  app.use(webpackHotServerMiddleware(compiler))
}

module.exports = webpackHotServerMiddleware
