import fs from "fs";
import { isUndefined } from "lodash";
import path from "path";
import process from "process";
import { v4 as uuidv4 } from "uuid";
import { PublishableItem } from "./@types";

export type BlogPost = PublishableItem & {
  id?: string;
  slug?: string;
  title?: string;
  subtitle?: string;
  author: string;
  createdAt: string | Date;
  lastModified?: string | Date;
  publishedOn?: string | Date;
  content?: string;
  isPublished: boolean;
};

export type BlogPostFilter = {
  year: string | number;
  month?: string | number;
  shortTitle?: string;
};

const postsDir = path.join(process.cwd(), "posts");

export const generatePathString = (slug: string) => {
  return `/posts/${slug}`;
};

export const getPosts = (getContent = false): BlogPost[] => {
  const postFilePaths = fs.readdirSync(postsDir);
  const rawPosts: string[] = postFilePaths.map((filePath) => fs.readFileSync(path.join(postsDir, filePath)).toString("utf-8"));
  return rawPosts
    .map((rawPost: string): BlogPost | null => {
      const rawPostWithoutDividers = rawPost.match(RegExp(/(?<=---\n)([\s\S]*?)(?=\n---\n)/gm));
      if (!rawPostWithoutDividers) {
        return null;
      }
      const rawMetadata: string[][] = rawPostWithoutDividers[0].split("\n").map((s) => s.split(": "));

      // Map each tuple into object
      const postMap = rawMetadata.reduce((accum, [k, v]) => {
        accum[k] = v;
        return accum;
      }, {} as { [k: string]: any });
      postMap.id = uuidv4().toString();

      // Encode content (only if content is to be retrieved here)
      if (getContent) {
        const content = (rawPost.match(RegExp(/(?<=(\n---\n))[\d\s\S]*$/gm)) || [])[0] ?? "";
        postMap.content = encodeURI(content);
      }

      if (isUndefined(postMap.lastModified)) postMap.lastModified = postMap.publishedOn;

      if (isUndefined(postMap.isPublished)) postMap.isPublished = true;

      // Remap Map object as object
      return postMap as BlogPost;
    })
    .filter((post) => !!post)
    .map((post) => post as BlogPost)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
};
