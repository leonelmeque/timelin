const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  output: {
    path: path.join(__dirname, "..", "./src/dist"),
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              "plugins": [
                "@babel/plugin-transform-react-jsx-source",
                "babel-plugin-styled-components"
              ],
              "presets": [
                "@babel/preset-env",
                ["@babel/preset-react", { "runtime": "automatic" }],
                "@babel/preset-typescript"
              ]
            }
          },
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // this line will be used for images formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "public/resource",
      },
      // this line will be use for fonts and svg files
      {
        test: /\.(woff(2)?|eot|tff|otf|svg|)$/,
        use: ["file-loader?name=[name].[ext]"],
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".tsx", ".ts", ".js"],
  },
  plugins: [
    new DotEnv(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./public/index.html"),
      favicon: "./public/favicon.ico",
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "static",
    }),
  ],
};
