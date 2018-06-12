const path = require("path")
const webpack = require("webpack")
const HardSourcePlugin = require("hard-source-webpack-plugin")

const clientDist = path.resolve(__dirname, "./dist/client")
const serverDist = path.resolve(__dirname, "./dist/server")

module.exports = [
  {
    name: "client",
    mode: "none",
    target: "web",
    entry: {
      client: ["webpack-hot-middleware/client", "./src/client/clientEntry.tsx"],
    },
    output: {
      path: clientDist,
      filename: "client.js",
      chunkFilename: "[name].chunk.js",
      publicPath: clientDist,
    },
    devtool: "cheap-eval-source-map",
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      modules: [
        path.resolve(__dirname, "./src"),
        path.resolve(__dirname, "./lib"),
        "node_modules",
      ],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: "babel-loader",
        },
      ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new HardSourcePlugin()],
  },
  {
    name: "server",
    mode: "none",
    target: "node",
    entry: "./src/server/serverEntry.tsx",
    output: {
      path: serverDist,
      filename: "server.js",
      libraryTarget: "commonjs2",
      publicPath: serverDist,
    },
    devtool: "source-map",
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      modules: [
        path.resolve(__dirname, "./src"),
        path.resolve(__dirname, "./lib"),
        "node_modules",
      ],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: "babel-loader",
        },
      ],
    },
    plugins: [
      // Disable chunk splitting in development (webpack-hot-server-middleware doesn't like it)
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new HardSourcePlugin(),
    ],
  },
]
