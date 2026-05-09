import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import showdown from "showdown";
import { SITE, absoluteUrl } from "../lib/site";

const htmlConverter = new showdown.Converter();

export async function GET(context: { site: URL }) {
  const projects = (await getCollection("projects"))
    .sort((a, b) => b.data.duration.start.localeCompare(a.data.duration.start));

  return rss({
    title: SITE.name,
    description: `${SITE.name}'s personal projects`,
    site: context.site,
    trailingSlash: false,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom"
    },
    items: projects.map((project) => ({
      title: project.data.title,
      description: project.data.subtitle,
      link: `/projects/${project.data.slug}`,
      customData: [
        `<author>${SITE.author}</author>`,
        `<slug>${project.data.slug}</slug>`
      ].join(""),
      content: htmlConverter.makeHtml((project as { body?: string }).body ?? "")
    })),
    customData: `<language>en</language><atom:link href="${absoluteUrl("/projects.xml")}" rel="self" type="application/rss+xml" />`
  });
}
