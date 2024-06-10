import React from "react";
import { Helmet } from "react-helmet-async";
import "./Post.css";
import RenderMd from "../../../components/util/RenderMd/RenderMd";

export default function Post({ slug }: { slug: string }) {
  const isMountedRef = React.useRef<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [metadata, setMetadata] = React.useState<any>({});
  const [content, setContent] = React.useState<string>("");
  
  async function handleFetchContent() {
    console.debug(`Fetching post metadata for: ${slug}`);
    try {
      setIsLoading(true);
      const metadataResult = await fetch(`/content/posts/${slug}/metadata.json`);
      if (!metadataResult.ok)
        throw new Error(metadataResult.statusText);

      const contentResult = await fetch(`/content/posts/${slug}/index.md`);
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
        <title>{metadata?.title ?? "Blog"} | Clarence Siew</title>
        <meta name="description" content={metadata?.subtitle} />
        <meta name="keywords" content={metadata?.keywords} />
        <meta name="author" content="Clarence Siew" />
        <meta property="og:title" content={`${metadata?.title ?? "Blog"} | Clarence Siew`} />
        <meta property="og:url" content={`https://www.clarencesiew.com/posts/${metadata?.slug}`} />
        <meta property="og:site_name" content="Clarence Siew" />
        <meta property="og:description" content={metadata?.subtitle} />
        <meta property="og:keywords" content={metadata?.keywords} />
        <meta property="og:published_time" content={metadata?.publishedAt} />
        <meta property="og:author" content="Clarence Siew" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
      </Helmet>
      {isError && <p>Failed to fetch post. Try reloading this page.</p>}
      {isLoading && <p>Loading...</p>}
      {!isError && !isLoading && (
        <article className="post">
          <div className="post-header">
            <h2>{metadata.title}</h2>
            <p className="subtitle">{metadata.subtitle}</p>
            <sub className="timestamp">{new Date(metadata.publishedAt).toDateString()}</sub>
          </div>
          <div className="post-body">
            <RenderMd>{content}</RenderMd>
          </div>
        </article>
      )}
    </>
  );
}