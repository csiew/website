import React from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { BlogPost, generatePathString } from "../../../lib/blog";
import NavigationSidebar from "../../ui/NavigationSidebar";
import NavigationView from "../../ui/NavigationView";
import Paper from "../../ui/Paper";

type BlogNavigationViewProps = {
  posts: BlogPost[];
  post?: BlogPost;
}

const BlogNavigationView = ({ posts, post }: BlogNavigationViewProps) => {
  const router = useRouter();

  return (
    <NavigationView
      classList={[post ? "pageBlogPost" : "pageBlog"]}
      navPosition="right"
      nav={
        post ?
          <NavigationSidebar
            keyPrefix="blog-post-"
            items={posts.map((p) => {
              const pathString = generatePathString(p.path);
              return {
                key: p.id,
                label: (
                  <>
                    <div className="title">{p.title}</div>
                    <div className="timestamp">
                      {new Date(p.publishedOn).toLocaleDateString()}
                    </div>
                  </>
                ),
                active: router.asPath === pathString,
                url: pathString
              };
            })}
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
