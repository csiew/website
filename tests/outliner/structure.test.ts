import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

const outline = read("src/components/Outline.astro");
const node = read("src/components/OutlineNode.astro");
const homepage = read("src/pages/index.astro");

describe("server-rendered outliner", () => {
  it("renders the top-level nodes in order", () => {
    const labels = ["Contact", "Posts", "Projects"];
    let previousIndex = -1;

    for (const label of labels) {
      const index = outline.indexOf(`label: "${label}"`);
      expect(index).toBeGreaterThan(previousIndex);
      previousIndex = index;
    }
  });

  it("keeps About content on the homepage outside the link tree", () => {
    expect(homepage).toContain("<AboutContent />");
    expect(homepage).toContain("<Outline />");
    expect(homepage).not.toContain("home-hero");
    expect(homepage).not.toContain("selected-projects");
    expect(homepage).not.toContain("recent-writing");
    expect(outline).not.toContain('label: "About"');
  });

  it("renders Contact before the content branches", () => {
    const contactStart = outline.indexOf('label: "Contact"');
    const postsStart = outline.indexOf('label: "Posts"');

    expect(contactStart).toBeGreaterThanOrEqual(0);
    expect(contactStart).toBeLessThan(postsStart);
    expect(outline.slice(contactStart, postsStart)).toContain("children: CONTACT_LINKS.map");
    expect(outline.slice(postsStart)).toContain("children: posts.map");
    expect(outline).toContain("children: projects.map");
  });

  it("renders as a plain nested navigation without disclosure controls", () => {
    expect(outline).toContain('aria-label="Site outline"');
    expect(outline).not.toContain('role="tree"');
    expect(outline).not.toContain("data-outline-toggle");
    expect(outline).not.toContain("<script");
    expect(node).not.toContain("<button");
    expect(node).toContain("data-outline-children");
  });

  it("renders post subtitles, published dates, and project timespans below leaf links", () => {
    expect(outline).toContain("subtitle: post.data.subtitle");
    expect(outline).toContain("meta: formatDate(post.data.publishedAt)");
    expect(outline).toContain("subtitle: project.data.subtitle");
    expect(outline).toContain("meta: durationLabel(project)");
    expect(node).toContain("outline-description");
    expect(node).toContain("outline-meta");
  });

  it("does not render full Markdown bodies or page media in the tree", () => {
    expect(homepage).not.toContain("formatDate");
    expect(homepage).not.toContain("render(");
    expect(homepage).not.toContain("<Content");
    expect(node).not.toContain("<img");
    expect(node).not.toContain("excerpt");
    expect(node).not.toContain("thumbnail");
  });
});
