import React, { useState, ReactElement, useCallback, useEffect } from "react";
import { BlogPost } from "../../lib/blog";
import ContentContext from ".";
import { ProjectV2 } from "../../lib/projects";

const ContentContextProviderWrapper = ({ children }: { children: string | ReactElement | ReactElement[] }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<ProjectV2[]>([]);

  const savePosts = useCallback(
    (newPosts: BlogPost[]) => {
      setPosts(newPosts);
    },
    [setPosts]
  );

  const saveProjects = useCallback(
    (newProjects: ProjectV2[]) => {
      setProjects(newProjects);
    },
    [setProjects]
  );

  const [contextValue, setContextValue] = useState({ posts, projects, savePosts, saveProjects });

  useEffect(() => {
    setContextValue({ posts, projects, savePosts, saveProjects });
  }, [posts, projects, setPosts, setProjects]);

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContextProviderWrapper;
