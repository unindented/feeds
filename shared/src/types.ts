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

/**
 * Represents the root structure of an OPML document.
 */
export interface OpmlDocument {
  opml: {
    body: OpmlOutlineGroup;
  };
}

/**
 * Represents a collection of OPML outlines, which can be either groups or
 * items.
 */
export type OpmlOutline = (OpmlOutlineGroup | OpmlOutlineItem)[];

/**
 * Represents a group of OPML outlines that can contain other groups or items.
 */
export interface OpmlOutlineGroup {
  text?: string;
  outline: OpmlOutline;
}

/**
 * Represents a single RSS feed in an OPML outline.
 */
export interface OpmlOutlineItem {
  text?: string;
  type: "rss";
  htmlUrl: string;
  xmlUrl: string;
}

/**
 * Represents a simplified feed structure with essential properties.
 */
export interface SimpleFeed {
  id: string;
  htmlUrl: string;
  xmlUrl: string;
  title: string;
  path: string | null;
}

/**
 * Represents a simplified feed item with essential content and metadata.
 */
export interface SimpleFeedItem {
  id: string;
  htmlUrl: string;
  title: string;
  summary: string | null;
  published: Date | null;
  updated: Date | null;
  feedId: SimpleFeed["id"];
}

/**
 * Represents a feed item as stored in SQLite, with dates as strings.
 */
export interface SqliteFeedItem
  extends Omit<SimpleFeedItem, "id" | "published" | "updated"> {
  published: string | null;
  updated: string | null;
}
