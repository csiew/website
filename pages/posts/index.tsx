import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import retitle from "../../lib/retitle";
import config from "../../config";
import NavigationView from "../../components/ui/NavigationView";
import TagList from "../../components/app/TagList";

function Blog({ posts }: { posts: { [k: string]: any }[] }) {
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
                  <div key={post.urlSlug} className="post-list-entry">
                    <h3><Link href={path.join("/posts", post.urlSlug)}>{post.title}</Link></h3>
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
}

export async function getStaticProps() {
  const response = await fetch(
    `https://${config.supabase.host}/rest/v1/item?content_type=eq.blog_post`,
    {
      headers: {
        "apikey": config.supabase.apiKey as string
      }
    }
  );
  const posts = (await response.json())
    .map((post: any) => post.body)
    .sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt));
 
  return { props: { posts } };
}

export default Blog;
