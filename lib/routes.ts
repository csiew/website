import { PageRoute } from "./@types";

const routes: PageRoute[] = [
  {
    title: "Home",
    path: "/"
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
    title: "Watching",
    path: "/watching",
    hideFromNavBar: true
  },
  {
    title: "Tags",
    path: "/tags",
    hideFromNavBar: true
  },
  {
    title: "Sitemap",
    path: "/sitemap",
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
    title: "Posts RSS",
    path: "/posts/rss.xml",
    hideFromNavBar: true
  }
];

export default routes;
