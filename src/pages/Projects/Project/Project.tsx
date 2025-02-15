import React from "react";
import { Link } from "wouter";
import Markdown from "react-markdown";
import { Helmet } from "react-helmet-async";
import "./Project.css";

export default function Project({ slug }: { slug: string }) {
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
      <Helmet>
        <title>{metadata?.title ?? "Projects"} | Clarence Siew</title>
        <meta name="title" property="og:title" content={`${metadata?.title ?? "Projects"} | Clarence Siew`} />
        <meta name="url" property="og:url" content={`https://www.clarencesiew.com/projects/${metadata?.slug}`} />
        <meta name="site_name" property="og:site_name" content="Clarence Siew" />
        <meta name="description" property="og:description" content={metadata?.subtitle} />
        <meta name="author" property="og:author" content="Clarence Siew" />
        <meta name="locale" property="og:locale" content="en_GB" />
      </Helmet>
      {isError && <p>Failed to fetch project. Try reloading this page.</p>}
      {isLoading && <p>Loading...</p>}
      {!isError && !isLoading && (
        <article className="project">
          <div className="project-header">
            <h2>{metadata.title}</h2>
            <p className="subtitle">{metadata.subtitle}</p>
            <sub className="timestamp">{`${metadata.duration?.start}${metadata.duration?.start !== metadata.duration?.end ? ` - ${metadata.duration?.end}` : ""}`}</sub>
            <div className="project-links">
              <ul>
                <li>
                  <a
                    href={metadata.links?.website ? metadata.links?.website : "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={["button", !metadata.links?.website ? "disabled" : ""].join(" ").trim()}
                  >
                    Website
                  </a>
                </li>
                <li>
                  <a
                    href={metadata.links?.repository ? metadata.links?.repository : "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={["button", !metadata.links?.repository ? "disabled" : ""].join(" ").trim()}
                  >
                    Repository
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="project-body">
            {metadata.assets?.screenshots && (
              <div className="project-screenshots">
                {metadata.assets?.screenshots?.map((s: string) => (
                  <Link key={s} to={`/content/projects/${metadata.slug}${s}`}>
                    <img key={s} src={`/content/projects/${metadata.slug}${s}`} />
                  </Link>
                ))}
              </div>
            )}
            <Markdown>{content}</Markdown>
          </div>
        </article>
      )}
    </>
  );
}
