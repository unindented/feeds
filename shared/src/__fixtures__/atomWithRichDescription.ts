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

export const atomWithRichDescription = `<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom">
  <title>fasterthanli.me</title>
  <subtitle>amos likes to tinker</subtitle>
  <link href="https://fasterthanli.me"/>
  <link rel="self" href="https://fasterthanli.me/index.xml"/>
  <id>https://fasterthanli.me/</id>
  <updated>2025-02-07T18:53:01Z</updated>
  <author>
    <name>Amos Wenger</name>
    <uri>https://fasterthanli.me</uri>
  </author>
  <category term="programming"/>
  <category term="computers"/>
  <category term="rust"/>
  <generator>told</generator>
  <icon>https://cdn.fasterthanli.me/content/img/logo-square-2~de9d25724fcb4af8.avif</icon>

  <entry>
    <title></title>
    <link rel="alternate" href="https://fasterthanli.me/articles/the-case-for-sans-io"/>
    <id>https://fasterthanli.me/articles/the-case-for-sans-io</id>
    <updated>2025-02-07T18:53:01Z</updated>
    <summary type="html">&lt;p data-bo=&quot;208&quot;&gt;The most popular option to decompress ZIP files from the Rust programming
language is a crate simply named &lt;a href=&quot;https:&#x2f;&#x2f;lib.rs&#x2f;crates&#x2f;zip&quot; id=&quot;zip&quot;&gt;zip&lt;&#x2f;a&gt; — At the time of this writing, it has 48
million downloads. It’s fully-featured, supporting various compression methods,
encryption, and even supports writing zip files.&lt;&#x2f;p&gt;</summary>
    <category term="zip"/>
    <category term="rust"/>
    <category term="async"/>
  </entry>

  <entry>
    <title>Catching up with async Rust</title>
    <link rel="alternate" href="https://fasterthanli.me/articles/catching-up-with-async-rust"/>
    <id>https://fasterthanli.me/articles/catching-up-with-async-rust</id>
    <updated>2024-12-25T07:30:00Z</updated>
    <summary type="html">&lt;p data-bo=&quot;211&quot;&gt;In December 2023, a minor miracle happened: &lt;a href=&quot;https:&#x2f;&#x2f;blog.rust-lang.org&#x2f;2023&#x2f;12&#x2f;21&#x2f;async-fn-rpit-in-traits.html&quot;&gt;async fn in traits&lt;&#x2f;a&gt; shipped.&lt;&#x2f;p&gt;

&lt;p data-bo=&quot;354&quot;&gt;As of Rust 1.39, we already had free-standing async functions:&lt;&#x2f;p&gt;

&lt;code class=&quot;code-block&quot; translate=&quot;no&quot; data-lang=&quot;rust&quot; data-bo=&quot;418&quot;&gt;&lt;pre class=&quot;scroll-wrapper&quot;&gt;&lt;i class=hh4&gt;pub&lt;&#x2f;i&gt; &lt;i class=hh4&gt;async&lt;&#x2f;i&gt; &lt;i class=hh4&gt;fn&lt;&#x2f;i&gt; &lt;i class=hh3&gt;read_hosts&lt;&#x2f;i&gt;&lt;i class=hh8&gt;(&lt;&#x2f;i&gt;&lt;i class=hh8&gt;)&lt;&#x2f;i&gt; -&amp;gt; eyre&lt;i class=hh9&gt;::&lt;&#x2f;i&gt;&lt;i class=hh13&gt;Result&lt;&#x2f;i&gt;&lt;i class=hh8&gt;&amp;lt;&lt;&#x2f;i&gt;&lt;i class=hh13&gt;Vec&lt;&#x2f;i&gt;&lt;i class=hh8&gt;&amp;lt;&lt;&#x2f;i&gt;&lt;i class=hh14&gt;u8&lt;&#x2f;i&gt;&lt;i class=hh8&gt;&amp;gt;&lt;&#x2f;i&gt;&lt;i class=hh8&gt;&amp;gt;&lt;&#x2f;i&gt; &lt;i class=hh8&gt;{&lt;&#x2f;i&gt;
  &lt;i class=hh18&gt;&#x2f;&#x2f; etc.&lt;&#x2f;i&gt;
&lt;i class=hh8&gt;}&lt;&#x2f;i&gt;
&lt;&#x2f;pre&gt;&lt;&#x2f;code&gt;&lt;p data-bo=&quot;498&quot;&gt;…and async functions in impl blocks:&lt;&#x2f;p&gt;

&lt;code class=&quot;code-block&quot; translate=&quot;no&quot; data-lang=&quot;rust&quot; data-bo=&quot;538&quot;&gt;&lt;pre class=&quot;scroll-wrapper&quot;&gt;&lt;i class=hh4&gt;impl&lt;&#x2f;i&gt; &lt;i class=hh13&gt;HostReader&lt;&#x2f;i&gt; &lt;i class=hh8&gt;{&lt;&#x2f;i&gt;
  &lt;i class=hh4&gt;pub&lt;&#x2f;i&gt; &lt;i class=hh4&gt;async&lt;&#x2f;i&gt; &lt;i class=hh4&gt;fn&lt;&#x2f;i&gt; &lt;i class=hh3&gt;read_hosts&lt;&#x2f;i&gt;&lt;i class=hh8&gt;(&lt;&#x2f;i&gt;&lt;i class=hh5&gt;&amp;amp;&lt;&#x2f;i&gt;&lt;i class=hh16&gt;self&lt;&#x2f;i&gt;&lt;i class=hh8&gt;)&lt;&#x2f;i&gt; -&amp;gt; eyre&lt;i class=hh9&gt;::&lt;&#x2f;i&gt;&lt;i class=hh13&gt;Result&lt;&#x2f;i&gt;&lt;i class=hh8&gt;&amp;lt;&lt;&#x2f;i&gt;&lt;i class=hh13&gt;Vec&lt;&#x2f;i&gt;&lt;i class=hh8&gt;&amp;lt;&lt;&#x2f;i&gt;&lt;i class=hh14&gt;u8&lt;&#x2f;i&gt;&lt;i class=hh8&gt;&amp;gt;&lt;&#x2f;i&gt;&lt;i class=hh8&gt;&amp;gt;&lt;&#x2f;i&gt; &lt;i class=hh8&gt;{&lt;&#x2f;i&gt;
    &lt;i class=hh18&gt;&#x2f;&#x2f; etc.&lt;&#x2f;i&gt;
  &lt;i class=hh8&gt;}&lt;&#x2f;i&gt;
&lt;i class=hh8&gt;}&lt;&#x2f;i&gt;
&lt;&#x2f;pre&gt;&lt;&#x2f;code&gt;&lt;p data-bo=&quot;655&quot;&gt;But we did not have async functions in traits:&lt;&#x2f;p&gt;
</summary>
    <category term="rust"/>
    <category term="async"/>
    <category term="traits"/>
  </entry>
</feed>`;
