import React from "react";
import { CacheContextState } from "../../stores/cache";
import LinkList from "../../components/ui/LinkList/LinkList";
import LinkListItem from "../../components/ui/LinkList/LinkListItem";

export default function Projects() {
  const isMountedRef = React.useRef<boolean>(false);
  const cacheContext = React.useContext(CacheContextState);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [projects, setProjects] = React.useState<any[]>([]);

  async function handleFetchProjects() {
    try {
      if (cacheContext.projects.length) {
        setProjects(cacheContext.projects);
        return;
      }
      setIsLoading(true);
      const manifestResult = await fetch("/content/projects/manifest.json");
      if (!manifestResult.ok)
        throw new Error(manifestResult.statusText);
      const manifest = await manifestResult.json();
      const fetchedProjects = [];
      for (const slug of manifest) {
        const metadataResult = await fetch(`/content/projects/${slug}/metadata.json`);
        if (!metadataResult.ok)
          throw new Error(metadataResult.statusText);
        const metadata = await metadataResult.json();
        fetchedProjects.push(metadata);
      }
      fetchedProjects.sort((a, b) => {
        return a.duration.start < b.duration.start ? 1 : -1;
      });
      setProjects(fetchedProjects);
      cacheContext.setProjects?.(fetchedProjects);
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
      handleFetchProjects();
    }
  }, []);

  return (
    <>
      {isError && <p>Failed to fetch projects. Try reloading this page.</p>}
      {isLoading && <p>Loading...</p>}
      {!isError && !isLoading && (
        <>
          <h2>Projects</h2>
          <LinkList>
            {projects.map((p) => (
              <LinkListItem
                key={p.slug}
                title={p.title}
                subtitle={p.subtitle}
                url={`/projects/${p.slug}`}
                timestamp={`${p.duration?.start}${p.duration?.start !== p.duration?.end ? ` - ${p.duration?.end}` : ""}`}
              />
            ))}
          </LinkList>
        </>
      )}
    </>
  );
}