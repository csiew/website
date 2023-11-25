import { queryDbRest } from "../client/db";

export function dateTransform(data?: any[]) {
  return data
    ?.map((p) => ({
      ...p,
      date: new Date(p.publishedAt),
      hiddenAt: new Date(p.hiddenAt)
    }))
    .sort((a: any, b: any) => a.date < b.date ? 1 : -1);
}

export default async function () {
  const siteURL = "clarencesiew.com";
  const result = await queryDbRest("item", "content_type=eq.blog_post&body->>hiddenAt=is.null");
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
