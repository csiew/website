import React from "react";
import { Helmet } from "react-helmet-async";
import "./Home.css";
import homeMd from "./Home.md";
import RenderMd from "../../components/util/RenderMd/RenderMd";
import { CacheContextState } from "../../stores/cache";
import { Link } from "wouter";

export default function Home() {
  const cacheContext = React.useContext(CacheContextState);
  const [content, setContent] = React.useState<string>("");

  const latestBlogPost = React.useMemo(
    () => cacheContext.posts[0],
    [cacheContext.posts]
  );

  React.useEffect(() => {
    fetch(homeMd)
      .then((md) => md.text())
      .then((c) => setContent(c));
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Clarence Siew</title>
        <meta name="title" property="og:title" content="Home | Clarence Siew" />
        <meta name="url" property="og:url" content="https://www.clarencesiew.com/" />
        <meta name="site_name" property="og:site_name" content="Clarence Siew" />
        <meta name="description" property="og:description" content="Software Engineer based in Melbourne" />
        <meta name="author" property="og:author" content="Clarence Siew" />
        <meta name="locale" property="og:locale" content="en_GB" />
      </Helmet>
      <div className="home">
        <Link to={latestBlogPost ? `/posts/${latestBlogPost.slug}` : "/posts"}>
          <div className="latest">
            <span>Read my latest blog post</span>
            <h2>
              {latestBlogPost?.title}
            </h2>
          </div>
        </Link>
        <div className="home-intro">
          <RenderMd>{content}</RenderMd>
        </div>
      </div>
    </>
  );
}
