import React from "react";
import { Helmet } from "react-helmet-async";
import { CacheContextState } from "../../stores/cache";
import LinkList from "../../components/ui/LinkList/LinkList";
import LinkListItem from "../../components/ui/LinkList/LinkListItem";

export default function Posts() {
  const cacheContext = React.useContext(CacheContextState);

  return (
    <>
      <Helmet>
        <title>Blog | Clarence Siew</title>
        <meta name="title" property="og:title" content="Blog | Clarence Siew" />
        <meta name="url" property="og:url" content="https://www.clarencesiew.com/posts" />
        <meta name="site_name" property="og:site_name" content="Clarence Siew" />
        <meta name="description" property="og:description" content="Blog posts by Clarence Siew" />
        <meta name="author" property="og:author" content="Clarence Siew" />
        <meta name="locale" property="og:locale" content="en_GB" />
      </Helmet>
      <h2>Posts</h2>
      {!cacheContext.posts.length
        ? <p>Loading...</p>
        : (
          <LinkList>
            {cacheContext.posts.map((p) => (
              <LinkListItem
                key={p.slug}
                title={p.title}
                subtitle={p.subtitle}
                url={`/posts/${p.slug}`}
                timestamp={new Date(p.publishedAt).toDateString()}
              />
            ))}
          </LinkList>
        )
      }
    </>
  );
}
