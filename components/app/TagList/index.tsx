import React from "react";
import Badge from "../../ui/Badge";

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
      margin: "1rem 0rem",
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
      }}><small>Tags: </small></span>{item?.tags?.map((tag) => <Badge key={`${item.slug}-tag-${tag}`}>{tag}</Badge>)}
    </span>
  );
};

export default TagList;
