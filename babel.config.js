module.exports = function _(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
