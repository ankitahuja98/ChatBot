const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"], // Automatically resolve these extensions
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // alias: Now, instead of using relative paths when importing like so:
    // import App from '../src/components/App';
    // import Utility from '@/component/App';
  },

  // Babel Configuration
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules from transpilation
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  performance: {
    hints: "warning", // Value of 'warning' | 'error' | 'false', To give either warning, error if generated assest size > maxAssetSize. An asset is any emitted file from webpack
    // maxAssetSize: 100000,
    // maxEntrypointSize: 400,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      path: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify("https://api/prod/products"),
    }),
  ],
  optimization: {
    chunkIds: "named", // Webpack assigns readable names to chunks instead of hashed IDs. Useful for debugging and understanding the structure of the build

    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "async", // Optimizes only dynamically imported modules (e.g., via import()).
      minSize: 20000, // The minimum size for a chunk to be generated is 20 KB. Smaller modules will not be split into separate chunks unless combined with others to meet the threshold.
      minRemainingSize: 0,
      minChunks: 1, // A module must be shared by at least one chunk to be eligible for splitting. This value ensures that even a single chunk-sharing module can be split.
      maxAsyncRequests: 30, // Limits the maximum number of simultaneous requests for asynchronous chunks.
      maxInitialRequests: 30, // Limits the maximum number of parallel requests for initial chunks.
      enforceSizeThreshold: 50000, // Ensures chunks exceeding this size threshold ( 50kb ) are always split, even if they don't meet other criteria.

      // Defines rules for grouping modules into chunks.
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // Code spiting for modules in node_modules

          priority: -10, // Priority of code spiting like which one take first

          name: "vendor", // Chunks created from this cache-group will be named as "vendor.js"

          chunks: "all", // Chunks created contain both static and dynamic imported modules
          reuseExistingChunk: true, // Reuse existing chunks to avoid duplication
        },
        default: {
          minChunks: 1, // A module must be shared by at least one chunks to be eligible for splitting into the default group
          priority: -20,
          reuseExistingChunk: true,
          name: "common",
          chunks: "all",
        },
      },
    },
  },
};
