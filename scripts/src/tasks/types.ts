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

import type { DatabaseSync } from "node:sqlite";

import type {
  OpmlDocument,
  SimpleFeed,
  SimpleFeedItem,
} from "@feeds/shared/types.ts";

/**
 * Context object shared between tasks during the feed refresh process.
 */
export interface TasksContext {
  /** Path to the OPML file containing feed subscriptions. */
  opmlFilePath: string;
  /** Parsed OPML document, null before reading the file. */
  opmlDocument: OpmlDocument | null;
  /** List of feeds extracted from the OPML document. */
  feeds: SimpleFeed[];
  /** List of feed items fetched from all feeds. */
  feedItems: SimpleFeedItem[];

  /** Path to the SQLite database file. */
  sqliteFilePath: string;
  /** SQLite database connection, null before opening the database. */
  sqliteDatabase: DatabaseSync | null;
}
