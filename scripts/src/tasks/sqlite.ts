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

import { assert } from "@feeds/shared/assert.ts";
import {
  createTables,
  openDatabase,
  replaceFeedItems,
  replaceFeeds,
} from "@feeds/shared/sqlite.ts";
import type { ListrTask } from "listr2";

import type { TasksContext } from "./types.ts";

/**
 * Creates a task that opens the SQLite database connection.
 * @returns A Listr task that updates the context with an open database
 * connection.
 */
export function openDatabaseTask(): ListrTask<TasksContext> {
  return {
    title: "Opening database",
    task: (ctx): void => {
      ctx.sqliteDatabase = openDatabase(ctx.sqliteFilePath);
    },
  };
}

/**
 * Creates a task that closes the SQLite database connection.
 * @returns A Listr task that closes the database connection in the context.
 */
export function closeDatabaseTask(): ListrTask<TasksContext> {
  return {
    title: "Closing database",
    task: (ctx): void => {
      ctx.sqliteDatabase?.close();
    },
  };
}

/**
 * Creates a task that initializes the database schema.
 * @returns A Listr task that creates the necessary database tables.
 */
export function createTablesTask(): ListrTask<TasksContext> {
  return {
    title: "Creating tables",
    task: ({ sqliteDatabase }): void => {
      createTables(assert(sqliteDatabase));
    },
  };
}

/**
 * Creates a task that updates the feeds table with the latest feed data.
 * @returns A Listr task that replaces all feed records in the database.
 */
export function replaceFeedsTask(): ListrTask<TasksContext> {
  return {
    title: "Replacing feeds",
    task: ({ sqliteDatabase, feeds }): void => {
      replaceFeeds(assert(sqliteDatabase), assert(feeds));
    },
  };
}

/**
 * Creates a task that updates the feed items table with the latest items.
 * @returns A Listr task that replaces all feed item records in the database.
 */
export function replaceFeedItemsTask(): ListrTask<TasksContext> {
  return {
    title: "Replacing feed items",
    task: ({ sqliteDatabase, feedItems }): void => {
      replaceFeedItems(assert(sqliteDatabase), assert(feedItems));
    },
  };
}
