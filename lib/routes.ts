import { PageRoute } from "./@types";

const routes: PageRoute[] = [
  {
    title: "Home",
    path: "/"
  },
  {
    title: "Now",
    path: "/now"
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
  },
  {
    title: "Search",
    path: "/search",
    hideFromNavBar: true
  },
  {
    title: "Feed",
    path: "/feed",
    hideFromNavBar: true
  },
  {
    title: "Sitemap",
    path: "/sitemap.xml",
    hideFromNavBar: true
  },
  {
    title: "RSS",
    path: "/rss.xml",
    hideFromNavBar: true
  },
  {
    title: "Now RSS",
    path: "/now/rss.xml",
    hideFromNavBar: true
  },
  {
    title: "Posts RSS",
    path: "/posts/rss.xml",
    hideFromNavBar: true
  }
];

export default routes;
