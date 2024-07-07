// .eslintrc.js
const { defaults } = require("eslint-plugin-react");
const tsEslintRecommended = require("@typescript-eslint/eslint-plugin").configs
  .recommended;

module.exports = {
  files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: "./tsconfig.json",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["react", "@typescript-eslint"],
  rules: {
    ...tsEslintRecommended.rules,
    ...defaults.rules,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
