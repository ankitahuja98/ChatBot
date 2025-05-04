const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // If no mode is set it will use 'production' by-default
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  // Here it means for file .js and .jsx webpack will resolve them without requiring the file extension in the import statement. Here '@' represent 'src' folder allows us to import files more cleanly and consistently across your project.
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      path: "index.html",
    }),
  ],
};
