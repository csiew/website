import path from "path";
import RSS from "rss";
import { Post } from "../manifests/@types";

const generateRssFeed = async (
  title: string,
  description: string,
  feedPath: string[],
  manifests: Map<string, Post>
) => {
  const siteURL = "https://clarencesiew.com";
  const feed = new RSS({
    title,
    description,
    feed_url: path.join(siteURL, ...feedPath),
    site_url: siteURL
  });
  [...manifests.entries()]
    .sort(([_a, a], [_b, b]) => {
      return a.publishedAt < b.publishedAt ? 1 : -1;
    })
    .map(([slug, post]) => {
      feed.item({
        title: post.title,
        description: path.join(siteURL, post.layout, slug),
        url: path.join(siteURL, post.layout, slug),
        guid: slug,
        date: new Date(post.publishedAt)
      });
    });

  return feed.xml({ indent: true });
};

export default generateRssFeed;
