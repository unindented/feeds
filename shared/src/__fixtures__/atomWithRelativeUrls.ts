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

export const atomWithRelativeUrls = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title></title>
  <subtitle>Recent content from Josh Ghent&#39;s blog</subtitle>
  <link href="https://joshghent.com/rss.xml" rel="self"/>
  <link href=""/>
  <updated>2025-01-09T00:00:00Z</updated>
  <id></id>
  <author>
    <name></name>
    <email></email>
  </author>
  
  <entry>
    <title>Event Driven Architecture Rules of Thumb</title>
    <link href="/eda-rules-of-thumb/"/>
    <updated>2025-01-09T00:00:00Z</updated>
    <id>/eda-rules-of-thumb/</id>
    <content type="html">&lt;p&gt;Event driven architectures are a fantastic mechanism for powering decoupled services. But they depend on the contract - the actual data points within each event.
As with these sorts of things, there is always an &amp;quot;it depends&amp;quot; of what data should go within events. Therefore, this guide is not prescriptive and should be followed as a &amp;quot;rules of thumb&amp;quot; - guiding principles, not rules.&lt;/p&gt;</content>
  </entry>
  
  <entry>
    <title>ClickOps and IaC - which are Pets and Cattle?</title>
    <link href="/pets-vs-cattle/"/>
    <updated>2025-01-08T00:00:00Z</updated>
    <id>/pets-vs-cattle/</id>
    <content type="html">&lt;p&gt;Ancient history tells us that a peoples known as the &amp;quot;sysadmins&amp;quot; or &amp;quot;web masters&amp;quot; used to manually configure servers via the archaic command line. These people literally SSH&#39;ed into machines and ran commands on them. Utter animals.&lt;/p&gt;</content>
  </entry>
</feed>
`;
