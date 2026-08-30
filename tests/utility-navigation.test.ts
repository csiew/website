import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const navBar = readFileSync(resolve(import.meta.dirname, "../src/components/NavBar.astro"), "utf8");

describe("utility navigation", () => {
  it("does not render a Back control", () => {
    expect(navBar).not.toContain("data-nav-back");
    expect(navBar).not.toContain('aria-label="Back"');
    expect(navBar).not.toContain("window.history.back()");
  });

  it("does not render the Feed navigation link", () => {
    expect(navBar).not.toContain('title: "Feed"');
    expect(navBar).not.toContain('url: "/feed"');
  });

  it("keeps the navbar limited to the site identity and a single theme control", () => {
    expect(navBar).not.toContain("navLinks");
    expect(navBar).not.toContain("nav-elsewhere");
    expect(navBar).not.toContain("nav-menu-toggle");
    expect(navBar).not.toContain("utility-nav");
    expect(navBar).not.toContain("data-theme-select");
    expect(navBar).not.toContain("theme-pill");
    expect(navBar).toContain("data-theme-cycle");
  });

  it("cycles the theme through auto, light, and dark in order", () => {
    expect(navBar).toContain('const order = ["auto", "light", "dark"]');
    expect(navBar).toContain("nextPreference(preference)");
    expect(navBar).toContain("window.setThemePreference(nextPreference(preference))");
  });
});
