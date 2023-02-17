import { BadgeVariant } from "../components/ui/Badge";
import { PublishableItem } from "./@types";

export enum ProjectStatus {
  Discontinued = 0,
  Hiatus = 1,
  Active = 2
}

export type Project = {
  id: string;
  slug?: string;
  name: string;
  timeRange: string;
  startYear?: string;
  endYear?: string;
  status: ProjectStatus;
  description: string;
  imgUrl: string;
  url: string;
  github: string;
};

export type ProjectV2 = PublishableItem & {
  id?: string;
  slug: string;
  name: string;
  startYear: string;
  endYear?: string;
  status: string;
  description: string;
  isPublished?: boolean;
  imgUrl?: string;
  siteUrl?: string;
  gitRepoUrl?: string;
  createdAt: string | Date;
  lastModified?: string | Date;
  publishedOn?: string | Date;
};

export interface ProjectData {
  projectStatus: {
    [k: string]: "Discontinued" | "Hiatus" | "Active"
  };
  projects: Project[];
}

export const determineStatusBadgeVariant = (status: string): BadgeVariant => {
  switch (status) {
  case "active":
    return "success";
  case "hiatus":
    return "warning";
  case "inactive":
  default:
    return "plain";
  }
};
