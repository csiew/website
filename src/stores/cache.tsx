import React from "react";

export type CacheStatus = {
  feed: boolean;
  posts: boolean;
  projects: boolean;
};

export const defaultCacheStatus = {
  feed: false,
  posts: false,
  projects: false
};

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  content: string;
};

export type CacheContextType = {
  isCachePending: CacheStatus;
  setIsCachePending?: React.Dispatch<React.SetStateAction<CacheStatus>>;
  isCacheErrored: CacheStatus;
  setIsCacheErrored?: React.Dispatch<React.SetStateAction<CacheStatus>>;
  feed: any[];
  setFeed?: React.Dispatch<React.SetStateAction<any[]>>;
  posts: Post[];
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
  projects: any[];
  setProjects?: React.Dispatch<React.SetStateAction<any[]>>;
};

export const defaultCacheContextState = {
  isCachePending: defaultCacheStatus,
  isCacheErrored: defaultCacheStatus,
  feed: [],
  posts: [],
  projects: []
};

export const CacheContextState = React.createContext<CacheContextType>(defaultCacheContextState);
