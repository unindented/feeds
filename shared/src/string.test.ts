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

import { truncateAtGrapheme, truncateAtWord } from "./string.ts";

interface TruncateTestEachColumns {
  str: string;
  limit: number;
  locale: string;
  ending: string;
  expected: string;
}

describe("truncateAtGrapheme", () => {
  it.each`
    str                                   | limit | locale       | ending       | expected
    ${"😊"}                               | ${1}  | ${undefined} | ${undefined} | ${"😊"}
    ${"All"}                              | ${3}  | ${undefined} | ${undefined} | ${"All"}
    ${"All!"}                             | ${4}  | ${undefined} | ${undefined} | ${"All!"}
    ${"😊😊😊"}                           | ${1}  | ${undefined} | ${undefined} | ${"😊..."}
    ${"🧑‍🧑‍🧒‍🧒🧑‍🧑‍🧒‍🧒🧑‍🧑‍🧒‍🧒"}                           | ${1}  | ${undefined} | ${undefined} | ${"🧑‍🧑‍🧒‍🧒..."}
    ${"All this happened. More or less."} | ${3}  | ${undefined} | ${undefined} | ${"All..."}
    ${"Aujourd'hui, maman est morte."}    | ${3}  | ${"fr"}      | ${"…"}       | ${"Auj…"}
    ${"吾輩は猫である。名前はたぬき。"}   | ${3}  | ${"ja-JP"}   | ${"……"}      | ${"吾輩は……"}
  `(
    "($str, $limit, { locale: $locale, ending: $ending }) -> $expected",
    ({ str, limit, locale, ending, expected }: TruncateTestEachColumns) => {
      expect(truncateAtGrapheme(str, limit, { locale, ending })).toBe(expected);
    },
  );
});

describe("truncateAtWord", () => {
  it.each`
    str                                   | limit | locale       | ending       | expected
    ${"😊"}                               | ${1}  | ${undefined} | ${undefined} | ${"😊"}
    ${"All"}                              | ${3}  | ${undefined} | ${undefined} | ${"All"}
    ${"All!"}                             | ${4}  | ${undefined} | ${undefined} | ${"All!"}
    ${"All this happened. More or less."} | ${1}  | ${undefined} | ${undefined} | ${"All..."}
    ${"All this happened. More or less."} | ${3}  | ${undefined} | ${undefined} | ${"All..."}
    ${"All this happened. More or less."} | ${4}  | ${undefined} | ${undefined} | ${"All this..."}
    ${"Aujourd'hui, maman est morte."}    | ${1}  | ${"fr"}      | ${"…"}       | ${"Aujourd'hui…"}
    ${"吾輩は猫である。名前はたぬき。"}   | ${1}  | ${"ja-JP"}   | ${"……"}      | ${"吾輩は猫である……"}
  `(
    "($str, $limit, { locale: $locale, ending: $ending }) -> $expected",
    ({ str, limit, locale, ending, expected }: TruncateTestEachColumns) => {
      expect(truncateAtWord(str, limit, { locale, ending })).toBe(expected);
    },
  );
});
