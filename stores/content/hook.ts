import React, { useContext, useState } from "react";
import ContentContext from ".";
import { BlogPost } from "../../lib/blog";
import { getRemotePosts, mapDocumentDataToPosts } from "../../firebase/posts";
import config from "../../config";
import { ProjectV2 } from "../../lib/projects";
import { getRemoteProjects, mapDocumentDataToProjects } from "../../firebase/projects";

const useContentStoreHook = () => {
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

  const getProjects = async (force?: boolean): Promise<ProjectV2[]> => {
    setIsLoading(true);
    try {
      if (!!force || !contentContext.projects.length) {
        console.debug("Fetching projects from Firestore...");
        const remoteProjects = await getRemoteProjects();
        contentContext.projects = mapDocumentDataToProjects(
          remoteProjects
            .docs
            .map((d) => ({ id: d.id, ...d.data() }))
        );
      } else {
        console.debug("Fetching projects from shared context");
      }
      setIsSuccess(true);
    } catch (err) {
      if (config.debugMode) console.error(err);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
    return contentContext.projects;
  };

  const get = async (storeKey: string, force?: boolean) => {
    switch (storeKey) {
    case "posts":
      return getPosts(force);
    case "projects":
      return getProjects(force);
    default:
      throw new Error(`No store with key '${storeKey}' found`);
    }
  };

  return { isLoading, isSuccess, getPosts, getProjects, get };
};

export default useContentStoreHook;
