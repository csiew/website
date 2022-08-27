import React from "react";
import NavigationView from "../../components/ui/NavigationView";

const Blog = () => {
  return (
    <NavigationView
      content={(
        <article className="topLevelPage">
          <h2>Blog</h2>
        </article>
      )}
    />
  );
};

export default Blog;
