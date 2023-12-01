import path from "path";
import RSS from "rss";
import fetchBlogPosts from "./fetch-blog-posts";
import fetchProjects from "./fetch-projects";
import { siteUrl } from "./@types";
import routes from "./fetch-routes";

export default async function generateRssFeed(
  title: string,
  description: string,
  feedPath: string[]
) {
  const feed = new RSS({
    title,
    description,
    feed_url: "https://" + path.join(siteUrl, ...feedPath),
    site_url: "https://" + siteUrl
  });
  routes.forEach((r: any) => feed.item(r));
  (await fetchBlogPosts()).forEach((post: any) => feed.item(post));
  (await fetchProjects()).forEach((project: any) => feed.item(project));

  return feed.xml({ indent: true });
}
