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

import type { Truthy } from "./types.ts";

/**
 * Type guard that checks if a value is truthy. Used as a predicate function for
 * filtering arrays.
 * @template T The type of the value to check.
 * @param value The value to check for truthiness.
 * @returns Whether the value is truthy.
 */
export function truthy<T>(value: T): value is Truthy<T> {
  return Boolean(value);
}

/**
 * Filters an array to remove all falsy values.
 * @template T The type of elements in the input array.
 * @param items The array to filter.
 * @returns A new array containing only the truthy values from the input array.
 */
export function compact<T>(items: T[]): Truthy<T>[] {
  return items.filter(truthy);
}

/**
 * Intersperses an array with a separator between each item.
 * @template T The type of items in the input array.
 * @param items The array of items to intersperse.
 * @param separator The separator to insert between items.
 * @returns A new array with the separator inserted between each original item.
 */
export function intersperse<T, S>(items: T[], separator: S): (T | S)[] {
  if (items.length === 0) {
    return [];
  }

  return items.slice(1).reduce<(T | S)[]>(
    function (acc, item) {
      return acc.concat([separator, item]);
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    [items[0] as T],
  );
}
