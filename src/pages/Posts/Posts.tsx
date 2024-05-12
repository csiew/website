import React from "react";
import _ from "lodash";
import { CacheContextState } from "../../stores/cache";
import LinkList from "../../components/ui/LinkList/LinkList";
import LinkListItem from "../../components/ui/LinkList/LinkListItem";

export default function Posts() {
  const cacheContext = React.useContext(CacheContextState);

  return (
    <>
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