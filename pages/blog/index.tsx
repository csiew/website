import React, { useEffect } from "react";
import config from "../../config";
import { BlogPost } from "../../lib/blog";
import retitle from "../../lib/retitle";
import getPosts from "./get-posts";
import BlogNavigationView from "../../components/app/BlogNavigationView";

const Blog = ({ posts }: { posts: BlogPost[] }) => {
  useEffect(() => {
    document.title = retitle("Blog");
    document.getElementById(config.rootElementId)?.scrollTo({ top: 0 });
  }, []);
  
  return <BlogNavigationView posts={posts} />;
};

export const getStaticProps = async () => {
  return {
    props: { posts: getPosts() }
  };
};

export default Blog;
