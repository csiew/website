import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const config = readFileSync(resolve(root, "astro.config.mjs"), "utf8");
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
  dependencies?: Record<string, string>;
};

describe("Astro Markdown processor", () => {
  it("uses the unified processor for rehype plugins on Astro 7+", () => {
    expect(config).toContain('import { unified } from "@astrojs/markdown-remark"');
    expect(config).toContain("processor: unified({");
    expect(config).not.toContain("markdown: {\n    rehypePlugins:");
    expect(packageJson.dependencies?.["@astrojs/markdown-remark"]).toBeTruthy();
  });
});
