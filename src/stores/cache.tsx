import React from "react";

export type CacheContextType = {
  feed: any[];
  setFeed?: React.Dispatch<React.SetStateAction<any[]>>;
  posts: any[];
  setPosts?: React.Dispatch<React.SetStateAction<any[]>>;
};

export const defaultCacheContextState = {
  feed: [],
  posts: []
};

export const CacheContextState = React.createContext<CacheContextType>(defaultCacheContextState);
