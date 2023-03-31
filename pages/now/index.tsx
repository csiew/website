import React, { useEffect } from "react";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Link from "next/link";
import NavigationView from "../../components/ui/NavigationView";
import config from "../../config";
import retitle from "../../lib/retitle";
import { nowEditionManifest, nowPostManifest } from "../../manifests/now";
import { Post } from "../../manifests/@types";
import TagList from "../../components/app/TagList";

const Now = ({ posts }: { posts: Post[] }) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);
  
  return (
    <>
      <Head>
        <title>{retitle("Now")}</title>
        <meta property="og:title" content={retitle("Now")} key="title" />
      </Head>
      <NavigationView
        content={(
          <article className="app-page">
            <h2>Now</h2>
            <p>
              This is a space to explain what&apos;s going on in my life right now. These are things which I don&apos;t think need their own blog post, nor are things which have the right home/dumping-ground on any of my social media accounts.
            </p>
            <p>
              Many of the musings or ideas on this page are either only on the surface-level or half-baked.
            </p>
            <hr />
            {
              posts.map((post) => (
                <div key={post.slug}>
                  <ReactMarkdown linkTarget="_blank">
                    {post.content!}
                  </ReactMarkdown>
                  <TagList item={post} />
                  <p className="now-entry-footer">
                    <span>
                      {`${new Date(post.publishedAt).toDateString()}`}
                    </span>
                    <Link href={path.join("now", post.slug!)}>
                      Permalink
                    </Link>
                  </p>
                  <hr />
                </div>
              ))
            }
            <p style={{ width: "100%", textAlign: "center" }}>
              <small><Link href="/now/archive">See all past updates &rarr;</Link></small>
            </p>
          </article>
        )}
      />
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const currentEdition = 1;
  const edition = nowEditionManifest.get(currentEdition);

  let posts: Post[] = [];

  if (edition) {
    posts = [...nowPostManifest.entries()]
      .map(([slug, definition]) => {
        const content = fs.readFileSync(path.join(process.cwd(), "content", "now", definition.filePath), { encoding: "utf8" });
        return {
          ...definition,
          publishedAt: (definition?.publishedAt as Date).getTime(),
          slug,
          content
        };
      });
  }

  return {
    props: { posts },
  };
};

export default Now;
