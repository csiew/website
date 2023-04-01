import { isUndefined, uniq } from "lodash";
import { nowPostManifest } from "../manifests/now";
import { postManifest } from "../manifests/posts";
import { projectManifest } from "../manifests/projects";
import routes from "./routes";

export type SearchData = {
  url: string;
  type: "Blog" | "Now" | "Project" | "Page",
  title: string;
  subtitle?: string;
  tags?: string[];
  publishedAt?: Date;
};

export const mappedRoutes: SearchData[] = routes.map((route) => {
  return {
    url: route.path,
    type: "Page",
    title: route.title
  };
});

export const searchDataManifest: SearchData[] = [
  ...mappedRoutes,
  ...[...postManifest.entries()].map(([slug, post]) => {
    return {
      url: `/posts/${slug}`,
      type: "Blog",
      title: post.title,
      subtitle: post.subtitle,
      tags: post.tags,
      publishedAt: post.publishedAt
    } as SearchData;
  }),
  ...[...nowPostManifest.entries()].map(([slug, post]) => {
    return {
      url: `/now/${slug}`,
      type: "Now",
      title: post.title,
      subtitle: post.subtitle,
      tags: post.tags,
      publishedAt: post.publishedAt
    } as SearchData;
  }),
  ...[...projectManifest.entries()].map(([slug, project]) => {
    return {
      url: `/projects/${slug}`,
      type: "Project",
      title: project.title,
      subtitle: project.subtitle,
      tags: project.tags
    } as SearchData;
  })
];

export const getTags = (): Map<string, SearchData[]> => {
  const allTags: string[] = uniq(searchDataManifest.flatMap((data) => data.tags))
    .filter((tag) => !isUndefined(tag)) as string[];
  const tagUsageMap = new Map<string, SearchData[]>();
  allTags.map((tag: string) => {
    const usages = searchDataManifest.filter((data) => data.tags?.includes(tag));
    tagUsageMap.set(tag, usages);
  });
  return tagUsageMap;
};
