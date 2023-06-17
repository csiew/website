import { Manifest } from "./@types";

export type Changelog = Manifest & {
  version?: string;
};

export const changelogManifest = new Map<string, Changelog>([
  [
    "6.11.0",
    {
      title: "Version 6.11.0",
      subtitle: "Refreshed design, RSS, sitemap, search",
      filePath: "6.11.0.md",
    }
  ],
  [
    "6.11.1",
    {
      title: "Version 6.11.1",
      subtitle: "Fixed invalid URLs in RSS",
      filePath: "6.11.1.md",
    }
  ],
  [
    "6.11.2",
    {
      title: "Version 6.11.2",
      subtitle: "Searchable TV shows, Tags page",
      filePath: "6.11.2.md",
    }
  ],
  [
    "6.11.3",
    {
      title: "Version 6.11.3",
      subtitle: "Fixed invalid URLs in Sitemap, Changelog page",
      filePath: "6.11.3.md",
    }
  ],
  [
    "6.11.4",
    {
      title: "Version 6.11.4",
      subtitle: "Floating search modal for desktop",
      filePath: "6.11.4.md",
    }
  ],
  [
    "6.12.0",
    {
      title: "Version 6.12.0",
      subtitle: "Tweaks to search and Now page",
      filePath: "6.12.0.md",
    }
  ],
  [
    "6.12.1",
    {
      title: "Version 6.12.1",
      subtitle: "Fix static page rendering and shallow routing issues",
      filePath: "6.12.1.md",
    }
  ],
  [
    "6.12.2",
    {
      title: "Version 6.12.2",
      subtitle: "Fix Note block appearing as Quote block in Now page",
      filePath: "6.12.2.md",
    }
  ],
  [
    "6.12.3",
    {
      title: "Version 6.12.3",
      subtitle: "Styling tweaks",
      filePath: "6.12.3.md",
    }
  ],
  [
    "6.13.0",
    {
      title: "Version 6.13.0",
      subtitle: "Redesign and deprecate Now Watching",
      filePath: "6.13.0.md",
    }
  ],
  [
    "6.14.0",
    {
      title: "Version 6.14.0",
      subtitle: "Invert colour scheme, update navbar and back-to-top",
      filePath: "6.14.0.md",
    }
  ],
  [
    "6.15.0",
    {
      title: "Version 6.15.0",
      subtitle: "Restore Now Watching page as Watching page",
      filePath: "6.15.0.md",
    }
  ],
  [
    "6.16.0",
    {
      title: "Version 6.16.0",
      subtitle: "Styling overhaul with dark mode and new font",
      filePath: "6.16.0.md",
    }
  ],
  [
    "6.17.0",
    {
      title: "Version 6.17.0",
      subtitle: "Update styling and projects list",
      filePath: "6.17.0.md",
    }
  ],
]);
