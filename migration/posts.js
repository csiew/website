const fs = require("fs");
const { Pool } = require("pg");
const { v4 } = require("uuid");
const config = require("./config");

const manifest = [
  [
    "new-posts-site-generator",
    {
      title: "A new posts, a new static site generator",
      subtitle: "An experiment in static site generators",
      publishedAt: new Date("2020-10-19T17:22:06"),
      layout: "posts",
      filePath: "20201019-new-blog-site-generator.md",
      tags: [
        "projects",
        "python",
        "ssg",
        "webdev"
      ]
    }
  ],
  [
    "building-boilerplate-factory",
    {
      title: "Building a boilerplate factory",
      subtitle: "An experiment in boilerplates and templates",
      publishedAt: new Date("2021-02-05T14:58:08"),
      layout: "posts",
      filePath: "20210205-building-boilerplate-factory.md",
      tags: [
        "projects",
        "python",
        "ssg",
        "webdev"
      ]
    }
  ],
  [
    "frontend-adventures",
    {
      title: "Adventures in Frontend",
      subtitle: "A not-so-technical chronical of the frontend shenanigans I've been up to",
      publishedAt: new Date("2023-01-05T01:30:00"),
      layout: "posts",
      filePath: "20230104-frontend-adventures.md",
      tags: [
        "webdev",
        "react",
        "svelte",
        "mithriljs",
        "nextjs",
        "vuejs",
        "ssg",
        "firebase",
        "cms"
      ]
    }
  ],
  [
    "different-crowds",
    {
      title: "Different crowds",
      subtitle: "Thoughts on personal interests and sharing",
      publishedAt: new Date("2023-03-31T13:20:00"),
      layout: "posts",
      filePath: "20230331-different-crowds.md",
      quotesAsNotes: true,
      tags: [
        "thoughts",
        "social media",
        "society",
        "hobbies"
      ]
    }
  ],
  [
    "tab-shelf",
    {
      title: "Tab Shelf",
      subtitle: "Announcing a vertical tab management extension for Chrome/Chromium",
      publishedAt: new Date("2023-06-17T17:00:00"),
      layout: "posts",
      filePath: "20230617-tab-shelf.md",
      quotesAsNotes: true,
      tags: [
        "chrome",
        "extension",
        "projects"
      ]
    }
  ]
];

const posts = [];
const manifestFormatted = manifest.map((m) => ({
  ...m[1],
  urlSlug: m[0]
}));

for (const postManifest of manifestFormatted) {
  const post = { ...postManifest };
  const content = fs.readFileSync(`content/posts/${post.filePath}`, { encoding: "utf-8" });
  post.body = btoa(content);
  delete post["layout"];
  delete post["filePath"];
  posts.push(post);
}

const pool = new Pool(config);

Promise.all(
  posts.map((post) => {
    return pool.query(
      "INSERT INTO public.item (id, content_type, body) VALUES ($1, $2, $3)",
      [v4(), "blog_post", post]
    );
  })
);
