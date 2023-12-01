"use client";

import React, { useEffect, useState } from "react";
import generateRssFeed from "../../utils/generate-rss-feed";

export default function RssXml() {
  const [content, setContent] = useState<string>("");

  async function getRssFeed() {
    const feed = await generateRssFeed(
      "Clarence Siew",
      "Clarence's website feed",
      ["rss.xml"]
    );
    setContent(feed);
  }

  useEffect(() => {
    getRssFeed();
  }, []);

  useEffect(() => {
    document.body.innerText = content;
  }, [content]);

  return <></>;
}
