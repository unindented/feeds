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

import { getAllFeedItems, getFeeds } from "@feeds/shared/sqlite.ts";
import { defineCollection } from "astro:content";
import { SQLITE_FILE_PATH } from "astro:env/server";

import { feedItemSchema, feedSchema } from "./loaders/schemas";
import { sqlite } from "./loaders/sqlite";

const feeds = defineCollection({
  loader: sqlite(SQLITE_FILE_PATH, {
    syncOptions: { readOnly: true },
    operation: (db) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      getFeeds(db) as unknown as Record<string, unknown>[],
  }),
  schema: feedSchema,
});

const feedItems = defineCollection({
  loader: sqlite(SQLITE_FILE_PATH, {
    syncOptions: { readOnly: true },
    operation: (db) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      getAllFeedItems(db) as unknown as Record<string, unknown>[],
  }),
  schema: feedItemSchema,
});

export const collections = { feeds, feedItems };
