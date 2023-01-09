import React, { useState, ReactElement, useCallback, useEffect } from "react";
import { BlogPost } from "../../lib/blog";
import ContentContext from ".";

const ContentContextProviderWrapper = ({ children }: { children: string | ReactElement | ReactElement[] }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const savePosts = useCallback(
    (newPosts: BlogPost[]) => {
      setPosts(newPosts);
    },
    [setPosts]
  );

  const [contextValue, setContextValue] = useState({ posts, savePosts });

  useEffect(() => {
    setContextValue({ posts, savePosts });
  }, [posts, setPosts]);

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContextProviderWrapper;
