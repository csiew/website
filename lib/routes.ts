import { PageRoute } from "./@types";

const routes: PageRoute[] = [
  {
    title: "Home",
    path: "/"
  },
  {
    title: "Admin",
    path: "/admin",
    authOnly: true
  },
  {
    title: "Blog",
    path: "/blog"
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
