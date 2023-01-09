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

export type ProjectV2 = {
  id: string;
  slug: string;
  name: string;
  startYear: string;
  endYear?: string;
  status: string;
  description: string;
  imgUrl?: string;
  siteUrl?: string;
  gitRepoUrl?: string;
  createdAt: Date;
  lastModified: Date;
};

export interface ProjectData {
  projectStatus: {
    [k: string]: "Discontinued" | "Hiatus" | "Active"
  };
  projects: Project[];
}
