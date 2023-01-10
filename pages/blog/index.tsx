import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import config from "../../config";
import { BlogPost, generatePathString } from "../../lib/blog";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";
import Alert from "../../components/ui/Alert";
import Link from "next/link";
import { relativeTime } from "../../lib/timestamp";
import useContentStoreHook from "../../stores/content/hook";
import Paper from "../../components/ui/Paper";

const Blog = () => {
  const contentStoreHook = useContentStoreHook();
  const isMountedRef = useRef<any>(null);

  const [posts, setPosts] = useState<BlogPost[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const getPosts = async (force?: boolean) => {
    setIsLoading(true);
    const result = await contentStoreHook.getPosts(force);
    if (result.length) {
      setPosts(result);
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
    if (!isMountedRef.current) getPosts();
    isMountedRef.current = true;
  }, []);
  
  return (
    <>
      <Head>
        <title>{retitle("Blog")}</title>
        <meta property="og:title" content={retitle("Blog")} key="title" />
      </Head>
      <NavigationView
        className="blog-list-page"
        content={(
          <article className="app-page">
            {
              !isLoading && !isSuccess
                ? (
                  <Alert variant="error">
                    <span>Failed to fetch blog posts. <a href="#" onClick={() => getPosts(true)}>Try again.</a></span>
                  </Alert>
                )
                : <></>
            }
            {
              isLoading
                ? (
                  <Alert variant="plain">
                    <span>Fetching blog posts...</span>
                  </Alert>
                )
                : <></>
            }
            <h2>Blog</h2>
            <Paper variant="link-list">
              <ul>
                {
                  posts?.map((p) => (
                    <li key={p.id}>
                      <Link href={generatePathString(p.slug!)}>
                        <h3>{p.title}</h3>
                        <span className="timestamp">
                          {`${relativeTime(p.publishedOn!)} - ${new Date(p.publishedOn!).toLocaleDateString()}`}
                        </span>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </Paper>
          </article>
        )}
      />
    </>
  );
};

export default Blog;
