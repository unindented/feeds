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

export const opmlShallowNesting = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.1">
  <head>
    <title>My feeds</title>
  </head>
  <body>
    <outline text="Rust">
      <outline text="Amos Wenger" type="rss" htmlUrl="https://fasterthanli.me/" xmlUrl="https://fasterthanli.me/index.xml"/>
      <outline text="Rain" type="rss" htmlUrl="https://sunshowers.io/" xmlUrl="https://sunshowers.io/index.xml"/>
    </outline>
  </body>
</opml>
`;
