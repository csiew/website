import routes from "./fetch-routes";
import fetchBlogPosts from "./fetch-blog-posts";
import fetchProjects from "./fetch-projects";

export default async function generateSiteMap() {
  const posts = await fetchBlogPosts();
  const projects = await fetchProjects();
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes.map((post: any) => {
    return `
      <url>
          <loc>${post.url}</loc>
      </url>
      `;
  })
    .join("")}
     ${posts.map((post: any) => {
    return `
      <url>
          <loc>${post.url}</loc>
      </url>
      `;
  })
    .join("")}
    ${projects.map((project: any) => {
    return `
     <url>
         <loc>${project.url}</loc>
     </url>
     `;
  })
    .join("")}
   </urlset>
 `;
}
