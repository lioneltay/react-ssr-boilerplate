const fs = require("fs")
const path = require("path")
const url = require("url")

function buildManifest(compiler, compilation) {
  const context = compiler.options.context
  const manifest = {}

  compilation.chunks.forEach(chunk => {
    chunk.files.forEach(file => {
      chunk.forEachModule(mod => {
        const id = mod.id
        const name =
          typeof mod.libIdent === "function"
            ? mod.libIdent({ context })
            : null
        const publicPath = url.resolve(
          compilation.outputOptions.publicPath || "",
          file
        )

        let currentModule = mod
        if (mod.constructor.name === "ConcatenatedModule") {
          currentModule = mod.rootModule
        }
        if (!manifest[currentModule.rawRequest]) {
          manifest[currentModule.rawRequest] = []
        }

        manifest[currentModule.rawRequest].push({ id, name, file, publicPath })
      })
    })
  })

  return manifest
}

class AsyncComponentPlugin {
  constructor(opts = {}) {
    this.filename = opts.filename
  }

  apply(compiler) {
    const handler = async compilation => {
      const manifest = buildManifest(compiler, compilation)
      var json = JSON.stringify(manifest, null, 2)
      const outputDirectory = path.dirname(this.filename)
      try {
        fs.mkdirSync(outputDirectory)
      } catch (err) {
        if (err.code !== "EEXIST") {
          throw err
        }
      }
      fs.writeFileSync(this.filename, json)
      return
    }

    compiler.hooks.emit.tapPromise("AsyncComponentPlugin", handler)
  }
}

function getBundles(manifest, moduleIds) {
  return moduleIds.reduce((bundles, moduleId) => {
    return bundles.concat(manifest[moduleId])
  }, [])
}

exports.AsyncComponentPlugin = AsyncComponentPlugin
exports.getBundles = getBundles
