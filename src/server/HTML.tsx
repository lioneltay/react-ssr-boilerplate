import * as React from "react"

interface HTMLProps {
  children: React.ReactNode
  chunkFilenames: string[]
}

export default class HTML extends React.Component<HTMLProps> {
  render() {
    return (
      <html>
        <head>
          <title>SSR App</title>
        </head>

        <body>
          <div id="app">{this.props.children}</div>

          <div>{this.props.chunkFilenames}</div>

          {this.props.chunkFilenames.map(chunkFilename => (
            <script src={`Volumes/Dev/projects/hot-server-demo/${chunkFilename}`} />
          ))}
          <script src="/client.js" />
        </body>
      </html>
    )
  }
}
