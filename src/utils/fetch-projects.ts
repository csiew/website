import { RssFeedEntry } from "./@types";
import { queryDbRest } from "../client/db";
import { Project } from "../@types";

export default async function fetchProjects(): Promise<RssFeedEntry[]> {
  const siteURL = "clarencesiew.com";
  const result = await queryDbRest("item", "content_type=eq.project");
  const posts = result
    .map((project: Project) => ({
      ...project,
      body: btoa(project.body),
      url: `https://${siteURL}/projects/${project.urlSlug}`,
      guid: project.urlSlug
    }))
    .sort((a: any, b: any) => a.title.localeCompare(b.title));
  return posts;
}
