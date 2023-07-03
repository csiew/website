import React from "react";
import path from "path";
import { Post } from "../manifests/@types";
import { postManifest } from "../manifests/posts";
import config from "../config";
import routes from "../lib/routes";

const generateSiteMap = (posts: Post[]) => {
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
     ${posts
    .map(({ slug, layout }) => {
      const prefixUrl: string = layout === "now" ? "now" : "posts";
      return `
      <url>
          <loc>https://${path.join(config.host.name, prefixUrl, slug!)}</loc>
      </url>
      `;
    })
    .join("")}
   </urlset>
 `;
};

const SiteMap = () => {
  // getServerSideProps will do the heavy lifting
  return <></>;
};

export const getServerSideProps = async (context: any) => {
  const posts = [...postManifest.entries()]
    .map(([slug, post]) => {
      return { ...post, slug };
    });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  context.res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {},
  };
};

export default SiteMap;
