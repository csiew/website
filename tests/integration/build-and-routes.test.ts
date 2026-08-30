import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("built routes", () => {
  it("builds and serves all retained canonical routes and auxiliary endpoints", () => {
    for (const path of [
      "dist/index.html",
      "dist/posts/index.html",
      "dist/projects/index.html",
      "dist/rss.xml",
      "dist/projects.xml",
      "dist/robots.txt"
    ]) {
      expect(existsSync(resolve(root, path)), path).toBe(true);
    }
  });

  it("does not emit the retired feed route or disclosure query/hash variants", () => {
    expect(existsSync(resolve(root, "dist/feed/index.html"))).toBe(false);
    expect(read("src/components/Outline.astro")).not.toContain("pushState");
    expect(read("src/components/Outline.astro")).not.toContain("location.hash");
    expect(read("src/components/Outline.astro")).not.toContain("URLSearchParams");
  });

  it("does not emit retired About, Contact, or Interests routes", () => {
    expect(existsSync(resolve(root, "dist/about/index.html"))).toBe(false);
    expect(existsSync(resolve(root, "dist/contact/index.html"))).toBe(false);
    expect(existsSync(resolve(root, "dist/interests/index.html"))).toBe(false);
  });
});
