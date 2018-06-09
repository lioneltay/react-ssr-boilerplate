import * as React from "react"

interface HTMLProps {
  // children: React.ReactNode
  chunkFilenames: string[]
  clientStats: any
  serverStats: any
  body: string
}

const scripts = (stats: any, chunkNames: string[]): string[] => {
  function script(stats: any, chunkName: string) {
    const outputPath = stats.outputPath
    const assetsByChunkName = stats.assetsByChunkName

    const mainChunk = assetsByChunkName[chunkName]
    const filename: string = Array.isArray(mainChunk)
      ? mainChunk.find(filename => /.js$/.test(filename))
      : mainChunk

    // TODO check that outputPath ends with '/'
    const pathname = `${outputPath}${filename}`
    return pathname
  }

  return chunkNames.map(chunkName => script(stats, chunkName))
}

export default class HTML extends React.Component<HTMLProps> {
  render() {
    const outputPath = this.props.clientStats.outputPath

    console.log("HTML", outputPath)

    return (
      <html>
        <head>
          <title>SSR App</title>
        </head>

        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__REQUIRED_CHUNK_NAMES__ = ${JSON.stringify(
                this.props.chunkFilenames
              )}`,
            }}
          />

          <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />

          {/* <pre>{JSON.stringify(this.props.clientStats, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(this.props.serverStats, null, 2)}</pre> */}

          {scripts(this.props.clientStats, this.props.chunkFilenames).map(
            src => <script src={src} />
          )}
          <script src={`${outputPath}client.js`} />
        </body>
      </html>
    )
  }
}
