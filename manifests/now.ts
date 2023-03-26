import { Post } from "./@types";

export const nowPostManifest = new Map<string, Post>([
  [
    "links-page",
    {
      title: "Links page?",
      subtitle: "I muse about creating a link log",
      publishedAt: new Date("2023-03-30T00:00:00Z"),
      layout: "now",
      filePath: "20230330-links-page.md"
    }
  ],
  [
    "music-eras",
    {
      title: "Eras are out, montages and vignettes are in.",
      subtitle: "Thoughts on changes in how I enjoy music",
      publishedAt: new Date("2023-03-30T00:00:00Z"),
      layout: "now",
      filePath: "20230330-music-eras.md"
    }
  ],
  [
    "five-year-side-project",
    {
      title: "\"Oh, I'm working on a side project\", I exclaim for the millionth time.",
      subtitle: "Have I been working on the same thing for the last five years?",
      publishedAt: new Date("2023-03-30T00:00:00Z"),
      layout: "now",
      filePath: "20230330-five-year-side-project.md"
    }
  ]
]);

export const nowEditionManifest = new Map<number, string[]>([
  [1, ["links-page", "music-eras", "five-year-side-project"]]
]);
