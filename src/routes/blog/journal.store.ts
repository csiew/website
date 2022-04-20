import { writable, type Writable } from "svelte/store";
import rawPosts from "./posts";

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  content: string;
};

export const store: Writable<BlogPost[]> = writable(
  rawPosts.map((post) => {
    return {
      ...post,
      content: decodeURI(post.content)
    } as BlogPost;
  })
);
