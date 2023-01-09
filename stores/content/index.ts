import { createContext } from "react";
import { BlogPost } from "../../lib/blog";
import { ProjectV2 } from "../../lib/projects";

interface IContentContextProps {
  posts: BlogPost[];
  projects: ProjectV2[];
  savePosts?: (newPosts: BlogPost[]) => void;
}

const ContentContext = createContext<IContentContextProps>({
  posts: new Array<BlogPost>(),
  projects: new Array<ProjectV2>()
});

export default ContentContext;
