const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const distPath = "dist";
const srcPath = "./src/";
const conf = {
  entry: { main: `${srcPath}index.ts` },
  output: {
    path: path.resolve(__dirname, distPath),
    filename: "[name].[chunkhash].js",
  },
  optimization: {
    // ?? What is this?
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    overlay: true,
    port: 2020,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(s?)css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: `${srcPath}index.html`,
      filename: "index.html"
    }),
    new WebpackMd5Hash()
  ]
};

module.exports = (_env, options) => {
  const production = options.mode === "production";
  conf.devtool = production ? false : "eval-sourcemap";

  if (production) {
    conf.plugins = [
      ...conf.plugins,
      new CopyWebpackPlugin([
        { from: `${srcPath}assets`, to: `./${distPath}/assets` }
      ])
    ];
  }

  return conf;
};
