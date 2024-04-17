import * as fs from "node:fs";
import * as path from "node:path";
import { Builder } from "xml2js";

const siteUrl = "https://clarencesiew.com";

const xmlBuilder = new Builder({
  rootName: "rss",
  cdata: true
});
const options = { encoding: "utf-8", withFileTypes: true, recursive: false } as any;

function readContentDirs(dirList: fs.Dirent[]) {
  return dirList.filter((p: fs.Dirent) => p.isDirectory()).map((p) => p.name);
}

function listContentSlugs(section: string) {
  const dirList = fs.readdirSync(path.join(process.cwd(), `public/content/${section}`), options) as unknown as fs.Dirent[];
  return readContentDirs(dirList);
}

// <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
function fetchMetadata(section: string) {
  const dirList = listContentSlugs(section);
  const metadataJson = [];
  for (const slug of dirList) {
    const metadata = fs.readFileSync(path.join(process.cwd(), `public/content/${section}/${slug}/metadata.json`));
    const jsonData = JSON.parse(String(metadata));
    const itemUrl = path.join(siteUrl, section, jsonData.slug);
    const metadataObj: any = {
      title: jsonData.title,
      description: jsonData.subtitle,
      link: itemUrl,
      guid: itemUrl
    };
    if (Object.keys(jsonData).includes("publishedAt")) {
      metadataObj["pubDate"] = new Date(jsonData.publishedAt).toUTCString();
    }
    metadataJson.push(metadataObj);
  }
  return metadataJson;
}

function buildXml(
  section: string,
  title: string,
  description: string
) {
  return xmlBuilder.buildObject({
    $: {
      "xmlns:dc": "http://purl.org/dc/elements/1.1/",
      "xmlns:content": "http://purl.org/rss/1.0/modules/content/",
      "xmlns:atom": "http://www.w3.org/2005/Atom",
      version: "2.0"
    },
    channel: {
      title,
      description,
      generator: "Custom RSS generator",
      link: siteUrl,
      lastBuildDate: new Date().toUTCString(),
      "atom:link": {
        $: {
          href: path.join(siteUrl, "rss.xml"),
          rel: "self",
          type: "application/rss+xml"
        }
      },
      item: fetchMetadata(section)
    }
  });
}

function writeXmlToPublic(fileName: string, xml: string) {
  fs.writeFileSync(path.join(process.cwd(), "public", `${fileName}.xml`), xml);
}

function createFeeds() {
  try {
    console.log("Creating blog post feed...");
    const posts = buildXml(
      "posts",
      "Clarence Siew",
      "Clarence Siew's personal blog"
    );
    writeXmlToPublic("rss", posts);
    console.log("Successfully written blog post feed");
    console.log(posts);
    
    console.log("Creating projects feed...");
    const projects = buildXml(
      "projects",
      "Clarence Siew",
      "Clarence Siew's personal projects"
    );
    writeXmlToPublic("projects", projects);
    console.log("Successfully written projects feed");
    console.log(projects);
  } catch (err) {
    console.error("Feed generation failed");
    console.error(err);
    throw err;
  }
}

createFeeds();
