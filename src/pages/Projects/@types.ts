export enum ProjectStatus {
  Discontinued = 0,
  Hiatus = 1,
  Active = 2
}

export type Project = {
  id: string;
  name: string;
  timeRange: string;
  status: ProjectStatus;
  description: string;
  imgUrl: string;
  url: string;
  github: string;
};

export type ProjectData = {
  projectStatus: {
    [k: string]: "Discontinued" | "Hiatus" | "Active"
  };
  projects: Project[];
};
