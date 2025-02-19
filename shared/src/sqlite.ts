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

import type { DatabaseSyncOptions } from "node:sqlite";
import { DatabaseSync } from "node:sqlite";

import type { SimpleFeed, SimpleFeedItem, SqliteFeedItem } from "./types.ts";

/**
 * Opens a SQLite database connection with optional configuration.
 * @param sqliteFilePath Path to the SQLite database file.
 * @param options Additional options for the database connection.
 * @returns A synchronous SQLite database connection.
 */
export function openDatabase(
  sqliteFilePath: string,
  options: DatabaseSyncOptions = {},
): DatabaseSync {
  return new DatabaseSync(sqliteFilePath, options);
}

/**
 * Opens a SQLite database connection in read-only mode.
 * @param sqliteFilePath Path to the SQLite database file.
 * @returns A read-only synchronous SQLite database connection.
 */
export function openDatabaseReadOnly(sqliteFilePath: string): DatabaseSync {
  return openDatabase(sqliteFilePath, { readOnly: true });
}

/**
 * Creates the necessary database tables if they don't exist.
 * @param db The database connection.
 */
export function createTables(db: DatabaseSync): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS feeds (
      id TEXT PRIMARY KEY,
      htmlUrl TEXT NOT NULL UNIQUE,
      xmlUrl TEXT NOT NULL UNIQUE,
      title TEXT UNIQUE,
      path TEXT
    );`);

  db.exec(`
    CREATE TABLE IF NOT EXISTS feedItems (
      htmlUrl TEXT PRIMARY KEY NOT NULL,
      title TEXT,
      summary TEXT,
      published DATETIME,
      updated DATETIME,
      feedId TEXT NOT NULL,
      FOREIGN KEY (feedId) REFERENCES feeds(id) ON DELETE CASCADE
    );`);
}

/**
 * Updates the feeds table with new feed data, replacing existing entries.
 * @param db The database connection.
 * @param feeds Array of feeds to insert or update.
 */
export function replaceFeeds(db: DatabaseSync, feeds: SimpleFeed[]): void {
  const st = db.prepare(`
    REPLACE INTO feeds (id, htmlUrl, xmlUrl, title, path) 
    VALUES (?, ?, ?, ?, ?)`);
  for (const feed of feeds) {
    st.run(feed.id, feed.htmlUrl, feed.xmlUrl, feed.title, feed.path);
  }
}

/**
 * Updates the feed items table with new items, replacing existing entries.
 * @param db The database connection.
 * @param feedItems Array of feed items to insert or update.
 */
export function replaceFeedItems(
  db: DatabaseSync,
  feedItems: SimpleFeedItem[],
): void {
  const st = db.prepare(`
    REPLACE INTO feedItems (htmlUrl, title, summary, published, updated, feedId) 
    VALUES (?, ?, ?, ?, ?, ?)`);
  for (const feedItem of feedItems) {
    st.run(
      feedItem.htmlUrl,
      feedItem.title,
      feedItem.summary,
      feedItem.published?.toISOString() ?? null,
      feedItem.updated?.toISOString() ?? null,
      feedItem.feedId,
    );
  }
}

/**
 * Retrieves all feeds from the database, ordered by path and title.
 * @param db The database connection.
 * @returns Array of all feeds in the database, ordered by path and title.
 */
export function getFeeds(db: DatabaseSync): SimpleFeed[] {
  const st = db.prepare(`
    SELECT id, htmlUrl, xmlUrl, title, path 
    FROM feeds
    ORDER BY path, title`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return st.all() as SimpleFeed[];
}

/**
 * Retrieves the most recent feed items from the database.
 * @param db The database connection.
 * @returns Array of feed items, ordered by update date descending.
 */
export function getAllFeedItems(db: DatabaseSync): SimpleFeedItem[] {
  const st = db.prepare(`
    SELECT htmlUrl, title, summary, published, updated, feedId
    FROM feedItems
    ORDER BY updated DESC`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  const rows = st.all() as SqliteFeedItem[];
  return rows.map(fixFeedItem);
}

/**
 * Retrieves feed items for a specific feed from the database.
 * @param db The database connection.
 * @param feedId ID of the feed to get items for.
 * @returns Array of feed items for the specified feed, ordered by update date
 * descending.
 */
export function getFeedItemsForFeed(
  db: DatabaseSync,
  feedId: SimpleFeed["id"],
): SimpleFeedItem[] {
  const st = db.prepare(`
    SELECT htmlUrl, title, summary, published, updated, feedId
    FROM feedItems
    WHERE feedId = ?
    ORDER BY updated DESC`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  const rows = st.all(feedId) as SqliteFeedItem[];
  return rows.map(fixFeedItem);
}

/**
 * Converts a `SqliteFeedItem` to a `SimpleFeedItem` by fixing date fields.
 * @param feedItem The SQLite feed item to convert.
 * @returns A `SimpleFeedItem` with proper `Date` objects.
 */
function fixFeedItem(feedItem: SqliteFeedItem): SimpleFeedItem {
  return {
    ...feedItem,
    id: feedItem.htmlUrl,
    published: fixFeedItemDate(feedItem.published),
    updated: fixFeedItemDate(feedItem.updated),
  };
}

/**
 * Converts a date string from SQLite to a `Date` object.
 * @param date The date string to convert.
 * @returns A `Date` object, or null if the input was null.
 */
function fixFeedItemDate(date: string | null): Date | null {
  return date !== null ? new Date(date) : null;
}
