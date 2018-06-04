const path = require("path")
const webpack = require("webpack")

const dist = path.join(__dirname, "dist")

module.exports = [
  {
    name: "client",
    mode: "development",
    target: "web",
    entry: {
      client: ["webpack-hot-middleware/client", "./src/client/clientEntry.js"],
    },
    output: {
      path: dist,
      filename: "client.js",
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: "babel-loader",
        },
      ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  },
  {
    name: "server",
    mode: "development",
    target: "node",
    entry: "./src/server/serverEntry.js",
    output: {
      path: dist,
      filename: "server.js",
      libraryTarget: "commonjs2",
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: "babel-loader",
        },
      ],
    },
  },
]
