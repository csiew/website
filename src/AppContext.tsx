import React from "react";
import { CacheContextState, Post } from "./stores/cache";
import { fetchMastodonFeedViaRss, fetchPostsViaRss, fetchProjectsViaManifest } from "./stores/fetch";

type CacheStatus = {
  feed: boolean;
  posts: boolean;
  projects: boolean;
};

const defaultCacheStatus = {
  feed: false,
  posts: false,
  projects: false
};

export default function AppContext(props: React.ComponentPropsWithRef<any>) {
  const isMountedRef = React.useRef<boolean>(false);
  const [isCachePending, setIsCachePending] = React.useState<CacheStatus>(defaultCacheStatus);
  const [isCacheErrored, setIsCacheErrored] = React.useState<CacheStatus>(defaultCacheStatus);
  const [feed, setFeed] = React.useState<any[]>([]);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [projects, setProjects] = React.useState<any[]>([]);

  async function populateFeedCache() {
    try {
      setIsCachePending((currentStatus) => ({ ...currentStatus, feed: true }));
      const fetchedFeed = await fetchMastodonFeedViaRss();
      setFeed(fetchedFeed);
      setIsCachePending((currentStatus) => ({ ...currentStatus, feed: false }));
      setIsCacheErrored((currentStatus) => ({ ...currentStatus, feed: false }));
    } catch (err) {
      console.error(err);
      setIsCachePending((currentStatus) => ({ ...currentStatus, feed: false }));
      setIsCacheErrored((currentStatus) => ({ ...currentStatus, feed: true }));
    }
  }

  async function populatePostsCache() {
    try {
      setIsCachePending((currentStatus) => ({ ...currentStatus, posts: true }));
      const fetchedPosts = await fetchPostsViaRss();
      setPosts(fetchedPosts);
      setIsCachePending((currentStatus) => ({ ...currentStatus, posts: false }));
      setIsCacheErrored((currentStatus) => ({ ...currentStatus, posts: false }));
    } catch (err) {
      console.error(err);
      setIsCachePending((currentStatus) => ({ ...currentStatus, posts: false }));
      setIsCacheErrored((currentStatus) => ({ ...currentStatus, posts: true }));
    }
  }

  async function populateProjectsCache() {
    try {
      setIsCachePending((currentStatus) => ({ ...currentStatus, projects: true }));
      const fetchedProjects = await fetchProjectsViaManifest();
      setProjects(fetchedProjects);
      setIsCachePending((currentStatus) => ({ ...currentStatus, projects: false }));
      setIsCacheErrored((currentStatus) => ({ ...currentStatus, projects: false }));
    } catch (err) {
      console.error(err);
      setIsCachePending((currentStatus) => ({ ...currentStatus, projects: false }));
      setIsCacheErrored((currentStatus) => ({ ...currentStatus, projects: true }));
    }
  }

  async function populateCaches() {
    try {
      await Promise.all([
        populateFeedCache(),
        populatePostsCache(),
        populateProjectsCache()
      ]);
    } catch (err) {
      console.error(err);
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
        isCachePending,
        setIsCachePending,
        isCacheErrored,
        setIsCacheErrored,
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
