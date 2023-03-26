import fs from "fs";
import path from "path";
import RSS from "rss";
import { postManifest as posts } from "../manifests/posts";
import { nowPostManifest as nowPosts } from "../manifests/now";

const generateRssFeed = async () => {
  const siteURL = "https://clarencesiew.com";
  const feed = new RSS({
    title: "Clarence Siew",
    description: "Clarence's blog, now updates, etc",
    feed_url: path.join(siteURL, "rss"),
    site_url: siteURL
  });
  [...posts.entries(), ...nowPosts.entries()]
    .sort(([_a, a], [_b, b]) => {
      return a.publishedAt < b.publishedAt ? 1 : -1;
    })
    .map(([slug, post]) => {
      feed.item({
        title: post.title,
        description: post.subtitle,
        url: path.join(siteURL, "posts", slug),
        guid: slug,
        date: new Date(post.publishedAt)
      });
    });

  fs.writeFileSync(
    path.join(process.cwd(), "public", "rss.xml"),
    feed.xml({ indent: true })
  );
};

export default generateRssFeed;
