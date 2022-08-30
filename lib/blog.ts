import fs from "fs";
import path from "path";
import process from "process";
import { v4 as uuidv4 } from "uuid";

export type BlogPostPath = {
  year: string | number;
  month: string | number;
  shortTitle: string;
};

export type BlogPost = {
  id: string;
  path?: BlogPostPath;
  title: string;
  subtitle?: string;
  author: string;
  publishedOn: string;      // parse as date
  lastModified?: string;    // parse as date
  content?: string;
};

export type BlogPostFilter = {
  year: string | number;
  month?: string | number;
  shortTitle?: string;
};

const postsDir = path.join(process.cwd(), "posts");

const generatePathObject = (title: string, publishedOn: string) => {
  const safeTitle = title
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z\d\s]/g, "")
    .replace(/[\s]/g, "-")
    .replace(/-{2,}/g, "-");
  const date = new Date(publishedOn);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    shortTitle: safeTitle
  };
};

export const generatePathString = (pathProps?: BlogPostPath) => {
  if (!pathProps) {
    return "";
  }
  return `/blog/${pathProps.year}/${pathProps.month}/${pathProps.shortTitle}`;
};

export const getPosts = (getContent = false): BlogPost[] => {
  const postFilePaths = fs.readdirSync(postsDir);
  const rawPosts: string[] = postFilePaths.map((filePath) => fs.readFileSync(path.join(postsDir, filePath)).toString("utf-8"));
  return rawPosts
    .map((rawPost: string): BlogPost => {
      // Transform raw multiline metadata string into tuple
      const rawMetadata: string[][] = (rawPost.match(RegExp(/(?<=---\n)([\s\S]*?)(?=\n---\n)/gm)) || [])[0].split("\n").map((s) => s.split(": "));

      // Map each tuple into Map object
      const postMap: Map<string, string | BlogPostPath> = new Map();
      rawMetadata.forEach((keyValuePair) => {
        const [key, value] = keyValuePair;
        postMap.set(key, value);
      });
      postMap.set("id", uuidv4().toString());
      if (["title", "publishedOn"].every((k) => postMap.has(k))) {
        const title = postMap.get("title") as string || "";
        const publishedOn = postMap.get("publishedOn") as string || "";
        const generatedPath = generatePathObject(title, publishedOn);
        postMap.set("path", generatedPath);
      }

      // Encode content (only if content is to be retrieved here)
      if (getContent) {
        const content = (rawPost.match(RegExp(/(?<=(\n---\n))[\d\s\S]*$/gm)) || [])[0];
        postMap.set("content", encodeURI(content));
      }

      // Remap Map object as object
      return Object.fromEntries(postMap) as BlogPost;
    })
    .sort((a, b) => {
      const dateA = new Date(a.publishedOn).getTime();
      const dateB = new Date(b.publishedOn).getTime();
      return dateB - dateA;
    });
};
