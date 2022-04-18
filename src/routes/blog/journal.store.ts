import { writable, type Writable } from "svelte/store";
import rawPosts from "./posts";

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  content: string;
};

export const store: Writable<BlogPost[]> = writable([]);

export async function getPost(id: string): Promise<BlogPost | null> {
  await initialiseStore();
  let result: BlogPost;
  store.update((posts: BlogPost[]) => {
    result = posts.find((post) => post.id === id);
    return posts;
  });
  return result;
}

export async function initialiseStore(): Promise<void> {
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
  Promise.resolve();
}
