import React, { useEffect } from "react";
import Head from "next/head";
import config from "../../config";
import retitle from "../../lib/retitle";
import BlogNavigationView from "../../components/app/BlogNavigationView";
import { getRemotePosts, mapDocumentDataToPosts } from "../../firebase/posts";
import { BlogPost } from "../../lib/blog";

const BlogPostPage = ({ post }: { post: string }) => {
  const parsedPost = JSON.parse(post) as BlogPost;

  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);
  
  return (
    <>
      <Head>
        <title>{retitle(parsedPost.title)}</title>
        <meta property="og:title" content={retitle(parsedPost.title)} key="title" />
      </Head>
      <BlogNavigationView post={parsedPost} />
    </>
  );
};

export const getStaticPaths = async () => {
  const remotePosts = await getRemotePosts();
  const posts = mapDocumentDataToPosts(
    remotePosts.docs.map((d) => ({ id: d.id, ...d.data() }))
  ).filter((p) => p.isPublished);
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  };
};

export const getStaticProps = async (context: any) => {
  const { slug } = context.params;
  const remotePosts = await getRemotePosts();
  const post = mapDocumentDataToPosts(
    remotePosts.docs.map((d) => ({ id: d.id, ...d.data() }))
  ).filter((p) => p.isPublished && p.slug === slug)[0];
  return {
    props: { post: JSON.stringify(post) }
  };
};

export default BlogPostPage;
