import path from "path";
import routes from "../lib/routes";
import fetchBlogPosts from "./fetch-blog-posts";
import config from "../config";

export default async function generateSiteMap() {
  const posts = await fetchBlogPosts();
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${routes.flatMap((route) => route.path)
    .map((suffixUrl) => {
      return `
      <url>
          <loc>https://${path.join(config.host.name, suffixUrl)}</loc>
      </url>
      `;
    })
    .join("")}
     ${posts.map((post) => {
      return `
      <url>
          <loc>${post.url}</loc>
      </url>
      `;
    })
    .join("")}
   </urlset>
 `;
};
