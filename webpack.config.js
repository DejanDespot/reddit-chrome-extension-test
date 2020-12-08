const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    historyApiFallback: true
  },
  mode: "production",
  entry: {
    popup: path.resolve(__dirname, "./src/index-popup.js"),
    options: path.resolve(__dirname, "./src/index-options.js")
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",

            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                {
                  plugins: [
                    "@babel/plugin-proposal-class-properties",
                    [
                      "@babel/plugin-transform-runtime",
                      {
                        regenerator: true
                      }
                    ]
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "src/popup.html",
      chunks: ["popup"]
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: "src/options.html",
      chunks: ["options"]
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "[name].[ext]" },
        { from: "src/background.js", to: "[name].[ext]" },
        { from: "src/content.js", to: "[name].[ext]" },
        { from: "src/*.png", to: "[name].[ext]" }
      ]
    }),
    new CleanWebpackPlugin()
  ]
};
