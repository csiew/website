import React from "react";
import { Helmet } from "react-helmet-async";
import { CacheContextState } from "../../stores/cache";
import LinkList from "../../components/ui/LinkList/LinkList";
import LinkListItem from "../../components/ui/LinkList/LinkListItem";

export default function Projects() {
  const cacheContext = React.useContext(CacheContextState);

  return (
    <>
      <Helmet>
        <title>Projects | Clarence Siew</title>
        <meta name="title" property="og:title" content="Projects | Clarence Siew" />
        <meta name="url" property="og:url" content="https://www.clarencesiew.com/projects" />
        <meta name="site_name" property="og:site_name" content="Clarence Siew" />
        <meta name="description" property="og:description" content="Projects by Clarence Siew" />
        <meta name="author" property="og:author" content="Clarence Siew" />
        <meta name="locale" property="og:locale" content="en_GB" />
      </Helmet>
      <h2>Projects</h2>
      {!cacheContext.projects.length
        ? <p>Loading...</p>
        : (
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
        )
      }
    </>
  );
}
