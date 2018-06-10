import * as R from "ramda"
import * as path from "path"

interface Report {
  outputPath: string
  importMapping: ImportMapping
}

interface ChunkMapping {
  [chunkId: string]: WebpackChunk
}

interface ImportMapping {
  [userRequest: string]: string[]
}

interface WebpackChunk {
  id: string | number
  files: string[]
}

interface WebpackModule {
  chunks: (string | number)[]
  reasons: Reason[]
}

interface Reason {
  userRequest: string
}

function extractImportPathChunkNamesMapping(stats: any): Report {
  const chunkMapping: ChunkMapping = stats.chunks.reduce(
    (mapping: ChunkMapping, chunk: WebpackChunk) => {
      mapping[chunk.id] = chunk
      return mapping
    },
    {}
  )

  const importMapping: ImportMapping = {}

  stats.modules.forEach((mod: WebpackModule) => {
    mod.reasons.forEach((reason: Reason) => {
      mod.chunks.forEach(chunkId => {
        const userRequest = reason.userRequest
        if (!importMapping[userRequest]) {
          importMapping[userRequest] = []
        }

        importMapping[userRequest] = importMapping[userRequest].concat(
          chunkMapping[chunkId].files
        )
      })
    })
  })

  // Remove any duplicate chunk names
  Object.keys(importMapping).forEach(key => {
    importMapping[key] = R.uniq(importMapping[key])
  })

  return { outputPath: stats.outputPath, importMapping }
}

const flatten: <T>(arr: T[][]) => T[] = arr =>
  arr.reduce((items, item) => items.concat(item), [])

function scriptSrcs(imports: string[], stats: any): string[] {
  const report = extractImportPathChunkNamesMapping(stats)

  const srcs = imports.map(userRequest =>
    report.importMapping[userRequest].map(filename =>
      path.resolve(report.outputPath, filename)
    )
  )

  return R.uniq(flatten(srcs))
}

export { scriptSrcs }
