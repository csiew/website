import React, { createContext } from "react";
import { BlogPost, Project } from "../@types";

export type DataContextType = {
  posts: BlogPost[];
  setPosts?: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  projects: Project[];
  setProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
};

export const DataContext = createContext<DataContextType>({ posts: [], projects: [] });
