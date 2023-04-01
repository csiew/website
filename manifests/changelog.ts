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
]);
