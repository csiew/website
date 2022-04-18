import { writable, type Writable } from "svelte/store";
import rawPosts from "./posts";

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  content: string;
};

export const store: Writable<BlogPost[]> = writable([]);

export function getPost(id: string): BlogPost | null {
  initialiseStore();
  let result: BlogPost;
  store.update((posts: BlogPost[]) => {
    result = posts.find((post) => post.id === id);
    return posts;
  });
  return result;
}

export function initialiseStore(): void {
  store.update((posts) => {
    if (posts.length === 0) {
      return rawPosts.map((post) => {
        const result = post as BlogPost;
        result.content = decodeURI(result.content);
        return result;
      });
    } else {
      return posts;
    }
  });
}
