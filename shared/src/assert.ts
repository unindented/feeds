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
 * Asserts that a value is not null or undefined, and returns it.
 * @template T The type of the value being asserted.
 * @param value The value to check.
 * @param msg Optional custom error message to throw if the assertion fails.
 * @returns The value if it's not null or undefined.
 * @throws {Error} If the value is null or undefined.
 */
export function assert<T>(value: T | null | undefined, msg?: string): T {
  if (value === null || value === undefined) {
    throw new Error(msg ?? `Value is ${String(value)}`);
  }
  return value;
}
