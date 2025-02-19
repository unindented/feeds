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

export const rssWithPlainDescription = `<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
<rss version="2.0">
  <channel>
    <title>Nicholas Carlini</title>
    <image>
      <url>https://nicholas.carlini.com/nicholas.jpg</url>
    </image>
    <link>https://nicholas.carlini.com/</link>
    <updated>
      2025-02-10T00:00:00+00:00
    </updated>
    <author>
      <name>
        Nicholas Carlini
      </name>
    </author>
    <description>Nicholas writes things.</description>

    <item>
      <title>AI forecasting retrospective: you're (probably) over-confident</title>
      <link>https://nicholas.carlini.com/writing/2025/forecasting-ai-2025-update.html</link>
      <updated>2025-02-10T00:00:00+00:00</updated>
      <pubDate>2025-02-10T00:00:00+00:00</pubDate>
      <description>Late last year, I published an article asking readers to make 30 forecasts about the future of AI in 2027 and 2030—from whether or not you could buy a robot to do your laundry, to predicting the valuation of leading AI labs, to estimating the likelihood of an AI-caused catastrophe.</description>
    </item>

    <item>
      <title>Regex Chess: A 2-ply minimax chess engine in 84,688 regular expressions</title>
      <link>https://nicholas.carlini.com/writing/2025/regex-chess.html</link>
      <updated>2025-01-06T00:00:00+00:00</updated>
      <pubDate>2025-01-06T00:00:00+00:00</pubDate>
      <description>Over the holidays I decided it's been too long since I did something with entirely no purpose. So without further ado, I present to you ... Regex Chess: sequence of 84,688 regular expressions that, when executed in order, will play a (valid; not entirely terrible) move given a chess board as input.</description>
    </item>
  </channel>
</rss>`;
