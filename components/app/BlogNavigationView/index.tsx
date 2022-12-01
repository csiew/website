import React from "react";
import ReactMarkdown from "react-markdown";
import { BlogPost, generatePathString } from "../../../lib/blog";
import NavigationView from "../../ui/NavigationView";
import Paper from "../../ui/Paper";
import { relativeTime } from "../../../lib/timestamp";
import Button from "../../ui/Button";

type BlogNavigationViewProps = {
  posts: BlogPost[];
  post?: BlogPost;
}

const BlogNavigationView = ({ posts, post }: BlogNavigationViewProps) => {
  return (
    <>
      {
        post
          ? (
            <div style={{ width: "100%", padding: "1rem" }}>
              <Button variant="link" url="/blog">Back</Button>
            </div>
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
                      {decodeURI(post?.content || "")}
                    </ReactMarkdown>
                  </div>
                </>
                :
                <>
                  <h2>Blog</h2>
                  <ul className="postList">
                    {
                      posts.map((p) => (
                        <li key={p.id}>
                          <a href={generatePathString(p.path)}>
                            <h3>{p.title}</h3>
                          </a>
                          <sub>{`${relativeTime(p.publishedOn)} - ${new Date(p.publishedOn).toLocaleDateString()}`}</sub>
                        </li>
                      ))
                    }
                  </ul>
                </>
            }
          </article>
        )}
      />
    </>
  );
};

export default BlogNavigationView;
