const path = require("path")
const webpack = require("webpack")

const WebpackStatsWriterPlugin = require("webpack-stats-plugin")
  .StatsWriterPlugin

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
      chunkFilename: "[name].chunk.js",
      publicPath: path.resolve(__dirname, "./dist"),
    },
    devtool: "cheap-eval-source-map",
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
      new webpack.HotModuleReplacementPlugin(),
      new WebpackStatsWriterPlugin({
        filename: "webpack-stats.json",
        fields: [
          "version",
          "hash",
          "time",
          "filteredModules",
          "outputPath",
          "assetsByChunkName",
          "assets",
          "chunks",
          "modules",
          "errors",
          "warning",
        ],
      }),
    ],
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
