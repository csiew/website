import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import config from "../../config";
import { BlogPost } from "../../lib/blog";
import retitle from "../../lib/retitle";
import BlogNavigationView from "../../components/app/BlogNavigationView";
import { getRemotePosts, mapDocumentDataToPosts } from "../../firebase/posts";
import { ContentContext } from "../_app";

const Blog = () => {
  const contentContext = useContext(ContentContext);
  const isMountedRef = useRef<any>(null);

  const [posts, setPosts] = useState<BlogPost[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const getPosts = async (force?: boolean) => {
    setIsLoading(true);
    if (!!force || !contentContext.posts.length) {
      console.debug("Fetching blog post list from Firestore...");
      try {
        const remotePosts = await getRemotePosts();
        const mappedPosts = mapDocumentDataToPosts(
          remotePosts.docs.map((d) => ({ id: d.id, ...d.data() }))
        ).filter((p) => p.isPublished);
        contentContext.posts = mappedPosts;
        setIsSuccess(true);
      } catch (err) {
        if (config.debugMode) console.error(err);
        setIsSuccess(false);
      }
    }
    setPosts(contentContext.posts);
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
      <BlogNavigationView posts={posts} isLoading={isLoading} isSuccess={isSuccess} />
    </>
  );
};

export default Blog;
