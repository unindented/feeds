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

import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has the right title", async ({ page }) => {
    await expect(page).toHaveTitle("Feeds — Unindented");
  });

  test("has main navigation", async ({ page }) => {
    const nav = page.getByRole("navigation");
    const navButton = page.getByRole("button", {
      name: "Toggle navigation",
      exact: true,
    });
    await expect(nav.or(navButton)).toBeInViewport();
  });
});

test.describe("feed page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/feeds/krebsonsecurity-com");
  });

  test("has the right title", async ({ page }) => {
    await expect(page).toHaveTitle("Brian Krebs — Feeds — Unindented");
  });

  test("has main navigation", async ({ page }) => {
    const nav = page.getByRole("navigation");
    const navButton = page.getByRole("button", {
      name: "Toggle navigation",
      exact: true,
    });
    await expect(nav.or(navButton)).toBeInViewport();
  });
});
