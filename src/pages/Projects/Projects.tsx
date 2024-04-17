import React from "react";
import { CacheContextState } from "../../stores/cache";
import LinkList from "../../components/ui/LinkList/LinkList";
import LinkListItem from "../../components/ui/LinkList/LinkListItem";

export default function Projects() {
  const cacheContext = React.useContext(CacheContextState);

  return (
    <>
      <h2>Projects</h2>
      <LinkList>
        {cacheContext.projects.map((p) => (
          <LinkListItem
            key={p.slug}
            title={p.title}
            subtitle={p.subtitle}
            url={`/projects/${p.slug}`}
            timestamp={`${p.duration?.start}${p.duration?.start !== p.duration?.end ? ` - ${p.duration?.end}` : ""}`}
          />
        ))}
      </LinkList>
    </>
  );
}