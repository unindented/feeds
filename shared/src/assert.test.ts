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

import { describe, expect, it } from "vitest";

import { assert } from "./assert.ts";

describe("assert", () => {
  it("returns value if not null nor undefined", () => {
    expect(assert(42)).toBe(42);
  });

  it("throws if null", () => {
    expect(() => {
      assert(null);
    }).toThrow("Value is null");
  });

  it("throws with message if null", () => {
    expect(() => {
      assert(null, "Should not be null");
    }).toThrow("Should not be null");
  });

  it("throws if undefined", () => {
    expect(() => {
      assert(undefined);
    }).toThrow("Value is undefined");
  });

  it("throws with message if undefined", () => {
    expect(() => {
      assert(undefined, "Should not be undefined");
    }).toThrow("Should not be undefined");
  });
});
