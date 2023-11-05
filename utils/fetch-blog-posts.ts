import { queryDbRest } from "../client/db";

export function dateTransform(data?: any[]) {
  return data
    ?.map((p) => ({
      ...p,
      date: new Date(p.publishedAt)
    }))
    .sort((a: any, b: any) => a.date < b.date ? 1 : -1);
}

export default async function () {
  const siteURL = "clarencesiew.com";
  const result = await queryDbRest("item", "content_type=eq.blog_post");
  const posts = result
    .map((post: any) => ({
      title: post.title,
      description: post.subtitle,
      url: `https://${siteURL}/posts/${post.urlSlug}`,
      guid: post.urlSlug,
      publishedAt: post.publishedAt
    }));
  return posts;
}
