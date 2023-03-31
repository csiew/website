import React, { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Fuse from "fuse.js";
import config from "../../config";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";
import TextField from "../../components/ui/TextField";
import { postManifest } from "../../manifests/posts";
import { nowPostManifest } from "../../manifests/now";
import { projectManifest } from "../../manifests/projects";
import TagList from "../../components/app/TagList";
import routes from "../../lib/routes";

type SearchData = {
  url: string;
  type: "Blog" | "Now" | "Project" | "Page",
  title: string;
  subtitle?: string;
  tags?: string[];
  publishedAt?: Date;
};

const mappedPages: SearchData[] = routes.map((route) => {
  return {
    url: route.path,
    type: "Page",
    title: route.title
  };
});

const SearchPage = ({ setShowSearchModal }: { setShowSearchModal?: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const searchDataManifest: SearchData[] = [
    ...mappedPages,
    ...[...postManifest.entries()].map(([slug, post]) => {
      return {
        url: `/posts/${slug}`,
        type: "Blog",
        title: post.title,
        subtitle: post.subtitle,
        tags: post.tags,
        publishedAt: post.publishedAt
      } as SearchData;
    }),
    ...[...nowPostManifest.entries()].map(([slug, post]) => {
      return {
        url: `/now/${slug}`,
        type: "Now",
        title: post.title,
        subtitle: post.subtitle,
        tags: post.tags,
        publishedAt: post.publishedAt
      } as SearchData;
    }),
    ...[...projectManifest.entries()].map(([slug, project]) => {
      return {
        url: `/projects/${slug}`,
        type: "Project",
        title: project.title,
        subtitle: project.subtitle,
        tags: project.tags
      } as SearchData;
    })
  ];

  const fuse = new Fuse(
    searchDataManifest,
    {
      includeScore: true,
      threshold: 0.3,
      keys: ["title", "subtitle", "tags", "publishedAt"]
    }
  );

  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (ev: ChangeEvent) => {
    ev.preventDefault();
    const keywords = (ev.currentTarget as any).value;
    const results = fuse.search(keywords);
    setSearchResults(results);
  };

  const handleCloseSearchModal = (ev: MouseEvent) => {
    if ((ev.target as any).tagName === "A" && setShowSearchModal) {
      document.getElementById("search-results")?.removeEventListener("click", handleCloseSearchModal);
      setShowSearchModal(false);
    }
  };

  const handleCloseWithEscKey = (ev: KeyboardEvent) => {
    if (setShowSearchModal && ev.key === "Escape") {
      document.getElementById("search-results")?.removeEventListener("click", handleCloseSearchModal);
      setShowSearchModal(false);
    }
  };

  useEffect(() => {
    if (!setShowSearchModal)
      document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
    
    if (setShowSearchModal) {
      document.getElementById("search-results")?.addEventListener("click", handleCloseSearchModal);
      document.body.addEventListener("keydown", handleCloseWithEscKey);
      return () => {
        document.getElementById("search-results")?.removeEventListener("click", handleCloseSearchModal);
        document.body.removeEventListener("keydown", handleCloseWithEscKey);
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>{retitle("Search")}</title>
        <meta property="og:title" content={retitle("Search")} key="title" />
      </Head>
      <NavigationView
        contentStyle={{ padding: "0.5rem" }}
        content={
          <article className="app-page" style={{ maxWidth: "unset", paddingInline: "1rem" }}>
            <TextField
              variant="text"
              name="keywords"
              placeholder="Search"
              autoFocus
              onChange={handleSearch}
            />
            <sub>{searchResults.length} result{searchResults.length === 1 ? "" : "s"}</sub>
            {
              config.features.fuseDebug && (
                <pre>{JSON.stringify(searchResults, null, 2)}</pre>
              )
            }
            {
              !!searchResults.length && <hr />
            }
            <div id="search-results" className="post-list" style={{ marginTop: "1rem" }}>
              {
                searchResults?.map((result: Fuse.FuseResult<SearchData>) => (
                  <div key={result.item.url} className="post-list-entry">
                    <h3>
                      <Link href={result.item.url}>{result.item.title}</Link>
                      <span style={{
                        marginLeft: "0.5rem",
                        color: "var(--fg-color-9)",
                        fontFamily: "var(--font-family-header)",
                        fontWeight: "900",
                        fontStyle: "italic",
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                        userSelect: "none"
                      }}>
                        {result.item.type}
                      </span>
                    </h3>
                    {
                      result.item.subtitle && (
                        <span>{result.item.subtitle}</span>
                      )
                    }
                    {
                      result.item.tags && (
                        <TagList item={result.item} />
                      )
                    }
                    {
                      result.item.publishedAt && (
                        <span className="timestamp">
                          {`${new Date(result.item.publishedAt).toDateString()}`}
                        </span>
                      )
                    }
                  </div>
                ))
              }
            </div>
          </article>
        }
      />
    </>
  );
};

export default SearchPage;
