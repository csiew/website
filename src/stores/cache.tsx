import React from "react";

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  content: string;
};

export type CacheContextType = {
  isLoading: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  feed: any[];
  setFeed?: React.Dispatch<React.SetStateAction<any[]>>;
  posts: Post[];
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
  projects: any[];
  setProjects?: React.Dispatch<React.SetStateAction<any[]>>;
};

export const defaultCacheContextState = {
  isLoading: false,
  isError: false,
  feed: [],
  posts: [],
  projects: []
};

export const CacheContextState = React.createContext<CacheContextType>(defaultCacheContextState);
