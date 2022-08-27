import React, { useEffect } from "react";
import config from "../../config";
import retitle from "../../lib/retitle";
import NavigationView from "../../components/ui/NavigationView";

const Blog = () => {
  useEffect(() => {
    document.title = retitle("Blog");
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);
  
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
