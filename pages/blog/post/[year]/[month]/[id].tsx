import React, { useEffect } from "react";
import Head from "next/head";
import config from "../../../../../config";
import retitle from "../../../../../lib/retitle";
import { BlogPost, getPosts } from "../../../../../lib/blog";
import BlogNavigationView from "../../../../../components/app/BlogNavigationView";

type BlogPostPageProps = {
  year: string;
  month: string;
  id: string;
};

const getPost = (posts: BlogPost[], { year, month, id }: BlogPostPageProps) => {
  return posts.find((p) => {
    return String(p.path?.year) === year
      && String(p.path?.month) === month
      && String(p.path?.shortTitle) === id;
  });
};

const BlogPostPage = ({ posts, post }: { posts: BlogPost[], post: BlogPost }) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);
  
  return (
    <>
      <Head>
        <title>{retitle(post.title)}</title>
        <meta property="og:title" content={retitle(post.title)} key="title" />
      </Head>
      <BlogNavigationView posts={posts} post={post} />
    </>
  );
};

export const getStaticPaths = () => {
  return {
    paths: getPosts(false).map((post) => ({
      params: {
        year: String(post.path?.year),
        month: String(post.path?.month),
        id: post.path?.shortTitle
      },
    })),
    fallback: false
  };
};

export const getStaticProps = async (context: any) => {
  const { year, month, id } = context.params;
  const posts = getPosts(true);
  return {
    props: {
      posts,
      post: getPost(posts, { year, month, id })
    }
  };
};

export default React.memo(BlogPostPage);
