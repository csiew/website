import { Post } from "./@types";

export const postManifest = new Map<string, Post>([
  [
    "new-blog-site-generator",
    {
      title: "New blog - a new blog, a new static site generator ...ish",
      subtitle: "An experiment in static site generators",
      publishedAt: new Date("2020-10-19T17:22:06Z"),
      layout: "blog",
      filePath: "20201019-new-blog-site-generator.md"
    }
  ],
  [
    "building-boilerplate-factory",
    {
      title: "Building a boilerplate factory",
      subtitle: "An experiment in boilerplates and templates",
      publishedAt: new Date("2021-02-05T14:58:08Z"),
      layout: "blog",
      filePath: "20210205-building-boilerplate-factory.md"
    }
  ],
  [
    "frontend-adventures",
    {
      title: "Adventures in Frontend",
      subtitle: "A not-so-technical chronical of the frontend shenanigans I've been up to",
      publishedAt: new Date("2023-01-05T01:30:00Z"),
      layout: "blog",
      filePath: "20230104-frontend-adventures.md"
    }
  ],
  [
    "different-crowds",
    {
      title: "Different crowds",
      subtitle: "Thoughts on personal interests and sharing",
      publishedAt: new Date("2023-03-30T00:00:00Z"),
      layout: "blog",
      filePath: "20230330-different-crowds.md",
      quotesAsNotes: true
    }
  ]
]);
