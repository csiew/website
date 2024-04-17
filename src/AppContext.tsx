import React from "react";
import { CacheContextState, Post } from "./stores/cache";
import { fetchMastodonFeedViaRss, fetchPostsViaRss, fetchProjectsViaManifest } from "./stores/fetch";

export default function AppContext(props: React.ComponentPropsWithRef<any>) {
  const isMountedRef = React.useRef<boolean>(false);
  const [feed, setFeed] = React.useState<any[]>([]);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [projects, setProjects] = React.useState<any[]>([]);

  async function populateCaches() {
    try {
      const fetchedFeed = await fetchMastodonFeedViaRss();
      const fetchedPosts = await fetchPostsViaRss();
      const fetchedProjects = await fetchProjectsViaManifest();
      setFeed(fetchedFeed);
      setPosts(fetchedPosts);
      setProjects(fetchedProjects);
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
    <CacheContextState.Provider value={{ feed, setFeed, posts, setPosts, projects, setProjects }}>
      {props.children}
    </CacheContextState.Provider>
  );
}
