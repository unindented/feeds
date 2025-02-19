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

import { readFile } from "node:fs/promises";

import { parseFeed } from "@rowanmanning/feed-parser";
import type { FeedItem } from "@rowanmanning/feed-parser/lib/feed/item/base.js";
import { XMLParser as XmlParser } from "fast-xml-parser";

import { assert } from "./assert.ts";
import { feedItemSummaryMaxLength, feedPathSeparator } from "./constants.ts";
import { truncateAtWord } from "./string.ts";
import type {
  OpmlDocument,
  OpmlOutline,
  OpmlOutlineGroup,
  OpmlOutlineItem,
  SimpleFeed,
  SimpleFeedItem,
} from "./types.ts";

/**
 * Reads and parses an OPML file from the filesystem.
 * @param opmlFilePath Path to the OPML file to read.
 * @returns Promise that resolves with the parsed OPML document.
 */
export async function readOpmlFile(
  opmlFilePath: string,
): Promise<OpmlDocument> {
  const data = await readFile(opmlFilePath, "utf8");

  const parser = new XmlParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    isArray: (tagName): boolean => tagName === "outline",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return parser.parse(data) as OpmlDocument;
}

/**
 * Extracts a flat list of feeds from a hierarchical OPML document.
 * @param opmlDocument The OPML document to process.
 * @returns Array of simplified feed objects with their paths preserved.
 */
export function flattenFeeds(opmlDocument: OpmlDocument): SimpleFeed[] {
  const feeds: SimpleFeed[] = [];

  walkOpmlOutline(
    opmlDocument.opml.body.outline,
    null,
    (opmlOutlineItem, path) => {
      feeds.push({
        id: getFeedIdFromUrl(opmlOutlineItem.htmlUrl),
        htmlUrl: opmlOutlineItem.htmlUrl,
        xmlUrl: opmlOutlineItem.xmlUrl,
        title: opmlOutlineItem.text ?? "Untitled",
        path,
      });
    },
  );

  return feeds;
}

/**
 * Creates a hierarchical OPML document from a flat list of feeds. This function
 * is the inverse of `flattenFeeds`.
 * @param feeds Array of simplified feed objects with path information.
 * @returns An OPML document with the feeds organized in their hierarchy.
 */
export function unflattenFeeds(feeds: SimpleFeed[]): OpmlDocument {
  const opmlDocument: OpmlDocument = {
    opml: {
      body: {
        outline: [],
      },
    },
  };

  for (const feed of feeds) {
    const pathSegments = feed.path?.split(feedPathSeparator) ?? [];
    insertFeedIntoOutline(opmlDocument.opml.body.outline, pathSegments, {
      text: feed.title,
      type: "rss",
      htmlUrl: feed.htmlUrl,
      xmlUrl: feed.xmlUrl,
    });
  }

  return opmlDocument;
}

/**
 * Fetches and parses a feed from its XML URL.
 * @param feed The feed to read.
 * @returns Promise that resolves with an array of feed items.
 */
export async function readFeed(feed: SimpleFeed): Promise<SimpleFeedItem[]> {
  const response = await fetch(feed.xmlUrl);
  const feedSource = await response.text();
  const feedContents = parseFeed(feedSource);

  return feedContents.items.map((item) => {
    const url = getFeedItemUrl(item);
    return {
      id: url,
      htmlUrl: url,
      title: getFeedItemTitle(item),
      summary: getFeedItemSummary(item),
      published: item.published ?? item.updated,
      updated: item.updated,
      feedId: feed.id,
    };
  });
}

/**
 * Recursively walks through an OPML outline structure, calling a callback for
 * each feed item.
 * @param node The current node in the OPML structure.
 * @param path The current path in the hierarchy, or null for root level.
 * @param callback Function to call for each feed item encountered.
 */
