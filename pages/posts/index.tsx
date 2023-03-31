import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import retitle from "../../lib/retitle";
import { postManifest } from "../../manifests/posts";
import config from "../../config";
import NavigationView from "../../components/ui/NavigationView";
import TagList from "../../components/app/TagList";

const Blog = ({ posts }: { posts: { [k: string]: any }[] }) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Posts")}</title>
        <meta property="og:title" content={retitle("Posts")} key="title" />
      </Head>
      <NavigationView
        className="posts-list-page"
        content={(
          <article className="app-page">
            <h2>Posts</h2>
            <div className="post-list">
              {
                posts?.map((post) => (
                  <div key={post.slug} className="post-list-entry">
                    <h3><Link href={path.join("/posts", post.slug)}>{post.title}</Link></h3>
                    <span>{post.subtitle}</span>
                    <TagList item={post} />
                    <span className="timestamp">
                      {`${new Date(post.publishedAt).toDateString()}`}
                    </span>
                  </div>
                ))
              }
            </div>
          </article>
        )}
      />
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const posts = [...postManifest.entries()]
    .map(([slug, definition]) => {
      return {
        ...definition,
        publishedAt: (definition?.publishedAt as Date).getTime(),
        slug
      };
    })
    .sort((a, b) => {
      return a.publishedAt < b.publishedAt ? 1 : -1;
    });
  return {
    props: { posts },
  };
};

export default Blog;
