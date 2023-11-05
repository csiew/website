import React, { useEffect } from "react";
import Head from "next/head";
import retitle from "../../lib/retitle";
import config from "../../config";
import NavigationView from "../../components/ui/NavigationView";
import PaperList from "../../components/ui/PaperList/PaperList";
import PaperListItem from "../../components/ui/PaperList/PaperListItem";
import { queryDbRest } from "../../client/db";
import Link from "next/link";
import { dateTransform } from "../../utils/fetch-blog-posts";

function Blog({ posts }: { posts: any[] }) {
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
            <PaperList>
              {
                dateTransform(posts)?.map((post) => (
                  <PaperListItem
                    key={post.urlSlug}
                    className="post-list-entry"
                  >
                    <h4>
                      <Link href={`/posts/${post.urlSlug}`}>
                        {post.title}
                      </Link>
                    </h4>
                    <span>{post.subtitle}</span>
                    <span className="timestamp">
                      {`${new Date(post.publishedAt).toDateString()}`}
                    </span>
                  </PaperListItem>
                ))
              }
            </PaperList>
          </article>
        )}
      />
    </>
  );
}

export async function getStaticProps() {
  const result = await queryDbRest("item", "content_type=eq.blog_post");
  const posts = result.sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt));
 
  return { props: { posts } };
}

export default Blog;
