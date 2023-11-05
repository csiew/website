import React from "react";
import generateRssFeed from "../utils/generate-rss-feed";

function RssFeed({ error }: any) {
  // getServerSideProps will do the heavy lifting
  return (
    <>
      {!!error && <p>{error}</p>}
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    // We generate the XML sitemap with the posts data
    const feed = await generateRssFeed(
      "Clarence Siew",
      "Clarence's website feed",
      ["rss.xml"]
    );

    // we send the XML to the browser
    context.res.setHeader("Content-Type", "text/xml");
    context.res.write(feed);
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

export default RssFeed;
