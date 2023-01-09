import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import config from "../../config";
import retitle from "../../lib/retitle";
import { BlogPost } from "../../lib/blog";
import Alert from "../../components/ui/Alert";
import NavigationView from "../../components/ui/NavigationView";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import usePostStoreHook from "../../stores/posts/hook";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import { useRouter } from "next/router";

const BlogPostPage = () => {
  const router = useRouter();
  const postStoreHook = usePostStoreHook();
  const isMountedRef = useRef<any>(null);

  const [urlSlug, setUrlSlug] = useState<string>();
  const [post, setPost] = useState<BlogPost | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getPost = async (force?: boolean) => {
    setIsLoading(true);
    const storeResult = await postStoreHook.getPosts(force);
    const searchResult = storeResult.filter((p) => p.isPublished && p.slug === urlSlug);
    if (storeResult.length) {
      setPost(searchResult[0]);
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const { slug } = router.query;
    setUrlSlug(slug as string);
  }, [router, router.query, router.query.slug]);

  useEffect(() => {
    if (urlSlug && urlSlug.length) {
      if (!isMountedRef.current) getPost();
      isMountedRef.current = true;
    }
  }, [urlSlug]);
  
  return (
    <>
      <Head>
        <title>{retitle(post?.title)}</title>
        <meta property="og:title" content={retitle(post?.title)} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Blog",
            href: "/blog"
          },
          {
            title: post?.title ?? "Post"
          }
        ]} />
      <NavigationView
        className="pageBlogPost"
        content={(
          <article className="topLevelPage">
            {
              isLoading
                ? (
                  <Alert variant="plain">
                    <span>Fetching post...</span>
                  </Alert>
                )
                : (
                  <>
                    {
                      !isSuccess
                        ? (
                          <Alert variant="error">
                            <span>Failed to fetch post.</span>
                          </Alert>
                        )
                        : <></>
                    }
                  </>
                )
            }
            <div className="pageBlogPostHeader">
              <h2>{post?.title}</h2>
              {
                post?.subtitle ?
                  <sub>{post?.subtitle}</sub>
                  :
                  <></>
              }
              <p className="timestamp">
                {post?.publishedOn ? new Date(post?.publishedOn).toDateString() : ""}
              </p>
            </div>
            <div className="pageBlogPostContent">
              <ReactMarkdown>
                {decodeURI(post?.content ?? "")}
              </ReactMarkdown>
            </div>
            <hr />
            <p style={{ width: "100%", textAlign: "center" }}>
              <small><Link href="/blog">&larr; See all posts</Link></small>
            </p>
          </article>
        )} />
    </>
  );
};

export default BlogPostPage;
