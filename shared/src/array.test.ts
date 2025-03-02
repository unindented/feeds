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

import { compact, intersperse } from "./array.ts";

describe("compact", () => {
  it("filters out falsy values", () => {
    const original = [
      "A",
      false,
      "B",
      0,
      "C",
      -0,
      "D",
      0n,
      "E",
      "",
      "F",
      null,
      "G",
      undefined,
    ];
    const compacted = compact(original);
    const expected = ["A", "B", "C", "D", "E", "F", "G"];

    expect(compacted).toStrictEqual(expected);
  });
});

describe("intersperse", () => {
  it("handles empty array", () => {
    expect(intersperse([], ", ")).toStrictEqual([]);
  });

  it("handles an array with a single element", () => {
    expect(intersperse(["A"], ",")).toStrictEqual(["A"]);
  });

  it("handles an array with multiple elements", () => {
    expect(intersperse(["A", "B"], ",")).toStrictEqual(["A", ",", "B"]);
  });

  it("handles an array with different types", () => {
    expect(intersperse(["A", "B"], 0)).toStrictEqual(["A", 0, "B"]);
  });
});
