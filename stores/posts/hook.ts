import React, { useContext, useState } from "react";
import ContentContext from ".";
import { BlogPost } from "../../lib/blog";
import { getRemotePosts, mapDocumentDataToPosts } from "../../firebase/posts";
import config from "../../config";

const usePostStoreHook = () => {
  const contentContext = useContext(ContentContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getPosts = async (force?: boolean): Promise<BlogPost[]> => {
    setIsLoading(true);
    try {
      if (!!force || !contentContext.posts.length) {
        console.debug("Fetching blog posts from Firestore...");
        const remotePosts = await getRemotePosts();
        contentContext.posts = mapDocumentDataToPosts(
          remotePosts
            .docs
            .map((d) => ({ id: d.id, ...d.data() }))
        );
      } else {
        console.debug("Fetching blog posts from shared context");
      }
      setIsSuccess(true);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
    return contentContext.posts;
  };

  return { isLoading, isSuccess, getPosts };
};

export default usePostStoreHook;
