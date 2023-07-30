import path from "path";
import RSS from "rss";
import fetchBlogPosts from "./fetch-blog-posts";

export default async function generateRssFeed(
  title: string,
  description: string,
  feedPath: string[]
) {
  const siteURL = "clarencesiew.com";
  const posts = await fetchBlogPosts();
  const feed = new RSS({
    title,
    description,
    feed_url: "https://" + path.join(siteURL, ...feedPath),
    site_url: "https://" + siteURL
  });

  posts.forEach((post) => feed.item(post));

  return feed.xml({ indent: true });
};
