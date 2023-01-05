import React from "react";
import ReactMarkdown from "react-markdown";
import { BlogPost, generatePathString } from "../../../lib/blog";
import NavigationView from "../../ui/NavigationView";
import { relativeTime } from "../../../lib/timestamp";
import Link from "next/link";
import Breadcrumbs from "../../ui/Breadcrumbs";

type BlogNavigationViewProps = {
  posts?: BlogPost[];
  post?: BlogPost;
}

const BlogNavigationView = ({ posts, post }: BlogNavigationViewProps) => {
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
                      {new Date(post?.publishedOn).toDateString()}
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
                            <Link href={generatePathString(p.slug)}>
                              <h3>{p.title}</h3>
                            </Link>
                            <sub>{`${relativeTime(p.publishedOn)} - ${new Date(p.publishedOn).toLocaleDateString()}`}</sub>
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
