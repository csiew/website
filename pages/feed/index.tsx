import React, { useEffect } from "react";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import config from "../../config";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";
import { nowPostManifest } from "../../manifests/now";
import { postManifest } from "../../manifests/posts";
import { Post } from "../../manifests/@types";
import Badge from "../../components/ui/Badge";

const FeedPage = ({ posts }: { posts: Post[] }) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Feed")}</title>
        <meta property="og:title" content={retitle("Feed")} key="title" />
      </Head>
      <NavigationView
        content={(
          <article className="app-page">
            <h2>Feed</h2>
            <div className="post-list">
              {
                posts.map((post) => (
                  <div key={post.slug} className="post-list-entry">
                    <h3><Link href={path.join("/now", post.slug!)}>{post.title}</Link></h3>
                    <div style={{
                      width: "100%",
                      display: "inline-flex",
                      flexFlow: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "0.5rem",
                    }}>
                      <Badge style={{ fontWeight: "bold" }}>
                        {post.layout}
                      </Badge>
                      <span>{post.subtitle}</span>
                    </div>
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
  const posts = [...postManifest.entries(), ...nowPostManifest.entries()]
    .map(([slug, definition]) => {
      return {
        ...definition,
        publishedAt: (definition?.publishedAt as Date).getTime(),
        slug,
      };
    })
    .sort((a, b) => {
      return a.publishedAt < b.publishedAt ? 1 : -1;
    });
  return {
    props: { posts }
  };
};

export default FeedPage;
