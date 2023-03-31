import React from "react";
import { nowPostManifest } from "../manifests/now";
import { postManifest } from "../manifests/posts";
import generateRssFeed from "../utils/generate-rss-feed";

const RssFeed = () => {
  // getServerSideProps will do the heavy lifting
  return <></>;
};

export const getServerSideProps = async (context: any) => {
  const posts = new Map([...postManifest, ...nowPostManifest]);

  // We generate the XML sitemap with the posts data
  const feed = await generateRssFeed(
    "Clarence Siew",
    "Clarence's website feed",
    ["rss.xml"],
    posts
  );

  context.res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  context.res.write(feed);
  context.res.end();

  return {
    props: {},
  };
};

export default RssFeed;
