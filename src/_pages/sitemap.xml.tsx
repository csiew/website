import React from "react";
import generateSiteMap from "../utils/generate-sitemap";

const SiteMap = ({ error }: any) => {
  // getServerSideProps will do the heavy lifting
  return (
    <>
      {!!error && <p>{error}</p>}
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    // We generate the XML sitemap with the posts data
    const sitemap = await generateSiteMap();

    // we send the XML to the browser
    context.res.setHeader("Content-Type", "text/xml");
    context.res.write(sitemap);
    context.res.end();
  } catch (err) {
    return { 
      props: {
        error: String((err as any).message)
      }
    };
  }

  return {
    props: {},
  };
}

export default SiteMap;
