const path = require("path")
const webpack = require("webpack")

module.exports = {
  context: process.cwd(),
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".less", ".css"],
    modules: [__dirname, "node_modules"],
  },
  entry: {
    library: [
      "react",
      "react-dom",
      "styled-components",
      "ramda",
      "react-router-dom",
    ],
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "../dist/library"),
    library: "[name]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]",
      path: path.resolve(__dirname, "../dist/library/[name].json"),
    }),
  ],
}
