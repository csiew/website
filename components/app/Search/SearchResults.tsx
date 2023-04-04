import React from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { SearchData } from "../../../lib/manifest";
import TagList from "../TagList";

type SearchResultsProps = {
  results: Array<Fuse.FuseResult<SearchData>>;
  hooks?: {
    onLinkClick?: () => void;
  };
};

const SearchResults = ({ results, hooks }: SearchResultsProps) => {
  return (
    <div id="search-results" className="post-list" style={{ marginTop: "1rem" }}>
      {
        results?.map((result: Fuse.FuseResult<SearchData>) => (
          <div key={result.item.url} className="post-list-entry">
            <h3>
              <Link href={result.item.url} onClick={hooks?.onLinkClick}>{result.item.title}</Link>
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
                <TagList item={result.item} hooks={hooks} />
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
  );
};

export default SearchResults;
