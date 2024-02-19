import _ from "lodash";
import { Project } from "../../@types";
import { getCache, hasCacheExpired, removeCache, storeCache } from "../cache";

export async function getProjects() {
  const projectsResult = await fetch("/api/projects");
  if (!projectsResult.ok) {
    throw new Error(`Failed to fetch projects: ${projectsResult.status} ${projectsResult.statusText}`);
  }
  const projectsData = await projectsResult.json();
  projectsData.forEach((p: Project) => p.body = atob(p.body));
  return projectsData;
}

export async function getCachedProjects() {
  try {
    const cachedProjects = getCache("projects");
    if (
      !cachedProjects ||
      !Object.keys(cachedProjects).length ||
      !Object.keys(cachedProjects).includes("body") ||
      hasCacheExpired(cachedProjects.expiresAt, cachedProjects.readCount) ||
      !_.isArray(cachedProjects.body)
    ) {
      removeCache("projects");
      throw new Error("Cache is invalid");
    }
    return cachedProjects.body;
  } catch (err) {
    console.error(err);
    const projectsData = await getProjects();
    storeCache("projects", projectsData);
    return projectsData;
  }
}
