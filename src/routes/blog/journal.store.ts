import { writable, type Writable } from "svelte/store";
import rawPosts from "./posts.json";

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  content: string;
}

export const store: Writable<BlogPost[]> = writable([]);

export function getPost(id: string): BlogPost | null {
  let result: BlogPost;
  store.update((posts: BlogPost[]) => {
    result = posts.find((post) => post.id === id);
    return posts;
  });
  return result;
}

store.update((posts) => {
  return rawPosts.map((post) => {
    const result = post as BlogPost;
    result.content = decodeURI(result.content);
    return result;
  });
});
