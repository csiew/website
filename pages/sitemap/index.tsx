import React from "react";
import Link from "next/link";
import NavigationView from "../../components/ui/NavigationView";
import routes from "../../lib/routes";
import fetchBlogPosts, { dateTransform } from "../../utils/fetch-blog-posts";
import fetchProjects from "../../utils/fetch-projects";

function Sitemap({ posts, projects }: { posts: any[]; projects: any[] }) {
  return (
    <NavigationView
      content={(
        <article className="app-page">
          <h2>Sitemap</h2>
          <ul>
            {routes.map((route) => (
              <li key={route.path}>
                {route.path.endsWith(".xml") && (
                  <a href={route.path} target="__blank">
                    {route.title} (XML)
                  </a>
                )}
                {!route.path.endsWith(".xml") && (
                  <Link href={route.path}>
                    {route.title}
                  </Link>
                )}
                {route.path === "/posts" && (
                  <ul>
                    {dateTransform(posts)?.sort((a, b) => a.date.getTime() < b.date.getTime() ? 1 : -1).map((post) => (
                      <li key={post.guid}>
                        <Link href={`/posts/${post.guid}`}>
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {route.path === "/projects" && (
                  <ul>
                    {projects.map((project) => (
                      <li key={project.guid}>
                        <Link href={`/projects/${project.guid}`}>
                          {project.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </article>
      )}
    />
  );
}

export async function getStaticProps() {
  const posts = await fetchBlogPosts();
  const projects = await fetchProjects();
  return { props: { posts, projects } };
}

export default Sitemap;
