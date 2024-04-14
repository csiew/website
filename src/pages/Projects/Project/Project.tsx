import React from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import "./Project.css";

export default function Project() {
  const { slug } = useParams();
  const isMountedRef = React.useRef<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [metadata, setMetadata] = React.useState<any>({});
  const [content, setContent] = React.useState<string>("");
  
  async function handleFetchContent() {
    console.debug(`Fetching project metadata for: ${slug}`);
    try {
      setIsLoading(true);
      const metadataResult = await fetch(`/content/projects/${slug}/metadata.json`);
      if (!metadataResult.ok)
        throw new Error(metadataResult.statusText);

      const contentResult = await fetch(`/content/projects/${slug}/index.md`);
      if (!contentResult.ok)
        throw new Error(contentResult.statusText);

      setMetadata(await metadataResult.json());
      setContent(await contentResult.text());
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
      handleFetchContent();
    }
  }, []);

  return (
    <>
      {isError && <p>Failed to fetch project. Try reloading this page.</p>}
      {isLoading && <p>Loading...</p>}
      {!isError && !isLoading && (
        <article className="project">
          <div className="project-header">
            <h2>{metadata.title}</h2>
            <p className="subtitle">{metadata.subtitle}</p>
            <sub className="timestamp">{`${metadata.duration?.start}${metadata.duration?.start !== metadata.duration?.end ? ` - ${metadata.duration?.end}` : ""}`}</sub>
          </div>
          <div className="project-body">
            <Markdown>{content}</Markdown>
          </div>
        </article>
      )}
    </>
  );
}