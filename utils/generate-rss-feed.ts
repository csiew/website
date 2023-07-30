import path from "path";
import { Pool, PoolConfig } from "pg";
import RSS from "rss";
import config from "../config";

export default async function generateRssFeed(
  title: string,
  description: string,
  feedPath: string[]
) {
  const siteURL = "clarencesiew.com";
  const pool = new Pool(config.database as PoolConfig);
  const result = await pool.query("SELECT * FROM item WHERE content_type = 'blog_post';");
  const posts = result.rows
    .map((post) => ({
      title: post.body.title,
      description: post.body.subtitle,
      url: `https://${siteURL}/posts/${post.body.urlSlug}`,
      guid: post.body.urlSlug,
      date: new Date(post.body.publishedAt)
    }))
    .sort((a, b) => a.date < b.date ? 1 : -1);

  const feed = new RSS({
    title,
    description,
    feed_url: "https://" + path.join(siteURL, ...feedPath),
    site_url: "https://" + siteURL
  });

  posts.forEach((post) => feed.item(post));

  return feed.xml({ indent: true });
};
