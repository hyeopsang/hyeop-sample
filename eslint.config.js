import { config } from "@nettee-sample/eslint-config/base";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config} */
export default tseslint.config(
  {
    ignores: ["apps/**", "packages/**", ".lintstagedrc.js"],
  },
  ...config,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
  },
);
