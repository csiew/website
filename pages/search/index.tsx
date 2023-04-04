import React, { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import Fuse from "fuse.js";
import config from "../../config";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";
import TextField from "../../components/ui/TextField";
import { searchDataManifest } from "../../lib/manifest";
import SearchResults from "../../components/app/Search/SearchResults";

const SearchPage = ({ setShowSearchModal }: { setShowSearchModal?: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const fuse = new Fuse(
    searchDataManifest,
    {
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
              variant="search"
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
            <SearchResults results={searchResults} />
          </article>
        }
      />
    </>
  );
};

export default SearchPage;
