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

export const rssWithoutDescriptionOrContent = `<?xml version="1.0"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel> 
    <title>Fabien Sanglard</title>
    <atom:link href="https://fabiensanglard.net/rss.xml" rel="self" type="application/rss+xml" />
    <link>https://fabiensanglard.net</link>
    <description>Chronicles of software wizardry</description>
    <language>en-us</language>

    <item>
      <title>Watching sunsets</title>
      <guid>https://fabiensanglard.net/sunset/index.html</guid>
      <link>https://fabiensanglard.net/sunset/index.html</link>
      <pubDate>18 Aug 2024 00:00:00 +0000</pubDate>
    </item>

    <item>
      <title>SNES: Sprites and backgrounds rendering</title>
      <guid>https://fabiensanglard.net/snes_ppus_why/index.html</guid>
      <link>https://fabiensanglard.net/snes_ppus_why/index.html</link>
      <pubDate>09 Aug 2024 00:00:00 +0000</pubDate>
    </item>
 </channel>
</rss>`;
