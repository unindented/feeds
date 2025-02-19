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

export const opmlDeepNesting = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.1">
  <head>
    <title>My feeds</title>
  </head>
  <body>
    <outline text="Technology">
      <outline text="Web Development">
        <outline text="Lea Verou" type="rss" htmlUrl="https://lea.verou.me/" xmlUrl="https://lea.verou.me/feed.xml"/>
        <outline text="Accessibility">
          <outline text="Léonie Watson" type="rss" htmlUrl="https://tink.uk/" xmlUrl="https://tink.uk/feed.xml"/>
        </outline>
      </outline>
    </outline>
  </body>
</opml>
`;
