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

import { z } from "astro:content";

/**
 * Represents a simplified feed structure with essential properties.
 */
export const feedSchema = z.object({
  id: z.string(),
  htmlUrl: z.string().url(),
  xmlUrl: z.string().url(),
  title: z.string(),
  path: z.string().nullable(),
});

/**
 * Represents a simplified feed item with essential content and metadata.
 */
export const feedItemSchema = z.object({
  id: z.string(),
  htmlUrl: z.string().url(),
  title: z.string(),
  summary: z.string().nullable(),
  published: z.date().nullable(),
  updated: z.date().nullable(),
  feedId: z.string(),
});
