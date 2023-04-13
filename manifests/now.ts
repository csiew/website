import { Post } from "./@types";

export const nowPostManifest = new Map<string, Post>([
  [
    "links-page",
    {
      title: "Links page?",
      subtitle: "I muse about creating a link log",
      publishedAt: new Date("2023-03-31T13:20:00"),
      layout: "now",
      filePath: "20230331-links-page.md",
      tags: ["projects", "webdev"]
    }
  ],
  [
    "music-eras",
    {
      title: "Eras are out, montages and vignettes are in.",
      subtitle: "Thoughts on changes in how I enjoy music",
      publishedAt: new Date("2023-03-31T13:21:00"),
      layout: "now",
      filePath: "20230331-music-eras.md",
      tags: ["music"]
    }
  ],
  [
    "five-year-side-project",
    {
      title: "\"Oh, I'm working on a side project\", I exclaim for the millionth time.",
      subtitle: "Have I been working on the same thing for the last five years?",
      publishedAt: new Date("2023-03-31T13:22:00"),
      layout: "now",
      filePath: "20230331-five-year-side-project.md",
      tags: ["projects", "webdev", "productivity"]
    }
  ],
  [
    "hump-day-curiosity-dump",
    {
      title: "Hump day curiosity dump",
      subtitle: "A couple of videos to get through the week",
      publishedAt: new Date("2023-04-12T20:30:00"),
      layout: "now",
      filePath: "20230412-hump-day-curiosity-dump.md",
      tags: ["videos", "humpday", "engineering", "space", "astronomy", "uiux", "apple", "apple lisa"],
      quotesAsNotes: true
    }
  ]
]);
