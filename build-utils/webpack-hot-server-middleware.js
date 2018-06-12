const requireFromString = require("require-from-string")
const path = require("path")
const { mergeDeepRight } = require("ramda")

function requireFromFileString(file) {
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

const webpackHotServerMiddleware = (multicompiler, _options = {}) => {
  const options = {
    entryChunkName: "main",
    server: {
      name: "server",
    },
    client: {
      name: "client",
    },
    ..._options,
  }

  // const clientCompiler = findCompiler(multicompiler, "client")
  const serverCompiler = findCompiler(multicompiler, "server")

  const filesystem = serverCompiler.outputFileSystem
  let latestMiddleware

  const doneHandler = multiStats => {
    const serverStats = findStats(multiStats, options.server.name)[0].toJson()
    const clientStats = findStats(multiStats, options.client.name)[0].toJson()

    const outputPath = serverStats.outputPath
    const assetsByChunkName = serverStats.assetsByChunkName

    const mainChunk = assetsByChunkName[options.entryChunkName]
    const filename = Array.isArray(mainChunk)
      ? mainChunk.find(filename => /.js$/.test(filename))
      : mainChunk

    const pathname = path.resolve(outputPath, filename)
    const file = filesystem.readFileSync(pathname, "utf8")

    latestMiddleware = requireFromFileString(file)({ clientStats, serverStats })
  }

  // Assumes the compiler is already being watched, just hook into the done event
  multicompiler.hooks.done.tap("WebpackHotServerMiddleware", doneHandler)

  return (req, res, next) => {
    latestMiddleware(req, res, next)
  }
}

module.exports = webpackHotServerMiddleware
