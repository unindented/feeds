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

import { resolve } from "node:path";
import { argv } from "node:process";

import { assert } from "@feeds/shared/assert.ts";
import { Listr } from "listr2";

import {
  closeDatabaseTask,
  createTablesTask,
  openDatabaseTask,
  replaceFeedItemsTask,
  replaceFeedsTask,
} from "./tasks/sqlite.ts";
import type { TasksContext } from "./tasks/types.ts";
import {
  flattenFeedsTask,
  readFeedsTask,
  readOpmlFileTask,
} from "./tasks/xml.ts";

const [, , opmlFileArg, sqliteFileArg] = argv;
await main(resolve(assert(opmlFileArg)), resolve(assert(sqliteFileArg)));

/**
 * Main function that orchestrates the feed refresh process. Reads feeds from an
 * OPML file and updates a SQLite database with the latest feed data.
 * @param opmlFilePath Path to the OPML file containing feed subscriptions.
 * @param sqliteFilePath Path to the SQLite database file to update.
 * @returns Promise that resolves when the refresh process is complete.
 */
async function main(
  opmlFilePath: string,
  sqliteFilePath: string,
): Promise<void> {
  const tasks = new Listr<TasksContext>(
    [
      readOpmlFileTask(),
      flattenFeedsTask(),
      readFeedsTask(),
      openDatabaseTask(),
      createTablesTask(),
      replaceFeedsTask(),
      replaceFeedItemsTask(),
      closeDatabaseTask(),
    ],
    {
      ctx: {
        opmlFilePath,
        opmlDocument: null,
        feeds: [],
        feedItems: [],
        sqliteFilePath,
        sqliteDatabase: null,
      },
      collectErrors: "minimal",
      exitOnError: false,
      renderer: "default",
      rendererOptions: { showErrorMessage: false },
    },
  );

  await tasks.run();

  if (tasks.errors.length > 0) {
    console.error("\nThe following errors occurred:");
    for (const error of tasks.errors) {
      console.error("-", error.path.join(" > "), "::", error.message);
    }
  }
}
