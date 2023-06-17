import React, { useEffect } from "react";
import fs from "fs";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import config from "../../config";
import retitle from "../../lib/retitle";
import { Post } from "../../manifests/@types";
import { nowPostManifest } from "../../manifests/now";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import NavigationView from "../../components/ui/NavigationView";
import TagList from "../../components/app/TagList";

const NowPostPage = ({ post }: { post: Post }) => {
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);
  
  return (
    <>
      <Head>
        <title>{retitle(post?.title)}</title>
        <meta property="og:title" content={retitle(post?.title)} key="title" />
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Now",
            href: "/now"
          },
          {
            title: post?.title ?? "Post"
          }
        ]} />
      <NavigationView
        content={(
          <article className="content-page now-content-page">
            <div className="header">
              <h2>{post.title}</h2>
              <div className="subtitle">{post.subtitle}</div>
              <div className="timestamp">{new Date(post.publishedAt).toDateString()}</div>
            </div>
            <div className={["content", post.quotesAsNotes ? "blockquotes-as-notes" : ""].join(" ")}>
              <ReactMarkdown linkTarget="_blank" rehypePlugins={[rehypeRaw]}>
                {post.content!}
              </ReactMarkdown>
            </div>
            <TagList item={post} />
            <hr />
            <p style={{ width: "100%", textAlign: "center" }}>
              <Link href="/now/archive">See all past updates &rarr;</Link>
            </p>
          </article>
        )}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [...nowPostManifest.keys()].map((slug) => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps = async (context: any) => {
  const postContentDir = path.join(process.cwd(), "content", "now");
  const definition = nowPostManifest.get(context.params.slug);
  if (!definition) throw new Error(`Manifest for post '${context.params.slug}' not found`);
  const content = fs.readFileSync(path.join(postContentDir, definition.filePath), { encoding: "utf8" });
  const post: Post = {
    ...definition,
    publishedAt: (definition?.publishedAt as Date).getTime(),
    slug: context.params.slug,
    content
  };
  return {
    props: { post },
  };
};

export default NowPostPage;
