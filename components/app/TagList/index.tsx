import React from "react";
import Badge from "../../ui/Badge";
import Link from "next/link";

type TagListProps = {
  item: {
    tags?: string[];
    slug?: string;
    [k: string]: any;
  };
};

const TagList = ({ item }: TagListProps) => {
  return (
    <span style={{
      width: "100%",
      margin: "0.5rem 0rem",
      display: "inline-flex",
      flexFlow: "row wrap",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "0.5rem"
    }}>
      <span style={{
        color: "var(--fg-color-6)",
        fontWeight: "bold",
        fontSize: "0.9rem",
        textTransform: "uppercase"
      }}><small><Link href="/tags">Tags</Link>: </small></span>{item?.tags?.map((tag) => <Link key={`${item.slug}-tag-${tag}`} href={`/tags?t=${encodeURIComponent(tag)}`}><Badge>{tag}</Badge></Link>)}
    </span>
  );
};

export default TagList;
