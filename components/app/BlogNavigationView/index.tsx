import React from "react";
import ReactMarkdown from "react-markdown";
import { BlogPost, generatePathString } from "../../../lib/blog";
import NavigationView from "../../ui/NavigationView";
import { relativeTime } from "../../../lib/timestamp";
import Link from "next/link";
import Breadcrumbs from "../../ui/Breadcrumbs";
import Alert from "../../ui/Alert";
import { isUndefined } from "lodash";

type BlogNavigationViewProps = {
  posts?: BlogPost[];
  post?: BlogPost;
  isLoading?: boolean;
  isSuccess?: boolean;
}

const BlogNavigationView = ({ posts, post, isLoading, isSuccess }: BlogNavigationViewProps) => {
  if (posts) {
    posts
      .sort((a, b) => {
        const dateA = new Date(a.publishedOn!).getTime();
        const dateB = new Date(b.publishedOn!).getTime();
        return dateB - dateA;
      });
  }
  
  return (
    <>
      {
        post
          ? (
            <Breadcrumbs
              items={[
                {
                  title: "Blog",
                  href: "/blog"
                },
                {
                  title: post?.title ?? "Post"
                }
              ]} />
          )
          : <></>
      }
      <NavigationView
        classList={[post ? "pageBlogPost" : "pageBlog"]}
        content={(
          <article className="topLevelPage">
            {
              !isUndefined(isLoading) && !isUndefined(isSuccess) && !isLoading && !isSuccess
                ? (
                  <Alert variant="error">
                    <span>Failed to fetch blog posts. <Link href="/blog">Try again.</Link></span>
                  </Alert>
                )
                : <></>
            }
            {
              !isUndefined(isLoading) && isLoading
                ? (
                  <Alert variant="plain">
                    <span>Fetching blog posts...</span>
                  </Alert>
                )
                : <></>
            }
            {
              post ?
                <>
                  <div className="pageBlogPostHeader">
                    <h2>{post?.title}</h2>
                    {
                      post?.subtitle ?
                        <sub>{post?.subtitle}</sub>
                        :
                        <></>
                    }
                    <p className="timestamp">
                      {post?.publishedOn ? new Date(post?.publishedOn).toDateString() : ""}
                    </p>
                  </div>
                  <div className="pageBlogPostContent">
                    <ReactMarkdown>
                      {decodeURI(post?.content ?? "")}
                    </ReactMarkdown>
                  </div>
                  <hr />
                  <p style={{ width: "100%", textAlign: "center" }}>
                    <small><Link href="/blog">&larr; See all posts</Link></small>
                  </p>
                </>
                : <></>
            }
            {
              posts
                ? (
                  <>
                    <h2>Blog</h2>
                    <ul className="postList">
                      {
                        posts?.map((p) => (
                          <li key={p.id}>
                            <Link href={generatePathString(p.slug!)}>
                              <h3>{p.title}</h3>
                            </Link>
                            <sub>{`${relativeTime(p.publishedOn!)} - ${new Date(p.publishedOn!).toLocaleDateString()}`}</sub>
                          </li>
                        ))
                      }
                    </ul>
                  </>
                )
                : <></>
            }
          </article>
        )}
      />
    </>
  );
};

export default BlogNavigationView;
