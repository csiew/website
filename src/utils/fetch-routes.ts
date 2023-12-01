import { RssFeedEntry, siteUrl } from "./@types";

const baseUrl = `https://${siteUrl}`;

const routes: RssFeedEntry[] = [
  {
    title: "Home",
    description: "Home",
    url: `${baseUrl}/`,
    guid: "/"
  },
  {
    title: "Posts",
    description: "Posts",
    url: `${baseUrl}/posts`,
    guid: "/posts"
  },
  {
    title: "Projects",
    description: "Projects",
    url: `${baseUrl}/projects`,
    guid: "/projects"
  }
];

export default routes.map((r) => ({
  ...r,
  date: new Date(Date.now())
})) as unknown as RssFeedEntry[];
