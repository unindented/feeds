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

import { env } from "node:process";

import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:4321/";

const desktopChrome = devices["Desktop Chrome"];
const desktopFirefox = devices["Desktop Firefox"];
const desktopSafari = devices["Desktop Safari"];
const mobileChrome = devices["Pixel 5"];
const mobileSafari = devices["iPhone 12"];

const isContinuousIntegration = Boolean(env["CI"]);

export default defineConfig({
  testDir: "website/tests",
  testMatch: "**/*.e2e.?(c|m)[jt]s?(x)",

  outputDir: "e2e-results",
  reporter: [["list"], ["html", { open: "never", outputFolder: "e2e-report" }]],
  snapshotPathTemplate:
    "{testDir}/__screenshots__/{platform}/{projectName}/{arg}{ext}",

  forbidOnly: isContinuousIntegration,
  retries: isContinuousIntegration ? 2 : 0,
  workers: isContinuousIntegration ? 1 : "50%",
  fullyParallel: true,

  use: {
    baseURL,
    screenshot: "on",
    video: "on-first-retry",
    trace: "on-first-retry",
  },

  webServer: {
    command: "pnpm dev --mode testing",
    url: baseURL,
    reuseExistingServer: !isContinuousIntegration,
  },

  expect: {
    toHaveScreenshot: { maxDiffPixels: 48 },
  },

  projects: [
    {
      name: "desktop-wide-chrome",
      use: {
        ...desktopChrome,
        viewport: { ...desktopChrome.viewport, width: 1920 },
      },
    },
    { name: "desktop-chrome", use: desktopChrome },
    { name: "desktop-firefox", use: desktopFirefox },
    { name: "desktop-safari", use: desktopSafari },
    { name: "mobile-chrome", use: mobileChrome },
    { name: "mobile-safari", use: mobileSafari },
  ],
});
