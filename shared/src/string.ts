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

/**
 * Options for string truncation operations.
 */
interface TruncateOptions {
  /** The locale to use for text segmentation. Defaults to `en-US`. */
  locale?: string;
  /** The string to append at the end of truncated text. Defaults to `...`. */
  ending?: string;
}

/**
 * Truncates a string at a grapheme boundary to ensure proper handling of
 * Unicode characters.
 * @param str The string to truncate.
 * @param limit The maximum length of the string.
 * @param options Optional configuration for truncation behavior.
 * @returns The truncated string, with ending appended if truncation occurred.
 */
export function truncateAtGrapheme(
  str: string,
  limit: number,
  options: TruncateOptions = {},
): string {
  return truncateAtGraphemeOrWord(str, limit, "grapheme", options);
}

/**
 * Truncates a string at a word boundary to avoid cutting words in the middle.
 * @param str The string to truncate.
 * @param limit The maximum length of the string.
 * @param options Optional configuration for truncation behavior.
 * @returns The truncated string, with ending appended if truncation occurred.
 */
export function truncateAtWord(
  str: string,
  limit: number,
  options: TruncateOptions = {},
): string {
  return truncateAtGraphemeOrWord(str, limit, "word", options);
}

function truncateAtGraphemeOrWord(
  str: string,
  limit: number,
  granularity: "grapheme" | "word",
  { locale = "en-US", ending = "..." }: TruncateOptions = {},
): string {
  const segmenter = new Intl.Segmenter(locale, { granularity });

  let lastIndex = -1;

  for (const segment of segmenter.segment(str)) {
    if (granularity === "word" && segment.isWordLike === true) {
      continue;
    }

    lastIndex = segment.index;
    if (lastIndex >= limit) {
      break;
    }
  }

  return lastIndex >= limit ? str.slice(0, lastIndex) + ending : str;
}
