import { createContext } from "react";
import { BlogPost } from "../../lib/blog";

interface IContentContextProps {
  posts: BlogPost[];
  savePosts?: (newPosts: BlogPost[]) => void;
}

const ContentContext = createContext<IContentContextProps>({ posts: new Array<BlogPost>() });

export default ContentContext;
