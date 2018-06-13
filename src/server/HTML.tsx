import * as React from "react"
import * as path from "path"
import { scriptSrcs } from "async-component"

interface HTMLProps {
  // children: React.ReactNode
  chunkNames: string[]
  clientStats: any
  serverStats: any
  body: string
  styledComponentsData: {
    styleElements: React.ReactElement<any>[]
  }
}

const scripts = (stats: any, chunkNames: string[]): string[] => {
  function script(stats: any, chunkName: string) {
    const outputPath = stats.outputPath
    const assetsByChunkName = stats.assetsByChunkName

    const mainChunk = assetsByChunkName[chunkName]
    const filename: string = Array.isArray(mainChunk)
      ? mainChunk.find(filename => /.js$/.test(filename))
      : mainChunk

    const pathname = path.resolve(outputPath, filename)
    return pathname
  }

  return chunkNames.map(chunkName => script(stats, chunkName))
}

export default class HTML extends React.Component<HTMLProps> {
  faviconTags() {
    return (
      <>
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
      </>
    )
  }

  render() {
    const outputPath = this.props.clientStats.outputPath

    const chunkSrcs = scriptSrcs(this.props.chunkNames, this.props.clientStats)

    return (
      <html>
        <head>
          <title>SSR App</title>

          {this.faviconTags()}

          {this.props.styledComponentsData.styleElements}
        </head>

        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__REQUIRED_CHUNK_NAMES__ = ${JSON.stringify(
                this.props.chunkNames
              )}`,
            }}
          />

          <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />

          {/* DLL in development Only */}
          <script src="/build/library/library.dll.js" />
          {chunkSrcs.map(src => <script key={src} src={src} />)}
          <script src={path.resolve(outputPath, "client.js")} />
        </body>
      </html>
    )
  }
}
