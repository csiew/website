import React from "react";
import { CacheContextState } from "../../stores/cache";
import LinkList from "../../components/ui/LinkList/LinkList";
import LinkListItem from "../../components/ui/LinkList/LinkListItem";

export default function Posts() {
  const isMountedRef = React.useRef<boolean>(false);
  const cacheContext = React.useContext(CacheContextState);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [posts, setPosts] = React.useState<any[]>([]);

  async function handleFetchPosts() {
    try {
      if (cacheContext.posts.length) {
        setPosts(cacheContext.posts);
        return;
      }
      setIsLoading(true);
      const manifestResult = await fetch("/content/posts/manifest.json");
      if (!manifestResult.ok)
        throw new Error(manifestResult.statusText);
      const manifest = await manifestResult.json();
      const fetchedPosts = [];
      for (const slug of manifest) {
        const metadataResult = await fetch(`/content/posts/${slug}/metadata.json`);
        if (!metadataResult.ok)
          throw new Error(metadataResult.statusText);
        const metadata = await metadataResult.json();
        if (Object.keys(metadata).includes("private") && !!metadata.private) {
          continue;
        }
        fetchedPosts.push(metadata);
      }
      fetchedPosts.sort((a, b) => {
        const aTimestamp = new Date(a.publishedAt).getTime();
        const bTimestamp = new Date(b.publishedAt).getTime();
        return aTimestamp < bTimestamp ? 1 : -1;
      });
      setPosts(fetchedPosts);
      cacheContext.setPosts?.(fetchedPosts);
      setIsError(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      handleFetchPosts();
    }
  }, []);

  return (
    <>
      {isError && <p>Failed to fetch posts. Try reloading this page.</p>}
      {isLoading && <p>Loading...</p>}
      {!isError && !isLoading && (
        <>
          <h2>Posts</h2>
          <LinkList>
            {posts.map((p) => (
              <LinkListItem
                key={p.slug}
                title={p.title}
                subtitle={p.subtitle}
                url={`/posts/${p.slug}`}
                timestamp={new Date(p.publishedAt).toDateString()}
              />
            ))}
          </LinkList>
        </>
      )}
    </>
  );
}