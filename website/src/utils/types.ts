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

import type { CollectionEntry } from "astro:content";

/**
 * Represents a collection of outlines, which can be either groups or items.
 */
export type FeedOutline = (FeedOutlineGroup | FeedOutlineItem)[];

/**
 * Represents a single feed from the collection of feeds.
 */
export type FeedOutlineItem = CollectionEntry<"feeds">;

/**
 * Represents a group of outlines that can contain other groups or items.
 */
export interface FeedOutlineGroup {
  text?: string;
  outline: FeedOutline;
}
