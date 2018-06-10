import * as React from "react"
import * as path from 'path'

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
    const pathname = path.resolve(outputPath, filename)
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
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/public/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/public/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/public/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
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
