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

export const rssWithDescriptionAndContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
  xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
  >

  <channel>
    <title>Krebs on Security</title>
    <atom:link href="https://krebsonsecurity.com/feed/" rel="self" type="application/rss+xml" />
    <link>https://krebsonsecurity.com</link>
    <description>In-depth security news and investigation</description>
    <lastBuildDate>Tue, 18 Feb 2025 18:37:26 +0000</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <generator>https://wordpress.org/?v=6.2.2</generator>

    <item>
      <title>How Phished Data Turns into Apple &#038; Google Wallets</title>
      <link>https://krebsonsecurity.com/2025/02/how-phished-data-turns-into-apple-google-wallets/</link>
      <comments>https://krebsonsecurity.com/2025/02/how-phished-data-turns-into-apple-google-wallets/#comments</comments>
      <dc:creator><![CDATA[BrianKrebs]]></dc:creator>
      <pubDate>Tue, 18 Feb 2025 18:37:26 +0000</pubDate>
      <category><![CDATA[apple]]></category>
      <category><![CDATA[google]]></category>
      <guid isPermaLink="false">https://krebsonsecurity.com/?p=70276</guid>
      <description><![CDATA[Carding -- the underground business of stealing, selling and swiping stolen payment card data -- has long been the dominion of Russia-based hackers. Happily, the broad deployment of more secure chip-based payment cards in the United States has weakened the carding market. But a flurry of innovation from cybercrime groups in China is breathing new life into the carding industry, by turning phished card data into mobile wallets that can be used online and at main street stores.]]></description>
      <content:encoded><![CDATA[<p>Carding &#8212; the underground business of stealing, selling and swiping stolen payment card data &#8212; has long been the dominion of Russia-based hackers. Happily, the broad deployment of more secure chip-based payment cards in the United States has weakened the carding market. But a flurry of innovation from cybercrime groups in China is breathing new life into the carding industry, by turning phished card data into mobile wallets that can be used online and at main street stores.</p>
<div id="attachment_70443" style="width: 490px" class="wp-caption aligncenter"><img aria-describedby="caption-attachment-70443" decoding="async" class="size-full wp-image-70443" src="https://krebsonsecurity.com/wp-content/uploads/2025/02/tollpassphishing.png" alt="" width="480" height="630" /><p id="caption-attachment-70443" class="wp-caption-text">An image from one Chinese phishing group&#8217;s Telegram channel shows various toll road phish kits available.</p></div>
<p>If you own a mobile phone, the chances are excellent that at some point in the past two years it has received at least one phishing message that spoofs the <strong>U.S. Postal Service</strong> to supposedly collect some outstanding delivery fee, or an SMS that pretends to be a local toll road operator warning of a delinquent toll fee.</p>
]]></content:encoded>
      <wfw:commentRss>https://krebsonsecurity.com/2025/02/how-phished-data-turns-into-apple-google-wallets/feed/</wfw:commentRss>
      <slash:comments>23</slash:comments>
    </item>

    <item>
      <title>Nearly a Year Later, Mozilla is Still Promoting OneRep</title>
      <link>https://krebsonsecurity.com/2025/02/nearly-a-year-later-mozilla-is-still-promoting-onerep/</link>
      <comments>https://krebsonsecurity.com/2025/02/nearly-a-year-later-mozilla-is-still-promoting-onerep/#comments</comments>
      <dc:creator><![CDATA[BrianKrebs]]></dc:creator>
      <pubDate>Thu, 13 Feb 2025 20:14:47 +0000</pubDate>
      <category><![CDATA[firefox]]></category>
      <category><![CDATA[mozilla]]></category>
      <guid isPermaLink="false">https://krebsonsecurity.com/?p=70392</guid>
      <description><![CDATA[In mid-March 2024, KrebsOnSecurity revealed that the founder of the personal data removal service Onerep also founded dozens of people-search companies. Shortly after that investigation was published, Mozilla said it would stop bundling Onerep with the Firefox browser and wind down its partnership. But nearly a year later, Mozilla is still promoting it to Firefox users.]]></description>
      <content:encoded><![CDATA[<p>In mid-March 2024, KrebsOnSecurity revealed that the founder of the personal data removal service <strong>Onerep</strong> also founded dozens of people-search companies. Shortly after that investigation was published, <strong>Mozilla</strong> said it would stop bundling Onerep with the <strong>Firefox</strong> browser and wind down its partnership with the company. But nearly a year later, Mozilla is still promoting it to Firefox users.</p>
<p>Mozilla offers Onerep to Firefox users on a subscription basis as part of <a href="https://www.mozilla.org/en-US/about/legal/terms/subscription-services/" target="_blank" rel="noopener">Mozilla Monitor Plus</a>. Launched in 2018 under the name <a href="https://en.wikipedia.org/wiki/Firefox_Monitor" target="_blank" rel="noopener">Firefox Monitor</a>, Mozilla Monitor also checks data from the website <a href="https://haveibeenpwned.com/" target="_blank" rel="noopener">Have I Been Pwned?</a> to let users know when their email addresses or password are leaked in data breaches.</p>
<p>The ink on that partnership agreement had barely dried before KrebsOnSecurity <a href="https://krebsonsecurity.com/2024/03/ceo-of-data-privacy-company-onerep-com-founded-dozens-of-people-search-firms/" target="_blank" rel="noopener">published a story</a> showing that Onerep’s Belarusian CEO and founder <strong>Dimitiri Shelest</strong> launched dozens of people-search services since 2010, including a still-active data broker called <strong>Nuwber</strong> that sells background reports on people. This seemed to contradict Onerep&#8217;s stated motto, &#8220;We believe that no one should compromise personal online security and get a profit from it.”</p>
]]></content:encoded>
      <wfw:commentRss>https://krebsonsecurity.com/2025/02/nearly-a-year-later-mozilla-is-still-promoting-onerep/feed/</wfw:commentRss>
      <slash:comments>13</slash:comments>
    </item>
  </channel>
</rss>`;
