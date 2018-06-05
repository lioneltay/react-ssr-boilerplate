import * as React from "react"

interface HTMLProps {
  children: React.ReactNode
}

export default class HTML extends React.Component<HTMLProps> {
  render() {
    return (
      <html>
        <head>
          <title>SSR App</title>
        </head>

        <body>
          <div id="app">
            {this.props.children}
          </div>

          <script src="/client.js" />
        </body>
      </html>
    )
  }
}
