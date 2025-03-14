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

/* eslint-disable @typescript-eslint/naming-convention */

import { env } from "node:process";

import { expect, test } from "@playwright/test";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const pages = {
  home: "/",
  feed: "/feeds/krebsonsecurity-com",
} as const;
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
const pageEntries = Object.entries(pages) as Entries<typeof pages>;

const variations = {
  "light mode": {
    testOptions: {},
    emulationOptions: { colorScheme: "light" },
  },
  "dark mode": {
    testOptions: {},
    emulationOptions: { colorScheme: "dark" },
  },
  "light mode forced": {
    testOptions: {},
    emulationOptions: { colorScheme: "light", forcedColors: "active" },
  },
  "dark mode forced": {
    testOptions: {},
    emulationOptions: { colorScheme: "dark", forcedColors: "active" },
  },
  "disabled scripting": {
    testOptions: { javaScriptEnabled: false },
    emulationOptions: { colorScheme: "no-preference" },
  },
} as const;
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
const varEntries = Object.entries(variations) as Entries<typeof variations>;

test.describe("screenshots", () => {
  test.skip(
    ({ browserName, isMobile }) =>
      Boolean(env.CI) && browserName === "chromium" && isMobile,
    "These are flaky in mobile Chrome in CI (!?)",
  );

  test.slow();

  test.describe("pages", () => {
    for (const [varName, variation] of varEntries) {
      const { testOptions, emulationOptions } = variation;

      test.describe(varName, () => {
        for (const [pageName, pageUrl] of pageEntries) {
          test.describe(pageName, () => {
            test.use(testOptions);

            test("matches screenshot", async ({ page }) => {
              await page.emulateMedia(emulationOptions);
              await page.goto(pageUrl, { waitUntil: "networkidle" });
              await expect(page).toHaveScreenshot({ animations: "disabled" });
            });
          });
        }
      });
    }
  });
});
