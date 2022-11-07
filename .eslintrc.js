module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
    "no-nested-ternary": "off",
    "react/jsx-no-useless-fragment": "off",
    "consistent-return": "off",
    "global-require": "off",
    "react/jsx-no-bind": "off",
    "react/no-unstable-nested-components": "off",
    quotes: ["error", "double"],
    "linebreak-style": 0,
    "react/state-in-constructor": "off",
    "react/destructuring-assignment": "off",
    "max-len": ["error", { code: 130 }],
    "no-mixed-operators": "off",
    "no-param-reassign": "off",
  },
  ignorePatterns: [
    "node_modules/",
    "web-build/",
    "build/",
    "dist/",
    "src/plugins/",
  ],
};
