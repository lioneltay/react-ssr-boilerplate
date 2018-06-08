const path = require("path")
const webpack = require("webpack")

const dist = path.join(__dirname, "dist")

module.exports = [
  {
    name: "client",
    mode: "none",
    target: "web",
    entry: {
      client: ["webpack-hot-middleware/client", "./src/client/clientEntry.tsx"],
    },
    output: {
      path: dist,
      filename: "client.js",
      publicPath: path.resolve(__dirname, "./dist"),
    },
    devtool: "eval",
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      modules: [path.resolve(__dirname, "./src"), "node_modules"],
    },
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
    mode: "none",
    target: "node",
    entry: "./src/server/serverEntry.tsx",
    output: {
      path: dist,
      filename: "server.js",
      libraryTarget: "commonjs2",
      publicPath: path.resolve(__dirname, "./dist"),
    },
    devtool: "source-map",
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      modules: [path.resolve(__dirname, "./src"), "node_modules"],
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
    ],
  },
]
