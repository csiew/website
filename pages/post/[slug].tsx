import React, { useEffect } from "react";
import Head from "next/head";
import config from "../../config";
import retitle from "../../lib/retitle";
import { BlogPost, getPosts } from "../../lib/blog";
import BlogNavigationView from "../../components/app/BlogNavigationView";

const getPost = (slug: string) => {
  return getPosts(true).find((p) => p.slug === slug);
};

const BlogPostPage = ({ post }: { post: BlogPost }) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);
  
  return (
    <>
      <Head>
        <title>{retitle(post.title)}</title>
        <meta property="og:title" content={retitle(post.title)} key="title" />
      </Head>
      <BlogNavigationView post={post} />
    </>
  );
};

export const getStaticPaths = () => ({
  paths: getPosts(false).map((p) => ({ params: { slug: p.slug } })),
  fallback: false
});

export const getStaticProps = (context: any) => ({
  props: { post: getPost(context.params.slug) }
});

export default BlogPostPage;
