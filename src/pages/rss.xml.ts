import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import showdown from "showdown";
import { SITE, absoluteUrl } from "../lib/site";

const htmlConverter = new showdown.Converter();

export async function GET(context: { site: URL }) {
  const posts = (await getCollection("posts"))
    .filter((post) => !post.data.private)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: SITE.name,
    description: `${SITE.name}'s personal blog`,
    site: context.site,
    trailingSlash: false,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom"
    },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.subtitle,
      link: `/posts/${post.data.slug}`,
      pubDate: post.data.publishedAt,
      customData: [
        `<author>${SITE.author}</author>`,
        post.data.keywords ? `<keywords>${post.data.keywords}</keywords>` : "",
        `<slug>${post.data.slug}</slug>`
      ].filter(Boolean).join(""),
      content: htmlConverter.makeHtml((post as { body?: string }).body ?? "")
    })),
    customData: `<language>en</language><atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />`
  });
}
