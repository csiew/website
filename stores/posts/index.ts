import { createContext } from "react";
import { BlogPost } from "../../lib/blog";

export type ContentContextProps = {
  posts: BlogPost[];
};

export const ContentContext = createContext({ posts: new Array<BlogPost>() });

export default ContentContext;
