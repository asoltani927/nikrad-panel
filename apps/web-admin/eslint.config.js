import { nextJsConfig } from "@nikrad/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
const config = {
  ...nextJsConfig,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ...nextJsConfig.parserOptions,
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [...(nextJsConfig.plugins || []), "@typescript-eslint"],
  extends: [...(nextJsConfig.extends || []), "plugin:@typescript-eslint/recommended"],
};

export default config;
