import React from "react";
import ReactMarkdown from "react-markdown";
import { BlogPost } from "../../../lib/blog";
import { generatePathString } from "../../../pages/blog/get-posts";
import NavigationSidebar from "../../ui/NavigationSidebar";
import NavigationView from "../../ui/NavigationView";
import Paper from "../../ui/Paper";

type BlogNavigationViewProps = {
  posts: BlogPost[];
  post?: BlogPost;
}

const BlogNavigationView = ({ posts, post }: BlogNavigationViewProps) => {
  return (
    <NavigationView
      classList={[post ? "pageBlogPost" : "pageBlog"]}
      nav={
        post ?
          <NavigationSidebar
            keyPrefix="blog-post-"
            items={posts.map((p) => ({
              key: p.id,
              label: p.title,
              url: generatePathString(p.path)
            }))}
          />
          :
          undefined
      }
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
                          <Paper>
                            <h3>{p.title}</h3>
                            <sub>{new Date(p.publishedOn).toDateString()}</sub>
                          </Paper>
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </>
          }
        </article>
      )}
    />
  );
};

export default BlogNavigationView;
