import React, { useEffect } from "react";
import Head from "next/head";
import config from "../../config";
import { BlogPost } from "../../lib/blog";
import retitle from "../../lib/retitle";
import BlogNavigationView from "../../components/app/BlogNavigationView";
import { getRemotePosts, mapDocumentDataToPosts } from "../../firebase/posts";

const Blog = ({ posts }: { posts: string }) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);
  
  return (
    <>
      <Head>
        <title>{retitle("Blog")}</title>
        <meta property="og:title" content={retitle("Blog")} key="title" />
      </Head>
      <BlogNavigationView posts={JSON.parse(posts) as BlogPost[]} />
    </>
  );
};

export const getStaticProps = async () => {
  const remotePosts = await getRemotePosts();
  const posts = mapDocumentDataToPosts(
    remotePosts.docs.map((d) => ({ id: d.id, ...d.data() }))
  ).filter((p) => p.isPublished);
  return {
    props: { posts: JSON.stringify(posts) }
  };
};

export default Blog;
