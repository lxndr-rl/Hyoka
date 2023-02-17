const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function _(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  if (config.mode === "development") {
    config.devServer.compress = false;
  }
  if (config.mode === "production") {
    config.optimization.minimize = false;
  }
  // Customize the config before returning it.
  return config;
};
