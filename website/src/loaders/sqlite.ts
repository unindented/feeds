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

import { existsSync } from "node:fs";
import { DatabaseSync, type DatabaseSyncOptions } from "node:sqlite";
import { fileURLToPath } from "node:url";

import type { Loader, LoaderContext } from "astro/loaders";

import { posixRelative } from "./utils.ts";

export interface SqliteOptions {
  /** Configuration options for the database connection. */
  syncOptions?: DatabaseSyncOptions;
  /** The operation to run against the database. */
  operation: (
    db: DatabaseSync,
  ) => Record<string, Record<string, unknown>> | Record<string, unknown>[];
}

/**
 * Loads entries from a SQLite database.
 * @param fileName The path to the SQLite database to load, relative to the
 * content directory.
 * @param options Additional options for the loader.
 */
export function sqlite(fileName: string, options: SqliteOptions): Loader {
  const { syncOptions, operation } = options;

  async function syncData(
    filePath: string,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    { logger, parseData, store, config }: LoaderContext,
  ): Promise<void> {
    let data:
      | Record<string, unknown>[]
      | Record<string, Record<string, unknown>>;

    try {
      const db = new DatabaseSync(filePath, syncOptions);
      data = operation(db);
    } catch (error: unknown) {
      logger.error(`Error reading data from ${fileName}`);
      logger.debug(error instanceof Error ? error.message : String(error));
      return;
    }

    const normalizedFilePath = posixRelative(
      fileURLToPath(config.root),
      filePath,
    );

    if (Array.isArray(data)) {
      if (data.length === 0) {
        logger.warn(`No items found in ${fileName}`);
      }
      logger.debug(`Found ${String(data.length)} item array in ${fileName}`);
      store.clear();
      for (const rawItem of data) {
        const id = (rawItem.id ?? rawItem.slug)?.toString();
        if (id === undefined) {
          logger.error(`Item in ${fileName} is missing an id or slug field.`);
          continue;
        }
        // eslint-disable-next-line no-await-in-loop
        const parsedData = await parseData({ id, data: rawItem, filePath });
        store.set({ id, data: parsedData, filePath: normalizedFilePath });
      }
    } else if (typeof data === "object") {
      const entries = Object.entries<Record<string, unknown>>(data);
      logger.debug(
        `Found object with ${String(entries.length)} entries in ${fileName}`,
      );
      store.clear();
      for (const [id, rawItem] of entries) {
        // eslint-disable-next-line no-await-in-loop
        const parsedData = await parseData({ id, data: rawItem, filePath });
        store.set({ id, data: parsedData, filePath: normalizedFilePath });
      }
    } else {
      logger.error(`Invalid data in ${fileName}. Must be an array or object.`);
    }
  }

  return {
    name: "sqlite-loader",
    load: async (context): Promise<void> => {
      const { config, logger, watcher } = context;
      logger.debug(`Loading data from ${fileName}`);

      const url = new URL(fileName, config.root);
      if (!existsSync(url)) {
        logger.error(`File not found: ${fileName}`);
        return;
      }

      const filePath = fileURLToPath(url);
      await syncData(filePath, context);

      watcher?.add(filePath);

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      watcher?.on("change", async (changedPath) => {
        if (changedPath === filePath) {
          logger.info(`Reloading data from ${fileName}`);
          await syncData(filePath, context);
        }
      });
    },
  };
}
