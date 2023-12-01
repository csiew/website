import path from "path";
import RSS from "rss";
import { siteUrl } from "./@types";
import fetchBlogPosts from "./fetch-blog-posts";

const baseUrl = `https://${siteUrl}`;

export const rssConfig = {
  title: "Clarence Siew",
  description: "Clarence Siew's website",
  feed_url: path.join(baseUrl, "rss.xml"),
  site_url: baseUrl
};

export default async function generateRssFeed() {
  const feed = new RSS(rssConfig);
  const items = await fetchBlogPosts();
  console.debug({ items });
  items.forEach((item: any) => feed.item(item));

  return feed;
}
