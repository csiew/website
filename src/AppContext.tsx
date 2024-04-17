import React from "react";
import { CacheContextState, Post } from "./stores/cache";
import { fetchMastodonFeedViaRss, fetchPostsViaRss, fetchProjectsViaManifest } from "./stores/fetch";

export default function AppContext(props: React.ComponentPropsWithRef<any>) {
  const isMountedRef = React.useRef<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [feed, setFeed] = React.useState<any[]>([]);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [projects, setProjects] = React.useState<any[]>([]);

  async function populateCaches() {
    try {
      setIsLoading(true);
      const fetchedFeed = await fetchMastodonFeedViaRss();
      const fetchedPosts = await fetchPostsViaRss();
      const fetchedProjects = await fetchProjectsViaManifest();
      setFeed(fetchedFeed);
      setPosts(fetchedPosts);
      setProjects(fetchedProjects);
      setIsError(false);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      populateCaches();
    }
  }, []);

  return (
    <CacheContextState.Provider
      value={{
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        feed,
        setFeed,
        posts,
        setPosts,
        projects,
        setProjects
      }}
    >
      {props.children}
    </CacheContextState.Provider>
  );
}
