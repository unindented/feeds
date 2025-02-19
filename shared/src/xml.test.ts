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

import { fs, vol } from "memfs";
import type { MockInstance } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { atomWithRelativeUrls } from "./__fixtures__/atomWithRelativeUrls.ts";
import { atomWithRichDescription } from "./__fixtures__/atomWithRichDescription.ts";
import { opmlDeepNesting } from "./__fixtures__/opmlDeepNesting.ts";
import { opmlNoNesting } from "./__fixtures__/opmlNoNesting.ts";
import { opmlShallowNesting } from "./__fixtures__/opmlShallowNesting.ts";
import { opmlUntitledOutlines } from "./__fixtures__/opmlUntitledOutlines.ts";
import { rssWithDescriptionAndContent } from "./__fixtures__/rssWithDescriptionAndContent.ts";
import { rssWithoutDescriptionOrContent } from "./__fixtures__/rssWithoutDescriptionOrContent.ts";
import { rssWithPlainDescription } from "./__fixtures__/rssWithPlainDescription.ts";
import { rssWithRichDescription } from "./__fixtures__/rssWithRichDescription.ts";
import type { SimpleFeed } from "./types.ts";
import { flattenFeeds, readFeed, readOpmlFile, unflattenFeeds } from "./xml.ts";

vi.mock("node:fs");
vi.mock("node:fs/promises");

interface XmlTestEachColumns {
  name: string;
  sourceContent: string;
}

describe("readOpmlFile", () => {
  beforeEach(() => {
    vol.reset();
  });

  it.each`
    name                                                  | sourceContent
    ${"parses an OPML file without nested outlines"}      | ${opmlNoNesting}
    ${"parses an OPML file with shallow nested outlines"} | ${opmlShallowNesting}
    ${"parses an OPML file with deep nested outlines"}    | ${opmlDeepNesting}
    ${"parses an OPML file with untitled outlines"}       | ${opmlUntitledOutlines}
  `("$name", async ({ sourceContent }: XmlTestEachColumns) => {
    const path = "/foobar.opml";
    await fs.promises.writeFile(path, sourceContent);

    await expect(readOpmlFile(path)).resolves.toMatchSnapshot();
  });
});

describe("flattenFeeds", () => {
  beforeEach(() => {
    vol.reset();
  });

  it.each`
    name                                                                  | sourceContent
    ${"gathers feeds from an OPML document without nested outlines"}      | ${opmlNoNesting}
    ${"gathers feeds from an OPML document with shallow nested outlines"} | ${opmlShallowNesting}
    ${"gathers feeds from an OPML document with deep nested outlines"}    | ${opmlDeepNesting}
    ${"gathers feeds from an OPML document with untitled outlines"}       | ${opmlUntitledOutlines}
  `("$name", async ({ sourceContent }: XmlTestEachColumns) => {
    const path = "/foobar.opml";
    await fs.promises.writeFile(path, sourceContent);

    const opmlDocument = await readOpmlFile(path);

    expect(flattenFeeds(opmlDocument)).toMatchSnapshot();
  });
});

describe("unflattenFeeds", () => {
  beforeEach(() => {
    vol.reset();
  });

  it.each`
    name                                                        | sourceContent
    ${"rebuilds an OPML document without nested outlines"}      | ${opmlNoNesting}
    ${"rebuilds an OPML document with shallow nested outlines"} | ${opmlShallowNesting}
    ${"rebuilds an OPML document with deep nested outlines"}    | ${opmlDeepNesting}
  `("$name", async ({ sourceContent }: XmlTestEachColumns) => {
    const path = "/foobar.opml";
    await fs.promises.writeFile(path, sourceContent);

    const opmlDocument = await readOpmlFile(path);

    expect(unflattenFeeds(flattenFeeds(opmlDocument)).opml.body).toStrictEqual(
      opmlDocument.opml.body,
    );
  });
});

describe("readFeed", () => {
  let fetchSpy: MockInstance<typeof global.fetch>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, "fetch");
  });

  it.each`
    name                                                             | sourceContent
    ${"reads an RSS feed with items without description or content"} | ${rssWithoutDescriptionOrContent}
    ${"reads an RSS feed with items with plain description"}         | ${rssWithPlainDescription}
    ${"reads an RSS feed with items with rich description"}          | ${rssWithRichDescription}
    ${"reads an RSS feed with items with description and content"}   | ${rssWithDescriptionAndContent}
    ${"reads an Atom feed with items with rich description"}         | ${atomWithRichDescription}
    ${"reads an Atom feed with relative URLs"}                       | ${atomWithRelativeUrls}
  `("$name", async ({ sourceContent }: XmlTestEachColumns) => {
    fetchSpy.mockResolvedValue(new Response(sourceContent));

    const feed: SimpleFeed = {
      id: "example-com",
      htmlUrl: "https://example.com",
      xmlUrl: "https://example.com/index.xml",
      title: "Example",
      path: null,
    };

    await expect(readFeed(feed)).resolves.toMatchSnapshot();
  });
});
