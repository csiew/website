import React, { useEffect } from "react";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import config from "../../config";
import retitle from "../../lib/retitle";
import { relativeTime } from "../../lib/timestamp";
import { Post } from "../../manifests/@types";
import { nowPostManifest } from "../../manifests/now";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import NavigationView from "../../components/ui/NavigationView";

const NowArchive = ({ posts }: { posts: Post[] }) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Now Archive")}</title>
        <meta property="og:title" content={retitle("Now Archive")} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Now",
            href: "/now"
          },
          {
            title: "Archive"
          }
        ]} />
      <NavigationView
        content={(
          <article className="app-page">
            <h2>Archive</h2>
            <div className="post-list">
              {
                posts.map((post) => (
                  <div key={post.slug} className="post-list-entry">
                    <h3><Link href={path.join("/now", post.slug!)}>{post.title}</Link></h3>
                    <span className="timestamp">
                      {`${relativeTime(new Date(post.publishedAt))} - ${new Date(post.publishedAt).toDateString()}`}
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
  const posts = [...nowPostManifest.entries()]
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

export default NowArchive;
