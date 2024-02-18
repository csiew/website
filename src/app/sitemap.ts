import { MetadataRoute } from "next";
import { siteUrl } from "../utils/@types";
import fetchBlogPosts from "../utils/fetch-blog-posts";
import fetchProjects from "../utils/fetch-projects";
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${siteUrl}`;
  const posts = await fetchBlogPosts();
  const projects = await fetchProjects();

  return [
    {
      url: baseUrl,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date()
    },
    ...posts.map((p) => ({
      url: p.url,
      lastModified: p.publishedAt
    })),
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date()
    },
    ...projects.map((p) => ({
      url: p.url,
      lastModified: new Date()
    })),
    {
      url: `${baseUrl}/playlists`,
      lastModified: new Date()
    }
  ];
}
