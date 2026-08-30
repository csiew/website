import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("Feed retirement", () => {
  it("preserves the blog and projects RSS endpoints", () => {
    expect(existsSync(resolve(root, "src/pages/rss.xml.ts"))).toBe(true);
    expect(existsSync(resolve(root, "src/pages/projects.xml.ts"))).toBe(true);
  });

  it("does not leave orphaned Feed sources or configuration behind", () => {
    expect(existsSync(resolve(root, "src/pages/feed.astro"))).toBe(false);
    expect(existsSync(resolve(root, "src/components/Feed.tsx"))).toBe(false);
    expect(existsSync(resolve(root, "src/styles/feed.css"))).toBe(false);
    expect(read("src/layouts/BaseLayout.astro")).not.toContain("styles/feed.css");
    expect(read("astro.config.mjs")).not.toContain("@astrojs/react");
  });
});
