import { queryDb } from "../client/db";

export default async function () {
  const siteURL = "clarencesiew.com";
  const result = await queryDb("SELECT * FROM item WHERE content_type = 'blog_post';");
  const posts = result.rows
    .map((post) => ({
      title: post.body.title,
      description: post.body.subtitle,
      url: `https://${siteURL}/posts/${post.body.urlSlug}`,
      guid: post.body.urlSlug,
      date: new Date(post.body.publishedAt)
    }))
    .sort((a, b) => a.date < b.date ? 1 : -1);
  return posts;
}
