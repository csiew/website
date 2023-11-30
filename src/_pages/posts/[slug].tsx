import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import retitle from "../../lib/retitle";
import config from "../../config";
import NavigationView from "../../components/ui/NavigationView";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import TagList from "../../components/app/TagList";
import { queryDbRest } from "../../client/db";
import Markdown from "../../components/ui/Markdown/Markdown";

function BlogPostPage({ post }: { post: any }) {
  const router = useRouter();
  
  useEffect(() => {
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{retitle(post?.title)}</title>
        <meta property="og:title" content={retitle(post?.title)} key="title" />
        {
          post.tags && <meta name="keywords" content={post.tags?.join(", ")} />
        }
      </Head>
      <Breadcrumbs
        items={[
          {
            title: "Posts",
            href: "/posts"
          },
          {
            title: post?.title ?? "Post"
          }
        ]}
      />
      <NavigationView
        content={(
          <article className="content-page">
            <div className="header">
              <h2>{post?.title}</h2>
              {post?.subtitle && <span className="subtitle">{post?.subtitle}</span>}
              <span className="timestamp">
                {post?.publishedAt ? new Date(post?.publishedAt).toDateString() : ""}
              </span>
            </div>
            <div className={["content", post.quotesAsNotes ? "blockquotes-as-notes" : ""].join(" ")}>
              <Markdown>{atob(post?.body ?? "")}</Markdown>
            </div>
            <TagList item={post} />
            <hr />
            <button
              title="See all posts"
              onClick={() => router.replace("/posts")}
              style={{ marginInline: "auto" }}
            >
              See all posts
            </button>
          </article>
        )} />
    </>
  );
}

export async function getStaticPaths() {
  const result = await queryDbRest("item", "content_type=eq.blog_post&body->>hiddenAt=is.null");
  const posts = result
    .sort((a: any, b: any) => a.publishedAt.localeCompare(b.publishedAt))
    .reverse();
  const paths = posts.map((post: any) => ({ params: { slug: post.urlSlug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const { slug } = params;
  const result = await queryDbRest("item", `content_type=eq.blog_post&body->>hiddenAt=is.null&body->>urlSlug=eq.${slug}`);
  const post = result?.[0];
 
  return { props: { post } };
}

export default BlogPostPage;
