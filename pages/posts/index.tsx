import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { generatePathString } from "../../lib/blog";
import retitle from "../../lib/retitle";
import { relativeTime } from "../../lib/timestamp";
import postManifest from "./manifest";
import config from "../../config";
import NavigationView from "../../components/ui/NavigationView";
import Paper from "../../components/ui/Paper";

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
            <Paper variant="link-list">
              <ul>
                {
                  posts?.map((p) => (
                    <li key={p.id}>
                      <Link href={generatePathString(p.slug!)}>
                        <h3>{p.title}</h3>
                        <span className="timestamp">
                          {`${relativeTime(p.publishedAt)} - ${new Date(p.publishedAt).toDateString()}`}
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
