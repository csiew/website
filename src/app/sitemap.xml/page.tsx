"use client";

import React, { useEffect, useState } from "react";
import generateSiteMap from "../../utils/generate-sitemap";

export default function SitemapXml() {
  const [content, setContent] = useState<string>("");

  async function getSitemap() {
    const feed = await generateSiteMap();
    setContent(feed);
  }

  useEffect(() => {
    getSitemap();
  }, []);

  useEffect(() => {
    document.body.innerText = content;
  }, [content]);

  return <></>;
}