function walkOpmlOutline(
  node: OpmlOutline | OpmlOutlineGroup | OpmlOutlineItem,
  path: string | null,
  callback: (node: OpmlOutlineItem, path: string | null) => void,
): void {
  if (Array.isArray(node)) {
    for (const n of node) {
      walkOpmlOutline(n, path, callback);
    }
  } else if (isOpmlOutlineGroup(node)) {
    const newPath = `${path !== null ? path + feedPathSeparator : ""}${node.text ?? "Untitled"}`;
    walkOpmlOutline(node.outline, newPath, callback);
  } else {
    callback(node, path);
  }
}

/**
 * Recursively inserts a feed into the correct place in the outline structure.
 * @param outline The current outline level to process.
 * @param pathSegments Remaining path segments to process.
 * @param feedItem The feed item to insert at the target location.
 */
function insertFeedIntoOutline(
  outline: OpmlOutline,
  pathSegments: string[],
  feedItem: OpmlOutlineItem,
): void {
  const [currentSegment, ...remainingSegments] = pathSegments;

  if (currentSegment === undefined) {
    outline.push(feedItem);
    return;
  }

  let outlineGroup = outline
    .filter((node) => isOpmlOutlineGroup(node))
    .find((node) => node.text === currentSegment);

  if (outlineGroup === undefined) {
    outlineGroup = {
      text: currentSegment,
      outline: [],
    };
    outline.push(outlineGroup);
  }

  insertFeedIntoOutline(outlineGroup.outline, remainingSegments, feedItem);
}

/**
 * Type guard to determine if an OPML outline node is a group.
 * @param node The node to check.
 * @returns True if the node is a group (has an `outline` property), false
 * otherwise.
 */
function isOpmlOutlineGroup(
  node: OpmlOutlineGroup | OpmlOutlineItem,
): node is OpmlOutlineGroup {
  return Object.hasOwn(node, "outline");
}

/**
 * Generates a unique feed ID from its URL.
 * @param url The feed's URL.
 * @returns A normalized string suitable for use as an ID.
 */
function getFeedIdFromUrl(url: string): string {
  const parsedUrl = assert(URL.parse(url));
  return parsedUrl.hostname
    .toLowerCase()
    .replace(/^www\./u, "")
    .replace(/[^0-9a-z]+/gu, "-");
}

/**
 * Gets the absolute URL for a feed item, handling both absolute and relative
 * URLs.
 * @param item The feed item.
 * @returns The absolute URL for the item.
 * @throws {Error} If the item URL or feed self URL is missing or invalid.
 */
function getFeedItemUrl(item: FeedItem): string {
  const itemUrl = assert(item.url);

  // If URL is absolute, we can return it as is.
  if (URL.canParse(itemUrl)) {
    return itemUrl;
  }

  // If it's relative, let's try to concat it with the origin of `self`.
  const selfUrl = assert(item.feed.self);
  const parsedSelfUrl = assert(URL.parse(selfUrl));
  return parsedSelfUrl.origin + itemUrl;
}

/**
 * Returns a title for a feed item.
 * @param item The feed item.
 * @returns A plain text title, or `Untitled` if no title is available.
 */
function getFeedItemTitle(item: FeedItem): string {
  const titleWithoutTags = item.title !== null ? removeTags(item.title) : null;
  return titleWithoutTags ?? "Untitled";
}

/**
 * Returns a summary for a feed item, based on its description or content.
 * @param item The feed item.
 * @returns A truncated plain text summary, or null if no content is available.
 */
function getFeedItemSummary(item: FeedItem): string | null {
  const descriptionOrContent = item.description ?? item.content;

  if (descriptionOrContent === null) {
    return null;
  }

  return truncateAtWord(
    removeTags(descriptionOrContent),
    feedItemSummaryMaxLength,
    { ending: "…" },
  );
}

/**
 * Removes HTML tags from a string, and normalizes whitespace.
 * @param str The input string containing HTML tags.
 * @returns A clean string with all HTML tags removed, consecutive whitespace
 * characters replaced with a single space, and trimmed of leading/trailing
 * whitespace.
 */
function removeTags(str: string): string {
  return str
    .replace(/<[^>]*?>/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
}
