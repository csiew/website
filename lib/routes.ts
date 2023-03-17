import config from "../config";
import { PageRoute } from "./@types";

const routes: PageRoute[] = [
  {
    title: "Home",
    path: "/"
  },
  {
    title: "Admin",
    path: "/admin",
    authOnly: true,
    hideFromNavBar: !config.features.admin
  },
  {
    title: "Posts",
    path: "/posts"
  },
  {
    title: "Projects",
    path: "/projects"
  },
  {
    title: "Playlists",
    path: "/playlists"
  },
  {
    title: "Now Watching",
    path: "/now-watching"
  }
];

export default routes;
