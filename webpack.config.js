const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function _(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  return config;
};
