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
import { flattenFeeds, readFeed, readOpmlFile } from "@feeds/shared/xml.ts";
import type { Listr, ListrTask } from "listr2";

import type { TasksContext } from "./types.ts";

const feedsTaskConcurrency = 10;

/**
 * Creates a task that reads and parses an OPML file.
 * @returns A Listr task that updates the context with the parsed OPML document.
 */
export function readOpmlFileTask(): ListrTask<TasksContext> {
  return {
    title: "Reading OPML file",
    task: async (ctx): Promise<void> => {
      ctx.opmlDocument = await readOpmlFile(ctx.opmlFilePath);
    },
  };
}

/**
 * Creates a task that flattens the OPML document into a list of feeds.
 * @returns A Listr task that updates the context with the flattened feed list.
 */
export function flattenFeedsTask(): ListrTask<TasksContext> {
  return {
    title: "Gathering feeds",
    task: ({ opmlDocument, feeds }): void => {
      feeds.push(...flattenFeeds(assert(opmlDocument)));
    },
  };
}

/**
 * Creates a task that reads all feeds in parallel to fetch their latest items.
 * @returns A Listr task that updates the context with feed items from all
 * feeds.
 */
export function readFeedsTask(): ListrTask<TasksContext> {
  return {
    title: "Reading feeds",
    task: ({ feeds, feedItems }, task): Listr<TasksContext> => {
      const subtasks: ListrTask<TasksContext>[] = feeds.map((feed) => ({
        title: feed.xmlUrl,
        task: async (): Promise<void> => {
          feedItems.push(...(await readFeed(feed)));
        },
        retry: 2,
      }));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return task.newListr<TasksContext>(subtasks, {
        concurrent: feedsTaskConcurrency,
        collectErrors: "minimal",
        exitOnError: false,
      });
    },
  };
}
