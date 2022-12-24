import React, { useEffect } from "react";
import Head from "next/head";
import config from "../../config";
import { BlogPost, getPosts } from "../../lib/blog";
import retitle from "../../lib/retitle";
import BlogNavigationView from "../../components/app/BlogNavigationView";

const Blog = ({ posts }: { posts: BlogPost[] }) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);
  
  return (
    <>
      <Head>
        <title>{retitle("Blog")}</title>
        <meta property="og:title" content={retitle("Blog")} key="title" />
      </Head>
      <BlogNavigationView posts={posts} />
    </>
  );
};

export const getStaticProps = async () => {
  const posts = getPosts();
  return {
    props: { posts }
  };
};

export default Blog;
