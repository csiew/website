import _ from "lodash";
import { parseStringPromise } from "xml2js";
import { Converter } from "showdown";
import { Post } from "./cache";

export async function fetchPostsViaRss() {
  const feedXmlResult = await fetch("/rss.xml");
  if (!feedXmlResult.ok)
    throw new Error(feedXmlResult.statusText);
  const feedXml = await feedXmlResult.text();
  const feedJson = await parseStringPromise(feedXml);
  return _.get(feedJson, "rss.channel[0].item")
    .map((p: any) => ({
      slug: p.slug,
      title: p.title,
      subtitle: p.description,
      publishedAt: p.pubDate,
      content: p["content:encoded"]
    }))
    .sort((a: Post, b: Post) => {
      const aTimestamp = new Date(a.publishedAt).getTime();
      const bTimestamp = new Date(b.publishedAt).getTime();
      return aTimestamp < bTimestamp ? 1 : -1;
    });
}

export async function fetchMastodonFeedViaRss() {
  const feedXmlResult = await fetch("https://mastodon.online/@csiew.rss");
  if (!feedXmlResult.ok)
    throw new Error(feedXmlResult.statusText);
  const feedXml = await feedXmlResult.text();
  const feedJson = await parseStringPromise(feedXml);
  return _.get(feedJson, "rss.channel[0].item");
}

export async function fetchProjectsViaManifest() {
  const manifestResult = await fetch("/content/projects/manifest.json");
  if (!manifestResult.ok)
    throw new Error(manifestResult.statusText);
  const manifest = await manifestResult.json();
  const fetchedProjects = [];
  for (const slug of manifest) {
    const metadataResult = await fetch(`/content/projects/${slug}/metadata.json`);
    if (!metadataResult.ok)
      throw new Error(metadataResult.statusText);
    const contentResult = await fetch(`/content/projects/${slug}/index.md`);
    if (!contentResult.ok)
      throw new Error(contentResult.statusText);
    const htmlConverter = new Converter();
    const contentHtml = htmlConverter.makeHtml(String(contentResult));
    const projectData = await metadataResult.json();
    projectData.content = contentHtml;
    fetchedProjects.push(projectData);
  }
  fetchedProjects.sort((a, b) => {
    return a.duration.start < b.duration.start ? 1 : -1;
  });
  return fetchedProjects;
}
