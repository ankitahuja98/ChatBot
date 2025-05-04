const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.development.config.js");

const compiler = Webpack(webpackConfig);

const devServerOptions = {
  host: process.env.DEV_SERVER_HOST || "localhost",
  port: process.env.DEV_SERVER_PORT || 3000,
  ...webpackConfig.devServer,
  open: true,
  hot: true, // Enables Hot Module Replacement (HMR) — live update without full reload.
  client: {
    overlay: true, // Show errors/warnings in the browser
    logging: "info", // Log level for client-side messages
  },
  historyApiFallback: true, //Supports SPA routing (e.g., React Router). It redirects all requests to index.html.
};

const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  try {
    console.log("------------------------------------");
    console.log("🟢 Starting Webpack Dev Server...");
    console.log(
      `🌐 URL: http://${devServerOptions.host}:${devServerOptions.port}`
    );
    console.log("------------------------------------");
    await server.start();
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

const stopServer = async () => {
  console.log("🛑 Stopping server...");
  await server.stop();
  console.log("🔴 Server stopped.");
  process.exit(0);
};

process.on("SIGINT", stopServer); // Triggered when you press Ctrl+C in the terminal.
process.on("SIGTERM", stopServer); // Sent by the OS or a process manager (like Docker, systemd) to politely ask your app to shut down.
// Without Stop server, your dev server might not clean up properly. For example:

// Ports could stay in use (so next time it fails to start)

runServer();
