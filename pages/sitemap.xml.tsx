import React from "react";
import generateSiteMap from "../utils/generate-sitemap";

const SiteMap = () => {
  // getServerSideProps will do the heavy lifting
  return <></>;
};

export async function getServerSideProps(context: any) {
  // We generate the XML sitemap with the posts data
  const sitemap = await generateSiteMap();

  context.res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {},
  };
}

export default SiteMap;
