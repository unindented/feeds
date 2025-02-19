/**
 * Copyright 2025 Daniel Perez Alvarez
 *
 * This file is part of Static Feeds.
 *
 * Static Feeds is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Static Feeds is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Static Feeds. If not, see <https://www.gnu.org/licenses/>.
 */

// @ts-check
/* eslint-disable @typescript-eslint/naming-convention */

import eslint from "@eslint/js";
import vitestPlugin from "@vitest/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginLicenseHeader from "eslint-plugin-license-header";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/.*/", "**/coverage/", "**/dist/"] },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  eslintPluginAstro.configs.recommended,
  eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      curly: "error",
      "default-case": "error",
      "default-case-last": "error",
      eqeqeq: "error",
      "new-cap": "error",
      "no-await-in-loop": "error",
      "no-else-return": "error",
      "no-eval": "error",
      "no-lonely-if": "error",
      "no-multi-assign": "error",
      "no-new-wrappers": "error",
      "no-param-reassign": "error",
      "no-return-assign": "error",
      "no-unneeded-ternary": "error",
      "no-useless-call": "error",
      "no-useless-computed-key": "error",
      "no-useless-concat": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "object-shorthand": "error",
      "operator-assignment": "error",
      "prefer-template": "error",
      "require-unicode-regexp": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/naming-convention": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "no-loop-func": "off",
      "@typescript-eslint/no-loop-func": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unnecessary-parameter-property-assignment":
        "error",
      "@typescript-eslint/no-unsafe-type-assertion": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
    },
  },
  {
    plugins: {
      "license-header": eslintPluginLicenseHeader,
    },
    rules: {
      "license-header/header": [
        "warn",
        [
          `/**`,
          ` * Copyright ${new Date().getFullYear().toString(10)} Daniel Perez Alvarez`,
          ` *`,
          ` * This file is part of Static Feeds.`,
          ` *`,
          ` * Static Feeds is free software: you can redistribute it and/or modify it under`,
          ` * the terms of the GNU Affero General Public License as published by the Free`,
          ` * Software Foundation, either version 3 of the License, or (at your option) any`,
          ` * later version.`,
          ` *`,
          ` * Static Feeds is distributed in the hope that it will be useful, but WITHOUT`,
          ` * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS`,
          ` * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more`,
          ` * details.`,
          ` *`,
          ` * You should have received a copy of the GNU Affero General Public License`,
          ` * along with Static Feeds. If not, see <https://www.gnu.org/licenses/>.`,
          ` */`,
        ],
      ],
    },
  },
  {
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
    },
  },
  {
    files: ["**/*.test.?(c|m)[jt]s?(x)"],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      "vitest/consistent-test-filename": "error",
      "vitest/consistent-test-it": "error",
      "vitest/max-expects": "error",
      "vitest/max-nested-describe": ["error", { max: 2 }],
      "vitest/no-alias-methods": "error",
      "vitest/no-conditional-expect": "error",
      "vitest/no-conditional-in-test": "error",
      "vitest/no-conditional-tests": "error",
      "vitest/no-disabled-tests": "error",
      "vitest/no-duplicate-hooks": "error",
      "vitest/no-focused-tests": "error",
      "vitest/no-hooks": ["error", { allow: ["beforeEach", "afterEach"] }],
      "vitest/no-interpolation-in-snapshots": "error",
      "vitest/no-large-snapshots": "error",
      "vitest/no-mocks-import": "error",
      "vitest/no-restricted-matchers": "error",
      "vitest/no-restricted-vi-methods": "error",
      "vitest/no-standalone-expect": "error",
      "vitest/no-test-prefixes": "error",
      "vitest/no-test-return-statement": "error",
      "vitest/padding-around-after-all-blocks": "error",
      "vitest/padding-around-after-each-blocks": "error",
      "vitest/padding-around-all": "error",
      "vitest/padding-around-before-all-blocks": "error",
      "vitest/padding-around-before-each-blocks": "error",
      "vitest/padding-around-describe-blocks": "error",
      "vitest/padding-around-expect-groups": "error",
      "vitest/prefer-called-with": "error",
      "vitest/prefer-comparison-matcher": "error",
      "vitest/prefer-each": "error",
      "vitest/prefer-equality-matcher": "error",
      "vitest/prefer-expect-resolves": "error",
      "vitest/prefer-hooks-in-order": "error",
      "vitest/prefer-hooks-on-top": "error",
      "vitest/prefer-lowercase-title": "error",
      "vitest/prefer-mock-promise-shorthand": "error",
      "vitest/prefer-snapshot-hint": "error",
      "vitest/prefer-spy-on": "error",
      "vitest/prefer-strict-boolean-matchers": "error",
      "vitest/prefer-strict-equal": "error",
      "vitest/prefer-to-be": "error",
      "vitest/prefer-to-be-falsy": "error",
      "vitest/prefer-to-be-object": "error",
      "vitest/prefer-to-be-truthy": "error",
      "vitest/prefer-to-contain": "error",
      "vitest/prefer-to-have-length": "error",
      "vitest/prefer-todo": "error",
      "vitest/prefer-vi-mocked": "error",
      "vitest/require-hook": "error",
      "vitest/require-mock-type-parameters": "error",
      "vitest/require-to-throw-message": "error",
      "vitest/require-top-level-describe": "error",
      "vitest/valid-expect-in-promise": "error",
    },
  },
);
