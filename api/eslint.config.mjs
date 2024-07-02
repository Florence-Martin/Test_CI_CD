import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import parserTypeScript from "@typescript-eslint/parser";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"] },
  {
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      react: pluginReact,
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
