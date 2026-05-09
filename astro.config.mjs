import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import fs from "node:fs";
import path from "node:path";

const site = "https://www.clarencesiew.com";

function getPrivatePostPaths() {
  const postsDir = path.join(process.cwd(), "src", "content", "posts");
  if (!fs.existsSync(postsDir)) return [];

  return fs.readdirSync(postsDir)
    .filter((fileName) => fileName.endsWith(".md"))
    .filter((fileName) => {
      const content = fs.readFileSync(path.join(postsDir, fileName), "utf8");
      return /^private:\s*true\s*$/m.test(content);
    })
    .map((fileName) => new URL(`/posts/${fileName.replace(/\.md$/, "")}`, site).toString());
}

const privatePostPaths = new Set(getPrivatePostPaths());

export default defineConfig({
  site,
  trailingSlash: "never",
  integrations: [
    react(),
    sitemap({
      filter: (page) => !privatePostPaths.has(page)
    })
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"]
        }
      ]
    ]
  }
});
