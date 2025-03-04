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

import { feedPathSeparator } from "@feeds/shared/constants.ts";

import type {
  FeedOutline,
  FeedOutlineGroup,
  FeedOutlineItem,
} from "./types.ts";

/**
 * Transforms a flat array of feed items into a hierarchical tree structure
 * based on their path properties.
 * @param feeds Array of feed items to be organized into a hierarchical
 * structure.
 * @returns A root group object containing the hierarchical organization of all
 * feeds.
 */
export function groupFeeds(feeds: FeedOutlineItem[]): FeedOutlineGroup {
  const root = { outline: [] };

  for (const feed of feeds) {
    const pathSegments = feed.data.path?.split(feedPathSeparator) ?? [];
    insertFeedIntoOutline(root.outline, pathSegments, feed);
  }

  return root;
}

/**
 * Recursively inserts a feed item into the appropriate position in the outline
 * structure based on its path segments.
 * @param outline The current outline array to insert the feed item into.
 * @param pathSegments Array of path segments representing the hierarchical
 * location where the feed should be placed.
 * @param feedItem The feed item to insert into the outline.
 */
function insertFeedIntoOutline(
  outline: FeedOutline,
  pathSegments: string[],
  feedItem: FeedOutlineItem,
): void {
  const [currentSegment, ...remainingSegments] = pathSegments;

  if (currentSegment === undefined) {
    outline.push(feedItem);
    return;
  }

  let outlineGroup = outline
    .filter((node) => isFeedOutlineGroup(node))
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
 * Type guard to determine if an outline node is a group.
 * @param node The node to check.
 * @returns True if the node is a group (has an outline property), false
 * otherwise.
 */
export function isFeedOutlineGroup(
  node: FeedOutlineGroup | FeedOutlineItem,
): node is FeedOutlineGroup {
  return Object.hasOwn(node, "outline");
}
